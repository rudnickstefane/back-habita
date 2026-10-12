-- CreateTable
CREATE TABLE "Proprietarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "documento" VARCHAR(18) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Proprietarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proprietarios_email_key" ON "Proprietarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietarios_documento_key" ON "Proprietarios"("documento");

-- CreateIndex
CREATE INDEX "Proprietarios_nome_idx" ON "Proprietarios"("nome");
