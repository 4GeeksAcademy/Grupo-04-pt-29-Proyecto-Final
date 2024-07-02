"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User,Client,Orders,Providers,Reviews,RoleEnum,OrderFavorite,Services
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




# Inicio de los endpoints

# 1. Sistema de Auntenticacion

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


# Endpoint para los Usuarios Funciona

# Enpoint para Traer un Usuario por Id
@app.route('/api/profile/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg":"el Usuario no existe" }), 404
    return jsonify(user.serialize()),200



# Endpoint para los CLIENTES

#endpoint prueba - traer los Clientes de forma general
@app.route('/api/client', methods=['GET'])
def get_client():
    all_clients = Client.query.all()
    clients_serialized=[]
    for clients  in all_clients:
        clients_serialized.append(clients.serialize())
    print(clients_serialized)
    return jsonify({"data":clients_serialized}), 200

#endpoint para escoger cada Cliente con un id
@app.route('/api/client/<int:id>', methods=['GET'])
def get_single_client(id):
    single_client = Client.query.get(id)
    if single_client is None:
        return jsonify({"msg": f"El Cliente con le ID: {id} no existe"}), 400
    print(single_client.serialize())
    return jsonify({"data": single_client.serialize()}, 200)

#endpoint para Agregar informacion del Cliente
@app.route('/api/add/client', methods=['POST'])
@jwt_required()
def new_client():
    email= get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_id=user.id
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
    if 'bio' not in body:
        return jsonify({'msg': 'El campo biografia es obligatorio'}), 400
    if 'url_image' not in body:
        return jsonify({'msg': 'El campo imagen es obligatorio'}), 400
    
    new_client = Client()
    new_client.user_id = user_id
    new_client.name = body['name']
    new_client.last_name = body['last_name']
    new_client.phone = body['phone']
    new_client.location = body['location']
    new_client.bio = body['bio']
    new_client.url_image = body['url_image']
    db.session.add(new_client)
    db.session.commit()
    return jsonify({'msg': 'Nuevo Cliente creado','data': new_client.serialize()}), 201

#endpoint para editar los datos del Cliente
@app.route('/api/edit/client/<int:id>', methods=["PUT"])
@jwt_required()
def update_client(id):
    email= get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_id=user.id
    
    update_client = Client.query.get(id)
    body = request.get_json()
    if update_client is None:
        return jsonify({"msg": f"El id {id} Cliente no fue encontrado"}), 400
    if "name" in body:
        update_client.name = body["name"]
    if "last_name" in body:
        update_client.last_name = body["last_name"]
    if "phone" in body:
        update_client.phone = body["phone"]
    if "location" in body:
        update_client.location = body["location"]
    if "description" in body:
        update_client.description = body["description"]
    db.session.commit()
    return jsonify({"data": update_client.serialize()})

#endpoint para obtener las Ordenes Favoritas del Cliente

@app.route('/api/client/<int:client_id>/favorites', methods=["GET"])
def client_favorites(client_id):

    favorites = OrderFavorite.query.filter_by(client_id=client_id).all()
    if len(favorites) == 0:
        raise APIException('El cliente aún no tiene favoritos', status_code=404)
    favorites = list(map(lambda item: item.serialize(), favorites))
        
    return jsonify (favorites), 200


# Endpoint para los PROVEEDORES

#endpoint pruba proveedores - traer servicios de forma general
@app.route('/api/provider', methods=['GET'])
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
        return jsonify({"msg": f"El Proveedor con le ID: {id} no existe"}), 400
    print(single_provider.serialize())
    return jsonify({"data": single_provider.serialize()}, 200)

#endpoint para Agregar informacion de proveedor
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

# Endpoint para los SERVICIOS

@app.route('/api/services', methods=['GET'])
def get_all_services():
    services = Services.query.all()
    result = list(map(lambda x: x.serialize(),services))
    return jsonify(result),200

## Ruta para obtener un Servicio por ID del proveedor

@app.route('/api/services/<int:provider_id>', methods=['GET'])
def get_all_services_provider(provider_id,):
    services = Services.query.filter_by(provider_id=provider_id).all()
    result = list(map(lambda x: x.serialize(),services))
    return jsonify(result),200

#endpoint para crear un servicio
@app.route('/api/add/service', methods=['POST'])
def new_services():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar información en el body'}), 400
    if 'title' not in body:
        return jsonify({'msg': 'El Titulo es obligatorio'}), 400
    if 'category' not in body:
        return jsonify({'msg': 'La Categoria es obligatoria'}), 400
    if 'price' not in body:
        return jsonify({'msg': 'La Tarifa es obligatoria'}), 400
    if 'description' not in body:
        return jsonify({'msg': 'La description es obligatoria'}), 400
    
    new_services = Services()
    new_services.user_id = body['user_id']
    new_services.title = body['title']
    new_services.category = body['category']
    new_services.price = body['price']
    new_services.description = body['description']
    db.session.add(new_services)
    db.session.commit()
    return jsonify({'msg': 'Nuevo Servicio creado','data': new_services.serialize()}), 201

#endpoint para Editar un Servicio
@app.route('/api/edit/service/<int:id>', methods=["PUT"])
def update_service(id):
    update_service = Providers.query.get(id)
    body = request.get_json()
    if update_service is None:
        return jsonify({"msg": f"El id {id} provider no fue encontrado"}), 400
    if "title" in body:
        update_service.title = body["title"]
    if "category" in body:
        update_service.category = body["category"]
    if "price" in body:
        update_service.price = body["price"]
    if "description" in body:
        update_service.description = body["description"]
    db.session.commit()
    return jsonify({"data": update_service.serialize()})

## Ruta para Eliminar un Servicio
@app.route('/api/services/<int:character_id>/user/<int:user_id>', methods=['DELETE'])
def delete_service(service_id,user_id):
    service = Services.query.filter_by(service_id=service_id,user_id=user_id).first()
    if service is None:
        return jsonify({"msg":"el servicio favorito no existe" }), 404
    db.session.delete(service)
    db.session.commit()
    return jsonify({"msg":"El servicio esta Eliminado"}), 200




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

