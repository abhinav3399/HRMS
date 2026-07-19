"""Register API blueprints for the HRMS SaaS app."""

from flask import Blueprint

api_bp = Blueprint("api", __name__, url_prefix="/api")

# Import route modules to register their endpoints with the blueprint
from .auth import *  # noqa: F401,F403
from .employees import *  # noqa: F401,F403
from .events import *  # noqa: F401,F403
from .integrations import *  # noqa: F401,F403
from .settings import *  # noqa: F401,F403
