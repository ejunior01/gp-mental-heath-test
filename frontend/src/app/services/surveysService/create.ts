import { httpClient } from "../httpClient";

export interface RegisterSurveyParams {
    code: string;
    noteOne: number;
    noteTwo: number;
}

export async function create(params: RegisterSurveyParams) {
   const { data } = await httpClient.post("/survey", params);
  return data;
}