/*
  Warnings:

  - Made the column `selected_character` on table `messages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "selected_character" SET NOT NULL,
ALTER COLUMN "selected_character" DROP DEFAULT;
