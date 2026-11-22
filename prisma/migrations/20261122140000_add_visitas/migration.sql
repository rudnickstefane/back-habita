-- CreateEnum
CREATE TYPE "StatusVisita" AS ENUM ('PENDENTE', 'ACEITA', 'RECUSADA');

-- CreateTable
CREATE TABLE "Visitas" (
    "id" SERIAL NOT NULL,
    "visitanteNome" VARCHAR(120) NOT NULL,
    "visitanteTelefone" VARCHAR(20) NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "status" "StatusVisita" NOT NULL DEFAULT 'PENDENTE',
    "imovelId" INTEGER NOT NULL,
    "corretorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Visitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visitas_imovelId_idx" ON "Visitas"("imovelId");

-- CreateIndex
CREATE INDEX "Visitas_corretorId_idx" ON "Visitas"("corretorId");

-- CreateIndex
CREATE INDEX "Visitas_status_idx" ON "Visitas"("status");

-- CreateIndex
CREATE INDEX "Visitas_dataHora_idx" ON "Visitas"("dataHora");

-- AddForeignKey
ALTER TABLE "Visitas" ADD CONSTRAINT "Visitas_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imoveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitas" ADD CONSTRAINT "Visitas_corretorId_fkey" FOREIGN KEY ("corretorId") REFERENCES "Corretores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
