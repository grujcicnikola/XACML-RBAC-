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

  getInitalPolicySet(): Observable<PolicySet> {
    return this.http.get<PolicySet>(this.url + '/getPolicySet');
  }


  getPolicySets(): Observable<PolicySet[]> {
    return this.http.get<PolicySet[]>(this.url + '/getPolicySets');
  }

  getPolicySet(id: String): Observable<PolicySet> {
    return this.http.get<PolicySet>(this.url + '/policySet/' + id);
  }

  getPolicy(id: Number): Observable<Policy> {
    return this.http.get<Policy>(this.url + '/policy/' + id);
  }

  downloadPolicySet(id: String): Observable<Blob> {
    const headers = new HttpHeaders({ responseType : 'blob'});
    return this.http.get<Blob>(this.url + '/downloadPolicySet/' + id, {headers: headers, responseType: 'blob' as 'json'});
  }

  getRule(id: Number): Observable<Rule> {
    return this.http.get<Rule>(this.url + '/rule/' + id);
  }

  createPolicySet(policySet: PolicySet): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/policySet', policySet);
  }

  downloadPolicySetUrl(id: string): string {
    return this.url + '/downloadPolicySet/' + id;
  }

}
