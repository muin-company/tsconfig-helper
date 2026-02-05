import * as fs from 'fs';
import * as path from 'path';
import { ProjectType, TSConfig } from './types.js';

const templates: Record<ProjectType, TSConfig> = {
  react: {
    compilerOptions: {
      target: 'ES2020',
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      jsx: 'react-jsx',
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      allowImportingTsExtensions: true,
      isolatedModules: true,
      noEmit: true,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      allowSyntheticDefaultImports: true
    },
    include: ['src'],
    exclude: ['node_modules', 'dist', 'build']
  },
  
  node: {
    compilerOptions: {
      target: 'ES2022',
      module: 'commonjs',
      lib: ['ES2022'],
      outDir: './dist',
      rootDir: './src',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      resolveJsonModule: true,
      declaration: true,
      sourceMap: true
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist']
  },
  
  library: {
    compilerOptions: {
      target: 'ES2020',
      module: 'esnext',
      lib: ['ES2020'],
      outDir: './dist',
      rootDir: './src',
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      moduleResolution: 'node',
      resolveJsonModule: true,
      removeComments: false
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist', '**/*.test.ts', '**/*.spec.ts']
  },
  
  nextjs: {
    compilerOptions: {
      target: 'ES2020',
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      jsx: 'preserve',
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      incremental: true,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      allowJs: true,
      plugins: [{ name: 'next' }],
      paths: {
        '@/*': ['./src/*']
      }
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules']
  }
};

export function initTSConfig(type: ProjectType, outputPath: string = './tsconfig.json'): void {
  const template = templates[type];
  
  if (!template) {
    throw new Error(`Unknown project type: ${type}. Available: ${Object.keys(templates).join(', ')}`);
  }
  
  const resolvedPath = path.resolve(outputPath);
  
  if (fs.existsSync(resolvedPath)) {
    throw new Error(`File already exists: ${resolvedPath}. Remove it first or use a different path.`);
  }
  
  const content = JSON.stringify(template, null, 2);
  fs.writeFileSync(resolvedPath, content + '\n', 'utf-8');
  
  console.log(`✅ Created ${type} tsconfig.json at: ${resolvedPath}`);
  console.log(`\n📦 Recommended setup for ${type} projects:`);
  console.log(`   - Strict mode: ${template.compilerOptions?.strict ? '✓ enabled' : '✗ disabled'}`);
  console.log(`   - Target: ${template.compilerOptions?.target}`);
  console.log(`   - Module: ${template.compilerOptions?.module}`);
  
  if (type === 'react' || type === 'nextjs') {
    console.log(`   - JSX: ${template.compilerOptions?.jsx}`);
  }
  
  console.log('\n💡 Run `tsconfig-helper explain` to understand each option!\n');
}
