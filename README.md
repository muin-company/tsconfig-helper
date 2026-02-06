# tsconfig-helper

[![npm version](https://img.shields.io/npm/v/tsconfig-helper.svg)](https://www.npmjs.com/package/tsconfig-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

> Understand, compare, and generate `tsconfig.json` files. Plain English explanations.

TypeScript configuration can be confusing. **tsconfig-helper** makes it simple:
- 📖 **Explain** your current config in plain English
- 🚀 **Generate** best-practice configs for React, Node, libraries, and Next.js
- 🔍 **Compare** two configs side-by-side

Zero dependencies. Fast. Opinionated (but configurable).

---

## 🎯 Features

- **Plain English explanations** for 40+ TypeScript compiler options
- **Config validation** — catch conflicts and anti-patterns automatically
- **Project templates** optimized for React, Node.js, libraries, and Next.js
- **Side-by-side diff** to compare configurations
- **JSON output** for scripting and automation
- **Zero runtime dependencies** (only TypeScript for building)
- **Built with TypeScript** — dogfooding at its finest

---

## 📦 Installation

### Global (recommended for CLI use)
```bash
npm install -g tsconfig-helper
```

### Local (for project-specific use)
```bash
npm install --save-dev tsconfig-helper
```

### Run without installing (npx)
```bash
npx tsconfig-helper --help
```

---

## 🚀 Usage

### 1. Explain your current tsconfig

Understand what each option in your `tsconfig.json` does:

```bash
tsconfig-helper explain
```

**Example output:**
```
📋 TSConfig Explanation: ./tsconfig.json

════════════════════════════════════════════════════════════

🔹 compilerOptions.strict
   Value: true
   Enable all strict type-checking options. Recommended for all projects.
   Type: boolean

🔹 compilerOptions.target
   Value: ES2020
   Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
   Type: string

...
```

#### Explain a specific file
```bash
tsconfig-helper explain tsconfig.prod.json
```

#### Get machine-readable output
```bash
tsconfig-helper explain --json
```

---

### 2. Validate your tsconfig

Check for conflicts, anti-patterns, and best practices:

```bash
tsconfig-helper validate
```

**Example output:**
```
🔍 Validating ./tsconfig.json

❌ Errors:

  [compilerOptions] Cannot use both "sourceMap" and "inlineSourceMap"
    💡 Remove one of these options

  [compilerOptions.paths] "paths" requires "baseUrl" to be set
    💡 Add "baseUrl": "./"

⚠️  Warnings:

  [compilerOptions.target] Target "ES3" is outdated (released 1999)
    💡 Consider using at least "ES2015" or higher

ℹ️  Suggestions:

  [compilerOptions.strictNullChecks] Redundant when "strict": true is enabled
    💡 Remove "strictNullChecks" from compilerOptions

  [compilerOptions.skipLibCheck] Enabling skipLibCheck can significantly improve compilation speed
    💡 Add "skipLibCheck": true unless you need to check library types

📊 Summary: 2 error(s), 1 warning(s), 2 suggestion(s)
```

#### JSON output for CI/CD
```bash
tsconfig-helper validate --json
```

Returns exit code 1 if errors are found (warnings/suggestions don't fail).

---

### 3. Initialize a new tsconfig

Generate a best-practice config for your project type:

```bash
tsconfig-helper init --type react
```

**Available types:**
- `react` — React apps (Vite, CRA, etc.)
- `node` — Node.js backend services
- `library` — Reusable TypeScript libraries
- `nextjs` — Next.js applications

**Example output:**
```
✅ Created react tsconfig.json at: /path/to/tsconfig.json

📦 Recommended setup for react projects:
   - Strict mode: ✓ enabled
   - Target: ES2020
   - Module: esnext
   - JSX: react-jsx

💡 Run `tsconfig-helper explain` to understand each option!
```

#### Custom output path
```bash
tsconfig-helper init --type node --output tsconfig.build.json
```

---

### 3. Compare two configs

See what's different between two `tsconfig.json` files:

```bash
tsconfig-helper diff tsconfig.json tsconfig.prod.json
```

**Example output:**
```
🔍 TSConfig Diff: tsconfig.json ↔️  tsconfig.prod.json

════════════════════════════════════════════════════════════

➕ Added in tsconfig.prod.json (2):
   compilerOptions.sourceMap: false
   compilerOptions.removeComments: true

➖ Removed from tsconfig.prod.json (1):
   compilerOptions.declarationMap: true

🔄 Changed (1):
   compilerOptions.target:
      tsconfig.json: ES2020
      tsconfig.prod.json: ES2022

════════════════════════════════════════════════════════════

📊 Summary: 2 added, 1 removed, 1 changed, 15 same
```

#### JSON output for scripting
```bash
tsconfig-helper diff tsconfig.a.json tsconfig.b.json --json
```

---

## 📚 Command Reference

```
USAGE:
  tsconfig-helper <command> [options]

COMMANDS:
  explain [file]               Explain options in a tsconfig.json file
                               Default: ./tsconfig.json

  init --type <type> [output]  Generate a recommended tsconfig for your project type
                               Types: react, node, library, nextjs
                               Default output: ./tsconfig.json

  diff <file-a> <file-b>       Compare two tsconfig.json files

OPTIONS:
  --json                       Output in JSON format (for explain and diff)
  --help, -h                   Show this help message
```

---

## 💡 Examples

### Example 1: Understanding inherited config

```bash
$ tsconfig-helper explain

📋 TSConfig Explanation: ./tsconfig.json

════════════════════════════════════════════════════════════

🔹 extends
   Value: @tsconfig/react-native/tsconfig.json
   Inherit options from a base configuration file

🔹 compilerOptions.strict
   Value: true
   Enable all strict type-checking options. Includes:
   - strictNullChecks
   - strictFunctionTypes
   - noImplicitAny
   - and 5 more strict options

🔹 compilerOptions.skipLibCheck
   Value: true
   Skip type checking of declaration files (.d.ts)
   ⚠️  Faster builds, but may hide type errors in dependencies

🔹 include
   Value: ["src/**/*"]
   Specifies files to include in compilation

Total options: 12 explained
```

### Example 2: Starting a new Next.js project

```bash
$ tsconfig-helper init --type nextjs

✅ Created nextjs tsconfig.json at: ./tsconfig.json

📦 Recommended setup for nextjs projects:
   - Strict mode: ✓ enabled
   - Target: ES2020
   - Module: esnext
   - JSX: preserve (Next.js handles JSX)
   - Path aliases: @/* → ./src/*

💡 Run `tsconfig-helper explain` to understand each option!

$ cat tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Example 3: Debugging build vs. dev config differences

```bash
$ tsconfig-helper diff tsconfig.json tsconfig.build.json

🔍 TSConfig Diff: tsconfig.json ↔️  tsconfig.build.json

════════════════════════════════════════════════════════════

➕ Added in tsconfig.build.json (3):
   compilerOptions.removeComments: true
   compilerOptions.sourceMap: false
   compilerOptions.declaration: true

➖ Removed from tsconfig.build.json (2):
   compilerOptions.declarationMap: true
   compilerOptions.incremental: true

🔄 Changed (2):
   compilerOptions.outDir:
      tsconfig.json: ./dev-dist
      tsconfig.build.json: ./dist

   exclude:
      tsconfig.json: ["node_modules", "**/*.test.ts"]
      tsconfig.build.json: ["node_modules", "**/*.test.ts", "src/**/__mocks__"]

════════════════════════════════════════════════════════════

📊 Summary: 3 added, 2 removed, 2 changed, 18 same

💡 Build config removes dev-only features:
   - No incremental builds (clean builds for CI)
   - No declaration maps (not needed for published package)
   - Strips comments to reduce bundle size
```

### Example 4: Library publishing setup

```bash
$ cd my-awesome-lib
$ tsconfig-helper init --type library

✅ Created library tsconfig.json at: ./tsconfig.json

$ tsconfig-helper explain --json > docs/tsconfig-explained.json

$ cat tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts", "**/*.spec.ts"]
}

# Perfect for npm publish:
# - Generates .d.ts type definitions
# - Source maps for debugging
# - Excludes tests from build
```

### Example 5: Migrating from loose to strict mode

```bash
$ tsconfig-helper explain | grep strict

🔹 compilerOptions.strict
   Value: false
   Enable all strict type-checking options. Recommended for all projects.

# Enable strict mode
$ cat tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}

$ tsconfig-helper explain

📋 TSConfig Explanation: ./tsconfig.json

🔹 compilerOptions.strict
   Value: true
   Enable all strict type-checking options. Includes:
   - noImplicitAny
   - strictNullChecks
   - strictFunctionTypes
   - strictBindCallApply
   - strictPropertyInitialization
   - noImplicitThis
   - alwaysStrict

💡 This will catch many runtime errors at compile time!

# Now compare before/after
$ tsconfig-helper diff tsconfig.old.json tsconfig.json

🔍 TSConfig Diff: tsconfig.old.json ↔️  tsconfig.json

🔄 Changed (1):
   compilerOptions.strict:
      tsconfig.old.json: false
      tsconfig.json: true

💡 Enabling strict mode adds 7 type-checking rules.
   Expect to see new TypeScript errors that were previously hidden!
```

---

## 🎨 Project Templates

### React (`--type react`)
Optimized for React apps with modern bundlers (Vite, esbuild, etc.):
- JSX: `react-jsx` (new JSX transform)
- Module resolution: `bundler`
- Isolated modules for fast builds
- `noEmit` (bundler handles output)

### Node.js (`--type node`)
For backend services and CLIs:
- CommonJS modules
- Source maps and declarations
- Strict mode enabled
- Output to `./dist`

### Library (`--type library`)
For publishing reusable TypeScript packages:
- Declaration files (`.d.ts`) with source maps
- ESNext modules for tree-shaking
- Excludes test files

### Next.js (`--type nextjs`)
Tailored for Next.js 13+ with App Router:
- `jsx: preserve` (Next.js handles JSX)
- Path aliases (`@/*`)
- Incremental compilation
- Next.js plugin support

---

## 🧪 Development

```bash
# Clone the repo
git clone https://github.com/muin-company/tsconfig-helper.git
cd tsconfig-helper

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Try locally
node dist/cli.js --help
```

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

### Adding new compiler options
Edit `src/options-db.json` and add your option with a clear description.

---

## 📄 License

MIT © [muin-company](https://github.com/muin-company)

---

## 🙏 Acknowledgments

Built with ❤️ by the muin-company team to make TypeScript configuration less painful.

Inspired by the official [TypeScript Handbook](https://www.typescriptlang.org/tsconfig) and countless hours of tsconfig debugging.

---

## 🌟 Real-World Examples

### 1. Onboarding New Developers

Help newcomers understand your project's TypeScript config:

```bash
# Add to your onboarding docs
echo "📚 Understanding our TypeScript setup..." >> onboarding.md
tsconfig-helper explain >> onboarding.md

# Or create an interactive script
cat > scripts/explain-tsconfig.sh << 'EOF'
#!/bin/bash
echo "🔍 Let me explain our TypeScript configuration..."
echo ""
tsconfig-helper explain
echo ""
echo "Questions? Check https://www.typescriptlang.org/tsconfig"
EOF
chmod +x scripts/explain-tsconfig.sh
```

### 2. CI/CD Config Validation

Enforce consistent TypeScript settings across branches:

```yaml
# .github/workflows/tsconfig-check.yml
name: TSConfig Validation

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check for tsconfig changes
        id: changed
        run: |
          git diff origin/main --name-only | grep -q "tsconfig.json"
          echo "changed=$?" >> $GITHUB_OUTPUT
      
      - name: Validate tsconfig against baseline
        if: steps.changed.outputs.changed == '0'
        run: |
          git show origin/main:tsconfig.json > tsconfig.main.json
          npx tsconfig-helper diff tsconfig.main.json tsconfig.json --json > diff.json
          
          # Fail if critical options changed
          if jq -e '.changed | any(.key == "compilerOptions.strict")' diff.json; then
            echo "❌ Cannot disable strict mode!"
            exit 1
          fi
      
      - name: Comment PR with explanation
        if: steps.changed.outputs.changed == '0'
        uses: actions/github-script@v6
        with:
          script: |
            const explanation = require('child_process')
              .execSync('npx tsconfig-helper explain --json')
              .toString();
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '### 📝 TSConfig Changes\n\`\`\`json\n' + explanation + '\n\`\`\`'
            });
```

### 3. Migrating Legacy Projects

Incrementally adopt stricter settings:

```bash
# Step 1: Initialize a strict config
tsconfig-helper init --type node --output tsconfig.strict.json

# Step 2: Compare with current
tsconfig-helper diff tsconfig.json tsconfig.strict.json > migration-plan.txt

# Step 3: Review differences
cat migration-plan.txt

# Step 4: Enable one strict option at a time
# Edit tsconfig.json manually or via script
node << 'EOF'
const fs = require('fs');
const config = require('./tsconfig.json');
config.compilerOptions.noImplicitAny = true;  // Start here
fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
EOF

# Step 5: Fix errors
npx tsc --noEmit

# Step 6: Repeat for next strict option
```

### 4. Monorepo Configuration

Standardize configs across packages:

```bash
# Generate base config
tsconfig-helper init --type library --output tsconfig.base.json

# Each package extends it
cat > packages/package-a/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
EOF

# Verify all packages match base
for pkg in packages/*/tsconfig.json; do
  echo "Checking $pkg"
  tsconfig-helper diff tsconfig.base.json "$pkg" | grep -q "extends" || {
    echo "⚠️  $pkg doesn't extend base config"
  }
done
```

### 5. Environment-Specific Configs

Different configs for dev, test, and production:

```bash
# Base config
tsconfig-helper init --type react --output tsconfig.json

# Development (source maps, no optimization)
cat > tsconfig.dev.json << 'EOF'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "removeComments": false,
    "incremental": true
  }
}
EOF

# Production (optimized, no debug info)
cat > tsconfig.prod.json << 'EOF'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "declarationMap": false
  }
}
EOF

# Compare them
tsconfig-helper diff tsconfig.dev.json tsconfig.prod.json

# Build scripts
# package.json:
# "build:dev": "tsc -p tsconfig.dev.json"
# "build:prod": "tsc -p tsconfig.prod.json"
```

### 6. Documentation Generation

Auto-generate config documentation:

```bash
# Generate markdown docs
cat > scripts/generate-tsconfig-docs.sh << 'EOF'
#!/bin/bash
echo "# TypeScript Configuration" > docs/tsconfig.md
echo "" >> docs/tsconfig.md
echo "Auto-generated from \`tsconfig.json\`" >> docs/tsconfig.md
echo "" >> docs/tsconfig.md
tsconfig-helper explain >> docs/tsconfig.md
EOF

chmod +x scripts/generate-tsconfig-docs.sh

# Run on every commit
# .git/hooks/pre-commit:
# ./scripts/generate-tsconfig-docs.sh
# git add docs/tsconfig.md
```

### 7. Troubleshooting Build Issues

When `tsc` fails mysteriously:

```bash
# Step 1: Verify config is valid
tsconfig-helper explain || echo "❌ Config has issues"

# Step 2: Compare with known-good config
tsconfig-helper init --type node --output tsconfig.reference.json
tsconfig-helper diff tsconfig.json tsconfig.reference.json

# Step 3: Check for common mistakes
tsconfig-helper explain --json | jq -r '.compilerOptions[] | 
  select(.key == "moduleResolution" and .value != "node") | 
  "⚠️  moduleResolution should be \"node\" for Node.js projects"'

# Step 4: Reset to defaults if needed
cp tsconfig.reference.json tsconfig.json
```

### 8. Team Standards Enforcement

Create a linter for tsconfig.json:

```javascript
// scripts/lint-tsconfig.js
const { execSync } = require('child_process');
const config = require('../tsconfig.json');

const rules = {
  'strict-mode': () => {
    if (!config.compilerOptions?.strict) {
      throw new Error('strict mode must be enabled');
    }
  },
  'no-implicit-any': () => {
    if (config.compilerOptions?.noImplicitAny === false) {
      throw new Error('noImplicitAny cannot be disabled');
    }
  },
  'target-minimum': () => {
    const target = config.compilerOptions?.target;
    if (target && target < 'ES2020') {
      throw new Error('target must be at least ES2020');
    }
  }
};

// Run checks
for (const [name, check] of Object.entries(rules)) {
  try {
    check();
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ ${name}: ${err.message}`);
    process.exit(1);
  }
}

console.log('\n✨ All tsconfig rules passed!');
```

```json
{
  "scripts": {
    "lint:tsconfig": "node scripts/lint-tsconfig.js"
  }
}
```

### 9. A/B Testing Compiler Options

Test performance impact of different settings:

```bash
# Benchmark build times
for config in tsconfig.*.json; do
  echo "Testing $config"
  time tsc -p "$config" --noEmit 2>&1 | grep real
done

# Compare bundle sizes
for config in tsconfig.*.json; do
  tsc -p "$config"
  size=$(du -sh dist | cut -f1)
  echo "$config: $size"
done

# Find optimal config
# Results:
# tsconfig.es2020.json: 1.2s, 450KB
# tsconfig.es2022.json: 1.5s, 430KB
# Winner: es2022 (smaller bundle, acceptable build time)
```

### 10. Interactive Config Builder

Create a wizard for non-experts:

```bash
# scripts/interactive-tsconfig.sh
#!/bin/bash

echo "🧙 TypeScript Config Wizard"
echo ""

read -p "Project type? (react/node/library/nextjs): " type
read -p "Enable strict mode? (y/n): " strict
read -p "Output directory? (default: dist): " outdir
outdir=${outdir:-dist}

tsconfig-helper init --type "$type" --output tsconfig.json

if [ "$strict" = "y" ]; then
  node -e "
    const fs = require('fs');
    const config = require('./tsconfig.json');
    config.compilerOptions.strict = true;
    fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
  "
fi

node -e "
  const fs = require('fs');
  const config = require('./tsconfig.json');
  config.compilerOptions.outDir = './$outdir';
  fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
"

echo ""
echo "✅ Created tsconfig.json"
echo ""
tsconfig-helper explain
```

---

## Integration Guides

### Pre-commit Hook (Prevent Bad Configs)

```bash
# Install husky
npm install --save-dev husky

# Initialize
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run check:tsconfig"
```

**.husky/pre-commit:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Only check if tsconfig.json changed
if git diff --cached --name-only | grep -q "tsconfig"; then
  echo "🔍 Validating TypeScript config..."
  
  npx tsconfig-helper validate || {
    echo "❌ tsconfig.json has errors!"
    echo "Run 'npx tsconfig-helper explain' to understand the issues"
    exit 1
  }
  
  echo "✅ TypeScript config is valid"
fi
```

**Advanced version with auto-fix:**

```bash
#!/bin/sh

if git diff --cached --name-only | grep -q "tsconfig"; then
  echo "🔍 Validating tsconfig.json..."
  
  # Check for errors
  result=$(npx tsconfig-helper validate --json)
  errors=$(echo "$result" | jq '.errors | length')
  
  if [ "$errors" -gt 0 ]; then
    echo "❌ Found $errors error(s) in tsconfig.json"
    echo ""
    npx tsconfig-helper validate
    echo ""
    
    # Ask user to fix
    read -p "Fix automatically? (y/N): " response
    if [ "$response" = "y" ]; then
      # Remove conflicting options
      node << 'EOF'
        const fs = require('fs');
        const config = require('./tsconfig.json');
        
        // Remove conflicts
        if (config.compilerOptions?.sourceMap && config.compilerOptions?.inlineSourceMap) {
          delete config.compilerOptions.inlineSourceMap;
        }
        
        fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
        console.log('✅ Auto-fixed conflicts');
EOF
      git add tsconfig.json
    else
      exit 1
    fi
  fi
fi
```

### package.json Scripts

```json
{
  "scripts": {
    "check:tsconfig": "tsconfig-helper validate",
    "check:tsconfig:strict": "tsconfig-helper validate && tsc --noEmit",
    
    "explain:tsconfig": "tsconfig-helper explain",
    "explain:tsconfig:json": "tsconfig-helper explain --json > docs/tsconfig-explained.json",
    
    "init:tsconfig": "tsconfig-helper init --type",
    "init:tsconfig:react": "tsconfig-helper init --type react",
    "init:tsconfig:node": "tsconfig-helper init --type node",
    
    "diff:tsconfig": "tsconfig-helper diff tsconfig.json tsconfig.prod.json",
    
    "docs:tsconfig": "tsconfig-helper explain > docs/typescript-config.md",
    
    "preinstall": "tsconfig-helper validate || echo '⚠️  tsconfig.json has issues'",
    "postinstall": "tsconfig-helper validate",
    
    "ci:tsconfig": "tsconfig-helper validate --json > reports/tsconfig-validation.json"
  }
}
```

### GitHub Actions (Automated Validation)

```yaml
# .github/workflows/tsconfig-check.yml
name: TypeScript Config Validation

on:
  pull_request:
    paths:
      - 'tsconfig*.json'
      - '**/tsconfig*.json'
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0  # For diff comparison
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Validate tsconfig.json
        id: validate
        run: |
          npx tsconfig-helper validate --json > validation.json
          echo "errors=$(jq -r '.errors | length' validation.json)" >> $GITHUB_OUTPUT
          echo "warnings=$(jq -r '.warnings | length' validation.json)" >> $GITHUB_OUTPUT
        continue-on-error: true
      
      - name: Fail on errors
        if: steps.validate.outputs.errors > 0
        run: |
          echo "❌ Found ${{ steps.validate.outputs.errors }} error(s)"
          npx tsconfig-helper validate
          exit 1
      
      - name: Compare with main branch
        if: github.event_name == 'pull_request'
        run: |
          git show origin/main:tsconfig.json > tsconfig.main.json || echo "{}" > tsconfig.main.json
          npx tsconfig-helper diff tsconfig.main.json tsconfig.json > diff.txt
          cat diff.txt
      
      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const diff = fs.readFileSync('diff.txt', 'utf8');
            const validation = JSON.parse(fs.readFileSync('validation.json'));
            
            let comment = '## 🔧 TypeScript Config Changes\n\n';
            
            if (validation.errors.length > 0) {
              comment += '### ❌ Errors\n';
              validation.errors.forEach(err => {
                comment += `- **${err.path}**: ${err.message}\n`;
              });
              comment += '\n';
            }
            
            if (validation.warnings.length > 0) {
              comment += '### ⚠️  Warnings\n';
              validation.warnings.forEach(warn => {
                comment += `- ${warn.message}\n`;
              });
              comment += '\n';
            }
            
            comment += '### 📊 Changes\n';
            comment += '```\n' + diff + '\n```\n';
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
      
      - name: Generate explanation
        run: npx tsconfig-helper explain > tsconfig-explanation.md
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: tsconfig-reports
          path: |
            validation.json
            diff.txt
            tsconfig-explanation.md
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - validate
  - document

tsconfig-validate:
  stage: validate
  image: node:18
  script:
    - npx tsconfig-helper validate --json > validation.json
    - |
      errors=$(jq -r '.errors | length' validation.json)
      if [ "$errors" -gt 0 ]; then
        echo "❌ TypeScript config has $errors error(s)"
        npx tsconfig-helper validate
        exit 1
      fi
    - echo "✅ TypeScript config is valid"
  artifacts:
    reports:
      junit: validation.json
    when: always
  only:
    changes:
      - tsconfig*.json

tsconfig-docs:
  stage: document
  image: node:18
  script:
    - npx tsconfig-helper explain > docs/typescript-config.md
    - npx tsconfig-helper explain --json > docs/typescript-config.json
  artifacts:
    paths:
      - docs/
    expire_in: 30 days
  only:
    changes:
      - tsconfig*.json
```

### Monorepo Setup (Lerna/Turborepo/Nx)

**Root tsconfig.json:**

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Package-specific configs:**

```bash
# packages/app-a/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

**Validation script:**

```bash
#!/bin/bash
# scripts/validate-all-tsconfigs.sh

echo "🔍 Validating all TypeScript configs..."

failed=0

for config in $(find . -name "tsconfig*.json" -not -path "*/node_modules/*"); do
  echo "Checking $config"
  
  if ! npx tsconfig-helper validate "$config"; then
    echo "❌ $config is invalid"
    failed=$((failed + 1))
  else
    echo "✅ $config is valid"
  fi
  echo ""
done

if [ $failed -gt 0 ]; then
  echo "❌ $failed config(s) failed validation"
  exit 1
fi

echo "✅ All TypeScript configs are valid"
```

**package.json (root):**

```json
{
  "scripts": {
    "check:tsconfig:all": "./scripts/validate-all-tsconfigs.sh",
    "explain:tsconfig:all": "find . -name 'tsconfig.json' -not -path '*/node_modules/*' -exec tsconfig-helper explain {} \\;"
  }
}
```

### CI/CD: Prevent Breaking Config Changes

```yaml
# Prevent disabling strict mode
- name: Check for strict mode regression
  run: |
    strict=$(jq -r '.compilerOptions.strict' tsconfig.json)
    if [ "$strict" != "true" ]; then
      echo "❌ strict mode cannot be disabled!"
      exit 1
    fi

# Prevent lowering target version
- name: Check target version
  run: |
    target=$(jq -r '.compilerOptions.target' tsconfig.json)
    if [[ "$target" < "ES2020" ]]; then
      echo "❌ target must be at least ES2020"
      exit 1
    fi
```

### VSCode Integration

**.vscode/tasks.json:**

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Explain TypeScript Config",
      "type": "shell",
      "command": "npx tsconfig-helper explain",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Validate TypeScript Config",
      "type": "shell",
      "command": "npx tsconfig-helper validate",
      "problemMatcher": [],
      "group": {
        "kind": "test",
        "isDefault": true
      }
    },
    {
      "label": "Compare TypeScript Configs",
      "type": "shell",
      "command": "npx tsconfig-helper diff tsconfig.json tsconfig.prod.json",
      "problemMatcher": []
    }
  ]
}
```

**.vscode/settings.json:**

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  
  "files.associations": {
    "tsconfig*.json": "jsonc"
  },
  
  "json.schemas": [
    {
      "fileMatch": ["tsconfig*.json"],
      "url": "https://json.schemastore.org/tsconfig"
    }
  ]
}
```

## Troubleshooting

### Problem: Validation Passes But `tsc` Fails

**Symptom:**
```bash
$ npx tsconfig-helper validate
✅ No errors found

$ npx tsc
error TS5023: Unknown compiler option 'customOption'
```

**Cause:** tsconfig-helper validates structure and common options, but doesn't catch all TypeScript-specific errors.

**Solution:**

```bash
# Always run tsc after validation
npm run check:tsconfig && npx tsc --noEmit

# Or combine in package.json
{
  "scripts": {
    "check:types": "tsconfig-helper validate && tsc --noEmit"
  }
}
```

### Problem: Explanation Missing for Custom Option

**Symptom:**
```bash
🔹 compilerOptions.customPlugin
   Value: { ... }
   (No explanation available)
```

**Cause:** tsconfig-helper only documents official TypeScript compiler options. Custom options (e.g., for frameworks) aren't explained.

**Workaround:** Document custom options separately:

```json
// tsconfig.json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "next",
        // Next.js TypeScript plugin (see: nextjs.org/docs/typescript)
      }
    ]
  }
}
```

### Problem: Diff Shows Too Many Changes

**Symptom:**
```bash
$ tsconfig-helper diff tsconfig.a.json tsconfig.b.json

🔄 Changed (47):
  ...hundreds of lines...
```

**Cause:** Comparing completely different configs (e.g., React vs Node).

**Solutions:**

```bash
# 1. Filter diff to specific keys
tsconfig-helper diff a.json b.json --json | \
  jq '.changed[] | select(.key | contains("strict"))'

# 2. Compare only top-level keys
node << 'EOF'
  const a = require('./tsconfig.a.json');
  const b = require('./tsconfig.b.json');
  
  console.log('Strict mode:', a.compilerOptions?.strict, '→', b.compilerOptions?.strict);
  console.log('Target:', a.compilerOptions?.target, '→', b.compilerOptions?.target);
EOF

# 3. Use standard diff tool
diff <(jq -S . tsconfig.a.json) <(jq -S . tsconfig.b.json)
```

### Problem: Init Overwrites Existing Config

**Symptom:**
```bash
$ tsconfig-helper init --type react
✅ Created react tsconfig.json
# Your custom config is gone!
```

**Cause:** `init` always overwrites by default.

**Solutions:**

```bash
# 1. Specify different output
tsconfig-helper init --type react --output tsconfig.new.json

# 2. Backup first
cp tsconfig.json tsconfig.backup.json
tsconfig-helper init --type react

# 3. Merge manually
tsconfig-helper init --type react --output tsconfig.template.json
# Then copy specific options you want
```

### Problem: Validate Doesn't Catch Real Errors

**Symptom:**
```bash
$ tsconfig-helper validate
✅ No errors found

# But this config is broken:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": false  // Conflicts with strict!
  }
}
```

**Cause:** Current version doesn't validate all TypeScript semantics, only syntax and common conflicts.

**Enhanced validation:**

```bash
# Custom validation script
# scripts/validate-tsconfig.js
const tsc = require('typescript');
const config = require('../tsconfig.json');

// Check for conflicts
if (config.compilerOptions?.strict) {
  const strictOptions = [
    'noImplicitAny',
    'strictNullChecks',
    'strictFunctionTypes',
    // ... etc
  ];
  
  strictOptions.forEach(opt => {
    if (config.compilerOptions[opt] === false) {
      console.error(`❌ ${opt} cannot be false when strict is true`);
      process.exit(1);
    }
  });
}

console.log('✅ Enhanced validation passed');
```

### Problem: JSON Output is Unreadable

**Symptom:**
```bash
$ tsconfig-helper explain --json
{"compilerOptions":[{"key":"strict","value":true,"description":"Enable all...
```

**Solution:** Pipe through jq:

```bash
# Pretty print
tsconfig-helper explain --json | jq .

# Extract specific fields
tsconfig-helper explain --json | jq '.compilerOptions[] | {key, value}'

# Filter by key
tsconfig-helper explain --json | jq '.compilerOptions[] | select(.key == "strict")'

# Save formatted
tsconfig-helper explain --json | jq . > tsconfig-explained.json
```

### Problem: Explain Shows Inherited Options Incorrectly

**Symptom:**
```json
// tsconfig.json
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "strict": true  // Override
  }
}
```

```bash
$ tsconfig-helper explain
# Shows strict: true from base config, not the override
```

**Cause:** tsconfig-helper doesn't fully resolve `extends` chains.

**Workaround:** Use TypeScript's own resolution:

```bash
# Print resolved config
npx tsc --showConfig > tsconfig.resolved.json
tsconfig-helper explain tsconfig.resolved.json
```

### Problem: Diff Doesn't Handle Comments

**Symptom:**
```json
// tsconfig.a.json
{
  "compilerOptions": {
    "strict": true  // Important!
  }
}

// tsconfig.b.json  
{
  "compilerOptions": {
    "strict": true
  }
}
```

```bash
$ tsconfig-helper diff tsconfig.a.json tsconfig.b.json
# Reports no changes (comments are stripped)
```

**Solution:** Comments in JSON aren't standard. Use JSONC or strip them:

```bash
# Strip comments before comparing
jq . tsconfig.a.json > a.clean.json
jq . tsconfig.b.json > b.clean.json
tsconfig-helper diff a.clean.json b.clean.json
```

### Problem: Large Monorepo Validation is Slow

**Symptom:** Validating 50+ `tsconfig.json` files takes minutes.

**Solutions:**

```bash
# 1. Parallel execution
find . -name "tsconfig*.json" | \
  parallel -j4 tsconfig-helper validate {}

# 2. Only validate changed files (CI)
git diff --name-only origin/main | \
  grep "tsconfig" | \
  xargs -I {} tsconfig-helper validate {}

# 3. Cache results
# .github/workflows/tsconfig.yml
- uses: actions/cache@v3
  with:
    path: |
      .tsconfig-cache
    key: tsconfig-${{ hashFiles('**/tsconfig*.json') }}
```

### Problem: Init Doesn't Match Team Standards

**Symptom:**
```bash
$ tsconfig-helper init --type react
# Generated config doesn't match your team's conventions
```

**Solution:** Create custom templates:

```bash
# scripts/init-custom-tsconfig.sh
#!/bin/bash

type=$1

# Start with base
npx tsconfig-helper init --type "$type" --output tsconfig.json

# Apply team standards
node << 'EOF'
  const fs = require('fs');
  const config = require('./tsconfig.json');
  
  // Team overrides
  config.compilerOptions.strictNullChecks = true;
  config.compilerOptions.noUnusedLocals = true;
  config.compilerOptions.noUnusedParameters = true;
  config.compilerOptions.baseUrl = './src';
  
  fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
  console.log('✅ Applied team standards');
EOF
```

**Usage:**

```bash
./scripts/init-custom-tsconfig.sh react
```

## Best Practices

### 1. Version Control tsconfig.json, Always

```bash
# ✅ DO commit
git add tsconfig.json
git commit -m "chore: update TypeScript config"

# ❌ DON'T ignore
# .gitignore should NOT contain:
# tsconfig.json  # BAD!
```

### 2. Document Why Options Are Set

```json
{
  "compilerOptions": {
    "strict": true,
    // ✅ Good: explains why
    "skipLibCheck": true,  // Speeds up builds by 30%
    
    "esModuleInterop": true,  // Required for default imports from CommonJS
    
    "target": "ES2020"  // Matches Node.js 14+ runtime
  }
}
```

### 3. Use Extends for Shared Configs

```json
// tsconfig.base.json (shared)
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "skipLibCheck": true
  }
}

// tsconfig.json (specific)
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### 4. Separate Build Configs

```bash
# Development
# tsconfig.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "sourceMap": true,
    "incremental": true
  }
}

# Production
# tsconfig.prod.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true
  },
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}
```

**package.json:**

```json
{
  "scripts": {
    "build:dev": "tsc -p tsconfig.json",
    "build:prod": "tsc -p tsconfig.prod.json"
  }
}
```

### 5. Validate Configs in CI

```yaml
# Required step before type-checking
- run: tsconfig-helper validate
- run: tsc --noEmit
```

### 6. Explain Configs in Onboarding Docs

```bash
# Generate documentation automatically
npx tsconfig-helper explain > docs/typescript-setup.md

# Include in README
cat >> README.md << 'EOF'

## TypeScript Configuration

Our TypeScript setup is documented here: [docs/typescript-setup.md](./docs/typescript-setup.md)

To understand the config:
```bash
npx tsconfig-helper explain
```
EOF
```

### 7. Gradually Adopt Stricter Settings

```json
// Month 1: Start loose
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": false
  }
}

// Month 2: Enable noImplicitAny
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true
  }
}

// Month 3: Full strict mode
{
  "compilerOptions": {
    "strict": true
  }
}
```

**Track progress:**

```bash
# scripts/strict-mode-progress.sh
errors=$(npx tsc --noEmit --strict 2>&1 | grep -c "error TS")
echo "Errors remaining with strict mode: $errors"
echo "Progress: $((100 - errors / 10))% complete"
```

### 8. Use TypeScript's Own Validation Too

```bash
# tsconfig-helper validates structure
npx tsconfig-helper validate

# TypeScript validates semantics
npx tsc --noEmit

# Combine both
npx tsconfig-helper validate && npx tsc --noEmit
```

### 9. Keep Configs Small and Focused

```json
// ❌ BAD: Kitchen sink config
{
  "compilerOptions": {
    // 50+ options, many redundant
  }
}

// ✅ GOOD: Minimal, extends base
{
  "extends": "@tsconfig/node18/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",  // Only project-specific overrides
    "baseUrl": "./src"
  }
}
```

### 10. Review Generated Configs, Don't Blindly Accept

```bash
# After init, review and customize
tsconfig-helper init --type react
tsconfig-helper explain  # Understand each option
# Edit tsconfig.json to match your needs
```

## Framework-Specific Deep Dives

### React with TypeScript (Comprehensive)

**Initial setup:**

```bash
npx create-react-app my-app --template typescript
cd my-app
tsconfig-helper explain
```

**Recommended tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,  // Allows mixing .js and .ts during migration
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "bundler",  // For Vite/modern bundlers
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,  // Bundler handles output
    "jsx": "react-jsx",  // New JSX transform (React 17+)
    
    // Recommended additions
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    
    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "build", "**/*.test.ts", "**/*.spec.ts"]
}
```

**Validation:**

```bash
# Check config
tsconfig-helper validate

# Test types
npx tsc --noEmit

# Run with watch
npx tsc --noEmit --watch
```

### Next.js with TypeScript

**Setup:**

```bash
npx create-next-app@latest my-app --typescript
cd my-app
tsconfig-helper explain
```

**Optimized tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",  // Next.js handles JSX transformation
    "incremental": true,
    "plugins": [
      {
        "name": "next"  // Next.js TypeScript plugin
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@app/*": ["./src/app/*"]
    },
    "baseUrl": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Type-checking in CI:**

```yaml
- run: npx tsconfig-helper validate
- run: npx next build  # Includes type-checking
```

### Node.js Backend with Express

**Setup:**

```bash
npm init -y
npm install --save express
npm install --save-dev typescript @types/node @types/express
tsconfig-helper init --type node
```

**Production tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2022",  // Node.js 18+
    "module": "commonjs",  // Required for Node.js
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true,  // Generate .d.ts files
    "declarationMap": true,
    "sourceMap": true,
    
    // Additional safety
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    
    // Node.js-specific
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

**Development tsconfig.json:**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "incremental": true,
    "watch": true
  }
}
```

### Library Publishing (npm Package)

**Setup:**

```bash
tsconfig-helper init --type library
```

**Optimized for publishing:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",  // Tree-shakeable
    "lib": ["ES2020"],
    "declaration": true,  // ✅ Must have for libraries
    "declarationMap": true,  // Helps with IDE navigation
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    
    // Library-specific
    "composite": true,  // Enables project references
    "removeComments": false,  // Keep JSDoc comments
    "stripInternal": true  // Remove @internal APIs from .d.ts
  },
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts",
    "**/__tests__/**"
  ]
}
```

**package.json:**

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",  // TypeScript entry point
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc",
    "prebuild": "tsconfig-helper validate",
    "prepublishOnly": "npm run build"
  }
}
```

### Monorepo with Project References

**Root tsconfig.json:**

```json
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/utils" },
    { "path": "./packages/ui" }
  ]
}
```

**packages/core/tsconfig.json:**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../utils" }
  ]
}
```

**Build script:**

```bash
# Build all packages in dependency order
npx tsc --build

# Clean
npx tsc --build --clean

# Watch mode
npx tsc --build --watch
```

## 🔗 Links

- [npm package](https://www.npmjs.com/package/tsconfig-helper)
- [GitHub repository](https://github.com/muin-company/tsconfig-helper)
- [Report issues](https://github.com/muin-company/tsconfig-helper/issues)
- [TypeScript docs](https://www.typescriptlang.org/tsconfig)
