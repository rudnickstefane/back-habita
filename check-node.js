// scripts/check-node.js
const { execSync } = require('child_process');

// Versões requeridas
const REQUIRED_NODE = '24.11.1';
const REQUIRED_PNPM = '10.23.0';

// Função para comparar versões
function versionToNumbers(version) {
  return version.split('.').map(Number);
}

function isVersionCompatible(current, required) {
  const currentParts = versionToNumbers(current);
  const requiredParts = versionToNumbers(required);
  
  for (let i = 0; i < requiredParts.length; i++) {
    if (currentParts[i] > requiredParts[i]) return true;
    if (currentParts[i] < requiredParts[i]) return false;
  }
  return true;
}

// Verificar Node.js
const currentNode = process.version.slice(1);
console.log('🔍 Verificando versões...');
console.log('   Node.js atual:', currentNode);

if (!isVersionCompatible(currentNode, REQUIRED_NODE)) {
  console.error('\n❌ ERRO: Versão do Node.js incompatível!');
  console.error('   Requerido: >=' + REQUIRED_NODE);
  console.error('   Atual: ' + currentNode);
  console.error('\n   Comandos para corrigir:');
  console.error('     nvm install 24.11.1');
  console.error('     nvm use 24.11.1');
  console.error('     nvm alias default 24.11.1');
  process.exit(1);
}

console.log('✅ Node.js versão compatível:', currentNode);

// Verificar pnpm
try {
  const pnpmVersionOutput = execSync('pnpm --version', { encoding: 'utf8' }).trim();
  const currentPnpm = pnpmVersionOutput.split('\n')[0]; // Pega apenas a primeira linha
  console.log('   pnpm atual:', currentPnpm);

  if (!isVersionCompatible(currentPnpm, REQUIRED_PNPM)) {
    console.error('\n❌ ERRO: Versão do pnpm incompatível!');
    console.error('   Requerido: >=' + REQUIRED_PNPM);
    console.error('   Atual: ' + currentPnpm);
    console.error('\n   Comandos para corrigir:');
    console.error('     npm install -g pnpm@latest');
    console.error('     corepack enable pnpm');
    console.error('     corepack prepare pnpm@latest --activate');
    process.exit(1);
  }

  console.log('✅ pnpm versão compatível:', currentPnpm);
  console.log('\n🎉 Todas as versões estão compatíveis! Prosseguindo com a instalação...');

} catch (error) {
  console.error('\n❌ ERRO: pnpm não encontrado!');
  console.error('   Instale o pnpm globalmente:');
  console.error('     npm install -g pnpm');
  console.error('   Ou use corepack:');
  console.error('     corepack enable pnpm');
  console.error('     corepack prepare pnpm@latest --activate');
  process.exit(1);
}