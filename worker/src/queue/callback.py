import json

from log import logger
from services.process_survey import process_survey_file
from services.survey_send_results import survey_send_result


def survey_callback_delivery(channel, method, header, body):
    try:
        logger.debug(f"Mensagem recebida da fila: {body}")

        data = json.loads(body)
        if "id" in data and "filepath" in data:
            survey_result = process_survey_file(data["id"], data["filepath"])
            survey_send_result(data["id"], survey_result)

    except Exception as err:
        logger.error(err)
