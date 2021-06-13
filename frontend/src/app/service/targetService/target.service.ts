import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypesEnum } from 'src/app/model/TypesEnum';
import { AnyOf } from 'src/app/model/AnyOf';
import { PolicySet } from 'src/app/model/PolicySet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/target";

  // addTarget(policySetId: string, itemId: string, type: TypesEnum) {
  //   return this.http.post<void>(this.url + '/target/' + policySetId + '/' + itemId + '/' + type, null);
  // }

  deleteTarget(parentId: string, selectedParentType: TypesEnum, policySetId: string) {
    return this.http.delete<void>(this.url + '/target/' + parentId + '/' + selectedParentType + '/' + policySetId);
  }
  //selectedParentType, String policySetId, String policyId,
  // String ruleId, AnyOfDto anyOfDto
  addAnyOf(selectedParentType: string, idPolicySet: string, policyId: string, ruleId: string, anyOf: AnyOf): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/anyOf/' + selectedParentType + '/' + idPolicySet + '/' + policyId + '/' + ruleId, anyOf);
  }
//	String id, String selectedParentOfParentType, String policySetId, String policyId,
//	 String ruleId
  getAnyOf(id: string, selectedParentOfParentType: string, policySetId: string, policyId: string, ruleId: string): Observable<AnyOf> {
    return this.http.get<AnyOf>(this.url + '/anyOf/' + id + '/' + selectedParentOfParentType + '/' + policySetId + '/' + policyId + '/' + ruleId);
  }
//String id, String selectedParentOfParentType, String policySetId, String policyId,
//	String ruleId, AnyOfDto anyOfDto
  updateAnyOf(id: string, selectedParentOfParentType: string, policySetId: string, policyId: string, ruleId: string, anyOf: AnyOf): Observable<PolicySet> {
    return this.http.put<PolicySet>(this.url + '/anyOf/' + id + '/' + selectedParentOfParentType + '/' + policySetId + '/' + policyId + '/' + ruleId, anyOf);
  }

  deleteAnyOf(selectedItemId: string, parentId: string, selectedParentType: TypesEnum, policySetId: string) {
    return this.http.delete<void>(this.url + '/anyOf/' + selectedItemId + '/' + parentId + '/' + selectedParentType + '/' + policySetId);
  }

}
