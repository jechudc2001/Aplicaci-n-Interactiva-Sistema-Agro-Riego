const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todo el historial de riego
const getAllHistorialRiego = async (req, res) => {
  try {
    const historial = await prisma.historialRiego.findMany({
      include: {
        parcela: true
      },
      orderBy: {
        fecha_hora_riego: 'desc'
      }
    });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener registro de historial por ID
const getHistorialRiegoById = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await prisma.historialRiego.findUnique({
      where: { id: parseInt(id) },
      include: {
        parcela: true
      }
    });
    
    if (!historial) {
      return res.status(404).json({ error: 'Registro de historial no encontrado' });
    }
    
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener historial por parcela
const getHistorialByParcela = async (req, res) => {
  try {
    const { parcelaId } = req.params;
    const historial = await prisma.historialRiego.findMany({
      where: { parcela_id: parseInt(parcelaId) },
      include: {
        parcela: true
      },
      orderBy: {
        fecha_hora_riego: 'desc'
      }
    });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener historial por estado
const getHistorialByEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    const historial = await prisma.historialRiego.findMany({
      where: { estado },
      include: {
        parcela: true
      },
      orderBy: {
        fecha_hora_riego: 'desc'
      }
    });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener historial por rango de fechas
const getHistorialByFecha = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    
    const whereClause = {};
    if (fechaInicio && fechaFin) {
      whereClause.fecha_hora_riego = {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin)
      };
    }
    
    const historial = await prisma.historialRiego.findMany({
      where: whereClause,
      include: {
        parcela: true
      },
      orderBy: {
        fecha_hora_riego: 'desc'
      }
    });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo registro de historial
const createHistorialRiego = async (req, res) => {
  try {
    const { parcela_id, litros_recomendados, litros_aplicados, fecha_hora_riego, estado } = req.body;
    
    const historial = await prisma.historialRiego.create({
      data: {
        parcela_id: parseInt(parcela_id),
        litros_recomendados: parseFloat(litros_recomendados),
        litros_aplicados: litros_aplicados ? parseFloat(litros_aplicados) : null,
        fecha_hora_riego: fecha_hora_riego ? new Date(fecha_hora_riego) : new Date(),
        estado
      },
      include: {
        parcela: true
      }
    });
    
    res.status(201).json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar registro de historial
const updateHistorialRiego = async (req, res) => {
  try {
    const { id } = req.params;
    const { parcela_id, litros_recomendados, litros_aplicados, fecha_hora_riego, estado } = req.body;
    
    const historial = await prisma.historialRiego.update({
      where: { id: parseInt(id) },
      data: {
        parcela_id: parcela_id ? parseInt(parcela_id) : undefined,
        litros_recomendados: litros_recomendados ? parseFloat(litros_recomendados) : undefined,
        litros_aplicados: litros_aplicados !== undefined ? parseFloat(litros_aplicados) : undefined,
        fecha_hora_riego: fecha_hora_riego ? new Date(fecha_hora_riego) : undefined,
        estado
      },
      include: {
        parcela: true
      }
    });
    
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar registro de historial
const deleteHistorialRiego = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.historialRiego.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Registro de historial eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHistorialRiego,
  getHistorialRiegoById,
  getHistorialByParcela,
  getHistorialByEstado,
  getHistorialByFecha,
  createHistorialRiego,
  updateHistorialRiego,
  deleteHistorialRiego
}; 