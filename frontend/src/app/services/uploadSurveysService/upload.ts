import { ApiEndpoints, httpClient } from "../httpClient";

export interface UplaodSurveyForm {
  file: File;
}

export async function upload(params: UplaodSurveyForm) {
  const formData = new FormData();
  formData.append("file", params.file);

  const { data } = await httpClient.post(
    `${ApiEndpoints.uploadSurveyApiEndpoint}`,
    formData
  );

  return data;
}
