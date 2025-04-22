import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public baseUrl = 'http://ec2-18-218-153-234.us-east-2.compute.amazonaws.com:8080';

  constructor() { }
}
