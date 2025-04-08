import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale("pt-br");

export function formatDate(date: Date) {
  return dayjs(date).utc().local().format("LLL");
}
