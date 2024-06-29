"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User,Client,Orders,Providers,Reviews,RoleEnum,OrderFavorite
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta  
from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)
app.bcrypt = bcrypt

app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config["JWT_SECRE T_KEY"] = os.getenv("JWT_SECRET")  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# INicio de los endpoints


#Sign Up o Registro

@app.route('/api/signup', methods=["POST"])
def signup():
    body = request.get_json(silent=True)
    
    if body is None:
        return jsonify ({'msg':'Los campos de usuario y contraseña están vacíos'}), 400
    if 'username' not in body:
        return jsonify ({'msg':'Debe crear un usuario para continuar.'}), 400
    if 'email' not in body:
        return jsonify ({'msg':'No puede continuar sin un correo electrónico.'}), 400
    if 'password' not in body:
        return jsonify ({'msg':'No puede continuar sin su contraseña de seguridad.'}), 400
    
    password_hash= bcrypt.generate_password_hash(body["password"]).decode("utf-8")

    new_user = User(
        username = body["username"],
        role = body["role"],
        email = body["email"],
        password = password_hash,
        is_active = True,
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify ({'msg':'Usuario Creado .'}), 200


# Log In o Iniciar Seccion  

@app.route('/api/login', methods=["POST"])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify ({'msg':'Los campos de usuario y contraseña están vacíos'}), 400
    if 'email' not in body:
        return jsonify ({'msg':'No puede continuar sin su correo electrónico.'}), 400
    if 'password' not in body:
        return jsonify ({'msg':'No puede continuar sin su Contraseña de Seguridad.'}), 400
    
    user = User.query.filter_by(email=body['email']).first()
    if user is None :
       return jsonify ({'msg':'Datos de acceso inválidos. Por favor, verifique e intente nuevamente.'}), 400
    
    correct_password = bcrypt.check_password_hash(user.password, body['password'])
    if correct_password is False:
        return jsonify ({'msg':'Datos de acceso inválidos. Por favor, verifique e intente nuevamente.'}), 400
    if True :
        response_body={
            "access_token": create_access_token(identity=user.email),
            "user":user.serialize()
        }
        
    return jsonify (response_body), 200

#endpoint pruba proveedores - traer servicios de forma general
@app.route('/api/providers', methods=['GET'])
def get_providers():
    all_providers = Providers.query.all()
    providers_serialized=[]
    for providers  in all_providers:
        providers_serialized.append(providers.serialize())
    print(providers_serialized)
    return jsonify({"data":providers_serialized}), 200


#endpoint para escoger cada proovedor con un id
@app.route('/api/provider/<int:id>', methods=['GET'])
def get_single_provider(id):
    single_provider = Providers.query.get(id)

    if single_provider is None:
        return jsonify({"msg": f"El usuario ccon le ID: {id} no existe"}), 400
    print(single_provider.serialize())
    return jsonify({"data": single_provider.serialize()}, 200)

#endpoint para obtener las Ordenes Favoritas del Cliente

@app.route('/api/client/<int:client_id>/favorites', methods=["GET"])
def client_favorites(client_id):

    favorites = OrderFavorite.query.filter_by(client_id=client_id).all()
    if len(favorites) == 0:
        raise APIException('El cliente aún no tiene favoritos', status_code=404)
    favorites = list(map(lambda item: item.serialize(), favorites))
        
    return jsonify (favorites), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

