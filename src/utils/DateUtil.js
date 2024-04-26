export class DateUtil extends Date {

  static extractYearMonthDay = (date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  static convertMsToMMSS = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  static toDate = (seconds) => {
    return new Date(seconds * 1000);
  }

  static toIsoString = (date) => {
    return date.toISOString();
  }
  
}