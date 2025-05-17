// Additional enums for rules engine and consent logic

export enum RuleType {
  FileAccess = 'FileAccess',
  Command = 'Command',
  Consent = 'Consent',
  Safety = 'Safety',
  Custom = 'Custom',
}

export enum RuleEnforcement {
  Allow = 'Allow',
  Deny = 'Deny',
  Prompt = 'Prompt',
  Log = 'Log',
}

export enum ConsentState {
  Unknown = 'Unknown',
  Granted = 'Granted',
  Denied = 'Denied',
  Prompted = 'Prompted',
}
