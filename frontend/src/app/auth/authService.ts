import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './JwtResponse';
import { LoginInfo } from './login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':  'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return  this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }


}