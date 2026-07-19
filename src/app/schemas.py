"""Marshmallow schemas for serializing and deserializing HRMS models.
"""

from marshmallow import Schema, fields

class EmployeeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    role = fields.Str()
    dept = fields.Str()
    mobile = fields.Str()
    date = fields.Str()
    status = fields.Str()
    period = fields.Str()
    endDate = fields.Str()
    salary = fields.Str()
    payStatus = fields.Str()
    leaveType = fields.Str()
    leaveStart = fields.Str()
    leaveEnd = fields.Str()
    leaveStatus = fields.Str()
    storage = fields.Int()
    lastModified = fields.Str()
    avatar = fields.Str()

class EventSchema(Schema):
    id = fields.Str(dump_only=True)
    title = fields.Str(required=True)
    day = fields.Int()
    start = fields.Float()
    end = fields.Float()
    label = fields.Str()
    color = fields.Str()

class IntegrationSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    desc = fields.Str()
    active = fields.Bool()
    icon = fields.Str()

class SettingsSchema(Schema):
    email = fields.Str()
    country = fields.Str()
    language = fields.Str()
    timezone = fields.Str()
    timeformat = fields.Str()
    website = fields.Str()
    bio = fields.Str()
    theme = fields.Str()
    profileName = fields.Str()
    profileTitle = fields.Str()
    profilePhone = fields.Str()
    profileEmail = fields.Str()
    profileAddress = fields.Str()
    profileBio = fields.Str()
    profileAvatar = fields.Str()
