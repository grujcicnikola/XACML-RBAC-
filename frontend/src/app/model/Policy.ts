import { Rule } from "./Rule";

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
    creator: string;
    created: string;
}