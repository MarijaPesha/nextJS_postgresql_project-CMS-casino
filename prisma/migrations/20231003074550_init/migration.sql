/*
  Warnings:

  - You are about to drop the column `content` on the `casinos` table. All the data in the column will be lost.
  - Added the required column `name` to the `casinos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "casinos" DROP COLUMN "content",
ADD COLUMN     "name" TEXT NOT NULL;
