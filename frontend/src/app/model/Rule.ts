import { Condition } from './Condition';
import { Target } from './Target';

export class Rule {
    ruleId : string;
    effect : string;
    description: string;
    condition: Condition;	
    target: Target;
}