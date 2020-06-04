import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  private BASE_URL = 'http://localhost:8081/api/jobs';


  async callAPIPostAsync(endpoint , data) {
    console.log("Token: ", data);
    return await this.http.post(this.BASE_URL + endpoint, data).toPromise();
  }


  loginApi = (userInfo) => {
    return this.http.post(this.BASE_URL + `/signin/google`, userInfo);
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

  callApiPatch = (urlSuffix, data) => {
    return this.http.patch(this.BASE_URL + urlSuffix, data);
  }

}
