/*
  Warnings:

  - Added the required column `totp_secret` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "totp_secret" TEXT NOT NULL;
