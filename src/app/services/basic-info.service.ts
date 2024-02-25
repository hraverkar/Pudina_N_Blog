import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IbasicInforamtion } from '../interface/ibasic-inforamtion';

@Injectable({
  providedIn: 'root',
})
export class BasicInfoService {
  constructor(public httpClient: HttpClient) { }

  public readBasicInformation(): Observable<IbasicInforamtion> {
    return this.httpClient.get<IbasicInforamtion>("../../assets/basicInformation.json");
  }
}
