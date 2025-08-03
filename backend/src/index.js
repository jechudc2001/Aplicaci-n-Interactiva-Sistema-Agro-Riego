require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/parcelas', require('./routes/parcela.routes'));
app.use('/api/arboles', require('./routes/arbol.routes'));
app.use('/api/sensores', require('./routes/sensor.routes'));
app.use('/api/horarios', require('./routes/horarioRiego.routes'));
app.use('/api/historial', require('./routes/historialRiego.routes'));
app.use('/api/alertas', require('./routes/alerta.routes'));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
