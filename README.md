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

### 2. Initialize a new tsconfig

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

## 🔗 Links

- [npm package](https://www.npmjs.com/package/tsconfig-helper)
- [GitHub repository](https://github.com/muin-company/tsconfig-helper)
- [Report issues](https://github.com/muin-company/tsconfig-helper/issues)
- [TypeScript docs](https://www.typescriptlang.org/tsconfig)
