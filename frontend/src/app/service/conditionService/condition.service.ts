import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PolicySet } from 'src/app/model/PolicySet';
import { Condition } from 'src/app/model/Condition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/condition";

  addCondition(ruleId: string, policyId: string, idPolicySet: string, condition: Condition): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/condition/'+ ruleId + '/' + policyId + '/' + idPolicySet, condition);
  }
  
}

