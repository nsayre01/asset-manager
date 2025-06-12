from typing import Optional, List
import uuid
from uuid import UUID
from datetime import date, datetime
from sqlmodel import SQLModel, Field, Relationship


class Location(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    building_code: str
    building_name: str
    room_number: str

    # reverse relationship
    asset_logs: List["AssetLog"] = Relationship(back_populates="location")


class Department(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(unique=True)

    clients: List["Client"] = Relationship(back_populates="department")
    asset_logs: List["AssetLog"] = Relationship(back_populates="department")


class Model(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    brand: Optional[str] = None
    name: str = Field(unique=True)
    small_form: Optional[bool] = None
    type: str  # Enforced via CHECK constraint in DB

    assets: List["AssetInfo"] = Relationship(back_populates="model")


class Client(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    first_name: str
    last_name: str
    username: str = Field(unique=True)
    dept_id: Optional[UUID] = Field(default=None, foreign_key="department.id")
    active: bool = True

    department: Optional[Department] = Relationship(back_populates="clients")
    asset_logs: List["AssetLog"] = Relationship(back_populates="assigned_to")


class Technician(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    first_name: str
    last_name: str
    username: str = Field(unique=True)
    active: bool = True

    created_assets: List["AssetInfo"] = Relationship(back_populates="created_by_user")
    updated_logs: List["AssetLog"] = Relationship(back_populates="updated_by_user")


class AssetInfo(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(unique=True)
    serial_number: str = Field(unique=True)
    purchase_date: date
    warranty_expiration: Optional[date] = None
    model_id: UUID = Field(foreign_key="model.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: UUID = Field(foreign_key="technician.id")

    model: Model = Relationship(back_populates="assets")
    created_by_user: Technician = Relationship(back_populates="created_assets")
    asset_logs: List["AssetLog"] = Relationship(back_populates="asset")


class AssetLog(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    asset_id: UUID = Field(foreign_key="assetinfo.id")
    status: Optional[str] = None
    location_id: Optional[UUID] = Field(default=None, foreign_key="location.id")
    assigned_to_id: Optional[UUID] = Field(default=None, foreign_key="client.id")
    dept_id: Optional[UUID] = Field(default=None, foreign_key="department.id")
    docking_station: Optional[bool] = None
    is_primary: Optional[bool] = None
    redeploy: Optional[bool] = None
    notes: Optional[str] = None
    last_audit: Optional[date] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    updated_by: UUID = Field(foreign_key="technician.id")

    asset: AssetInfo = Relationship(back_populates="asset_logs")
    location: Optional[Location] = Relationship(back_populates="asset_logs")
    assigned_to: Optional[Client] = Relationship(back_populates="asset_logs")
    department: Optional[Department] = Relationship(back_populates="asset_logs")
    updated_by_user: Technician = Relationship(back_populates="updated_logs")
