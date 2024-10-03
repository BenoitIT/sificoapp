export function formatDate(dateStr:string) {
    const date = new Date(dateStr);

    const day = String(date.getUTCDate()).padStart(2, '0');

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.getUTCMonth()];

    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

