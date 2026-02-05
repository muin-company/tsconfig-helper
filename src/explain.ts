import { loadTSConfig, loadOptionsDB, formatValue } from './utils.js';
import { TSConfig, OptionsDatabase } from './types.js';

export function explainTSConfig(filePath: string, outputJson: boolean = false): void {
  const config = loadTSConfig(filePath);
  const db = loadOptionsDB();
  
  const explanations: Array<{
    option: string;
    value: any;
    description: string;
    type?: string;
  }> = [];
  
  // Explain top-level options
  for (const [key, value] of Object.entries(config)) {
    if (key === 'compilerOptions') continue;
    
    if (db[key]) {
      explanations.push({
        option: key,
        value: formatValue(value),
        description: db[key].description,
        type: db[key].type
      });
    }
  }
  
  // Explain compiler options
  if (config.compilerOptions) {
    for (const [key, value] of Object.entries(config.compilerOptions)) {
      const optionInfo = db.compilerOptions[key];
      
      if (optionInfo) {
        explanations.push({
          option: `compilerOptions.${key}`,
          value: formatValue(value),
          description: optionInfo.description,
          type: optionInfo.type
        });
      } else {
        explanations.push({
          option: `compilerOptions.${key}`,
          value: formatValue(value),
          description: '⚠️  Unknown option (not in database)'
        });
      }
    }
  }
  
  if (outputJson) {
    console.log(JSON.stringify(explanations, null, 2));
  } else {
    console.log(`\n📋 TSConfig Explanation: ${filePath}\n`);
    console.log('═'.repeat(60));
    
    for (const item of explanations) {
      console.log(`\n🔹 ${item.option}`);
      console.log(`   Value: ${item.value}`);
      console.log(`   ${item.description}`);
      if (item.type) {
        console.log(`   Type: ${item.type}`);
      }
    }
    
    console.log('\n' + '═'.repeat(60));
    console.log(`\n✅ Explained ${explanations.length} options\n`);
  }
}
