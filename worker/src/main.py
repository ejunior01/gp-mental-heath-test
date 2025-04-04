import sys
from queue.callback import survey_callback_delivery
from queue.consumer import SurveyRabbitmqConsumer

from log import logger


def main():
    queue = SurveyRabbitmqConsumer(survey_callback_delivery)
    queue.start()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        logger.debug("Aplicação interrompida")
        sys.exit(0)
