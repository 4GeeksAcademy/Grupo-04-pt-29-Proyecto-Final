from flask_sqlalchemy import SQLAlchemy
import enum
from datetime import date

db = SQLAlchemy()

class RoleEnum(str,enum.Enum):
    CLIENT= "Client"
    PROVIDER = "Provider"
    
class CategoryEnum(str,enum.Enum):
    PLOMERIA = "Plomería"
    ELECTRICIDAD = "Electricidad"
    ALBAÑILERIA = "Albañilería"
    CARPINTERIA = "Carpintería"
    PINTURA_Y_DECORACION = "Pintura y Decoración"
    TECHOS_Y_ESTRUCTURAS = "Techos y Estructuras"
    REFORMAS_DE_INTERIORES = "Reformas de Interiores"
    JARDINERIA_Y_PAISAJISMO = "Jardinería y Paisajismo"
    LIMPIEZA_Y_MANTENIMIENTO = "Limpieza y Mantenimiento"
    REPARACIONES_GENERALES = "Reparaciones Generales"
    SISTEMAS_DE_SEGURIDAD = "Sistemas de Seguridad"
    REFORMAS_INTEGRALES = "Reformas Integrales"



class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(50),unique=True,nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role=db.Column(db.Enum(RoleEnum),nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    create_at=db.Column(db.Date, unique=False, nullable=False, default=date.today) 
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
 
    def __repr__(self):
        return f'User {self.id}  {self.username} {self.email} {self.role} {self.create_at} {self.is_active}'

    def serialize(self):
        return {
            "id": self.id,
            "username":self.username,
            "email": self.email,
            "role":self.role,
            "create_at":self.create_at,
            "is_active":self.is_active            
            # do not serialize the password, its a security breach
        }
        

class Client(db.Model):
    __tablename__='client'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user=db.relationship(User);
    name=db.Column(db.String(30),nullable=False)
    last_name=db.Column(db.String(30),nullable=False)
    phone=db.Column(db.String(20), unique=True, nullable=False)
    location=db.Column(db.String(30),nullable=False)
    url_image = db.Column(db.String(200), nullable=False)
    bio=db.Column(db.String(500),nullable=False)
    orders=db.relationship("Orders", backref="client", lazy=True)
    reviews=db.relationship("Reviews", backref="client", lazy=True, uselist=True)
    order_favorite=db.relationship("OrderFavorite", backref="client", lazy=True)



    def __repr__(self):
        return f'Client {self.id}  {self.user_id}  {self.name} {self.last_name} {self.phone} {self.location} {self.bio} {self.url_image}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "name": self.name,
            "last_name":self.last_name,
            "phone":self.phone,
            "location":self.location,
            "url_image":self.url_image,
            "bio":self.bio,
            "reviews":[review.serialize() for review in self.reviews]

            # do not serialize the password, its a security breach
        }
        
    
class Providers(db.Model):
    __tablename__='providers'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user=db.relationship(User);
    name=db.Column(db.String(30), nullable=False)
    last_name=db.Column(db.String(30), nullable=False)
    identity_number=db.Column(db.String(20), unique=True,nullable=False)
    company=db.Column(db.String(30), nullable=False)
    number_company=db.Column(db.String(20), unique=True, nullable=False)
    phone=db.Column(db.String(20), unique=True, nullable=False)
    location=db.Column(db.String(30),nullable=False)
    profession=db.Column(db.String(30),nullable=False)
    experience=db.Column(db.Integer, nullable=False)
    valoration= db.Column(db.Integer, nullable=True)
    url_image=db.Column(db.String(200),nullable=True)
    description=db.Column(db.String(500),nullable=True)
    reviews=db.relationship("Reviews", backref="providers", lazy=True, uselist=True)
    services=db.relationship("Services", backref="providers", lazy=True, uselist=True)
    orders=db.relationship("Orders", backref="providers", lazy=True, uselist=True)
     
    def __repr__(self):
        return f'Providers {self.user_id} {self.name} {self.last_name} {self.identity_number} {self.company} {self.number_company} {self.phone} {self.location} {self.profession} {self.experience} {self.valoration} {self.url_image} {self.description}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "name":self.name,
            "last_name":self.last_name,
            "identity_number":self.identity_number,
            "company":self.company,
            "number_company":self.number_company,
            "phone":self.phone,
            "location":self.location,
            "profession": self.profession,
            "experience":self.experience,
            "url_image":self.url_image,
            "reviews":[review.serialize() for review in self.reviews],
            "services":[service.serialize() for service in self.services],
            "description":self.description,
            # do not serialize the password, its a security breach
        }  
    
class Services(db.Model):
    __tablename__='services'
    id = db.Column(db.Integer, primary_key=True)
    provider_id=db.Column(db.Integer,db.ForeignKey('providers.id'),nullable=False)
    title=db.Column(db.String(20),nullable=True)
    price=db.Column(db.Float, unique=True, nullable=False)
    description=db.Column(db.String(150),nullable=False)
    url_image = db.Column(db.String(200), nullable=False)
    category=db.Column(db.Enum(CategoryEnum),nullable=False)
    orders=db.relationship("Orders", backref="services", lazy=True, uselist=True)
    reviews=db.relationship("Reviews", backref="services", lazy=True)

    def __repr__(self):
        return f'Providers {self.provider_id} {self.title} {self.category} {self.price} {self.description} {self.url_image}'

    def serialize(self):
        return {
            "id": self.id,
            "provider_id": self.provider_id,
            "title": self.title,
            "category": self.category,
            "price": self.price,
            "description": self.description,
            "url_image": self.url_image,
            "orders":[order.serialize() for order in self.orders]
            }
        
        
class Orders(db.Model):
    __tablename__='orders'
    id = db.Column(db.Integer, primary_key=True)
    providers_id=db.Column(db.Integer,db.ForeignKey('providers.id'),nullable=False)
    service_id=db.Column(db.Integer,db.ForeignKey('services.id'),nullable=False)
    client_id=db.Column(db.Integer,db.ForeignKey('client.id'),nullable=False)
    status=db.Column(db.String(30),nullable=False)
    order_date=db.Column(db.Date, unique=False, nullable=False)
    completion_date=db.Column(db.Date, unique=False, nullable=False)
    order_favorite=db.relationship("OrderFavorite", backref="orders", lazy=True)


    def __repr__(self):
        return f'Orders {self.id} {self.providers_id} {self.client_id} {self.status} {self.order_date} {self.completion_date}'

    def serialize(self):
        return {
            "id": self.id,
            "providers_id":self.providers_id,
            "client_id": self.client_id,
            "status":self.status,
            "order_date":self.order_date,
            "completion_date":self.completion_date             
            # do not serialize the password, its a security breach
        } 

class OrderFavorite(db.Model):
    __tablename__='order_favorite'
    id = db.Column(db.Integer, primary_key=True)
    order_id=db.Column(db.Integer,db.ForeignKey('orders.id'),nullable=False)
    client_id=db.Column(db.Integer,db.ForeignKey('client.id'),nullable=False)
    
    def __repr__(self):
        return f'OrderFavorite {self.id}  {self.order_id}  {self.client_id}'

    def serialize(self):
        order = Orders.query.get(self.order_id)
        # client = Client.query.get(self.client_id)
        return {
            "id": self.id,
            "order":order.serialize(),
            # "client":client.serialize(),
        }


class Reviews(db.Model):
    __tablename__='reviews'
    id = db.Column(db.Integer, primary_key=True)
    rating=db.Column(db.Integer,nullable=False)
    comment=db.Column(db.String(500),nullable=False)
    created_at=db.Column(db.Date, unique=False, nullable=False)
    services_id=db.Column(db.Integer,db.ForeignKey('services.id'),nullable=False)
    client_id=db.Column(db.Integer,db.ForeignKey('client.id'),nullable=False)
    provider_id=db.Column(db.Integer,db.ForeignKey('providers.id'),nullable=False)

    def __repr__(self):
        return f'Reviews {self.id}  {self.services_id}  {self.rating} {self.comment} {self.created_at}'

    def serialize(self):
        return {
            "id": self.id,
            "services_id":self.services_id,
            "rating": self.rating,
            "comment":self.comment,
            "created_at":self.created_at          
            # do not serialize the password, its a security breach
        }
        

