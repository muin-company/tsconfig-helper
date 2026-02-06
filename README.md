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

## 🔗 Links

- [npm package](https://www.npmjs.com/package/tsconfig-helper)
- [GitHub repository](https://github.com/muin-company/tsconfig-helper)
- [Report issues](https://github.com/muin-company/tsconfig-helper/issues)
- [TypeScript docs](https://www.typescriptlang.org/tsconfig)
