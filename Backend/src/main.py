"""App.py reads in endpoints and does specified actions based on form informaiton"""
# IMPORT THE SQALCHEMY LIBRARY's CREATE_ENGINE METHOD
from uuid import UUID
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from sqlmodel import Field, Session, SQLModel, create_engine, select
from models import Model
from fastapi.middleware.cors import CORSMiddleware
from models import Location
from models import Department

app = FastAPI(title="PLU Asset Manager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change to ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DEFINE THE DATABASE CREDENTIALS
user = 'postgres'
password = 'postgres'
host = 'db'
database = 'postgres'
port = '5432'


engine = create_engine( 
            url="postgresql://{0}:{1}@{2}:{3}/{4}".format(
            user, password, host, port, database))


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

#gets all the models in the db
@app.get("/models") 
def get_all_models():
    with Session(engine) as session: 
        return session.exec(select(Model)).all()
    
#gets all the models with the same UUID as model_id
@app.get("/models/{model_id}")
def get_model_id(model_id: UUID):
    with Session(engine) as session: 
        return session.exec(select(Model).where(Model.id == model_id)).all()
    
#gets all the locations with the same UUID as location_id
@app.get("/locations/{location_id}")
def get_location_id(location_id: UUID):
    with Session(engine) as session:
        return session.exec(select(Location).where(Location.id == location_id)).all()
    
#gets all the departments with the same UUID as department_id
@app.get("/departments/{department_id}")
def get_department_id(department_id: UUID):
    with Session(engine) as session:
        return session.exec(select(Department).where(Department.id == department_id)).all()