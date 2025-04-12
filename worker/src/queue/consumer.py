from typing import Callable

import pika
from log import logger
from pika import BlockingConnection
from settings import settings


class SurveyRabbitmqConsumer:
    def __init__(self, callback: Callable):
        self.__host: str = settings.Rabbitmq.host
        self.__port: int = settings.Rabbitmq.port
        self.__username: str = settings.Rabbitmq.username
        self.__password: str = settings.Rabbitmq.password
        self.__queue: str = settings.Rabbitmq.queue
        self.__callback: Callable = callback

    def __open_connection(self):
        connection_parameters = pika.ConnectionParameters(
            host=self.__host,
            port=self.__port,
            credentials=pika.PlainCredentials(
                username=self.__username, password=self.__password
            ),
        )

        connection = pika.BlockingConnection(connection_parameters)
        logger.debug(
            f"Iniciando conexão com o RabbitMq em host: {self.__host}")
        return connection

    def __create_channel(self, connection: BlockingConnection):
        channel = connection.channel()

        channel.queue_declare(
            queue=self.__queue,
            durable=True,
        )
        channel.basic_consume(
            queue=self.__queue, auto_ack=True, on_message_callback=self.__callback
        )

        return channel

    def start(self):
        connection = self.__open_connection()
        channel = self.__create_channel(connection)

        try:
            logger.debug(
                f"Iniciando o consumo de mensagem da fila: {self.__queue}")
            channel.start_consuming()
        except KeyboardInterrupt:
            logger.debug(
                f"Parando de consumir mensagens da fila: {self.__queue}")
            channel.stop_consuming()
        finally:
            logger.debug(
                f"Encerrando a conexão com o RabbitMq no host: {self.__host}")
            connection.close()
