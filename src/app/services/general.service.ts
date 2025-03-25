import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public baseUrl = 'http://localhost:8080';

  constructor() { }
}
