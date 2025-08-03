const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los horarios de riego
const getAllHorariosRiego = async (req, res) => {
  try {
    const horarios = await prisma.horarioRiego.findMany({
      include: {
        parcela: true
      }
    });
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener horario por ID
const getHorarioRiegoById = async (req, res) => {
  try {
    const { id } = req.params;
    const horario = await prisma.horarioRiego.findUnique({
      where: { id: parseInt(id) },
      include: {
        parcela: true
      }
    });
    
    if (!horario) {
      return res.status(404).json({ error: 'Horario de riego no encontrado' });
    }
    
    res.json(horario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener horarios por parcela
const getHorariosByParcela = async (req, res) => {
  try {
    const { parcelaId } = req.params;
    const horarios = await prisma.horarioRiego.findMany({
      where: { parcela_id: parseInt(parcelaId) },
      include: {
        parcela: true
      }
    });
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener horarios activos
const getHorariosActivos = async (req, res) => {
  try {
    const horarios = await prisma.horarioRiego.findMany({
      where: { activo: true },
      include: {
        parcela: true
      }
    });
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo horario de riego
const createHorarioRiego = async (req, res) => {
  try {
    const { parcela_id, dias_semana, hora_riego, activo } = req.body;
    
    const horario = await prisma.horarioRiego.create({
      data: {
        parcela_id: parseInt(parcela_id),
        dias_semana,
        hora_riego,
        activo: activo !== undefined ? activo : true
      },
      include: {
        parcela: true
      }
    });
    
    res.status(201).json(horario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar horario de riego
const updateHorarioRiego = async (req, res) => {
  try {
    const { id } = req.params;
    const { parcela_id, dias_semana, hora_riego, activo } = req.body;
    
    const horario = await prisma.horarioRiego.update({
      where: { id: parseInt(id) },
      data: {
        parcela_id: parcela_id ? parseInt(parcela_id) : undefined,
        dias_semana,
        hora_riego,
        activo
      },
      include: {
        parcela: true
      }
    });
    
    res.json(horario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Activar/desactivar horario
const toggleHorarioActivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;
    
    const horario = await prisma.horarioRiego.update({
      where: { id: parseInt(id) },
      data: { activo },
      include: {
        parcela: true
      }
    });
    
    res.json(horario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar horario de riego
const deleteHorarioRiego = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.horarioRiego.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Horario de riego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHorariosRiego,
  getHorarioRiegoById,
  getHorariosByParcela,
  getHorariosActivos,
  createHorarioRiego,
  updateHorarioRiego,
  toggleHorarioActivo,
  deleteHorarioRiego
}; 