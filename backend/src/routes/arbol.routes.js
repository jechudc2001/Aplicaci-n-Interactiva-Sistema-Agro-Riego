const express = require('express');
const router = express.Router();
const {
  getAllArboles,
  getArbolById,
  getArbolesByParcela,
  createArbol,
  updateArbol,
  deleteArbol
} = require('../controllers/arbol.controller');

// Obtener todos los árboles
router.get('/', getAllArboles);

// Obtener árbol por ID
router.get('/:id', getArbolById);

// Obtener árboles por parcela
router.get('/parcela/:parcelaId', getArbolesByParcela);

// Crear nuevo árbol
router.post('/', createArbol);

// Actualizar árbol
router.put('/:id', updateArbol);

// Eliminar árbol
router.delete('/:id', deleteArbol);

module.exports = router; 