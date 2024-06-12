from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(50),unique=True,nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role=db.Column(db.String(50),nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    create_at=db.Column(db.Date, unique=False, nullable=False)
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
        

class UserProfiles(db.Model):
    __tablename__='user_profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user=db.relationship(User);
    first_name=db.Column(db.String(50),nullable=False)
    last_name=db.Column(db.String(50),nullable=False)
    bio=db.Column(db.String(50),nullable=False)
    location=db.Column(db.String(50),nullable=False)
    profile_picture=db.Column(db.String(150),nullable=False)

    def __repr__(self):
        return f'User {self.id}  {self.user_id}  {self.first_name} {self.last_name} {self.bio} {self.location} {self.profile_picture}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "first_name": self.first_name,
            "last_name":self.last_name,
            "bio":self.bio,
            "location":self.location,
            "profile_picture":self.profile_picture             
            # do not serialize the password, its a security breach
        }
        
    
class Providers(db.Model):
    __tablename__='providers'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user=db.relationship(User);
    profession=db.Column(db.String(50),nullable=False)
    description=db.Column(db.String(150),nullable=False)
    price=db.Column(db.Integer,nullable=False)
    category=db.Column(db.String(50),nullable=False)
    create_at=db.Column(db.Date, unique=False, nullable=False)

    def __repr__(self):
        return f'User {self.user_id} {self.profession} {self.description} {self.price} {self.category} {self.create_at}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "profession": self.profession,
            "description":self.description,
            "price":self.price,
            "category":self.category,
            "create_at":self.create_at             
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
        return f'User {self.id} {self.providers_id} {self.client_id} {self.status} {self.order_date} {self.completion_date}'

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
        return f'User {self.id}  {self.order_id}  {self.rating} {self.comment} {self.created_at}'

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
        

