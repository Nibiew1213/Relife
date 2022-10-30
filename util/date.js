export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10)
    // return `${date.getFullYear()}-${date.getMonth() +1 }-${date.getDate()}`;
}