import { loadTSConfig } from './utils.js';
import { TSConfig } from './types.js';

type CompilerOptions = Record<string, any>;

interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  option?: string;
  message: string;
  suggestion?: string;
}

export function validateTSConfig(filePath: string, outputJson: boolean = false): void {
  const config = loadTSConfig(filePath);
  const issues: ValidationIssue[] = [];

  // Validate compiler options
  if (config.compilerOptions) {
    validateCompilerOptions(config.compilerOptions, issues);
  }

  // Validate project structure
  validateProjectStructure(config, issues);

  // Output results
  if (outputJson) {
    console.log(JSON.stringify({ issues, valid: issues.filter(i => i.severity === 'error').length === 0 }, null, 2));
  } else {
    printValidationReport(issues, filePath);
  }

  // Exit with error code if there are errors
  if (issues.some(i => i.severity === 'error')) {
    process.exit(1);
  }
}

function validateCompilerOptions(options: CompilerOptions, issues: ValidationIssue[]): void {
  // Check for strict mode redundancies
  if (options.strict === true) {
    const strictFlags = [
      'alwaysStrict',
      'strictNullChecks',
      'strictBindCallApply',
      'strictFunctionTypes',
      'strictPropertyInitialization',
      'noImplicitAny',
      'noImplicitThis'
    ];

    strictFlags.forEach(flag => {
      if (options[flag] !== undefined) {
        issues.push({
          severity: 'info',
          option: `compilerOptions.${flag}`,
          message: `Redundant when "strict": true is enabled`,
          suggestion: `Remove "${flag}" from compilerOptions`
        });
      }
    });
  }

  // Check module and moduleResolution compatibility
  if (options.module) {
    const module = String(options.module).toLowerCase();
    const moduleResolution = options.moduleResolution ? String(options.moduleResolution).toLowerCase() : undefined;

    if ((module === 'node16' || module === 'nodenext') && moduleResolution && moduleResolution !== 'node16' && moduleResolution !== 'nodenext') {
      issues.push({
        severity: 'warning',
        option: 'compilerOptions.moduleResolution',
        message: `moduleResolution should be "node16" or "nodenext" when module is "${options.module}"`,
        suggestion: `Set "moduleResolution": "node16"`
      });
    }

    if (module === 'esnext' && !moduleResolution) {
      issues.push({
        severity: 'info',
        option: 'compilerOptions.moduleResolution',
        message: 'Consider explicitly setting moduleResolution when using ESNext modules',
        suggestion: 'Add "moduleResolution": "bundler" or "node"'
      });
    }
  }

  // Check target and lib compatibility
  if (options.target) {
    const target = String(options.target).toLowerCase();
    
    if (target === 'es3' || target === 'es5') {
      issues.push({
        severity: 'warning',
        option: 'compilerOptions.target',
        message: `Target "${options.target}" is outdated (released ${target === 'es3' ? '1999' : '2009'})`,
        suggestion: 'Consider using at least "ES2015" or higher'
      });
    }
  }

  // Check for common mistakes
  if (options.esModuleInterop === false && options.allowSyntheticDefaultImports === true) {
    issues.push({
      severity: 'warning',
      option: 'compilerOptions.allowSyntheticDefaultImports',
      message: 'allowSyntheticDefaultImports has no effect when esModuleInterop is false',
      suggestion: 'Set "esModuleInterop": true or remove "allowSyntheticDefaultImports"'
    });
  }

  // Check for missing important options
  if (options.isolatedModules === undefined && options.transpileOnly !== true) {
    issues.push({
      severity: 'info',
      option: 'compilerOptions.isolatedModules',
      message: 'Consider enabling isolatedModules for better compatibility with build tools',
      suggestion: 'Add "isolatedModules": true'
    });
  }

  // Check skipLibCheck
  if (options.skipLibCheck !== true) {
    issues.push({
      severity: 'info',
      option: 'compilerOptions.skipLibCheck',
      message: 'Enabling skipLibCheck can significantly improve compilation speed',
      suggestion: 'Add "skipLibCheck": true unless you need to check library types'
    });
  }

  // Check for declaration without declarationMap
  if (options.declaration === true && options.declarationMap !== true) {
    issues.push({
      severity: 'info',
      option: 'compilerOptions.declarationMap',
      message: 'Consider enabling declarationMap for better IDE navigation',
      suggestion: 'Add "declarationMap": true'
    });
  }

  // Check for sourceMap without inlineSourceMap conflict
  if (options.sourceMap === true && options.inlineSourceMap === true) {
    issues.push({
      severity: 'error',
      option: 'compilerOptions',
      message: 'Cannot use both "sourceMap" and "inlineSourceMap"',
      suggestion: 'Remove one of these options'
    });
  }

  // Check for paths without baseUrl
  if (options.paths && !options.baseUrl) {
    issues.push({
      severity: 'error',
      option: 'compilerOptions.paths',
      message: '"paths" requires "baseUrl" to be set',
      suggestion: 'Add "baseUrl": "./"'
    });
  }
}

function validateProjectStructure(config: TSConfig, issues: ValidationIssue[]): void {
  // Check for include/exclude patterns
  if (!config.include && !config.files) {
    issues.push({
      severity: 'warning',
      message: 'No "include" or "files" specified. TypeScript will include all .ts/.tsx files',
      suggestion: 'Add "include": ["src/**/*"] to be explicit'
    });
  }

  // Check for common exclude patterns
  if (config.include && !config.exclude) {
    issues.push({
      severity: 'info',
      message: 'Consider adding "exclude" to skip unnecessary files',
      suggestion: 'Add "exclude": ["node_modules", "dist"]'
    });
  }
}

function printValidationReport(issues: ValidationIssue[], filePath: string): void {
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const infos = issues.filter(i => i.severity === 'info');

  console.log(`\n🔍 Validating ${filePath}\n`);

  if (issues.length === 0) {
    console.log('✅ No issues found! Your tsconfig looks great.\n');
    return;
  }

  // Print errors
  if (errors.length > 0) {
    console.log('❌ Errors:\n');
    errors.forEach(issue => {
      console.log(`  ${issue.option ? `[${issue.option}]` : '[config]'} ${issue.message}`);
      if (issue.suggestion) {
        console.log(`    💡 ${issue.suggestion}`);
      }
      console.log();
    });
  }

  // Print warnings
  if (warnings.length > 0) {
    console.log('⚠️  Warnings:\n');
    warnings.forEach(issue => {
      console.log(`  ${issue.option ? `[${issue.option}]` : '[config]'} ${issue.message}`);
      if (issue.suggestion) {
        console.log(`    💡 ${issue.suggestion}`);
      }
      console.log();
    });
  }

  // Print info
  if (infos.length > 0) {
    console.log('ℹ️  Suggestions:\n');
    infos.forEach(issue => {
      console.log(`  ${issue.option ? `[${issue.option}]` : '[config]'} ${issue.message}`);
      if (issue.suggestion) {
        console.log(`    💡 ${issue.suggestion}`);
      }
      console.log();
    });
  }

  // Summary
  console.log(`\n📊 Summary: ${errors.length} error(s), ${warnings.length} warning(s), ${infos.length} suggestion(s)\n`);

  if (errors.length > 0) {
    console.log('❌ Validation failed. Please fix the errors above.\n');
  } else {
    console.log('✅ No critical errors found.\n');
  }
}
