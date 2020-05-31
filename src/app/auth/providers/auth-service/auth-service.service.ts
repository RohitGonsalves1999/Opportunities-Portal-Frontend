import { Injectable } from '@angular/core';
import { APIService } from 'src/app/providers/api.service';
import { USER_TOKEN } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private API : APIService) { }


  async verifySession() {
    let res =  await this.API.callAPIPostAsync(
      '/verifySession',
      sessionStorage.getItem(USER_TOKEN)
    );
    return res['valid'];
  }
}
