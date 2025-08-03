#!/usr/bin/env node

const { runAllTests } = require('./test/test-controllers');
const { runDatabaseDebug } = require('./debug/database-debug');
const { runAllApiTests } = require('./test/test-api-endpoints');

console.log('🧪 SISTEMA DE TESTING Y DEBUGGING');
console.log('==================================\n');

// Función para mostrar el menú
const showMenu = () => {
  console.log('📋 OPCIONES DISPONIBLES:');
  console.log('1. 🔧 Debugging de Base de Datos');
  console.log('2. 🧪 Tests de Controllers (Prisma)');
  console.log('3. 🌐 Tests de Endpoints de API');
  console.log('4. 🚀 Ejecutar TODOS los tests');
  console.log('5. ❌ Salir');
  console.log('\nSelecciona una opción (1-5):');
};

// Función para ejecutar debugging de base de datos
const runDatabaseDebugging = async () => {
  console.log('\n🔧 Iniciando debugging de base de datos...\n');
  await runDatabaseDebug();
};

// Función para ejecutar tests de controllers
const runControllerTests = async () => {
  console.log('\n🧪 Iniciando tests de controllers...\n');
  await runAllTests();
};

// Función para ejecutar tests de API
const runApiTests = async () => {
  console.log('\n🌐 Iniciando tests de endpoints de API...\n');
  console.log('⚠️  Asegúrate de que el servidor esté corriendo en http://localhost:3000');
  console.log('   Si no está corriendo, ejecuta: npm start\n');
  
  await runAllApiTests();
};

// Función para ejecutar todos los tests
const runAllTestsAndDebug = async () => {
  console.log('\n🚀 Ejecutando TODOS los tests y debugging...\n');
  
  console.log('📊 PASO 1: Debugging de Base de Datos');
  console.log('=======================================');
  await runDatabaseDebugging();
  
  console.log('\n📊 PASO 2: Tests de Controllers');
  console.log('================================');
  await runControllerTests();
  
  console.log('\n📊 PASO 3: Tests de Endpoints de API');
  console.log('=====================================');
  console.log('⚠️  Asegúrate de que el servidor esté corriendo en http://localhost:3000');
  console.log('   Si no está corriendo, ejecuta: npm start\n');
  await runApiTests();
  
  console.log('\n🎉 ¡TODOS LOS TESTS Y DEBUGGING COMPLETADOS!');
};

// Función principal
const main = async () => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const askQuestion = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };
  
  while (true) {
    showMenu();
    const choice = await askQuestion('');
    
    try {
      switch (choice.trim()) {
        case '1':
          await runDatabaseDebugging();
          break;
        case '2':
          await runControllerTests();
          break;
        case '3':
          await runApiTests();
          break;
        case '4':
          await runAllTestsAndDebug();
          break;
        case '5':
          console.log('\n👋 ¡Hasta luego!');
          rl.close();
          process.exit(0);
          break;
        default:
          console.log('\n❌ Opción inválida. Por favor selecciona 1-5.\n');
      }
    } catch (error) {
      console.error('\n❌ Error durante la ejecución:', error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
  }
};

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  runDatabaseDebugging,
  runControllerTests,
  runApiTests,
  runAllTestsAndDebug
}; 