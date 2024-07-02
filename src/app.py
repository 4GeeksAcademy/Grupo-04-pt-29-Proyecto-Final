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

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")  # Change this!
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
