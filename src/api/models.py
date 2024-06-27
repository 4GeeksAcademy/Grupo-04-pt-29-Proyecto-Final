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
    __tablename__='Client'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user=db.relationship(User);
    name=db.Column(db.String(50),nullable=False)
    last_name=db.Column(db.String(50),nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone=db.Column(db.Integer, unique=True, nullable=False)
    location=db.Column(db.String(50),nullable=False)
    url_image = db.Column(db.String(150), nullable=False)
    bio=db.Column(db.String(50),nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    


    def __repr__(self):
        return f'client {self.id} {self.user_id} {self.name} {self.last_name} 
        {self.email}
        {self.phone}
        {self.location}
        {self.url_image} 
        {self.bio}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "name": self.name,
            "last_name":self.last_name,
            "location":self.location,
            "url_image":self.url_image,
            "email":self.email,
            "phone":self.phone,
            "url_image":self.url_image,
            "bio":self.bio,
            # do not serialize the password, its a security breach
        }
        
    
class Providers(db.Model):
    __tablename__='Providers'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user=db.relationship(User);
    name=db.Column(db.String(50), nullable=False)
    last_name=db.Column(db.String(50), nullable=False)
    identity_number=db.Column(db.Integer, unique=True,nullable=False)
    company=db.Column(db.String(50), nullable=False)
    number_company=db.Column(db.String(50), unique=True, nullable=False)
    email=db.Column(db.String(50),unique=True, nullable=False)
    phone=db.Column(db.Integer, unique=True, nullable=False)
    location=db.Column(db.String(50),nullable=False)
    category=db.Column(db.Enum(CategoryEnum),nullable=False)
    profession=db.Column(db.String(50),nullable=False)
    experience=db.Column(db.Integer, nullable=False)
    price=db.Column(db.Integer, unique=True, nullable=False)
    description=db.Column(db.String(150),nullable=False)
    url_image = db.Column(db.String(100), nullable=False)
    valoration= db.Column(db.Integer, nullable=False)
    user_coments=db.Column(db.String(200),nullable=False)
    create_at=db.Column(db.Date, unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
     

    def __repr__(self):
        return f'providers  
        {self.user_id} 
        {self.name} 
        {self.last_name}
        {self.identity_number}
        {self.company} 
        {self.number_company}
        {self.email} 
        {self.phone} 
        {self.location} 
        {self.category} 
        {self.profession}
        {self.experience}
        {self.price} 
        {self.description} 
        {self.url_image}
        {self.user_coments} 
        {self.valoration}
        {self.create_at}'
        
    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "name":self.name,
            "last_name":self.last_name,
            "identity_number":self.identity_number,
            "company":self.company,
            "number_company":self.number_company,
            "email":self.email,
            "phone":self.phone,
            "location":self.location,
            "category":self.category,
            "profession": self.profession,
            "experience":self.experience,
            "price":self.price,
            "description":self.description,
            "url_image":self.url_image,
            "user_coments":self.user_coments,
            "valoration":self.valoration,
            "create_at":self.create_at,
            # do not serialize the password, its a security breach
        }  
        
        
class Orders(db.Model):
    __tablename__='orders'
    id = db.Column(db.Integer, primary_key=True)
    providers_id=db.Column(db.Integer,db.ForeignKey('providers.id'),nullable=False)
    providers=db.relationship(Providers);
    client_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    client=db.relationship(User)
    status=db.Column(db.String(50),nullable=False)
    order_date=db.Column(db.Date, unique=False, nullable=False)
    completion_date=db.Column(db.Date, unique=False, nullable=False)

    def __repr__(self):
        return f'Orders {self.id} {self.providers_id} {self.client_id} {self.status} {self.order_date} {self.completion_date}'

    def serialize(self):
        return {
            "id": self.id,
            "providers_id":self.providers_id,
            "client_id": self.client_id,
            "description":self.description,
            "status":self.status,
            "order_date":self.order_date,
            "completion_date":self.completion_date             
            # do not serialize the password, its a security breach
        } 

class Reviews(db.Model):
    __tablename__='reviews'
    id = db.Column(db.Integer, primary_key=True)
    order_id=db.Column(db.Integer,db.ForeignKey('orders.id'),nullable=False)
    order=db.relationship(Orders);
    rating=db.Column(db.String(50),nullable=False)
    comment=db.Column(db.String(50),nullable=False)
    created_at=db.Column(db.Date, unique=False, nullable=False)

    def __repr__(self):
        return f'Reviews {self.id}  {self.order_id}  {self.rating} {self.comment} {self.created_at}'

    def serialize(self):
        return {
            "id": self.id,
            "order_id":self.order_id,
            "rating": self.rating,
            "last_name":self.last_name,
            "comment":self.comment,
            "created_at":self.created_at          
            # do not serialize the password, its a security breach
        }
        

