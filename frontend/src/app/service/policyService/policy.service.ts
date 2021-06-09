import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicySet } from 'src/app/model/PolicySet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rule } from 'src/app/model/Rule';
import { Policy } from 'src/app/model/Policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/policy";

  // getInitalPolicySet(): Observable<PolicySet> {
  //   return this.http.get<PolicySet>(this.url + '/getPolicySet');
  // }


  getPolicy(id: Number): Observable<Policy> {
    return this.http.get<Policy>(this.url + '/policy/' + id);
  }

  getRule(id: Number): Observable<Rule> {
    return this.http.get<Rule>(this.url + '/rule/' + id);
  }

  // downloadPolicySetUrl(id: string): string {
  //   return this.url + '/downloadPolicySet/' + id;
  // }

}
