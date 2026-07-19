from flask import Blueprint

api_bp = Blueprint('api', __name__, url_prefix='/api')

from .auth import auth_bp
from .employees import employees_bp
from .events import events_bp
from .integrations import integrations_bp
from .settings import settings_bp

api_bp.register_blueprint(auth_bp)
api_bp.register_blueprint(employees_bp, url_prefix='/employees')
api_bp.register_blueprint(events_bp, url_prefix='/events')
api_bp.register_blueprint(integrations_bp, url_prefix='/integrations')
api_bp.register_blueprint(settings_bp, url_prefix='/settings')
