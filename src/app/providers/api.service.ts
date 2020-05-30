import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  private BASE_URL = 'http://localhost:8081/api/jobs';


  loginApi = (authToken, email) => {
    return this.http.get(this.BASE_URL + `/signin/google?code=${authToken}&email=${email}`);
  }

  callApi = urlSuffix => {
      return this.http.get(this.BASE_URL + urlSuffix);
  }

  callApiPost = (urlSuffix, data) => {
    return this.http.post(this.BASE_URL + urlSuffix, data);
  }

  callApiPut = (urlSuffix, data) => {
    return this.http.put(this.BASE_URL + urlSuffix, data);
  }

}
