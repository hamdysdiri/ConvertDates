export class ConvertDates {
  public static readonly TEN = 10;
  public static readonly TWO = 2;
  public static readonly ONE = 2;
  public static readonly SIXTY = 60;
  public static readonly ONETHOUSAND = 1000;
  public static readonly ONRTHOUDSANDFOURHUNDREDFORTY = 1000;
  
  static convertDateTimeToYYYMMDD(date): any {
    if (date != null) {
      let month = String(new Date(date.split('T')[0]).getMonth() + 1);
      if (parseInt(month) < ConvertDates.TEN && month.length < 2) {
        month = '0' + month;
      }
      let day = String(new Date(date.split('T')[0]).getDate());
      if (parseInt(day) < ConvertDates.TEN && day.length < ConvertDates.TWO) {
        day = '0' + day;
      }
      return new Date(date).getFullYear() + '-' + String(month) + '-' + String(day);
    }
  }

  static calculateDifferenceBetweenTwoHoursAndDatesInMinutes(startHour, endHour, endDate, startDate) {
    let result = 0;
    let end = startHour.split(':'),
      start = endHour.split(':'),
      date1 = new Date(),
      date2 = new Date(),
      dateDeposit = ConvertDates.convertDateTimeToYYYMMDD(endDate),
      dateOftheDay = ConvertDates.convertDateTimeToYYYMMDD(startDate);
    if (
      (Date.parse(dateOftheDay) == Date.parse(dateDeposit) &&
        date1.setHours(start[0], start[1]) > date2.setHours(end[0], end[1])) ||
      Date.parse(dateOftheDay) > Date.parse(endDate)
    ) {
      return result;
    } else {
      date1.setHours(start[0], start[1]);
      date2.setHours(end[0], end[1]);
      let diffBetweenTowDatesInSc: number =Math.abs((Date.parse(dateDeposit) - Date.parse(dateOftheDay)));
      let diffBetweenTowDatesInMs = Math.abs(
        diffBetweenTowDatesInSc /
          ConvertDates.ONETHOUSAND /
          ConvertDates.SIXTY
      );
      if(date1.getTime() - date2.getTime()>0){

        if(diffBetweenTowDatesInMs===ConvertDates.ONRTHOUDSANDFOURHUNDREDFORTY){
          result= (date2.getHours()*ConvertDates.SIXTY) +
          ((diffBetweenTowDatesInMs)- date1.getHours()*ConvertDates.SIXTY);

        }else {
          result= Number(diffBetweenTowDatesInMs) + (date2.getHours()*ConvertDates.SIXTY) +
          ((ConvertDates.ONRTHOUDSANDFOURHUNDREDFORTY)- date1.getHours()*ConvertDates.SIXTY);
        }
      }else{

        let differnceBetweenTwoHoursInMs = (
          Math.abs(date1.getTime() - date2.getTime()) /
          ConvertDates.ONETHOUSAND /
          ConvertDates.SIXTY 
        ).toFixed(2);
        result=Number(diffBetweenTowDatesInMs)+Number(differnceBetweenTwoHoursInMs);
  
      }

      return result;
    }
  }

  static differenceBetweenTwoHourInMs(startHour, endHour) {
    let result = 0;
    let end = endHour.split(':'),
      start = startHour.split(':'),
      date1 = new Date(),
      date2 = new Date();
    if (date1.setHours(start[0], start[1]) > date2.setHours(end[0], end[1])) {
      date1.setHours(start[0], start[1]);
      date2.setHours(end[0], end[1]);

      let hours = (
        Math.abs(date1.getTime() - date2.getTime()) /
        ConvertDates.ONETHOUSAND /
        ConvertDates.SIXTY /
        ConvertDates.SIXTY
      ).toFixed(2);
      if (parseFloat(hours) < ConvertDates.ONE) {
        result = Math.round(parseFloat(hours) * 60);
      } else {
        let minToDisplay = Math.round(
          (parseFloat(hours) % ConvertDates.ONE) * ConvertDates.SIXTY
        );
        let hourToDisplay = parseFloat(hours);
        result = Math.trunc(hourToDisplay) * 60 + minToDisplay;
      }
    }
    return result;
  }

  static convertNextHour(date): any {
    let hourCompresserStartHour = new Date(date);
    let hour = String(hourCompresserStartHour.getHours() + 1);
    let min = String(hourCompresserStartHour.getMinutes());
    if (parseInt(hour) < ConvertDates.TEN) {
      hour = '0' + hour;
    }
    if (parseInt(min) < ConvertDates.TEN) {
      min = '0' + min;
    }
    return String(hour) + ':' + String(min);
  }

  static convertHourHHmm(date) {
    let hourCompresserStartHour = new Date(date);
    let hour = String(hourCompresserStartHour.getHours() - 1);
    let min = String(hourCompresserStartHour.getMinutes());
    if (parseInt(hour) < ConvertDates.TEN) {
      hour = '0' + hour;
    }
    if (parseInt(min) < ConvertDates.TEN) {
      min = '0' + min;
    }
    return String(hour) + ':' + String(min);
  }

  static dateOfTheDayInYYYYMMDD(): any {
    let h = new Date();
    let year = h.getFullYear();
    let month = String(h.getMonth() + 1);
    let day = String(h.getDate());

    if (
      parseInt(month) < ConvertDates.TEN &&
      String(month).length < ConvertDates.TWO
    ) {
      month = '0' + String(month);
    }

    if (
      parseInt(day) < ConvertDates.TEN &&
      String(day).length < ConvertDates.TWO
    ) {
      day = '0' + String(day);
    }
    return String(year) + '/' + String(month) + '/' + String(day);
  }

}
