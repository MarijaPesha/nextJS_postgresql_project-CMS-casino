-- CreateTable
CREATE TABLE "casinos" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "casinos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "casinos_createdAt_idx" ON "casinos"("createdAt");
