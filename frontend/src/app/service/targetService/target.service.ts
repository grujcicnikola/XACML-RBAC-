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

  addTarget(policySetId: string, itemId: string, type: TypesEnum) {
    return this.http.post<void>(this.url + '/target/' +policySetId + '/' + itemId + '/' +  type, null);
  }

  deleteTarget(parentId: string, selectedParentType: TypesEnum, policySetId: string) {
    return this.http.delete<void>(this.url + '/target/' +parentId + '/' + selectedParentType + '/' +  policySetId);
  }

  addTargetContent(parentId: string, selectedParentType: string, idPolicySet: string, anyOf: AnyOf): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/targetContent/' +parentId + '/' + selectedParentType + '/' +  idPolicySet, anyOf);

  }

}
