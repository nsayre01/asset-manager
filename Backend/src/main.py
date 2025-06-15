"""App.py reads in endpoints and does specified actions based on form informaiton"""
# IMPORT THE SQALCHEMY LIBRARY's CREATE_ENGINE METHOD
from uuid import UUID
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from sqlmodel import Field, Session, SQLModel, create_engine, select
from models import Model
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/models") 
def get_all_models():
    with Session(engine) as session: 
        return session.exec(select(Model)).all()
    
@app.get("/models/{model_id}")
def get_model_id(model_id: UUID):
    with Session(engine) as session: 
        return session.exec(select(Model).where(Model.id == model_id)).all()