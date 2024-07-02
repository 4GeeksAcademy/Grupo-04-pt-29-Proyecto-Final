"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User,Client,Orders,Providers,Reviews,RoleEnum, Services
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
cors = CORS(app, resources={r"/*": {"origins": "https://laughing-space-carnival-q77xrw6gg74xcxr4w-3000.app.github.dev/"}})
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

@app.route("/api/providers", methods=['GET'])
def get_providers():
    all_providers = Providers.query.all()
    providers_serialized=[]
    for providers  in all_providers:
        providers_serialized.append(providers.serialize())

    return jsonify({"data":providers_serialized}), 200, {'Access-Control-Allow-Origin':'*'}


#endpoint para escoger cada proovedor con un id
@app.route('/api/provider/<int:id>', methods=['GET'])
def get_single_provider(id):
    single_provider = Providers.query.get(id)

    if single_provider is None:
        return jsonify({"msg": f"El usuario ccon le ID: {id} no existe"}), 400
    print(single_provider.serialize())
    return jsonify({"data": single_provider.serialize()}, 200)

#endpoint para actualizar proveedor
@app.route('/api/edit/provider/<int:id>', methods=["PUT"])
def update_provider(id):
    update_provider = Providers.query.get(id)
    body = request.get_json()
    if update_provider is None:
        return jsonify({"msg": f"El id {id} provider no fue encontrado"}), 400
    if "name" in body:
        update_provider.name = body["name"]
    if "last_name" in body:
        update_provider.last_name = body["last_name"]
    if "phone" in body:
        update_provider.phone = body["phone"]
    if "location" in body:
        update_provider.location = body["location"]
    if "identity_number" in body:
        update_provider.identity_number = body["identity_number"]
    if "profession" in body:
        update_provider.profession = body["profession"]
    if "experience" in body:
        update_provider.experience = body["experience"]
    if "description" in body:
        update_provider.description = body["description"]
    db.session.commit()
    return jsonify({"data": update_provider.serialize()})



#endpoint para crear informacion de proveedor
@app.route('/api/add/provider', methods=['POST'])
def new_provider():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar información en el body'}), 400
    if 'name' not in body:
        return jsonify({'msg': 'El campo name es obligatorio'}), 400
    if 'last_name' not in body:
        return jsonify({'msg': 'El campo last_name es obligatorio'}), 400
    if 'phone' not in body:
        return jsonify({'msg': 'El campo phone es obligatorio'}), 400
    if 'location' not in body:
        return jsonify({'msg': 'El campo location es obligatorio'}), 400
    if 'identity_number' not in body:
        return jsonify({'msg': 'El campo identity_number es obligatorio'}), 400
    if 'profession' not in body:
        return jsonify({'msg': 'El campo profession es obligatorio'}), 400
    if 'experience' not in body:
        return jsonify({'msg': 'El campo experience es obligatorio'}), 400
    if 'description' not in body:
        return jsonify({'msg': 'El campo description es obligatorio'}), 400
    
    new_provider = Providers()
    new_provider.user_id = body['user_id']
    new_provider.name = body['name']
    new_provider.last_name = body['last_name']
    new_provider.phone = body['phone']
    new_provider.location = body['location']
    new_provider.identity_number = body['identity_number']
    new_provider.profession = body['profession']
    new_provider.experience = body['experience']
    new_provider.description = body['description']
    new_provider.number_company = body['number_company']
    new_provider.company = body['company']
    print("se imprime body",body['user_id'])
    db.session.add(new_provider)
    db.session.commit()
    print("se imprime body",body['user_id'])
    return jsonify({'msg': 'Nuevo provider creado',
                    'data': new_provider.serialize()}), 201

@app.route('/api/favorites/<int:client_id>', methods=['GET'])
def get_user_favorite(client_id):
    client = Client.query.get(client_id)
    if client is None:
        return jsonify({"msg": f"El id {client_id} del usuario no existe"}), 404
    favorites = [service.title for service in client.favorites]
    return jsonify({"msg": favorites})


@app.route('/api/favorite/<int:client_id>/<int:service_id>', methods=['POST'])
def add_favorite_provider(client_id, service_id):
    client = Client.query.get(client_id)
    service = Services.query.get(service_id)

    if client and service:
        client.favorites.append(service)
        db.session.commit()
        return jsonify({"msg": f"Servicio {service.title} agregado a favoritos del cliente {client.name}"}), 201
    return jsonify({"msg": "Cliente o servicio no encontrado"}), 404


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

