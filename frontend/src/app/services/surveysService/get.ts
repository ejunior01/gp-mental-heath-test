
import { Survey } from "@/app/entities/survey";
import { httpClient } from "@/app/services/httpClient";


export async function get(code: string) {
  const { data: survey } = await httpClient.get<Survey>(`/survey/${code}`);

  return survey;
}
