import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PolicySet } from 'src/app/model/PolicySet';
import { Condition } from 'src/app/model/Condition';
import { Observable } from 'rxjs';
import { Apply } from 'src/app/model/Apply';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/condition";

  addCondition(ruleId: string, policyId: string, idPolicySet: string, condition: Condition): Observable<PolicySet> {
    return this.http.post<PolicySet>(this.url + '/condition/' + ruleId + '/' + policyId + '/' + idPolicySet, condition);
  }

  getCondition(ruleId: string, policyId: string, idPolicySet: string): Observable<Condition> {
    return this.http.get<Condition>(this.url + '/condition/' + ruleId + '/' + policyId + '/' + idPolicySet);
  }

  updateCondition(ruleId: string, policyId: string, idPolicySet: string, condition: Condition): Observable<PolicySet> {
    return this.http.put<PolicySet>(this.url + '/condition/' + ruleId + '/' + policyId + '/' + idPolicySet, condition);
  }

  deleteCondition(ruleId: string, policyId: string, idPolicySet: string): Observable<void> {
    return this.http.delete<void>(this.url + '/condition/' + ruleId + '/' + policyId + '/' + idPolicySet);
  }

  addApply(ruleId: string, policyId: string, idPolicySet: string, apply: Apply) {
    return this.http.post<PolicySet>(this.url + '/apply/' + ruleId + '/' + policyId + '/' + idPolicySet, apply);
  }

  updateApply(ruleId: string, policyId: string, idPolicySet: string, apply: Apply): Observable<PolicySet> {
    return this.http.put<PolicySet>(this.url + '/apply/' + ruleId + '/' + policyId + '/' + idPolicySet, apply);
  }

  getApply(applyId: string, ruleId: string, policyId: string, idPolicySet: string): Observable<Apply> {
    return this.http.get<Apply>(this.url + '/apply/' + applyId + '/' + ruleId + '/' + policyId + '/' + idPolicySet);
  }

  deleteApply(applyId: string, ruleId: string, policyId: string, idPolicySet: string): Observable<void> {
    return this.http.delete<void>(this.url + '/apply/' + applyId + '/' + ruleId + '/' + policyId + '/' + idPolicySet);
  }

}


/**
 * @RequestMapping(value = "apply/{applyId}/{ruleId}/{policyId}/{policySetId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApplyDto> getApply(@PathVariable("applyId") String applyId, @PathVariable("ruleId") String ruleId,
			@PathVariable("policyId") String policyId, @PathVariable("policySetId") String policySetId) {
		return new ResponseEntity<>(this.conditionService.getApply(applyId, ruleId, policyId, policySetId),
				HttpStatus.OK);
	}

	@RequestMapping(value = "apply/{applyId}/{ruleId}/{policyId}/{policySetId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> updateApply(@PathVariable("ruleId") String ruleId,
			@PathVariable("policyId") String policyId, @PathVariable("policySetId") String policySetId, @RequestBody ApplyDto applyDto) {
		return new ResponseEntity<>(this.conditionService.updateApply(ruleId, policyId, policySetId, applyDto),
				HttpStatus.OK);
	}

	@RequestMapping(value = "apply/{applyId}/{ruleId}/{policyId}/{policySetId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deleteApply(@PathVariable("applyId") String applyId, @PathVariable("ruleId") String ruleId,
			@PathVariable("policyId") String policyId, @PathVariable("policySetId") String policySetId) {
		this.conditionService.deleteApply(applyId, ruleId, policyId, policySetId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
 */
