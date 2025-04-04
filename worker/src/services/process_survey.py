
from pathlib import Path
from typing import Any, Hashable

import pandas as pd


def validate_filepath(filepath: str) -> Path:
    accepted_file_types = [".csv"]

    file = Path(filepath)

    if not file.exists():
        raise FileNotFoundError(f"Arquivo: {filepath} não localizado.")

    if file.suffix not in accepted_file_types:
        raise ValueError(
            f"Formato de arquivo não suportado. São aceitos apenas arquivos: {accepted_file_types}")

    return file


def process_survey_file(id: str, filepath: str) -> list[dict[Hashable, Any]]:
    output_dir = "pesquisas/processadas"

    expected_columns = ["codigo_pesquisa", "nota_1", "nota_2"]

    file = validate_filepath(filepath)

    df = pd.read_csv(file)

    diff_columns = set(df.columns[0]) & set(expected_columns)

    if len(diff_columns) != 0:
        raise ValueError(
            f"Era esperado as colunas: {expected_columns}, porém o arquivo foi enviado com contendo as colunas: {df.columns[0]}")

    df["nota_pesquisa"] = (df["nota_1"] + df["nota_2"]) / 2

    output = Path(output_dir)

    if not output.exists():
        output.mkdir(parents=True)

    filename = f"{id}-{file.name}"
    filepath_output = output + filename

    df.to_csv(filepath_output, index=False)

    return df.to_dict("records")
