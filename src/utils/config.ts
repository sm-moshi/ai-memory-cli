interface AIMemoryConfig {
  memoryBankPath: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  plannerMode: boolean;
}

const defaultConfig: AIMemoryConfig = {
  memoryBankPath: 'memory-bank',
  logLevel: 'info',
  plannerMode: false,
};

export function getConfig(): AIMemoryConfig {
  return {
    memoryBankPath: process.env.AI_MEMORY_BANK_PATH || defaultConfig.memoryBankPath,
    logLevel: (process.env.AI_MEMORY_LOG_LEVEL as AIMemoryConfig['logLevel']) || defaultConfig.logLevel,
    plannerMode: process.env.AI_MEMORY_PLANNER_MODE === 'true' || defaultConfig.plannerMode,
  };
}
