-- CreateEnum
CREATE TYPE "PerfilCorretor" AS ENUM ('ADMIN', 'CORRETOR');

-- CreateTable
CREATE TABLE "Corretores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "perfil" "PerfilCorretor" NOT NULL DEFAULT 'CORRETOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Corretores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corretores_email_key" ON "Corretores"("email");

-- CreateIndex
CREATE INDEX "Corretores_email_idx" ON "Corretores"("email");
