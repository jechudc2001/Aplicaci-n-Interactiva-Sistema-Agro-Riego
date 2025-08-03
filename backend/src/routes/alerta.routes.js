const express = require('express');
const router = express.Router();
const {
  getAllAlertas,
  getAlertaById,
  getAlertasByTipo,
  getAlertasBySeveridad,
  getAlertasNoResueltas,
  getAlertasByParcela,
  getAlertasByArbol,
  createAlerta,
  updateAlerta,
  marcarAlertaResuelta,
  deleteAlerta
} = require('../controllers/alerta.controller');

// Obtener todas las alertas
router.get('/', getAllAlertas);

// Obtener alertas no resueltas
router.get('/no-resueltas', getAlertasNoResueltas);

// Obtener alertas por tipo
router.get('/tipo/:tipo', getAlertasByTipo);

// Obtener alertas por severidad
router.get('/severidad/:severidad', getAlertasBySeveridad);

// Obtener alertas por parcela
router.get('/parcela/:parcelaId', getAlertasByParcela);

// Obtener alertas por árbol
router.get('/arbol/:arbolId', getAlertasByArbol);

// Obtener alerta por ID
router.get('/:id', getAlertaById);

// Crear nueva alerta
router.post('/', createAlerta);

// Actualizar alerta
router.put('/:id', updateAlerta);

// Marcar alerta como resuelta
router.patch('/:id/resolver', marcarAlertaResuelta);

// Eliminar alerta
router.delete('/:id', deleteAlerta);

module.exports = router; 