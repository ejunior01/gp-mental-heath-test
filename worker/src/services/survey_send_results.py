from typing import Any, Hashable

import httpx
from log import logger


def survey_send_result(survey_id: str, data: list[dict[Hashable, Any]]):
    logger.debug("Enviando resultados para o backend")

    r = httpx.post(
        f"http://localhost:3001/survey-report/{survey_id}/results", data=data,)

    logger.debug(f"Resposta enviada do backend: {r.content}")
