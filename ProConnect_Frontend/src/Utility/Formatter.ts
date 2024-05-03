import { format } from "date-fns";

export function formatDateString(dateString?: string) : string{
    if(dateString == undefined) return "Undefined Date";
    var date = new Date(dateString);
    var formattedDate = format(date, "yyyy-MM-d H:mma");
    return formattedDate;
}
export function formatDate(date: Date) : string{
    var formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate;
}

export function yearsFromDate(date: string) : number {
    const currentDate = new Date();

    const pastDate = dateFromString_dd_MM_yyyy(date);

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Number of milliseconds in a year (accounting for leap years)
    let yearsDifference = (currentDate.getTime() - pastDate.getTime()) / millisecondsPerYear;

    // Round to nearest 0.5
    yearsDifference = Math.round(yearsDifference * 2) / 2;
    return yearsDifference;
}

export function dateFromString_dd_MM_yyyy(date: string) {
    const [day, month, year] = date.split('-').map(Number);
    const pastDate = new Date(year, month - 1, day);
    return pastDate;
}
