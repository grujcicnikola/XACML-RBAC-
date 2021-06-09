import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicySet } from 'src/app/model/PolicySet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolicySetService {
  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/policySet";

  getPolicySets(): Observable<PolicySet[]> {
    return this.http.get<PolicySet[]>(this.url + '/getPolicySets');
  }

  getPolicySet(id: String): Observable<PolicySet> {
    return this.http.get<PolicySet>(this.url + '/policySet/' + id);
  }

  createPolicySet(policySet: PolicySet): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/policySet', policySet);
  }

  updatePolicySet(policySet: PolicySet) {
    return this.http.put<PolicySet>(this.url + '/policySet', policySet);
  }

  deletePolicySet(id: string) {
    return this.http.delete<void>(this.url + '/policySet/'+ id);
  }

  downloadPolicySet(id: String): Observable<Blob> {
    const headers = new HttpHeaders({ responseType : 'blob'});
    return this.http.get<Blob>(this.url + '/downloadPolicySet/' + id, {headers: headers, responseType: 'blob' as 'json'});
  }
}
