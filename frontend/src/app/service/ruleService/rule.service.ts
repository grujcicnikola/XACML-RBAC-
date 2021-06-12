import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rule } from 'src/app/model/Rule';
import { Observable } from 'rxjs';
import { PolicySet } from 'src/app/model/PolicySet';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/rule";

  addRule(parentId: string, idPolicySet: string, rule: Rule): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/rule/' + parentId + '/' + idPolicySet, rule);
  }

  getRule(id: string, parentId: string, idPolicySet: string): Observable<Rule> {
    return this.http.get<Rule>(this.url + '/rule/' + id + '/' + parentId + '/' + idPolicySet);
  }

  updateRule(id: string, parentId: string, idPolicySet: string, rule: Rule): Observable<PolicySet> {
    return this.http.put<PolicySet>(this.url + '/rule/' + id + '/' + parentId + '/' + idPolicySet, rule);
  }

  deleteRule(id: string, parentId: string, idPolicySet: string): Observable<void> {
    return this.http.delete<void>(this.url + '/rule/' + id + '/' + parentId + '/' + idPolicySet);
  }

}
