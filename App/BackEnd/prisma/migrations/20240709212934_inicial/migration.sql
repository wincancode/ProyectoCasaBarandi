-- CreateTable
CREATE TABLE "Beneficiado" (
    "idBeneficiado" SERIAL NOT NULL,
    "CIBeneficiado" TEXT NOT NULL,
    "nombreBeneficiado" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "tlfnBeneficiado" TEXT NOT NULL,
    "emailBeneficiado" TEXT NOT NULL,
    "idComunidad" INTEGER NOT NULL,

    CONSTRAINT "Beneficiado_pkey" PRIMARY KEY ("idBeneficiado")
);

-- CreateTable
CREATE TABLE "Comunidad" (
    "idComunidad" SERIAL NOT NULL,
    "nombreComunidad" TEXT NOT NULL,

    CONSTRAINT "Comunidad_pkey" PRIMARY KEY ("idComunidad")
);

-- CreateTable
CREATE TABLE "Donacion" (
    "idDonacion" SERIAL NOT NULL,
    "Producto" TEXT NOT NULL,
    "Cantidad" DECIMAL(65,30) NOT NULL,
    "Fecha" TIMESTAMP(3) NOT NULL,
    "Estado" TEXT NOT NULL,
    "idBeneficiado" INTEGER NOT NULL,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("idDonacion")
);

-- CreateTable
CREATE TABLE "Evento" (
    "idEvento" SERIAL NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Fecha" TIMESTAMP(3) NOT NULL,
    "Responsable" TEXT NOT NULL,
    "Tipo" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("idEvento")
);

-- CreateTable
CREATE TABLE "CursosFormales" (
    "idCursoFormal" SERIAL NOT NULL,
    "Tipo" TEXT NOT NULL,
    "idEvento" INTEGER NOT NULL,

    CONSTRAINT "CursosFormales_pkey" PRIMARY KEY ("idCursoFormal")
);

-- CreateTable
CREATE TABLE "JornadaSalud" (
    "idJornadaSalud" SERIAL NOT NULL,
    "idEvento" INTEGER NOT NULL,

    CONSTRAINT "JornadaSalud_pkey" PRIMARY KEY ("idJornadaSalud")
);

-- CreateTable
CREATE TABLE "JornadaAmbiental" (
    "idJornadaAmbiental" SERIAL NOT NULL,
    "idEvento" INTEGER NOT NULL,

    CONSTRAINT "JornadaAmbiental_pkey" PRIMARY KEY ("idJornadaAmbiental")
);

-- CreateTable
CREATE TABLE "JornadaCultural" (
    "idJornadaCultural" SERIAL NOT NULL,
    "idEvento" INTEGER NOT NULL,

    CONSTRAINT "JornadaCultural_pkey" PRIMARY KEY ("idJornadaCultural")
);

-- CreateTable
CREATE TABLE "JornadaFinanzas" (
    "idJornadaFinanzas" SERIAL NOT NULL,
    "idEvento" INTEGER NOT NULL,

    CONSTRAINT "JornadaFinanzas_pkey" PRIMARY KEY ("idJornadaFinanzas")
);

-- CreateTable
CREATE TABLE "JornadaLegal" (
    "idJornadaLegal" SERIAL NOT NULL,
    "idEvento" INTEGER NOT NULL,

    CONSTRAINT "JornadaLegal_pkey" PRIMARY KEY ("idJornadaLegal")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiado_CIBeneficiado_key" ON "Beneficiado"("CIBeneficiado");

-- CreateIndex
CREATE UNIQUE INDEX "CursosFormales_idEvento_key" ON "CursosFormales"("idEvento");

-- CreateIndex
CREATE UNIQUE INDEX "JornadaSalud_idEvento_key" ON "JornadaSalud"("idEvento");

-- CreateIndex
CREATE UNIQUE INDEX "JornadaAmbiental_idEvento_key" ON "JornadaAmbiental"("idEvento");

-- CreateIndex
CREATE UNIQUE INDEX "JornadaCultural_idEvento_key" ON "JornadaCultural"("idEvento");

-- CreateIndex
CREATE UNIQUE INDEX "JornadaFinanzas_idEvento_key" ON "JornadaFinanzas"("idEvento");

-- CreateIndex
CREATE UNIQUE INDEX "JornadaLegal_idEvento_key" ON "JornadaLegal"("idEvento");

-- AddForeignKey
ALTER TABLE "Beneficiado" ADD CONSTRAINT "Beneficiado_idComunidad_fkey" FOREIGN KEY ("idComunidad") REFERENCES "Comunidad"("idComunidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_idBeneficiado_fkey" FOREIGN KEY ("idBeneficiado") REFERENCES "Beneficiado"("idBeneficiado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursosFormales" ADD CONSTRAINT "CursosFormales_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaSalud" ADD CONSTRAINT "JornadaSalud_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaAmbiental" ADD CONSTRAINT "JornadaAmbiental_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaCultural" ADD CONSTRAINT "JornadaCultural_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaFinanzas" ADD CONSTRAINT "JornadaFinanzas_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaLegal" ADD CONSTRAINT "JornadaLegal_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE RESTRICT ON UPDATE CASCADE;
