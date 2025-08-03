const express = require('express');
const router = express.Router();
const {
  getAllParcelas,
  getParcelaById,
  getParcelasByCultivo,
  getParcelasByEpoca,
  createParcela,
  updateParcela,
  deleteParcela
} = require('../controllers/parcela.controller');

// Obtener todas las parcelas
router.get('/', getAllParcelas);

// Obtener parcelas por cultivo
router.get('/cultivo/:cultivoId', getParcelasByCultivo);

// Obtener parcelas por época
router.get('/epoca/:epocaId', getParcelasByEpoca);

// Obtener parcela por ID
router.get('/:id', getParcelaById);

// Crear nueva parcela
router.post('/', createParcela);

// Actualizar parcela
router.put('/:id', updateParcela);

// Eliminar parcela
router.delete('/:id', deleteParcela);

module.exports = router;
