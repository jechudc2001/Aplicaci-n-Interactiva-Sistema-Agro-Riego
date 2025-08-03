const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los árboles
const getAllArboles = async (req, res) => {
  try {
    const arboles = await prisma.arbol.findMany({
      include: {
        parcela: true,
        sensores: true,
        alertas: true
      }
    });
    res.json(arboles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener árbol por ID
const getArbolById = async (req, res) => {
  try {
    const { id } = req.params;
    const arbol = await prisma.arbol.findUnique({
      where: { id: parseInt(id) },
      include: {
        parcela: true,
        sensores: true,
        alertas: true
      }
    });
    
    if (!arbol) {
      return res.status(404).json({ error: 'Árbol no encontrado' });
    }
    
    res.json(arbol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener árboles por parcela
const getArbolesByParcela = async (req, res) => {
  try {
    const { parcelaId } = req.params;
    const arboles = await prisma.arbol.findMany({
      where: { parcela_id: parseInt(parcelaId) },
      include: {
        parcela: true,
        sensores: true,
        alertas: true
      }
    });
    res.json(arboles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo árbol
const createArbol = async (req, res) => {
  try {
    const { parcela_id, fila, columna, estado, comentario_estado } = req.body;
    
    const arbol = await prisma.arbol.create({
      data: {
        parcela_id: parseInt(parcela_id),
        fila: parseInt(fila),
        columna: parseInt(columna),
        estado,
        comentario_estado
      },
      include: {
        parcela: true
      }
    });
    
    res.status(201).json(arbol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar árbol
const updateArbol = async (req, res) => {
  try {
    const { id } = req.params;
    const { parcela_id, fila, columna, estado, comentario_estado } = req.body;
    
    const arbol = await prisma.arbol.update({
      where: { id: parseInt(id) },
      data: {
        parcela_id: parcela_id ? parseInt(parcela_id) : undefined,
        fila: fila ? parseInt(fila) : undefined,
        columna: columna ? parseInt(columna) : undefined,
        estado,
        comentario_estado
      },
      include: {
        parcela: true,
        sensores: true
      }
    });
    
    res.json(arbol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar árbol
const deleteArbol = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.arbol.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Árbol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllArboles,
  getArbolById,
  getArbolesByParcela,
  createArbol,
  updateArbol,
  deleteArbol
}; 