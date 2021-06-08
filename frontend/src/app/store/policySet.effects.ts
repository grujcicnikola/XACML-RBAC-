import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PolicySetActions from './policySet.action';
import { PolicyService } from '../service/policyService/policy.service';
import { PolicySet } from '../model/PolicySet';

@Injectable()
export class PolicySetEffects {
  constructor(private policySetService: PolicyService, private action$: Actions) {}

  getPolicySet$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(PolicySetActions.BeginGetPolicySetAction),
      mergeMap(action =>
        this.policySetService.getPolicySet(action.id).pipe(
          map((data: PolicySet) => {
              console.log("desilo");
            return PolicySetActions.SuccessGetPolicySetAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(PolicySetActions.ErrorPolicySetAction(error));
          })
        )
      )
    )
  );

//   CreatePolicySets$: Observable<Action> = createEffect(() =>
//     this.action$.pipe(
//       ofType(PolicySetActions.BeginCreatePolicySetAction),
//       mergeMap(action =>
//         this.policySetService.createPolicySets(action.payload).pipe(
//           map((data: PolicySet) => {
//             return PolicySetActions.SuccessCreatePolicySetAction({ payload: data });
//           }),
//           catchError((error: Error) => {
//             return of(PolicySetActions.ErrorPolicySetAction(error));
//           })
//         )
//       )
//     )
//   );
}