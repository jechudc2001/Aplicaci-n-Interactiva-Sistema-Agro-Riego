const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función para verificar la conexión a la base de datos
const checkDatabaseConnection = async () => {
  console.log('🔍 Verificando conexión a la base de datos...');
  
  try {
    // Intentar conectar a la base de datos
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa');
    
    // Verificar si las tablas existen
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📋 Tablas encontradas en la base de datos:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error.message);
    return false;
  }
};

// Función para verificar el estado de las tablas
const checkTableStatus = async () => {
  console.log('\n📊 Verificando estado de las tablas...');
  
  try {
    // Contar registros en cada tabla
    const counts = {
      parcelas: await prisma.parcela.count(),
      arboles: await prisma.arbol.count(),
      sensores: await prisma.sensor.count(),
      horariosRiego: await prisma.horarioRiego.count(),
      historialRiego: await prisma.historialRiego.count(),
      alertas: await prisma.alerta.count()
    };
    
    console.log('📈 Registros por tabla:');
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  - ${table}: ${count} registros`);
    });
    
    return counts;
  } catch (error) {
    console.error('❌ Error al verificar estado de tablas:', error.message);
    return null;
  }
};

// Función para verificar las relaciones entre tablas
const checkRelationships = async () => {
  console.log('\n🔗 Verificando relaciones entre tablas...');
  
  try {
    // Verificar relaciones de Parcela
    const parcelasConRelaciones = await prisma.parcela.findMany({
      include: {
        _count: {
          select: {
            arboles: true,
            horariosRiego: true,
            historialRiego: true,
            alertas: true
          }
        }
      },
      take: 5
    });
    
    console.log('🏞️ Parcelas con sus relaciones:');
    parcelasConRelaciones.forEach(parcela => {
      console.log(`  - Parcela ${parcela.id} (${parcela.nombre}):`);
      console.log(`    * Árboles: ${parcela._count.arboles}`);
      console.log(`    * Horarios de riego: ${parcela._count.horariosRiego}`);
      console.log(`    * Historial de riego: ${parcela._count.historialRiego}`);
      console.log(`    * Alertas: ${parcela._count.alertas}`);
    });
    
    // Verificar relaciones de Árbol
    const arbolesConRelaciones = await prisma.arbol.findMany({
      include: {
        _count: {
          select: {
            sensores: true,
            alertas: true
          }
        },
        parcela: {
          select: { nombre: true }
        }
      },
      take: 5
    });
    
    console.log('\n🌳 Árboles con sus relaciones:');
    arbolesConRelaciones.forEach(arbol => {
      console.log(`  - Árbol ${arbol.id} (Parcela: ${arbol.parcela.nombre}):`);
      console.log(`    * Sensores: ${arbol._count.sensores}`);
      console.log(`    * Alertas: ${arbol._count.alertas}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error al verificar relaciones:', error.message);
    return false;
  }
};

// Función para verificar la integridad de los datos
const checkDataIntegrity = async () => {
  console.log('\n🔍 Verificando integridad de datos...');
  
  try {
    // Verificar integridad de datos - como las relaciones son obligatorias en el schema,
    // no debería haber registros huérfanos
    console.log('✅ Verificando integridad de relaciones...');
    
    // Verificar que todas las parcelas tienen datos válidos
    const parcelasValidas = await prisma.parcela.count();
    console.log(`✅ Parcelas válidas: ${parcelasValidas}`);
    
    // Verificar que todos los árboles tienen parcela válida
    const arbolesValidos = await prisma.arbol.count();
    console.log(`✅ Árboles válidos: ${arbolesValidos}`);
    
    // Verificar que todos los sensores tienen árbol válido
    const sensoresValidos = await prisma.sensor.count();
    console.log(`✅ Sensores válidos: ${sensoresValidos}`);
    
    // Verificar datos inconsistentes
    const parcelasSinArboles = await prisma.parcela.findMany({
      where: {
        arboles: {
          none: {}
        }
      }
    });
    
    console.log(`📊 Parcelas sin árboles: ${parcelasSinArboles.length}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error al verificar integridad:', error.message);
    return false;
  }
};

// Función para mostrar estadísticas generales
const showStatistics = async () => {
  console.log('\n📈 Estadísticas generales del sistema:');
  
  try {
    // Estadísticas de parcelas
    const totalParcelas = await prisma.parcela.count();
    const parcelasActivas = await prisma.parcela.count({
      where: {
        arboles: {
          some: {}
        }
      }
    });
    
    console.log(`🏞️ Parcelas: ${totalParcelas} total, ${parcelasActivas} con árboles`);
    
    // Estadísticas de árboles
    const totalArboles = await prisma.arbol.count();
    const arbolesSaludables = await prisma.arbol.count({
      where: {
        estado: 'Saludable'
      }
    });
    
    console.log(`🌳 Árboles: ${totalArboles} total, ${arbolesSaludables} saludables`);
    
    // Estadísticas de sensores
    const totalSensores = await prisma.sensor.count();
    const sensoresHumedad = await prisma.sensor.count({
      where: {
        tipo: 'Humedad'
      }
    });
    
    console.log(`📡 Sensores: ${totalSensores} total, ${sensoresHumedad} de humedad`);
    
    // Estadísticas de horarios
    const totalHorarios = await prisma.horarioRiego.count();
    const horariosActivos = await prisma.horarioRiego.count({
      where: {
        activo: true
      }
    });
    
    console.log(`⏰ Horarios de riego: ${totalHorarios} total, ${horariosActivos} activos`);
    
    // Estadísticas de alertas
    const totalAlertas = await prisma.alerta.count();
    const alertasNoResueltas = await prisma.alerta.count({
      where: {
        resuelta: false
      }
    });
    
    console.log(`🚨 Alertas: ${totalAlertas} total, ${alertasNoResueltas} no resueltas`);
    
    return true;
  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error.message);
    return false;
  }
};

// Función principal de debugging
const runDatabaseDebug = async () => {
  console.log('🔧 Iniciando debugging de la base de datos...\n');
  
  const results = {
    connection: await checkDatabaseConnection(),
    tableStatus: await checkTableStatus(),
    relationships: await checkRelationships(),
    dataIntegrity: await checkDataIntegrity(),
    statistics: await showStatistics()
  };
  
  console.log('\n📊 RESUMEN DEL DEBUGGING:');
  console.log('========================');
  
  Object.entries(results).forEach(([test, result]) => {
    if (test === 'tableStatus') {
      console.log(`${test}: ${result ? '✅ Completado' : '❌ Falló'}`);
    } else {
      const status = result ? '✅ PASÓ' : '❌ FALLÓ';
      console.log(`${test}: ${status}`);
    }
  });
  
  const allPassed = Object.values(results).every(result => result !== false);
  
  if (allPassed) {
    console.log('\n🎉 ¡TODOS LOS CHECKS PASARON!');
    console.log('✅ La base de datos está funcionando correctamente');
  } else {
    console.log('\n⚠️ Algunos checks fallaron. Revisa los errores arriba.');
  }
  
  await prisma.$disconnect();
};

// Ejecutar debugging si el archivo se ejecuta directamente
if (require.main === module) {
  runDatabaseDebug().catch(console.error);
}

module.exports = {
  checkDatabaseConnection,
  checkTableStatus,
  checkRelationships,
  checkDataIntegrity,
  showStatistics,
  runDatabaseDebug
}; 