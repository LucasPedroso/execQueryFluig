import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor() { }

  async restCall({ special = false, method, json = null, url }: { special?: boolean, method: string, json?: any, url: string }): Promise<any> {
    let parms: any;

    if (special) {
      parms = {
        method: method,
        body: json,
        processData: false,
      };
    } else if (json) {
      parms = {
        method: method,
        body: JSON.stringify(json),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    } else {
      parms = {
        method: method,
      };
    }

    try {
      const response = await fetch(url, parms);
      return await response.json();

    } catch (err) {
      return err;
    }
  }
}
