import { httpClient } from "../httpClient";

export interface UpdateSurveyParams {
  code: string;
  noteOne: number;
  noteTwo: number;
}

export async function update(surveyUpdate: UpdateSurveyParams) {
  const { data } = await httpClient.put(
    `/survey/${surveyUpdate.code}`,
    surveyUpdate
  );
  return data;
}
