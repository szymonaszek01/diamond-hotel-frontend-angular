import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateUtil {

  constructor() {
  }

  public getDefaultCheckOutDate(): Date {
    const weekInMs: number = 7 * 24 * 60 * 60 * 1000;
    const currentDate: Date = new Date();

    return new Date(currentDate.getTime() + weekInMs);
  }

  public getDateFromISO(dateInISO: string): string {
    return dateInISO ? dateInISO.split('T')[0] : '';
  }

  public handleDateChange(event: Event, obj: any): boolean {
    let result: boolean = false;
    if (!('check_in' in obj) || !('check_out' in obj)) {
      return result;
    }

    const inputDate = event.target as HTMLInputElement;
    const newDate = new Date(inputDate.value);
    if (inputDate.id === "check-in" && newDate < new Date(obj.check_out) && newDate > new Date()) {
      obj.check_in = new Date(inputDate.value).toISOString();
      result = true;
    }
    if (inputDate.id === "check-out" && newDate > new Date(obj.check_in)) {
      obj.check_out = new Date(inputDate.value).toISOString();
      result = true;
    }

    inputDate.value = this.getDateFromISO(inputDate.id === "check-in" ? obj.check_in : obj.check_out);
    return result;
  }
}
