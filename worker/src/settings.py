
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class RabbitMqSettings(BaseModel):
    host: str
    port: int
    username: str
    password: str
    queue: str


class Settings(BaseSettings):

    Rabbitmq: RabbitMqSettings

    model_config = SettingsConfigDict(
        env_nested_delimiter='_',
    )


settings = Settings()
