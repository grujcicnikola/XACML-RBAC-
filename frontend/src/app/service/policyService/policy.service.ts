import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicySet } from 'src/app/model/PolicySet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http : HttpClient) { }

  url ="http://localhost:8080/policy";

  // test(){
  //   console.log("get" + this.url);
  //   return this.http.get(this.url + '/test');
  // }
  
  getPolicySet(): Observable<PolicySet>{
    return this.http.get<PolicySet>(this.url + '/getPolicySet');
  }
}
