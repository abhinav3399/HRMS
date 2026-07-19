"""SQLAlchemy ORM models for the HRMS SaaS application.

These models map directly to the tables defined in `schema.sql`.
They are used by the service layer to perform CRUD operations.
"""

from .extensions import db


class Employee(db.Model):
    __tablename__ = "employees"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String)
    dept = db.Column(db.String)
    mobile = db.Column(db.String)
    date = db.Column(db.String)
    status = db.Column(db.String)
    period = db.Column(db.String)
    endDate = db.Column(db.String)
    salary = db.Column(db.String)
    payStatus = db.Column(db.String)
    leaveType = db.Column(db.String)
    leaveStart = db.Column(db.String)
    leaveEnd = db.Column(db.String)
    leaveStatus = db.Column(db.String)
    storage = db.Column(db.Integer, default=0)
    lastModified = db.Column(db.String)
    avatar = db.Column(db.String)


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String, nullable=False)
    day = db.Column(db.Integer)
    start = db.Column(db.Float)
    end = db.Column(db.Float)
    label = db.Column(db.String)
    color = db.Column(db.String)


class Integration(db.Model):
    __tablename__ = "integrations"
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    desc = db.Column(db.String)
    active = db.Column(db.Boolean)
    icon = db.Column(db.String)


class Settings(db.Model):
    __tablename__ = "settings"
    # Single row table – using a dummy primary key
    id = db.Column(db.Integer, primary_key=True, default=1)
    email = db.Column(db.String)
    country = db.Column(db.String)
    language = db.Column(db.String)
    timezone = db.Column(db.String)
    timeformat = db.Column(db.String)
    website = db.Column(db.String)
    bio = db.Column(db.String)
    theme = db.Column(db.String)
    profileName = db.Column(db.String)
    profileTitle = db.Column(db.String)
    profilePhone = db.Column(db.String)
    profileEmail = db.Column(db.String)
    profileAddress = db.Column(db.String)
    profileBio = db.Column(db.String)
    profileAvatar = db.Column(db.String)
