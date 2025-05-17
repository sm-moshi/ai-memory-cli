import { ConsentState } from '../types/enums.js';

export class ConsentManager {
  private consentMap: Map<string, ConsentState> = new Map();

  getConsent(action: string): ConsentState {
    return this.consentMap.get(action) || ConsentState.Unknown;
  }

  setConsent(action: string, state: ConsentState): void {
    this.consentMap.set(action, state);
  }

  async promptConsent(action: string, promptFn: (action: string) => Promise<boolean>): Promise<ConsentState> {
    const granted = await promptFn(action);
    const state = granted ? ConsentState.Granted : ConsentState.Denied;
    this.setConsent(action, state);
    return state;
  }
}
