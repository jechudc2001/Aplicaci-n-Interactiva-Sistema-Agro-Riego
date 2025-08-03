const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mock de request y response para testing
const createMockReqRes = (params = {}, body = {}, query = {}) => {
  const req = {
    params,
    body,
    query
  };
  
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis()
  };
  
  return { req, res };
};

// Tests para Parcela Controller
const testParcelaController = async () => {
  console.log('🧪 Testing Parcela Controller...');
  
  try {
    // Test 1: Crear parcela
    const parcelaData = {
      nombre: 'Parcela Test',
      ubicacion: 'Ubicación Test',
      filas: 5,
      columnas: 5,
      fecha_siembra: new Date(),
      cultivo_id: 'cultivo_test',
      epoca_id: 'epoca_test'
    };
    
    const parcela = await prisma.parcela.create({
      data: parcelaData
    });
    
    console.log('✅ Parcela creada:', parcela.id);
    
    // Test 2: Obtener parcela por ID
    const parcelaFound = await prisma.parcela.findUnique({
      where: { id: parcela.id },
      include: {
        arboles: true,
        horariosRiego: true,
        historialRiego: true,
        alertas: true
      }
    });
    
    if (parcelaFound) {
      console.log('✅ Parcela encontrada por ID');
    }
    
    // Test 3: Actualizar parcela
    const updatedParcela = await prisma.parcela.update({
      where: { id: parcela.id },
      data: { nombre: 'Parcela Test Actualizada' }
    });
    
    console.log('✅ Parcela actualizada');
    
    // Test 4: Obtener parcelas por cultivo
    const parcelasByCultivo = await prisma.parcela.findMany({
      where: { cultivo_id: 'cultivo_test' }
    });
    
    console.log('✅ Parcelas por cultivo encontradas:', parcelasByCultivo.length);
    
    // Test 5: Eliminar parcela
    await prisma.parcela.delete({
      where: { id: parcela.id }
    });
    
    console.log('✅ Parcela eliminada');
    
    return true;
  } catch (error) {
    console.error('❌ Error en test de Parcela:', error.message);
    return false;
  }
};

// Tests para Arbol Controller
const testArbolController = async () => {
  console.log('🧪 Testing Arbol Controller...');
  
  try {
    // Primero crear una parcela para el árbol
    const parcela = await prisma.parcela.create({
      data: {
        nombre: 'Parcela para Árbol Test',
        ubicacion: 'Ubicación Test',
        filas: 3,
        columnas: 3,
        fecha_siembra: new Date(),
        cultivo_id: 'cultivo_test',
        epoca_id: 'epoca_test'
      }
    });
    
    // Test 1: Crear árbol
    const arbolData = {
      parcela_id: parcela.id,
      fila: 1,
      columna: 1,
      estado: 'Saludable',
      comentario_estado: 'Árbol en buen estado'
    };
    
    const arbol = await prisma.arbol.create({
      data: arbolData,
      include: { parcela: true }
    });
    
    console.log('✅ Árbol creado:', arbol.id);
    
    // Test 2: Obtener árbol por ID
    const arbolFound = await prisma.arbol.findUnique({
      where: { id: arbol.id },
      include: {
        parcela: true,
        sensores: true,
        alertas: true
      }
    });
    
    if (arbolFound) {
      console.log('✅ Árbol encontrado por ID');
    }
    
    // Test 3: Obtener árboles por parcela
    const arbolesByParcela = await prisma.arbol.findMany({
      where: { parcela_id: parcela.id }
    });
    
    console.log('✅ Árboles por parcela encontrados:', arbolesByParcela.length);
    
    // Test 4: Actualizar árbol
    const updatedArbol = await prisma.arbol.update({
      where: { id: arbol.id },
      data: { estado: 'En observación' }
    });
    
    console.log('✅ Árbol actualizado');
    
    // Test 5: Eliminar árbol
    await prisma.arbol.delete({
      where: { id: arbol.id }
    });
    
    console.log('✅ Árbol eliminado');
    
    // Limpiar parcela
    await prisma.parcela.delete({
      where: { id: parcela.id }
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error en test de Arbol:', error.message);
    return false;
  }
};

// Tests para Sensor Controller
const testSensorController = async () => {
  console.log('🧪 Testing Sensor Controller...');
  
  try {
    // Crear parcela y árbol para el sensor
    const parcela = await prisma.parcela.create({
      data: {
        nombre: 'Parcela para Sensor Test',
        ubicacion: 'Ubicación Test',
        filas: 2,
        columnas: 2,
        fecha_siembra: new Date(),
        cultivo_id: 'cultivo_test',
        epoca_id: 'epoca_test'
      }
    });
    
    const arbol = await prisma.arbol.create({
      data: {
        parcela_id: parcela.id,
        fila: 1,
        columna: 1,
        estado: 'Saludable'
      }
    });
    
    // Test 1: Crear sensor
    const sensorData = {
      arbol_id: arbol.id,
      tipo: 'Humedad',
      firebase_path: 'sensors/humedad/1'
    };
    
    const sensor = await prisma.sensor.create({
      data: sensorData,
      include: {
        arbol: {
          include: { parcela: true }
        }
      }
    });
    
    console.log('✅ Sensor creado:', sensor.id);
    
    // Test 2: Obtener sensor por ID
    const sensorFound = await prisma.sensor.findUnique({
      where: { id: sensor.id },
      include: {
        arbol: {
          include: { parcela: true }
        },
        alertas: true
      }
    });
    
    if (sensorFound) {
      console.log('✅ Sensor encontrado por ID');
    }
    
    // Test 3: Obtener sensores por árbol
    const sensoresByArbol = await prisma.sensor.findMany({
      where: { arbol_id: arbol.id }
    });
    
    console.log('✅ Sensores por árbol encontrados:', sensoresByArbol.length);
    
    // Test 4: Obtener sensores por tipo
    const sensoresByTipo = await prisma.sensor.findMany({
      where: { tipo: 'Humedad' }
    });
    
    console.log('✅ Sensores por tipo encontrados:', sensoresByTipo.length);
    
    // Test 5: Actualizar sensor
    const updatedSensor = await prisma.sensor.update({
      where: { id: sensor.id },
      data: { tipo: 'Temperatura' }
    });
    
    console.log('✅ Sensor actualizado');
    
    // Test 6: Eliminar sensor
    await prisma.sensor.delete({
      where: { id: sensor.id }
    });
    
    console.log('✅ Sensor eliminado');
    
    // Limpiar
    await prisma.arbol.delete({ where: { id: arbol.id } });
    await prisma.parcela.delete({ where: { id: parcela.id } });
    
    return true;
  } catch (error) {
    console.error('❌ Error en test de Sensor:', error.message);
    return false;
  }
};

// Tests para HorarioRiego Controller
const testHorarioRiegoController = async () => {
  console.log('🧪 Testing HorarioRiego Controller...');
  
  try {
    // Crear parcela para el horario
    const parcela = await prisma.parcela.create({
      data: {
        nombre: 'Parcela para Horario Test',
        ubicacion: 'Ubicación Test',
        filas: 2,
        columnas: 2,
        fecha_siembra: new Date(),
        cultivo_id: 'cultivo_test',
        epoca_id: 'epoca_test'
      }
    });
    
    // Test 1: Crear horario de riego
    const horarioData = {
      parcela_id: parcela.id,
      dias_semana: ['Lunes', 'Miércoles', 'Viernes'],
      hora_riego: '06:00',
      activo: true
    };
    
    const horario = await prisma.horarioRiego.create({
      data: horarioData,
      include: { parcela: true }
    });
    
    console.log('✅ Horario de riego creado:', horario.id);
    
    // Test 2: Obtener horario por ID
    const horarioFound = await prisma.horarioRiego.findUnique({
      where: { id: horario.id },
      include: { parcela: true }
    });
    
    if (horarioFound) {
      console.log('✅ Horario encontrado por ID');
    }
    
    // Test 3: Obtener horarios por parcela
    const horariosByParcela = await prisma.horarioRiego.findMany({
      where: { parcela_id: parcela.id }
    });
    
    console.log('✅ Horarios por parcela encontrados:', horariosByParcela.length);
    
    // Test 4: Obtener horarios activos
    const horariosActivos = await prisma.horarioRiego.findMany({
      where: { activo: true }
    });
    
    console.log('✅ Horarios activos encontrados:', horariosActivos.length);
    
    // Test 5: Actualizar horario
    const updatedHorario = await prisma.horarioRiego.update({
      where: { id: horario.id },
      data: { activo: false }
    });
    
    console.log('✅ Horario actualizado');
    
    // Test 6: Eliminar horario
    await prisma.horarioRiego.delete({
      where: { id: horario.id }
    });
    
    console.log('✅ Horario eliminado');
    
    // Limpiar
    await prisma.parcela.delete({ where: { id: parcela.id } });
    
    return true;
  } catch (error) {
    console.error('❌ Error en test de HorarioRiego:', error.message);
    return false;
  }
};

// Tests para HistorialRiego Controller
const testHistorialRiegoController = async () => {
  console.log('🧪 Testing HistorialRiego Controller...');
  
  try {
    // Crear parcela para el historial
    const parcela = await prisma.parcela.create({
      data: {
        nombre: 'Parcela para Historial Test',
        ubicacion: 'Ubicación Test',
        filas: 2,
        columnas: 2,
        fecha_siembra: new Date(),
        cultivo_id: 'cultivo_test',
        epoca_id: 'epoca_test'
      }
    });
    
    // Test 1: Crear registro de historial
    const historialData = {
      parcela_id: parcela.id,
      litros_recomendados: 100.5,
      litros_aplicados: 95.0,
      fecha_hora_riego: new Date(),
      estado: 'Completado'
    };
    
    const historial = await prisma.historialRiego.create({
      data: historialData,
      include: { parcela: true }
    });
    
    console.log('✅ Registro de historial creado:', historial.id);
    
    // Test 2: Obtener historial por ID
    const historialFound = await prisma.historialRiego.findUnique({
      where: { id: historial.id },
      include: { parcela: true }
    });
    
    if (historialFound) {
      console.log('✅ Historial encontrado por ID');
    }
    
    // Test 3: Obtener historial por parcela
    const historialByParcela = await prisma.historialRiego.findMany({
      where: { parcela_id: parcela.id },
      orderBy: { fecha_hora_riego: 'desc' }
    });
    
    console.log('✅ Historial por parcela encontrado:', historialByParcela.length);
    
    // Test 4: Obtener historial por estado
    const historialByEstado = await prisma.historialRiego.findMany({
      where: { estado: 'Completado' }
    });
    
    console.log('✅ Historial por estado encontrado:', historialByEstado.length);
    
    // Test 5: Actualizar historial
    const updatedHistorial = await prisma.historialRiego.update({
      where: { id: historial.id },
      data: { litros_aplicados: 98.0 }
    });
    
    console.log('✅ Historial actualizado');
    
    // Test 6: Eliminar historial
    await prisma.historialRiego.delete({
      where: { id: historial.id }
    });
    
    console.log('✅ Historial eliminado');
    
    // Limpiar
    await prisma.parcela.delete({ where: { id: parcela.id } });
    
    return true;
  } catch (error) {
    console.error('❌ Error en test de HistorialRiego:', error.message);
    return false;
  }
};

// Tests para Alerta Controller
const testAlertaController = async () => {
  console.log('🧪 Testing Alerta Controller...');
  
  try {
    // Crear parcela, árbol y sensor para la alerta
    const parcela = await prisma.parcela.create({
      data: {
        nombre: 'Parcela para Alerta Test',
        ubicacion: 'Ubicación Test',
        filas: 2,
        columnas: 2,
        fecha_siembra: new Date(),
        cultivo_id: 'cultivo_test',
        epoca_id: 'epoca_test'
      }
    });
    
    const arbol = await prisma.arbol.create({
      data: {
        parcela_id: parcela.id,
        fila: 1,
        columna: 1,
        estado: 'Saludable'
      }
    });
    
    const sensor = await prisma.sensor.create({
      data: {
        arbol_id: arbol.id,
        tipo: 'Humedad',
        firebase_path: 'sensors/humedad/1'
      }
    });
    
    // Test 1: Crear alerta
    const alertaData = {
      tipo: 'Baja humedad',
      mensaje: 'El sensor detectó humedad baja',
      severidad: 'Media',
      sensor_id: sensor.id,
      arbol_id: arbol.id,
      parcela_id: parcela.id,
      resuelta: false,
      fecha_hora: new Date()
    };
    
    const alerta = await prisma.alerta.create({
      data: alertaData,
      include: {
        sensor: {
          include: {
            arbol: {
              include: { parcela: true }
            }
          }
        },
        arbol: {
          include: { parcela: true }
        },
        parcela: true
      }
    });
    
    console.log('✅ Alerta creada:', alerta.id);
    
    // Test 2: Obtener alerta por ID
    const alertaFound = await prisma.alerta.findUnique({
      where: { id: alerta.id },
      include: {
        sensor: {
          include: {
            arbol: {
              include: { parcela: true }
            }
          }
        },
        arbol: {
          include: { parcela: true }
        },
        parcela: true
      }
    });
    
    if (alertaFound) {
      console.log('✅ Alerta encontrada por ID');
    }
    
    // Test 3: Obtener alertas por tipo
    const alertasByTipo = await prisma.alerta.findMany({
      where: { tipo: 'Baja humedad' }
    });
    
    console.log('✅ Alertas por tipo encontradas:', alertasByTipo.length);
    
    // Test 4: Obtener alertas por severidad
    const alertasBySeveridad = await prisma.alerta.findMany({
      where: { severidad: 'Media' }
    });
    
    console.log('✅ Alertas por severidad encontradas:', alertasBySeveridad.length);
    
    // Test 5: Obtener alertas no resueltas
    const alertasNoResueltas = await prisma.alerta.findMany({
      where: { resuelta: false }
    });
    
    console.log('✅ Alertas no resueltas encontradas:', alertasNoResueltas.length);
    
    // Test 6: Marcar alerta como resuelta
    const alertaResuelta = await prisma.alerta.update({
      where: { id: alerta.id },
      data: { resuelta: true }
    });
    
    console.log('✅ Alerta marcada como resuelta');
    
    // Test 7: Eliminar alerta
    await prisma.alerta.delete({
      where: { id: alerta.id }
    });
    
    console.log('✅ Alerta eliminada');
    
    // Limpiar
    await prisma.sensor.delete({ where: { id: sensor.id } });
    await prisma.arbol.delete({ where: { id: arbol.id } });
    await prisma.parcela.delete({ where: { id: parcela.id } });
    
    return true;
  } catch (error) {
    console.error('❌ Error en test de Alerta:', error.message);
    return false;
  }
};

// Función principal de testing
const runAllTests = async () => {
  console.log('🚀 Iniciando tests de controllers...\n');
  
  const results = {
    parcela: await testParcelaController(),
    arbol: await testArbolController(),
    sensor: await testSensorController(),
    horarioRiego: await testHorarioRiegoController(),
    historialRiego: await testHistorialRiegoController(),
    alerta: await testAlertaController()
  };
  
  console.log('\n📊 RESULTADOS DE LOS TESTS:');
  console.log('========================');
  
  Object.entries(results).forEach(([controller, success]) => {
    const status = success ? '✅ PASÓ' : '❌ FALLÓ';
    console.log(`${controller}: ${status}`);
  });
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 ¡TODOS LOS TESTS PASARON!');
  } else {
    console.log('\n⚠️ Algunos tests fallaron. Revisa los errores arriba.');
  }
  
  await prisma.$disconnect();
};

// Ejecutar tests si el archivo se ejecuta directamente
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testParcelaController,
  testArbolController,
  testSensorController,
  testHorarioRiegoController,
  testHistorialRiegoController,
  testAlertaController,
  runAllTests
}; 