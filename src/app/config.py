"""Configuration settings for the HRMS SaaS application.

Loads values from environment variables with sensible defaults for
local development. In production you should set the following
environment variables:

- `SECRET_KEY`: JWT secret key
- `DATABASE_URL`: SQLite or Postgres connection string
- `TOKEN_EXPIRY_MINUTES`: JWT expiration time
"""
import os

class Config:
    # Core Flask config
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    # Database URL – default to local SQLite DB used by db.py
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///hrms.db')
    # JWT token expiry (minutes)
    TOKEN_EXPIRY_MINUTES = int(os.getenv('TOKEN_EXPIRY_MINUTES', '60'))
    # Enable CORS for all origins (adjust for production)
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
