"""App.py reads in endpoints and does specified actions based on form informaiton"""
# IMPORT THE SQALCHEMY LIBRARY's CREATE_ENGINE METHOD
from uuid import UUID
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from sqlmodel import Field, Session, SQLModel, create_engine, select
from models import Model

app = FastAPI(title="PLU Asset Manager")


# DEFINE THE DATABASE CREDENTIALS
user = 'postgres'
password = 'postgres'
host = 'db'
database = 'postgres'

# PYTHON FUNCTION TO CONNECT TO THE POSTGRESQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT
def get_connection():
    return create_engine(
        url="postgresql+psycopg2://{0}:{1}@{2}:5432/{3}".format(
            user, password, host, database
        )
    )


engine = get_connection()

Session = sessionmaker(bind=engine)
session = Session()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/models") 
def get_all_models():
    return session.execute(select(Model)).all
   