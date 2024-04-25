export class DateUtil extends Date {
  constructor(date) {
    super(date);
  }

  static extractYearMonthDay = () => {

    const year = this.date.getFullYear();
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const day = this.date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  static convertMsToMMSS = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
}