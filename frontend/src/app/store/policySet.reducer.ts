import { Action, createReducer, on, createSelector, createFeatureSelector, State } from '@ngrx/store';
import * as PolicySetActions from './policySet.action';
import PolicySetState, { initializeState } from './policySet.state';
import { PolicySet } from '../model/PolicySet';

const initialState = initializeState();

export const REDUCER_NAME = 'policySetReducer';
export const POLICY_SET_FEATURE_KEY = 'policySetStateKey';

const reducer = createReducer(
  initialState,
  on(PolicySetActions.GetPolicySetAction, state => state),
  on(PolicySetActions.CreatePolicySetAction, (state: PolicySetState, policySet: PolicySet) => {
    return { ...state, policySet: policySet, PolicySetError: null };
  }),
  on(PolicySetActions.SuccessGetPolicySetAction, (state: PolicySetState, { payload }) => {
    console.log(payload);
    return { ...state, policySet: payload, policySetError: null };
  }),
  on(PolicySetActions.SuccessCreatePolicySetAction, (state: PolicySetState, { payload }) => {
    return { ...state, policySets: payload, policySetError: null };
  }),
  on(PolicySetActions.ErrorPolicySetAction, (state: PolicySetState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, PolicySetError: error };
  })
);

export function PolicySetReducer(
  state: PolicySetState | undefined,
  action: Action,
): PolicySetState {
  return reducer(state, action);
}

const state_selector = createFeatureSelector<PolicySetState>(POLICY_SET_FEATURE_KEY);

export const policySet_selector = createSelector(state_selector, (state: PolicySetState) => state.policySet);
