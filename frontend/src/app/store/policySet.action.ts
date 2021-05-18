import { createAction, props } from '@ngrx/store';
import { PolicySet } from '../model/PolicySet';

export const GetPolicySetAction = createAction('[PolicySet] - Get PolicySet');

export const CreatePolicySetAction = createAction(
  '[PolicySet] - Create PolicySet',
  props<PolicySet>()
);

export const BeginGetPolicySetAction = createAction('[PolicySet] - Begin Get PolicySet');

export const SuccessGetPolicySetAction = createAction(
  '[PolicySet] - Success Get PolicySet',
  props<{ payload: PolicySet }>()
);

export const BeginCreatePolicySetAction = createAction(
  '[PolicySet] - Begin Create PolicySet',
  props<{ payload: PolicySet }>()
);

export const SuccessCreatePolicySetAction = createAction(
  '[PolicySet] - Success Create PolicySet',
  props<{ payload: PolicySet }>()
);

export const ErrorPolicySetAction = createAction('[PolicySet] - Error', props<Error>());