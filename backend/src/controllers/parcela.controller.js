const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las parcelas
const getAllParcelas = async (req, res) => {
  try {
    const parcelas = await prisma.parcela.findMany({
      include: {
        arboles: true,
        horariosRiego: true,
        historialRiego: true,
        alertas: true
      }
    });
    res.json(parcelas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener parcela por ID
const getParcelaById = async (req, res) => {
  try {
    const { id } = req.params;
    const parcela = await prisma.parcela.findUnique({
      where: { id: parseInt(id) },
      include: {
        arboles: true,
        horariosRiego: true,
        historialRiego: true,
        alertas: true
      }
    });
    
    if (!parcela) {
      return res.status(404).json({ error: 'Parcela no encontrada' });
    }
    
    res.json(parcela);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener parcelas por cultivo
const getParcelasByCultivo = async (req, res) => {
  try {
    const { cultivoId } = req.params;
    const parcelas = await prisma.parcela.findMany({
      where: { cultivo_id: cultivoId },
      include: {
        arboles: true,
        horariosRiego: true,
        historialRiego: true,
        alertas: true
      }
    });
    res.json(parcelas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener parcelas por época
const getParcelasByEpoca = async (req, res) => {
  try {
    const { epocaId } = req.params;
    const parcelas = await prisma.parcela.findMany({
      where: { epoca_id: epocaId },
      include: {
        arboles: true,
        horariosRiego: true,
        historialRiego: true,
        alertas: true
      }
    });
    res.json(parcelas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nueva parcela
const createParcela = async (req, res) => {
  try {
    const { nombre, ubicacion, filas, columnas, fecha_siembra, cultivo_id, epoca_id } = req.body;
    
    const parcela = await prisma.parcela.create({
      data: {
        nombre,
        ubicacion,
        filas: parseInt(filas),
        columnas: parseInt(columnas),
        fecha_siembra: new Date(fecha_siembra),
        cultivo_id,
        epoca_id
      },
      include: {
        arboles: true,
        horariosRiego: true,
        historialRiego: true,
        alertas: true
      }
    });
    
    res.status(201).json(parcela);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar parcela
const updateParcela = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ubicacion, filas, columnas, fecha_siembra, cultivo_id, epoca_id } = req.body;
    
    const parcela = await prisma.parcela.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        ubicacion,
        filas: filas ? parseInt(filas) : undefined,
        columnas: columnas ? parseInt(columnas) : undefined,
        fecha_siembra: fecha_siembra ? new Date(fecha_siembra) : undefined,
        cultivo_id,
        epoca_id
      },
      include: {
        arboles: true,
        horariosRiego: true,
        historialRiego: true,
        alertas: true
      }
    });
    
    res.json(parcela);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar parcela
const deleteParcela = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.parcela.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Parcela eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllParcelas,
  getParcelaById,
  getParcelasByCultivo,
  getParcelasByEpoca,
  createParcela,
  updateParcela,
  deleteParcela
};
