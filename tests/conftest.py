import pytest
from server import app as flask_app
import db

@pytest.fixture(scope='function')
def client():
    # Use an in‑memory SQLite DB for isolation
    db.DB_PATH = ':memory:'
    db.init_db()
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client
