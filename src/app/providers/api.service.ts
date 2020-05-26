import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  private BASE_URL = 'http://localhost:8081/api/jobs';

  callApi = urlSuffix => {
      return this.http.get(this.BASE_URL + urlSuffix);
  }

  callApiPost = (urlSuffix, data) => {
    return this.http.post(this.BASE_URL + urlSuffix, data);
  }

}
