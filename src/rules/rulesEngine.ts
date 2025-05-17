import type { RuleType as _RuleType, ConsentState } from '../types/enums.js';
import { RuleType, RuleEnforcement } from '../types/enums.js';

export { RuleType, RuleEnforcement };

export interface Rule {
  id: string;
  type: RuleType;
  pattern: string;
  enforcement: RuleEnforcement;
  description?: string;
}

export class RulesEngine {
  private rules: Rule[] = [];

  constructor(rules: Rule[] = []) {
    this.rules = rules;
  }

  loadRules(rules: Rule[]): void {
    this.rules = rules;
  }

  getRules(): Rule[] {
    return this.rules;
  }

  evaluate(action: { type: RuleType; target: string }): RuleEnforcement {
    const matched = this.rules.find(rule => rule.type === action.type && new RegExp(rule.pattern).test(action.target));
    return matched ? matched.enforcement : RuleEnforcement.Allow;
  }

  enforce(action: { type: RuleType; target: string }): boolean {
    const enforcement = this.evaluate(action);
    if (enforcement === RuleEnforcement.Deny) {return false;}
    if (enforcement === RuleEnforcement.Allow) {return true;}
    // Prompt or Log can be handled by caller
    return true;
  }
}
