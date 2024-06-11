from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String,unique=True,nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role=db.Column(db.String(50),nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    create_at=db.Column(db.Date, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'User {self.username} {self.email} {self.role} {self.create_at} {self.is_active}'

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
    first_name=db.Column(db.String,nullable=False)
    last_name=db.Column(db.String,nullable=False)
    bio=db.Column(db.String(50),nullable=False)
    location=db.Column(db.String(50),nullable=False)
    profile_picture=db.Column(db.String(150),nullable=False)

    def __repr__(self):
        return f'User {self.first_name} {self.last_name} {self.bio} {self.location} {self.profile_picture}'

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