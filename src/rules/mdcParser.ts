import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import { RuleType, RuleEnforcement } from './rulesEngine.js';
import type { Rule } from './rulesEngine.js';

interface MDCFrontmatter {
  id: string;
  type: RuleType;
  pattern: string;
  enforcement: RuleEnforcement;
  description?: string;
}

export async function parseMDC(filePath: string): Promise<Rule[]> {
  const content = await fs.readFile(filePath, 'utf8');
  const matches = content.match(/^---([\s\S]*?)---/);
  if (!matches) {return [];}
  const frontmatter = yaml.load(matches[1]) as MDCFrontmatter | MDCFrontmatter[];
  const fmArray = Array.isArray(frontmatter) ? frontmatter : [frontmatter];
  return fmArray.map(fm => ({
    id: fm.id,
    type: fm.type,
    pattern: fm.pattern,
    enforcement: fm.enforcement,
    description: fm.description,
  }));
}
