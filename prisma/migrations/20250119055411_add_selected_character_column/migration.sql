/*
  Warnings:

  - Added the required column `selected_character` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "selected_character" TEXT DEFAULT 'Default';
