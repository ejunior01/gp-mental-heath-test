import { httpClient } from "../httpClient";

export async function remove(code: string) {
  await httpClient.delete(
    `/survey/${code}`
  );
}
