const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las alertas
const getAllAlertas = async (req, res) => {
  try {
    const alertas = await prisma.alerta.findMany({
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      },
      orderBy: {
        fecha_hora: 'desc'
      }
    });
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener alerta por ID
const getAlertaById = async (req, res) => {
  try {
    const { id } = req.params;
    const alerta = await prisma.alerta.findUnique({
      where: { id: parseInt(id) },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      }
    });
    
    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener alertas por tipo
const getAlertasByTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const alertas = await prisma.alerta.findMany({
      where: { tipo },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      },
      orderBy: {
        fecha_hora: 'desc'
      }
    });
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener alertas por severidad
const getAlertasBySeveridad = async (req, res) => {
  try {
    const { severidad } = req.params;
    const alertas = await prisma.alerta.findMany({
      where: { severidad },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      },
      orderBy: {
        fecha_hora: 'desc'
      }
    });
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener alertas no resueltas
const getAlertasNoResueltas = async (req, res) => {
  try {
    const alertas = await prisma.alerta.findMany({
      where: { resuelta: false },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      },
      orderBy: {
        fecha_hora: 'desc'
      }
    });
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener alertas por parcela
const getAlertasByParcela = async (req, res) => {
  try {
    const { parcelaId } = req.params;
    const alertas = await prisma.alerta.findMany({
      where: { parcela_id: parseInt(parcelaId) },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      },
      orderBy: {
        fecha_hora: 'desc'
      }
    });
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener alertas por árbol
const getAlertasByArbol = async (req, res) => {
  try {
    const { arbolId } = req.params;
    const alertas = await prisma.alerta.findMany({
      where: { arbol_id: parseInt(arbolId) },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      },
      orderBy: {
        fecha_hora: 'desc'
      }
    });
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nueva alerta
const createAlerta = async (req, res) => {
  try {
    const { tipo, mensaje, severidad, sensor_id, arbol_id, parcela_id, resuelta, fecha_hora } = req.body;
    
    const alerta = await prisma.alerta.create({
      data: {
        tipo,
        mensaje,
        severidad,
        sensor_id: sensor_id ? parseInt(sensor_id) : null,
        arbol_id: arbol_id ? parseInt(arbol_id) : null,
        parcela_id: parcela_id ? parseInt(parcela_id) : null,
        resuelta: resuelta !== undefined ? resuelta : false,
        fecha_hora: fecha_hora ? new Date(fecha_hora) : new Date()
      },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      }
    });
    
    res.status(201).json(alerta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar alerta
const updateAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, mensaje, severidad, sensor_id, arbol_id, parcela_id, resuelta, fecha_hora } = req.body;
    
    const alerta = await prisma.alerta.update({
      where: { id: parseInt(id) },
      data: {
        tipo,
        mensaje,
        severidad,
        sensor_id: sensor_id !== undefined ? (sensor_id ? parseInt(sensor_id) : null) : undefined,
        arbol_id: arbol_id !== undefined ? (arbol_id ? parseInt(arbol_id) : null) : undefined,
        parcela_id: parcela_id !== undefined ? (parcela_id ? parseInt(parcela_id) : null) : undefined,
        resuelta,
        fecha_hora: fecha_hora ? new Date(fecha_hora) : undefined
      },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      }
    });
    
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Marcar alerta como resuelta
const marcarAlertaResuelta = async (req, res) => {
  try {
    const { id } = req.params;
    const { resuelta } = req.body;
    
    const alerta = await prisma.alerta.update({
      where: { id: parseInt(id) },
      data: { resuelta },
      include: {
        sensor: {
          include: {
            arbol: {
              include: {
                parcela: true
              }
            }
          }
        },
        arbol: {
          include: {
            parcela: true
          }
        },
        parcela: true
      }
    });
    
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar alerta
const deleteAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.alerta.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Alerta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
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
}; 