import time
from sqlalchemy import text
from app.core.database import SessionLocal

def wait_for_db(max_retries=30, interval=1):
    """Espera até que o banco de dados esteja disponível"""
    retries = 0
    while retries < max_retries:
        try:
            db = SessionLocal()
            # Testa a conexão
            db.execute(text("SELECT 1"))
            db.close()
            print("Database connection successful!")
            return
        except Exception as e:
            print(f"Database not ready yet. Retrying... ({retries}/{max_retries})")
            retries += 1
            time.sleep(interval)
    
    raise Exception("Could not connect to the database")