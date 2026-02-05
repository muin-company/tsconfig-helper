export interface OptionInfo {
  description: string;
  type: string;
  common?: string[];
  default?: any;
  recommended?: boolean;
}

export interface OptionsDatabase {
  compilerOptions: Record<string, OptionInfo>;
  [key: string]: any;
}

export interface TSConfig {
  compilerOptions?: Record<string, any>;
  include?: string[];
  exclude?: string[];
  extends?: string;
  files?: string[];
  [key: string]: any;
}

export type ProjectType = 'react' | 'node' | 'library' | 'nextjs';
