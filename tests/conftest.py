import sys, os
import tempfile
import shutil

# Ensure project root is on PYTHONPATH for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from server import app as flask_app
import db


@pytest.fixture(scope="function")
def client():
    # Create a temporary directory for the SQLite DB file
    temp_dir = tempfile.mkdtemp()
    db_path = os.path.join(temp_dir, "test.db")
    db.DB_PATH = db_path
    # Initialize database (creates tables)
    db.init_db()
    flask_app.config["TESTING"] = True
    with flask_app.test_client() as client:
        yield client
    # Cleanup temporary directory after test
    shutil.rmtree(temp_dir, ignore_errors=True)
