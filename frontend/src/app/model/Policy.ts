import { Rule } from "./Rule";

export class Policy {
    id : number;
    xmlns : string;
    xsi : string;
    policyId: string;
    version: string;
    ruleCombiningAlgId: string;
    description: string;
    schemaLocator: string;	
    rules: Rule[];
}