import { Policy } from "./Policy";

export class PolicySet {
    id : string;
    xmlns : string;
    xsi : string;
    policySetId: string;
    version: string;
    policyCombiningAlgId: string;
    description: string;
    policySetIdReference: string;
    policyIdReference: string;
    policies: Policy[];
    creator: string;
    created: string;
}