const express = require('express');
const router = express.Router();
const {
  getAllSensores,
  getSensorById,
  getSensoresByArbol,
  getSensoresByTipo,
  createSensor,
  updateSensor,
  deleteSensor
} = require('../controllers/sensor.controller');

// Obtener todos los sensores
router.get('/', getAllSensores);

// Obtener sensor por ID
router.get('/:id', getSensorById);

// Obtener sensores por árbol
router.get('/arbol/:arbolId', getSensoresByArbol);

// Obtener sensores por tipo
router.get('/tipo/:tipo', getSensoresByTipo);

// Crear nuevo sensor
router.post('/', createSensor);

// Actualizar sensor
router.put('/:id', updateSensor);

// Eliminar sensor
router.delete('/:id', deleteSensor);

module.exports = router; 