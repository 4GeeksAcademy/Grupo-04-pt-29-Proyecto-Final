"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Client,Orders,Providers,Reviews,RoleEnum,OrderFavorite
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

@api.route('/client/<int:client_id>/favorites', methods=["GET"])
def client_favorites(client_id):

    favorites = OrderFavorite.query.filter_by(client_id=client_id).all()
    if len(favorites) == 0:
        raise APIException('El cliente aún no tiene favoritos', status_code=404)
    favorites = list(map(lambda item: item.serialize(), favorites))
        
    return jsonify (favorites), 200


