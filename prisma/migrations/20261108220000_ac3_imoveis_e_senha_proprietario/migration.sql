-- AlterTable
ALTER TABLE "Proprietarios" ADD COLUMN "senha" VARCHAR(255) NOT NULL DEFAULT '';

-- CreateEnum
CREATE TYPE "TipoImovel" AS ENUM ('CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL');

-- CreateEnum
CREATE TYPE "StatusImovel" AS ENUM ('PENDENTE', 'APROVADO', 'RECUSADO');

-- CreateTable
CREATE TABLE "Imoveis" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoImovel" NOT NULL,
    "endereco" VARCHAR(250) NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "status" "StatusImovel" NOT NULL DEFAULT 'PENDENTE',
    "fotos" TEXT[],
    "proprietarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Imoveis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Imoveis_proprietarioId_idx" ON "Imoveis"("proprietarioId");

-- CreateIndex
CREATE INDEX "Imoveis_status_idx" ON "Imoveis"("status");

-- AddForeignKey
ALTER TABLE "Imoveis" ADD CONSTRAINT "Imoveis_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "Proprietarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
