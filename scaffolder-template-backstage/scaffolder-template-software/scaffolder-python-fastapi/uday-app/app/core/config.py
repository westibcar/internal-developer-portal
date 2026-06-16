from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    JWT_ALGORITHM: str
    JWT_EXPIRATION_TIME: int = 30

    class Config:
        env_file = ".env"

settings = Settings()