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

  getPolicy(id: string, idPolicySet: string): Observable<Policy> {
    return this.http.get<Policy>(this.url + '/policy/' + id + '/' + idPolicySet);
  }

  updatePolicy(policy: Policy, id: string): Observable<PolicySet> {
    return this.http.put<PolicySet>(this.url + '/policy/' + id, policy);
  }

  addPolicy(policy: Policy, id: string): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/policy/' + id, policy);
  }

  deletePolicy(id: string, policySetId: string) {
    return this.http.delete<void>(this.url + '/policy/' + id + '/' + policySetId);
  }

  getRule(id: Number): Observable<Rule> {
    return this.http.get<Rule>(this.url + '/rule/' + id);
  }

}
