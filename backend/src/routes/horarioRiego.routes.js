const express = require('express');
const router = express.Router();
const {
  getAllHorariosRiego,
  getHorarioRiegoById,
  getHorariosByParcela,
  getHorariosActivos,
  createHorarioRiego,
  updateHorarioRiego,
  toggleHorarioActivo,
  deleteHorarioRiego
} = require('../controllers/horarioRiego.controller');

// Obtener todos los horarios de riego
router.get('/', getAllHorariosRiego);

// Obtener horarios activos
router.get('/activos', getHorariosActivos);

// Obtener horario por ID
router.get('/:id', getHorarioRiegoById);

// Obtener horarios por parcela
router.get('/parcela/:parcelaId', getHorariosByParcela);

// Crear nuevo horario de riego
router.post('/', createHorarioRiego);

// Actualizar horario de riego
router.put('/:id', updateHorarioRiego);

// Activar/desactivar horario
router.patch('/:id/toggle', toggleHorarioActivo);

// Eliminar horario de riego
router.delete('/:id', deleteHorarioRiego);

module.exports = router; 