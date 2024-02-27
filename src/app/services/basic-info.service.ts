import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IbasicInforamtion } from '../interface/ibasic-inforamtion';
import { IResumeInformation } from '../interface/iresume-information';
import { IPostInformation } from '../interface/ipost-information';
import { GeneralPost } from '../interface/ipost-property';

@Injectable({
  providedIn: 'root',
})
export class BasicInfoService {

  private dataSubject = new BehaviorSubject<IbasicInforamtion>(null);
  public data$ = this.dataSubject.asObservable();

  public constructor(public httpClient: HttpClient) {
  }

  public readBasicInformation(): Observable<IbasicInforamtion> {
    return this.httpClient.get<IbasicInforamtion>("../../assets/JsonData/basicInformation.json");
  }

  public generateSelectedData(basicInformation: IbasicInforamtion) {
    this.dataSubject.next(basicInformation);
  }

  public resumeBasicInformation(): Observable<IResumeInformation> {
    return this.httpClient.get<IResumeInformation>("../../assets/JsonData/resumeInformation.json");
  }

  public postBasicInformation(): Observable<IPostInformation> {
    return this.httpClient.get<IPostInformation>("../../assets/JsonData/postInformation.json");
  }

  public downloadFile(filePath: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'responseType': 'blob',
    });

    return this.httpClient.get(filePath, { headers, responseType: 'blob' });
  }

  public getAllBlogInformation(): Observable<GeneralPost> {
    return this.httpClient.get<GeneralPost>("../../assets/JsonData/blogPostList.json")
  }

}
