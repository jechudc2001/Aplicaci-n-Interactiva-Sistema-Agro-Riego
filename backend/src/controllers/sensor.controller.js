const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los sensores
const getAllSensores = async (req, res) => {
  try {
    const sensores = await prisma.sensor.findMany({
      include: {
        arbol: {
          include: {
            parcela: true
          }
        },
        alertas: true
      }
    });
    res.json(sensores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener sensor por ID
const getSensorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await prisma.sensor.findUnique({
      where: { id: parseInt(id) },
      include: {
        arbol: {
          include: {
            parcela: true
          }
        },
        alertas: true
      }
    });
    
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }
    
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener sensores por árbol
const getSensoresByArbol = async (req, res) => {
  try {
    const { arbolId } = req.params;
    const sensores = await prisma.sensor.findMany({
      where: { arbol_id: parseInt(arbolId) },
      include: {
        arbol: {
          include: {
            parcela: true
          }
        },
        alertas: true
      }
    });
    res.json(sensores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener sensores por tipo
const getSensoresByTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const sensores = await prisma.sensor.findMany({
      where: { tipo },
      include: {
        arbol: {
          include: {
            parcela: true
          }
        },
        alertas: true
      }
    });
    res.json(sensores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo sensor
const createSensor = async (req, res) => {
  try {
    const { arbol_id, tipo, firebase_path } = req.body;
    
    const sensor = await prisma.sensor.create({
      data: {
        arbol_id: parseInt(arbol_id),
        tipo,
        firebase_path
      },
      include: {
        arbol: {
          include: {
            parcela: true
          }
        }
      }
    });
    
    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar sensor
const updateSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const { arbol_id, tipo, firebase_path } = req.body;
    
    const sensor = await prisma.sensor.update({
      where: { id: parseInt(id) },
      data: {
        arbol_id: arbol_id ? parseInt(arbol_id) : undefined,
        tipo,
        firebase_path
      },
      include: {
        arbol: {
          include: {
            parcela: true
          }
        }
      }
    });
    
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar sensor
const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.sensor.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Sensor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSensores,
  getSensorById,
  getSensoresByArbol,
  getSensoresByTipo,
  createSensor,
  updateSensor,
  deleteSensor
}; 