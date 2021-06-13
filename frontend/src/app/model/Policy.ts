import { Rule } from "./Rule";
import { Target } from './Target';

export class Policy {
    id : string;
    xmlns : string;
    xsi : string;
    policyId: string;
    version: string;
    ruleCombiningAlgId: string;
    description: string;
    schemaLocator: string;	
    rules: Rule[];
    target: Target;
    creator: string;
    created: string;
}