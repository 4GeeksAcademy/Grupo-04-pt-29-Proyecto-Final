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


favorite_services = db.Table("favorite_services",
                             db.Column("client_id", db.Integer, db.ForeignKey('client.id'), primary_key=True),
                             db.Column("service_id", db.Integer, db.ForeignKey('services.id'), primary_key=True)
                             )
   
   


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
    name=db.Column(db.String(50),nullable=False)
    last_name=db.Column(db.String(50),nullable=False)
    phone=db.Column(db.Integer, unique=True, nullable=False)
    location=db.Column(db.String(50),nullable=False)
    url_image = db.Column(db.String(150), nullable=False)
    bio=db.Column(db.String(50),nullable=False)
    orders=db.relationship("Orders", backref="client", lazy=True)
    reviews=db.relationship("Reviews", backref="client", lazy=True, uselist=True)
    favorites = db.relationship("Services", secondary=favorite_services, back_populates="favorite_by")
    


    def __repr__(self):
        return f'Client {self.id}  {self.user_id}  {self.name} {self.last_name} {self.bio} {self.location} {self.url_image} {self.phone}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "first_name": self.first_name,
            "last_name":self.last_name,
            "bio":self.bio,
            "location":self.location,
            "url_image":self.url_image,
            "phone":self.phone,
            "reviews":[review.serialize() for review in self.reviews]

            # do not serialize the password, its a security breach
        }
        
    
class Providers(db.Model):
    __tablename__='providers'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user=db.relationship(User);
    name=db.Column(db.String(50), nullable=False)
    last_name=db.Column(db.String(50), nullable=False)
    identity_number=db.Column(db.Integer, unique=True,nullable=False)
    company=db.Column(db.String(50), nullable=False)
    number_company=db.Column(db.String(50), unique=True, nullable=False)
    phone=db.Column(db.Integer, unique=True, nullable=False)
    location=db.Column(db.String(50),nullable=False)
    profession=db.Column(db.String(50),nullable=False)
    experience=db.Column(db.Integer, nullable=False)
    valoration= db.Column(db.Integer, nullable=False)
    url_image=db.Column(db.String(200),nullable=True)
    reviews=db.relationship("Reviews", backref="providers", lazy=True, uselist=True)
    services=db.relationship("Services", backref="providers", lazy=True, uselist=True)
    orders=db.relationship("Orders", backref="providers", lazy=True, uselist=True)
    

     
    def __repr__(self):
        return f'Providers {self.user_id} {self.profession}  {self.location} {self.name} {self.last_name} {self.phone} {self.company} {self.number_company} {self.identity_number} {self.experience} {self.valoration}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "profession": self.profession,
            "location":self.location,
            "reviews":[review.serialize() for review in self.reviews],
            "services":[service.serialize() for service in self.services],
            "name":self.name,
            "last_name":self.last_name,
            "phone":self.phone,
            "number_company":self.number_company,
            "identity_number":self.identity_number,
            "experience":self.experience,
            "url_image":self.url_image,
            "valoration":self.valoration
            # do not serialize the password, its a security breach
        }  
    
class Services(db.Model):
    __tablename__='services'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20),nullable=True)
    provider_id=db.Column(db.Integer,db.ForeignKey('providers.id'),nullable=False)
    price=db.Column(db.Float, unique=True, nullable=False)
    description=db.Column(db.String(150),nullable=False)
    url_image = db.Column(db.String(100), nullable=False)
    category=db.Column(db.Enum(CategoryEnum),nullable=False)
    orders=db.relationship("Orders", backref="services", lazy=True, uselist=True)
    favorite_by = db.relationship("Client",secondary=favorite_services, back_populates="favorites")
    

    def serialize(self):
        return {
            "id": self.id,
            "provider_id": self.provider_id,
            "price": self.price,
            "description": self.description,
            "url_image": self.url_image,
            "category": self.category,
            "orders":[order.serialize() for order in self.orders]
            }
        
        
class Orders(db.Model):
    __tablename__='orders'
    id = db.Column(db.Integer, primary_key=True)
    providers_id=db.Column(db.Integer,db.ForeignKey('providers.id'),nullable=False)
    service_id=db.Column(db.Integer,db.ForeignKey('services.id'),nullable=False)
    client_id=db.Column(db.Integer,db.ForeignKey('client.id'),nullable=False)
    status=db.Column(db.String(50),nullable=False)
    order_date=db.Column(db.Date, unique=False, nullable=False)
    completion_date=db.Column(db.Date, unique=False, nullable=False)
    reviews=db.relationship("Reviews", backref="orders", lazy=True)


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

class Reviews(db.Model):
    __tablename__='reviews'
    id = db.Column(db.Integer, primary_key=True)
    rating=db.Column(db.Integer,nullable=False)
    comment=db.Column(db.String(50),nullable=False)
    created_at=db.Column(db.Date, unique=False, nullable=False)
    order_id=db.Column(db.Integer,db.ForeignKey('orders.id'),nullable=False)
    client_id=db.Column(db.Integer,db.ForeignKey('client.id'),nullable=False)
    provider_id=db.Column(db.Integer,db.ForeignKey('providers.id'),nullable=False)

    def __repr__(self):
        return f'Reviews {self.id}  {self.order_id}  {self.rating} {self.comment} {self.created_at}'

    def serialize(self):
        return {
            "id": self.id,
            "order_id":self.order_id,
            "rating": self.rating,
            "comment":self.comment,
            "created_at":self.created_at          
            # do not serialize the password, its a security breach
        }
        




    