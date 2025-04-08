import { ApiEndpoints, httpClient } from "@/app/services/httpClient";

import { UploadSurvey } from "@/app/entities/upload-survey";

export async function get(id: number) {
  const { data } = await httpClient.get<UploadSurvey>(
    `/${ApiEndpoints.uploadSurveyApiEndpoint}/$${id}`
  );

  return data;
}
