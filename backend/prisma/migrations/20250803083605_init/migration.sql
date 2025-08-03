-- CreateTable
CREATE TABLE "Parcela" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "filas" INTEGER NOT NULL,
    "columnas" INTEGER NOT NULL,
    "fecha_siembra" TIMESTAMP(3) NOT NULL,
    "cultivo_id" TEXT NOT NULL,
    "epoca_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parcela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arbol" (
    "id" SERIAL NOT NULL,
    "parcela_id" INTEGER NOT NULL,
    "fila" INTEGER NOT NULL,
    "columna" INTEGER NOT NULL,
    "estado" TEXT,
    "comentario_estado" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Arbol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "arbol_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "firebase_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorarioRiego" (
    "id" SERIAL NOT NULL,
    "parcela_id" INTEGER NOT NULL,
    "dias_semana" JSONB NOT NULL,
    "hora_riego" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HorarioRiego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialRiego" (
    "id" SERIAL NOT NULL,
    "parcela_id" INTEGER NOT NULL,
    "litros_recomendados" DOUBLE PRECISION NOT NULL,
    "litros_aplicados" DOUBLE PRECISION,
    "fecha_hora_riego" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistorialRiego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "severidad" TEXT NOT NULL,
    "sensor_id" INTEGER,
    "arbol_id" INTEGER,
    "parcela_id" INTEGER,
    "resuelta" BOOLEAN NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Arbol" ADD CONSTRAINT "Arbol_parcela_id_fkey" FOREIGN KEY ("parcela_id") REFERENCES "Parcela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_arbol_id_fkey" FOREIGN KEY ("arbol_id") REFERENCES "Arbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioRiego" ADD CONSTRAINT "HorarioRiego_parcela_id_fkey" FOREIGN KEY ("parcela_id") REFERENCES "Parcela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialRiego" ADD CONSTRAINT "HistorialRiego_parcela_id_fkey" FOREIGN KEY ("parcela_id") REFERENCES "Parcela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_arbol_id_fkey" FOREIGN KEY ("arbol_id") REFERENCES "Arbol"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_parcela_id_fkey" FOREIGN KEY ("parcela_id") REFERENCES "Parcela"("id") ON DELETE SET NULL ON UPDATE CASCADE;
