import { describe, it, expect } from 'vitest';
import { RulesEngine } from '../../src/rules/rulesEngine';
import { RuleType, RuleEnforcement } from '../../src/types/enums';

describe('RulesEngine', () => {
  it('should load and return rules', () => {
    const rules = [
      { id: '1', type: RuleType.FileAccess, pattern: '.*', enforcement: RuleEnforcement.Allow },
    ];
    const engine = new RulesEngine();
    engine.loadRules(rules);
    expect(engine.getRules()).toEqual(rules);
  });

  it('should evaluate and enforce allow/deny rules', () => {
    const rules = [
      { id: '1', type: RuleType.FileAccess, pattern: 'secret', enforcement: RuleEnforcement.Deny },
      { id: '2', type: RuleType.FileAccess, pattern: '.*', enforcement: RuleEnforcement.Allow },
    ];
    const engine = new RulesEngine(rules);
    // Should deny for target matching 'secret'
    expect(engine.enforce({ type: RuleType.FileAccess, target: 'secret' })).toBe(false);
    // Should allow for other targets
    expect(engine.enforce({ type: RuleType.FileAccess, target: 'public' })).toBe(true);
  });

  it('should return Prompt or Log for those enforcement types', () => {
    const rules = [
      { id: '1', type: RuleType.Command, pattern: 'danger', enforcement: RuleEnforcement.Prompt },
      { id: '2', type: RuleType.Command, pattern: 'audit', enforcement: RuleEnforcement.Log },
    ];
    const engine = new RulesEngine(rules);
    // Prompt and Log both return true (caller must handle)
    expect(engine.enforce({ type: RuleType.Command, target: 'danger' })).toBe(true);
    expect(engine.enforce({ type: RuleType.Command, target: 'audit' })).toBe(true);
  });
});
