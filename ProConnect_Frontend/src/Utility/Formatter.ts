import { format } from "date-fns";

export function formatDateString(dateString: string) : string{
    var date = new Date(dateString);
    var formattedDate = format(date, "yyyy-MM-d H:mma");
    return formattedDate;
}