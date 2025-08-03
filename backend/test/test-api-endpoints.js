const axios = require('axios');

// Configuración base
const BASE_URL = 'http://localhost:3000/api';
const API_TIMEOUT = 5000;

// Función para hacer requests con manejo de errores
const makeRequest = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.message, 
      status: error.response?.status || 'No response'
    };
  }
};

// Tests para endpoints de Parcelas
const testParcelasEndpoints = async () => {
  console.log('🏞️ Testing Parcelas endpoints...');
  
  const results = [];
  
  // Test 1: GET /parcelas
  console.log('  Testing GET /parcelas...');
  const getAllParcelas = await makeRequest('GET', '/parcelas');
  results.push({ test: 'GET /parcelas', ...getAllParcelas });
  
  // Test 2: POST /parcelas (crear parcela)
  console.log('  Testing POST /parcelas...');
  const parcelaData = {
    nombre: 'Parcela Test API',
    ubicacion: 'Ubicación Test API',
    filas: 5,
    columnas: 5,
    fecha_siembra: new Date().toISOString(),
    cultivo_id: 'cultivo_test_api',
    epoca_id: 'epoca_test_api'
  };
  
  const createParcela = await makeRequest('POST', '/parcelas', parcelaData);
  results.push({ test: 'POST /parcelas', ...createParcela });
  
  let parcelaId = null;
  if (createParcela.success && createParcela.data) {
    parcelaId = createParcela.data.id;
    
    // Test 3: GET /parcelas/:id
    console.log('  Testing GET /parcelas/:id...');
    const getParcelaById = await makeRequest('GET', `/parcelas/${parcelaId}`);
    results.push({ test: 'GET /parcelas/:id', ...getParcelaById });
    
    // Test 4: PUT /parcelas/:id
    console.log('  Testing PUT /parcelas/:id...');
    const updateData = { nombre: 'Parcela Test API Actualizada' };
    const updateParcela = await makeRequest('PUT', `/parcelas/${parcelaId}`, updateData);
    results.push({ test: 'PUT /parcelas/:id', ...updateParcela });
    
    // Test 5: GET /parcelas/cultivo/:cultivoId
    console.log('  Testing GET /parcelas/cultivo/:cultivoId...');
    const getParcelasByCultivo = await makeRequest('GET', '/parcelas/cultivo/cultivo_test_api');
    results.push({ test: 'GET /parcelas/cultivo/:cultivoId', ...getParcelasByCultivo });
    
    // Test 6: DELETE /parcelas/:id
    console.log('  Testing DELETE /parcelas/:id...');
    const deleteParcela = await makeRequest('DELETE', `/parcelas/${parcelaId}`);
    results.push({ test: 'DELETE /parcelas/:id', ...deleteParcela });
  }
  
  return results;
};

// Tests para endpoints de Árboles
const testArbolesEndpoints = async () => {
  console.log('🌳 Testing Árboles endpoints...');
  
  const results = [];
  
  // Primero crear una parcela para los árboles
  const parcelaData = {
    nombre: 'Parcela para Árboles Test',
    ubicacion: 'Ubicación Test',
    filas: 3,
    columnas: 3,
    fecha_siembra: new Date().toISOString(),
    cultivo_id: 'cultivo_test',
    epoca_id: 'epoca_test'
  };
  
  const createParcela = await makeRequest('POST', '/parcelas', parcelaData);
  let parcelaId = null;
  
  if (createParcela.success && createParcela.data) {
    parcelaId = createParcela.data.id;
    
    // Test 1: GET /arboles
    console.log('  Testing GET /arboles...');
    const getAllArboles = await makeRequest('GET', '/arboles');
    results.push({ test: 'GET /arboles', ...getAllArboles });
    
    // Test 2: POST /arboles (crear árbol)
    console.log('  Testing POST /arboles...');
    const arbolData = {
      parcela_id: parcelaId,
      fila: 1,
      columna: 1,
      estado: 'Saludable',
      comentario_estado: 'Árbol en buen estado'
    };
    
    const createArbol = await makeRequest('POST', '/arboles', arbolData);
    results.push({ test: 'POST /arboles', ...createArbol });
    
    let arbolId = null;
    if (createArbol.success && createArbol.data) {
      arbolId = createArbol.data.id;
      
      // Test 3: GET /arboles/:id
      console.log('  Testing GET /arboles/:id...');
      const getArbolById = await makeRequest('GET', `/arboles/${arbolId}`);
      results.push({ test: 'GET /arboles/:id', ...getArbolById });
      
      // Test 4: GET /arboles/parcela/:parcelaId
      console.log('  Testing GET /arboles/parcela/:parcelaId...');
      const getArbolesByParcela = await makeRequest('GET', `/arboles/parcela/${parcelaId}`);
      results.push({ test: 'GET /arboles/parcela/:parcelaId', ...getArbolesByParcela });
      
      // Test 5: PUT /arboles/:id
      console.log('  Testing PUT /arboles/:id...');
      const updateData = { estado: 'En observación' };
      const updateArbol = await makeRequest('PUT', `/arboles/${arbolId}`, updateData);
      results.push({ test: 'PUT /arboles/:id', ...updateArbol });
      
      // Test 6: DELETE /arboles/:id
      console.log('  Testing DELETE /arboles/:id...');
      const deleteArbol = await makeRequest('DELETE', `/arboles/${arbolId}`);
      results.push({ test: 'DELETE /arboles/:id', ...deleteArbol });
    }
    
    // Limpiar parcela
    await makeRequest('DELETE', `/parcelas/${parcelaId}`);
  }
  
  return results;
};

// Tests para endpoints de Sensores
const testSensoresEndpoints = async () => {
  console.log('📡 Testing Sensores endpoints...');
  
  const results = [];
  
  // Crear parcela y árbol para los sensores
  const parcelaData = {
    nombre: 'Parcela para Sensores Test',
    ubicacion: 'Ubicación Test',
    filas: 2,
    columnas: 2,
    fecha_siembra: new Date().toISOString(),
    cultivo_id: 'cultivo_test',
    epoca_id: 'epoca_test'
  };
  
  const createParcela = await makeRequest('POST', '/parcelas', parcelaData);
  let parcelaId = null;
  let arbolId = null;
  
  if (createParcela.success && createParcela.data) {
    parcelaId = createParcela.data.id;
    
    const arbolData = {
      parcela_id: parcelaId,
      fila: 1,
      columna: 1,
      estado: 'Saludable'
    };
    
    const createArbol = await makeRequest('POST', '/arboles', arbolData);
    
    if (createArbol.success && createArbol.data) {
      arbolId = createArbol.data.id;
      
      // Test 1: GET /sensores
      console.log('  Testing GET /sensores...');
      const getAllSensores = await makeRequest('GET', '/sensores');
      results.push({ test: 'GET /sensores', ...getAllSensores });
      
      // Test 2: POST /sensores (crear sensor)
      console.log('  Testing POST /sensores...');
      const sensorData = {
        arbol_id: arbolId,
        tipo: 'Humedad',
        firebase_path: 'sensors/humedad/1'
      };
      
      const createSensor = await makeRequest('POST', '/sensores', sensorData);
      results.push({ test: 'POST /sensores', ...createSensor });
      
      let sensorId = null;
      if (createSensor.success && createSensor.data) {
        sensorId = createSensor.data.id;
        
        // Test 3: GET /sensores/:id
        console.log('  Testing GET /sensores/:id...');
        const getSensorById = await makeRequest('GET', `/sensores/${sensorId}`);
        results.push({ test: 'GET /sensores/:id', ...getSensorById });
        
        // Test 4: GET /sensores/arbol/:arbolId
        console.log('  Testing GET /sensores/arbol/:arbolId...');
        const getSensoresByArbol = await makeRequest('GET', `/sensores/arbol/${arbolId}`);
        results.push({ test: 'GET /sensores/arbol/:arbolId', ...getSensoresByArbol });
        
        // Test 5: GET /sensores/tipo/:tipo
        console.log('  Testing GET /sensores/tipo/:tipo...');
        const getSensoresByTipo = await makeRequest('GET', '/sensores/tipo/Humedad');
        results.push({ test: 'GET /sensores/tipo/:tipo', ...getSensoresByTipo });
        
        // Test 6: PUT /sensores/:id
        console.log('  Testing PUT /sensores/:id...');
        const updateData = { tipo: 'Temperatura' };
        const updateSensor = await makeRequest('PUT', `/sensores/${sensorId}`, updateData);
        results.push({ test: 'PUT /sensores/:id', ...updateSensor });
        
        // Test 7: DELETE /sensores/:id
        console.log('  Testing DELETE /sensores/:id...');
        const deleteSensor = await makeRequest('DELETE', `/sensores/${sensorId}`);
        results.push({ test: 'DELETE /sensores/:id', ...deleteSensor });
      }
      
      // Limpiar
      await makeRequest('DELETE', `/arboles/${arbolId}`);
    }
    
    await makeRequest('DELETE', `/parcelas/${parcelaId}`);
  }
  
  return results;
};

// Tests para endpoints de Horarios de Riego
const testHorariosEndpoints = async () => {
  console.log('⏰ Testing Horarios de Riego endpoints...');
  
  const results = [];
  
  // Crear parcela para los horarios
  const parcelaData = {
    nombre: 'Parcela para Horarios Test',
    ubicacion: 'Ubicación Test',
    filas: 2,
    columnas: 2,
    fecha_siembra: new Date().toISOString(),
    cultivo_id: 'cultivo_test',
    epoca_id: 'epoca_test'
  };
  
  const createParcela = await makeRequest('POST', '/parcelas', parcelaData);
  let parcelaId = null;
  
  if (createParcela.success && createParcela.data) {
    parcelaId = createParcela.data.id;
    
    // Test 1: GET /horarios
    console.log('  Testing GET /horarios...');
    const getAllHorarios = await makeRequest('GET', '/horarios');
    results.push({ test: 'GET /horarios', ...getAllHorarios });
    
    // Test 2: GET /horarios/activos
    console.log('  Testing GET /horarios/activos...');
    const getHorariosActivos = await makeRequest('GET', '/horarios/activos');
    results.push({ test: 'GET /horarios/activos', ...getHorariosActivos });
    
    // Test 3: POST /horarios (crear horario)
    console.log('  Testing POST /horarios...');
    const horarioData = {
      parcela_id: parcelaId,
      dias_semana: ['Lunes', 'Miércoles', 'Viernes'],
      hora_riego: '06:00',
      activo: true
    };
    
    const createHorario = await makeRequest('POST', '/horarios', horarioData);
    results.push({ test: 'POST /horarios', ...createHorario });
    
    let horarioId = null;
    if (createHorario.success && createHorario.data) {
      horarioId = createHorario.data.id;
      
      // Test 4: GET /horarios/:id
      console.log('  Testing GET /horarios/:id...');
      const getHorarioById = await makeRequest('GET', `/horarios/${horarioId}`);
      results.push({ test: 'GET /horarios/:id', ...getHorarioById });
      
      // Test 5: GET /horarios/parcela/:parcelaId
      console.log('  Testing GET /horarios/parcela/:parcelaId...');
      const getHorariosByParcela = await makeRequest('GET', `/horarios/parcela/${parcelaId}`);
      results.push({ test: 'GET /horarios/parcela/:parcelaId', ...getHorariosByParcela });
      
      // Test 6: PUT /horarios/:id
      console.log('  Testing PUT /horarios/:id...');
      const updateData = { activo: false };
      const updateHorario = await makeRequest('PUT', `/horarios/${horarioId}`, updateData);
      results.push({ test: 'PUT /horarios/:id', ...updateHorario });
      
      // Test 7: PATCH /horarios/:id/toggle
      console.log('  Testing PATCH /horarios/:id/toggle...');
      const toggleData = { activo: true };
      const toggleHorario = await makeRequest('PATCH', `/horarios/${horarioId}/toggle`, toggleData);
      results.push({ test: 'PATCH /horarios/:id/toggle', ...toggleHorario });
      
      // Test 8: DELETE /horarios/:id
      console.log('  Testing DELETE /horarios/:id...');
      const deleteHorario = await makeRequest('DELETE', `/horarios/${horarioId}`);
      results.push({ test: 'DELETE /horarios/:id', ...deleteHorario });
    }
    
    // Limpiar
    await makeRequest('DELETE', `/parcelas/${parcelaId}`);
  }
  
  return results;
};

// Tests para endpoints de Historial de Riego
const testHistorialEndpoints = async () => {
  console.log('📊 Testing Historial de Riego endpoints...');
  
  const results = [];
  
  // Crear parcela para el historial
  const parcelaData = {
    nombre: 'Parcela para Historial Test',
    ubicacion: 'Ubicación Test',
    filas: 2,
    columnas: 2,
    fecha_siembra: new Date().toISOString(),
    cultivo_id: 'cultivo_test',
    epoca_id: 'epoca_test'
  };
  
  const createParcela = await makeRequest('POST', '/parcelas', parcelaData);
  let parcelaId = null;
  
  if (createParcela.success && createParcela.data) {
    parcelaId = createParcela.data.id;
    
    // Test 1: GET /historial
    console.log('  Testing GET /historial...');
    const getAllHistorial = await makeRequest('GET', '/historial');
    results.push({ test: 'GET /historial', ...getAllHistorial });
    
    // Test 2: POST /historial (crear registro)
    console.log('  Testing POST /historial...');
    const historialData = {
      parcela_id: parcelaId,
      litros_recomendados: 100.5,
      litros_aplicados: 95.0,
      fecha_hora_riego: new Date().toISOString(),
      estado: 'Completado'
    };
    
    const createHistorial = await makeRequest('POST', '/historial', historialData);
    results.push({ test: 'POST /historial', ...createHistorial });
    
    let historialId = null;
    if (createHistorial.success && createHistorial.data) {
      historialId = createHistorial.data.id;
      
      // Test 3: GET /historial/:id
      console.log('  Testing GET /historial/:id...');
      const getHistorialById = await makeRequest('GET', `/historial/${historialId}`);
      results.push({ test: 'GET /historial/:id', ...getHistorialById });
      
      // Test 4: GET /historial/parcela/:parcelaId
      console.log('  Testing GET /historial/parcela/:parcelaId...');
      const getHistorialByParcela = await makeRequest('GET', `/historial/parcela/${parcelaId}`);
      results.push({ test: 'GET /historial/parcela/:parcelaId', ...getHistorialByParcela });
      
      // Test 5: GET /historial/estado/:estado
      console.log('  Testing GET /historial/estado/:estado...');
      const getHistorialByEstado = await makeRequest('GET', '/historial/estado/Completado');
      results.push({ test: 'GET /historial/estado/:estado', ...getHistorialByEstado });
      
      // Test 6: PUT /historial/:id
      console.log('  Testing PUT /historial/:id...');
      const updateData = { litros_aplicados: 98.0 };
      const updateHistorial = await makeRequest('PUT', `/historial/${historialId}`, updateData);
      results.push({ test: 'PUT /historial/:id', ...updateHistorial });
      
      // Test 7: DELETE /historial/:id
      console.log('  Testing DELETE /historial/:id...');
      const deleteHistorial = await makeRequest('DELETE', `/historial/${historialId}`);
      results.push({ test: 'DELETE /historial/:id', ...deleteHistorial });
    }
    
    // Limpiar
    await makeRequest('DELETE', `/parcelas/${parcelaId}`);
  }
  
  return results;
};

// Tests para endpoints de Alertas
const testAlertasEndpoints = async () => {
  console.log('🚨 Testing Alertas endpoints...');
  
  const results = [];
  
  // Crear parcela, árbol y sensor para las alertas
  const parcelaData = {
    nombre: 'Parcela para Alertas Test',
    ubicacion: 'Ubicación Test',
    filas: 2,
    columnas: 2,
    fecha_siembra: new Date().toISOString(),
    cultivo_id: 'cultivo_test',
    epoca_id: 'epoca_test'
  };
  
  const createParcela = await makeRequest('POST', '/parcelas', parcelaData);
  let parcelaId = null;
  let arbolId = null;
  let sensorId = null;
  
  if (createParcela.success && createParcela.data) {
    parcelaId = createParcela.data.id;
    
    const arbolData = {
      parcela_id: parcelaId,
      fila: 1,
      columna: 1,
      estado: 'Saludable'
    };
    
    const createArbol = await makeRequest('POST', '/arboles', arbolData);
    
    if (createArbol.success && createArbol.data) {
      arbolId = createArbol.data.id;
      
      const sensorData = {
        arbol_id: arbolId,
        tipo: 'Humedad',
        firebase_path: 'sensors/humedad/1'
      };
      
      const createSensor = await makeRequest('POST', '/sensores', sensorData);
      
      if (createSensor.success && createSensor.data) {
        sensorId = createSensor.data.id;
        
        // Test 1: GET /alertas
        console.log('  Testing GET /alertas...');
        const getAllAlertas = await makeRequest('GET', '/alertas');
        results.push({ test: 'GET /alertas', ...getAllAlertas });
        
        // Test 2: GET /alertas/no-resueltas
        console.log('  Testing GET /alertas/no-resueltas...');
        const getAlertasNoResueltas = await makeRequest('GET', '/alertas/no-resueltas');
        results.push({ test: 'GET /alertas/no-resueltas', ...getAlertasNoResueltas });
        
        // Test 3: POST /alertas (crear alerta)
        console.log('  Testing POST /alertas...');
        const alertaData = {
          tipo: 'Baja humedad',
          mensaje: 'El sensor detectó humedad baja',
          severidad: 'Media',
          sensor_id: sensorId,
          arbol_id: arbolId,
          parcela_id: parcelaId,
          resuelta: false,
          fecha_hora: new Date().toISOString()
        };
        
        const createAlerta = await makeRequest('POST', '/alertas', alertaData);
        results.push({ test: 'POST /alertas', ...createAlerta });
        
        let alertaId = null;
        if (createAlerta.success && createAlerta.data) {
          alertaId = createAlerta.data.id;
          
          // Test 4: GET /alertas/:id
          console.log('  Testing GET /alertas/:id...');
          const getAlertaById = await makeRequest('GET', `/alertas/${alertaId}`);
          results.push({ test: 'GET /alertas/:id', ...getAlertaById });
          
          // Test 5: GET /alertas/tipo/:tipo
          console.log('  Testing GET /alertas/tipo/:tipo...');
          const getAlertasByTipo = await makeRequest('GET', '/alertas/tipo/Baja humedad');
          results.push({ test: 'GET /alertas/tipo/:tipo', ...getAlertasByTipo });
          
          // Test 6: GET /alertas/severidad/:severidad
          console.log('  Testing GET /alertas/severidad/:severidad...');
          const getAlertasBySeveridad = await makeRequest('GET', '/alertas/severidad/Media');
          results.push({ test: 'GET /alertas/severidad/:severidad', ...getAlertasBySeveridad });
          
          // Test 7: PUT /alertas/:id
          console.log('  Testing PUT /alertas/:id...');
          const updateData = { resuelta: true };
          const updateAlerta = await makeRequest('PUT', `/alertas/${alertaId}`, updateData);
          results.push({ test: 'PUT /alertas/:id', ...updateAlerta });
          
          // Test 8: PATCH /alertas/:id/resolver
          console.log('  Testing PATCH /alertas/:id/resolver...');
          const resolverData = { resuelta: false };
          const resolverAlerta = await makeRequest('PATCH', `/alertas/${alertaId}/resolver`, resolverData);
          results.push({ test: 'PATCH /alertas/:id/resolver', ...resolverAlerta });
          
          // Test 9: DELETE /alertas/:id
          console.log('  Testing DELETE /alertas/:id...');
          const deleteAlerta = await makeRequest('DELETE', `/alertas/${alertaId}`);
          results.push({ test: 'DELETE /alertas/:id', ...deleteAlerta });
        }
        
        // Limpiar
        await makeRequest('DELETE', `/sensores/${sensorId}`);
      }
      
      await makeRequest('DELETE', `/arboles/${arbolId}`);
    }
    
    await makeRequest('DELETE', `/parcelas/${parcelaId}`);
  }
  
  return results;
};

// Función principal para ejecutar todos los tests
const runAllApiTests = async () => {
  console.log('🚀 Iniciando tests de endpoints de la API...\n');
  
  const allResults = {
    parcelas: await testParcelasEndpoints(),
    arboles: await testArbolesEndpoints(),
    sensores: await testSensoresEndpoints(),
    horarios: await testHorariosEndpoints(),
    historial: await testHistorialEndpoints(),
    alertas: await testAlertasEndpoints()
  };
  
  console.log('\n📊 RESULTADOS DE LOS TESTS DE API:');
  console.log('==================================');
  
  let totalTests = 0;
  let passedTests = 0;
  
  Object.entries(allResults).forEach(([endpoint, results]) => {
    console.log(`\n${endpoint.toUpperCase()}:`);
    results.forEach(result => {
      totalTests++;
      const status = result.success ? '✅ PASÓ' : '❌ FALLÓ';
      console.log(`  ${result.test}: ${status} (${result.status})`);
      if (result.success) passedTests++;
    });
  });
  
  console.log(`\n📈 RESUMEN:`);
  console.log(`  Total de tests: ${totalTests}`);
  console.log(`  Tests pasados: ${passedTests}`);
  console.log(`  Tests fallidos: ${totalTests - passedTests}`);
  console.log(`  Porcentaje de éxito: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ¡TODOS LOS TESTS DE API PASARON!');
  } else {
    console.log('\n⚠️ Algunos tests fallaron. Revisa los errores arriba.');
  }
};

// Ejecutar tests si el archivo se ejecuta directamente
if (require.main === module) {
  runAllApiTests().catch(console.error);
}

module.exports = {
  testParcelasEndpoints,
  testArbolesEndpoints,
  testSensoresEndpoints,
  testHorariosEndpoints,
  testHistorialEndpoints,
  testAlertasEndpoints,
  runAllApiTests
}; 