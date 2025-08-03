const express = require('express');
const router = express.Router();
const {
  getAllHistorialRiego,
  getHistorialRiegoById,
  getHistorialByParcela,
  getHistorialByEstado,
  getHistorialByFecha,
  createHistorialRiego,
  updateHistorialRiego,
  deleteHistorialRiego
} = require('../controllers/historialRiego.controller');

// Obtener todo el historial de riego
router.get('/', getAllHistorialRiego);

// Obtener historial por rango de fechas
router.get('/fecha', getHistorialByFecha);

// Obtener historial por estado
router.get('/estado/:estado', getHistorialByEstado);

// Obtener historial por parcela
router.get('/parcela/:parcelaId', getHistorialByParcela);

// Obtener registro de historial por ID
router.get('/:id', getHistorialRiegoById);

// Crear nuevo registro de historial
router.post('/', createHistorialRiego);

// Actualizar registro de historial
router.put('/:id', updateHistorialRiego);

// Eliminar registro de historial
router.delete('/:id', deleteHistorialRiego);

module.exports = router; 