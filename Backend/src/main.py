"""App.py reads in endpoints and does specified actions based on form informaiton"""
# IMPORT THE SQALCHEMY LIBRARY's CREATE_ENGINE METHOD
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from sqlmodel import Field, Session, SQLModel, create_engine, select

app = FastAPI(title="PLU Asset Manager")



class Ticket(SQLModel, table=True):
    ticket_num: str = Field(primary_key=True)
    start_date: date
    end_date: date
    room_num: str
    building: int
    technician_id: int
    client_name: str
    description: str


# DEFINE THE DATABASE CREDENTIALS
user = 'postgres'
password = 'postgres'
host = 'db'
database = 'postgres'

# PYTHON FUNCTION TO CONNECT TO THE POSTGRESQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT
def get_connection():
    return create_engine(
        url="postgresql://{0}:{1}@{2}/{3}".format(
            user, password, host, database
        )
    )


engine = get_connection()

Session = sessionmaker(bind=engine)
session = Session()


@app.get("/ticket/{ticketID}")
async def root(ticketID: str):
    print(ticketID)
    statement = select(Ticket)
    ticket = session.execute(statement).all
    return {"ticket": ticket}

@app.get("/newticket/")
async def read_item(ticket: Ticket):
    return ticket

   