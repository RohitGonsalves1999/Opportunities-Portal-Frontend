import { Injectable } from '@angular/core';
import { APIService } from 'src/app/providers/api.service';
import { USER_TOKEN } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private API: APIService) { }


  async verifySession() {
    let token = sessionStorage.getItem(USER_TOKEN);
    console.log(token);
    let res = await this.API.callAPIPostAsync(
      '/verifySession',
      token ? token : 'kcnjxnjnzkjxcnz'
    );
    return res['valid'];
  }
}
