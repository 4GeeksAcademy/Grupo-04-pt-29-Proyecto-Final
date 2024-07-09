"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory,render_template
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
from flask_mail import Mail,Message

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
   
app = Flask(__name__) 
app.config['MAIL_SERVER']="smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = "serviexpert.dev@gmail.com"
app.config['MAIL_PASSWORD'] = "qsnztblbzoghhbzo"
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail= Mail(app)

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


# ININICO DE LOS ENDPOIT

# FUNCIO DE VERIFICACION DEL EMAIL 
def send_verification_email(email,username):
    try:
        print('enviando correo')
       
           
        verify_token= create_access_token(identity=email)
        msg = Message('Hola , bienvenido a ServiExpert',
                      sender="serviexpert.dev@gmail.com",
                      recipients=[email]) 
        
        verify_url = f"{os.environ.get('FRONTEND_URL')}verify?verify_token={verify_token}"
        html= render_template("verify_email.html",username=username,verify_url=verify_url)
        msg.html=html
        mail.send(msg)
        return jsonify({'msg':'Correo enviado correctamente'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'msg':'no se pudo enviar el Correo!'}), 500



# 1. Sistema de Auntenticacion (FUNCIONA TODOS)

#Sign Up o Registro (FUNCIONA)
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
    send_verification_email(body["email"],body["username"])

    return jsonify ({'msg':'Usuario Creado .'}), 200

# Log In o Iniciar Seccion  (FUNCIONA)
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



# Endpoint para los USUARIO (FUNCIONA TODOS)

# Enpoint para Todos los Usuario (FUNCIONA)
@app.route('/api/profile', methods=['GET'])
def get_user():
    all_users= User.query.all()
    users_serialized=[]
    for users  in all_users:
        users_serialized.append(users.serialize())
    print(users_serialized)
    return jsonify({"data":users_serialized}), 200





@app.route('/api/private', methods=['GET'])
@jwt_required()
def get_current_user():
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 404
    return jsonify(user.serialize()),200






# Enpoint para Traer un Usuario por su Id (FUNCIONA)
@app.route('/api/profile/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 400
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg":"el Usuario no existe" }), 404
    return jsonify(user.serialize()),200



# Endpoint para los CLIENTES (FUNCIONA TODOS)

#endpoint para traer los CLIENTES de forma GENERAL(FUNCIONA)
@app.route('/api/client', methods=['GET'])
def get_client():
    all_clients = Client.query.all()
    clients_serialized=[]
    for clients  in all_clients:
        clients_serialized.append(clients.serialize())
    print(clients_serialized)
    return jsonify({"data":clients_serialized}), 200

#endpoint para escoger cada CLIENTE por su ID (FUNCIONA)
@app.route('/api/client/<int:id>', methods=['GET'])
def get_single_client(id):
    single_client = Client.query.get(id)
    if not single_client: 
        return jsonify({"msg": f"El Cliente con el ID: {id} no existe"}), 400
    serialized= single_client.serialize()
    print(serialized)
    return jsonify({"data": serialized}, 200)

#endpoint para escoger cada Cliente por UserID (FUNCIONA)
@app.route('/api/client/byuser/<int:user_id>/', methods=['GET'])
def get_client_by_user(user_id):
    client_by_user = Client.query.filter_by(user_id=user_id).first()
    if client_by_user is None:
        return jsonify({"msg": f"El Cliente con le ID: {user_id} no existe"}), 400
    # print(client_by_user.serialize())
    return jsonify(client_by_user.serialize()), 200


#endpoint para AGREGAR informacion del CLIENTE(FUNCIONA)
@app.route('/api/add/client', methods=['POST'])
@jwt_required()
def new_client():
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 400
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
    new_client.user_id = user.id
    new_client.name = body['name']
    new_client.last_name = body['last_name']
    new_client.phone = body['phone']
    new_client.location = body['location']
    new_client.bio = body['bio']
    new_client.url_image = body['url_image']
    db.session.add(new_client)
    db.session.commit()
    return jsonify({'msg': 'Nuevo Cliente creado','data': new_client.serialize()}), 201

#endpoint para EDITAR los datos del CLIENTE (FUNCIONA)
@app.route('/api/edit/client/<int:id>', methods=["PUT"])
@jwt_required()
def update_client(id):
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(user_id=id).first()
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 400
    update_client = Client.query.filter_by(user_id=id).first()
    body = request.get_json(silent=True)
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
    if "url_image" in body:
        update_client.url_image = body["url_image"]
    if "bio" in body:
        update_client.bio = body["bio"]
    db.session.commit()
    return jsonify({"data": update_client.serialize()})

# Ruta para ELIMINAR DATOS de un CLIENTE (FUNCIONA)
@app.route('/api/client/<int:id>/user/<int:user_id>', methods=['DELETE'])
def delete_client(id,user_id):
    client = Client.query.filter_by(id=id,user_id=user_id).first()
    if client is None:
        return jsonify({"msg":"el Cliente no existe" }), 404
    db.session.delete(client)
    db.session.commit()
    return jsonify({"msg":"Tus Datos del Perfil han sido Eliminado"}), 200



# Enpoint para TODOS los PROVEEDORES (FUNCIONA)
@app.route('/api/provider', methods=['GET'])
def get_providers():
    all_providers = Providers.query.all()
    providers_serialized=[]
    for providers  in all_providers:
        providers_serialized.append(providers.serialize())
    print(providers_serialized)
    return jsonify({"data":providers_serialized}), 200

#endpoint para escoger cada PROVEEDOR por su ID (FUNCIONA)
@app.route('/api/provider/<int:id>/', methods=['GET'])
def get_single_provider(id):
    single_provider = Providers.query.get(id)
    if single_provider is None:
        return jsonify({"msg": f"El Proveedor con le ID: {id} no existe"}), 400
    print(single_provider.serialize())
    return jsonify({"data": single_provider.serialize()}, 200)

#endpoint para escoger cada PROVEEDOR por UserID (FUNCIONA)
@app.route('/api/provider/byuser/<int:user_id>/', methods=['GET'])
def get_provider_by_user(user_id):
    provider_by_user = Providers.query.filter_by(user_id=user_id).first()
    if provider_by_user is None:
        return jsonify({"msg": f"El Proveedor con le ID: {user_id} no existe"}), 400
    # print(provider_by_user.serialize())
    return jsonify(provider_by_user.serialize()), 200

#endpoint para AGREGAR informacion del PROVEEDOR (FUNCIONA)
@app.route('/api/add/provider', methods=['POST'])
@jwt_required()
def new_provider():
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(email=email).first()    
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 400
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
    new_provider.user_id = user.id
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
    db.session.add(new_provider)
    db.session.commit()
    return jsonify({'msg': 'Nuevo provider creado',
                    'data': new_provider.serialize()}), 201

#endpoint para EDITAR informacion del PROVEEDOR (FUNCIONA)
@app.route('/api/edit/provider/<int:id>', methods=["PUT"])
@jwt_required()
def update_provider(id):
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 400
    update_provider = Providers.query.filter_by(user_id=id).first()
    body = request.get_json(silent=True)
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

## Ruta para ELIMINAR DATOS del PROVEEDOR (FUNCIONA)
@app.route('/api/provider/<int:id>/user/<int:user_id>', methods=['DELETE'])
def delete_provider(id,user_id):
    provider = Providers.query.filter_by(id=id,user_id=user_id).first()
    if provider is None:
        return jsonify({"msg":"" }), 404
    db.session.delete(provider)
    db.session.commit()
    return jsonify({"msg":"Tus Datos del Perfil han sido Eliminado"}), 200



# Endpoint para los SERVICIOS (FALTA AGREGAR Y EDITAR)

# Enpoint para TODOS los SERVICIOS (FUNCIONA)
@app.route('/api/services', methods=['GET'])
@jwt_required()
def get_all_services():
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 400
    services = Services.query.all()
    result = list(map(lambda x: x.serialize(),services))
    return jsonify(result),200

## Ruta para obtener un SERVICIOS por ID del PROVEEDOR (FUNCIONA)
@app.route('/api/services/<int:provider_id>', methods=['GET'])
@jwt_required()
def get_all_services_provider(provider_id,):
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'el usuario no existe'}), 400
    services = Services.query.filter_by(provider_id=provider_id).all()
    result = list(map(lambda x: x.serialize(),services))
    return jsonify(result),200

#endpoint para CREAR un SERVICIO (FUNCIONA)
@app.route('/api/add/service', methods=['POST'])
@jwt_required()
def new_services():
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user= User.query.filter_by(email=email).first()
    print(user.id)
    provider = Providers.query.filter_by(user_id=user.id).first()
    if not provider:
        return jsonify({'msg':'el usuario no existe'}), 400
    provider_id=provider.id
    if not provider:
        return jsonify({'msg':'el Servicio no existe'}), 400
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
    new_services.provider_id = provider_id
    new_services.title = body['title']
    new_services.category = body['category']
    new_services.price = body['price']
    new_services.description = body['description']
    new_services.url_image = body['url_image']
    db.session.add(new_services)
    db.session.commit()
    return jsonify({'msg': 'Nuevo Servicio creado','data': new_services.serialize()}), 201

#endpoint para EDITAR un SERVICIO (OJO)
@app.route('/api/edit/service/<int:id>', methods=["PUT"])
@jwt_required()
def update_service(id):
    email= get_jwt_identity()
    if not email:
        return jsonify({'msg':'el accesstoken es incorrecto, o esta Vencido'}), 400
    user= User.query.filter_by(email=email).first()
    print(user.id)
    update_service = Providers.query.filter_by(user_id=user.id).first()
    body = request.get_json(silent=True) 

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

## Ruta para ELIMINAR un SERVICIO (FUNCIONA)
@app.route('/api/services/<int:id>/', methods=['DELETE'])
def delete_service(id):
    service = Services.query.filter_by(id=id).first()
    if service is None:
        return jsonify({"msg":"el servicio no existe" }), 404
    db.session.delete(service)
    db.session.commit()
    return jsonify({"msg":"El servicio ha sido Eliminado"}), 200



# Endpoint para los FAVORITOS

#endpoint para OBTENER los FAVORITOS del CLIENTE
@app.route('/api/favorites/<int:client_id>', methods=['GET'])
def get_user_favorite(client_id):
    client = Client.query.get(client_id)
    if client is None:
        return jsonify({"msg": f"El id {client_id} del usuario no existe"}), 404
    favorites = [service.title for service in client.favorites]
    return jsonify({"msg": favorites})


#endpoint para AGREGAR un SERVICIO FAVORITO a un CLIEENTE por ID
@app.route('/api/favorite/<int:client_id>/<int:service_id>', methods=['POST'])
def add_favorite_service(client_id, service_id):
    client = Client.query.get(client_id)
    service = Services.query.get(service_id)

    if client and service:
        client.favorites.append(service)
        db.session.commit()
        return jsonify({"msg": f"Servicio {service.title} agregado a favoritos del cliente {client.name}"}), 201
    return jsonify({"msg": "Cliente o servicio no encontrado"}), 404

# Ruta para ELIMINAR un FAVORITO (FUNCIONA)
#@app.route('/api/favorite/<int:id>/client/<int:client_id>', methods=['DELETE'])
#def delete_service(id,client_id):
    service = Services.query.filter_by(id=id,client_id=client_id).first()
    if service is None:
        return jsonify({"msg":"el Favorito no existe" }), 404
    db.session.delete(service)
    db.session.commit()
    return jsonify({"msg":"El Favorito ha sido Eliminado"}), 200

# Endpoint para la VERIFICACION (FUNCIONA)

#endpoint para ENVIAR un EMAIL al USUARIO ()
@app.route('/api/send-mail', methods=['GET'])
def send_mail():
    try:
        msg = Message('Hola desde ServiExpert!',
                      sender="serviexpert.dev@gmail.com",
                      recipients=['josea.tovarp.blue7@gmail.com']) 
        msg.body = 'Este es un mensaje enviado desde ServiExpert.'
        mail.send(msg)
        return jsonify({'msg':'Correo enviado correctamente'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'msg':'no se pudo enviar el Correo!'}), 500

#endpoint para VERIFICAR un USUARIO () 
@app.route('/api/verify', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        email=get_jwt_identity()
        user=User.query.filter_by(email=email).first()
        if user.is_verified:
            return jsonify({'msg':'el Usuario ya se encuantra Verificado!'}), 400
        else:
            user.is_verified=True
            db.session.add(user)
            db.session.commit()
            return jsonify({'msg':'su cuenta ha sido verificada'}), 200
    except Exception as error:
        print(str(error))
        return jsonify({'msg':'ocurrio un error al verificar la cuenta'}), 500

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

