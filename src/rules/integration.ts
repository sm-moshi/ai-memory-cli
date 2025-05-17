import { parseMDC } from './mdcParser.js';
import { RulesEngine } from './rulesEngine.js';
import { ConsentManager } from './consent.js';
import type { RuleType } from './rulesEngine.js';

const RULES_PATH = new URL('./memory-bank-rules.md', import.meta.url).pathname;

let rulesEngine: RulesEngine | undefined;
let consentManager: ConsentManager | undefined;

export async function initRulesAndConsent() {
  const rules = await parseMDC(RULES_PATH);
  rulesEngine = new RulesEngine(rules);
  consentManager = new ConsentManager();
  return { rulesEngine, consentManager };
}

/**
 * Checks rules and, if needed, prompts for consent. Returns true if allowed, false if denied.
 * @param type RuleType (e.g. FileAccess, Command)
 * @param target Target string (e.g. filename, command)
 * @param promptFn Async function to prompt user for consent (returns boolean)
 */
export async function enforceWithConsent(
  type: RuleType,
  target: string,
  promptFn: (action: string) => Promise<boolean>
): Promise<boolean> {
  if (!rulesEngine || !consentManager) {throw new Error('Rules/consent not initialised');}
  const enforcement = rulesEngine.evaluate({ type, target });
  if (enforcement === 'Deny') {return false;}
  if (enforcement === 'Allow') {return true;}
  if (enforcement === 'Prompt') {
    const consent = consentManager.getConsent(target);
    if (consent === 'Granted') {return true;}
    if (consent === 'Denied') {return false;}
    // Prompt user
    const granted = await consentManager.promptConsent(target, promptFn);
    return granted === 'Granted';
  }
  // Log or unknown: allow by default
  return true;
}
