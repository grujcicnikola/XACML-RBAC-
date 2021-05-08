import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url = "http://localhost:8080/user/";

  constructor(private httpClient : HttpClient) { }

  register(user: User): Observable<any>{
    return this.httpClient.post(this.url + 'register', user);
  }

  logout(email : String): Observable<any>{
    return this.httpClient.get(this.url + 'logout/'+email+'/');
  }

  getUserByUsername(username : String){
    return this.httpClient.get(this.url + 'getUserByUsername/' + username);
  }
}
