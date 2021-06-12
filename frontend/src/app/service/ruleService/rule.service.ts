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

}
