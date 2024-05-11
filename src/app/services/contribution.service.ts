import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IbasicInforamtion } from '../interface/ibasic-inforamtion';

@Injectable({
  providedIn: 'root',
})
export class ContributionService {
  constructor(private httpClient: HttpClient) {}

  public headers = new HttpHeaders()
    .set('Authorization', `Bearer ${environment.accessToken}`)
    .set('Content-Type', 'application/json');



  public ContributionsInformation(query: string): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseURL,
      { query },
      { headers: this.headers }
    );
  }

  public readProjectInformation(): Observable<IbasicInforamtion> {
    return this.httpClient.get<IbasicInforamtion>("../../assets/JsonData/projectInformation.json");
  }


}
