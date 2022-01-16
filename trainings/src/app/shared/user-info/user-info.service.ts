import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserInfo } from './user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(environment.api + '/api/user.json');
  }
}
