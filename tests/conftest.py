import sys, os
import tempfile
import shutil

# Ensure project root is on PYTHONPATH for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from src.app import create_app
import src.app.db as db

@pytest.fixture(scope="function")
def client():
    # Create a temporary directory for the SQLite DB file
    temp_dir = tempfile.mkdtemp()
    db_path = os.path.join(temp_dir, "test.db")
    db.DB_PATH = db_path
    # Initialize database (creates tables)
    
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    
    # Init db requires app context in the factory sometimes, but our init_db is manual
    with flask_app.app_context():
        db.init_db()
        
    with flask_app.test_client() as client:
        yield client
    # Cleanup temporary directory after test
    shutil.rmtree(temp_dir, ignore_errors=True)
