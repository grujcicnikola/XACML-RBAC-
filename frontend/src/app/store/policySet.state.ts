import { PolicySet } from '../model/PolicySet';


export default class PolicySetState {
  policySet: PolicySet;
  policySetError: Error;
}

export const initializeState = (): PolicySetState => {
  return { policySet: null, policySetError: null };
};

