import logging
import logging.config

logging.config.fileConfig('logging.ini', disable_existing_loggers=True)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
