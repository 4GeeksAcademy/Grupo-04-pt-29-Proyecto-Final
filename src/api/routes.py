"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, UserProfiles,Orders,Providers,Reviews,RoleEnum
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Sign Up o Registro

@api.route('/signup', methods=["POST"])
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
    
    password_hash= current_app.bcrypt.generate_password_hash(body["password"]).decode("utf-8")

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

@api.route('/login', methods=["POST"])
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
    
    correct_password = current_app.bcrypt.check_password_hash(user.password, body['password'])
    if correct_password is False:
        return jsonify ({'msg':'Datos de acceso inválidos. Por favor, verifique e intente nuevamente.'}), 400
    if True :
        access_token = create_access_token(identity=user.email)
    return jsonify ({'msg': 'Ha iniciado sesión correctamente', 'access_token':access_token}), 200