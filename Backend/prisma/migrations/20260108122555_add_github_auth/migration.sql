-- AlterTable
ALTER TABLE "users" ADD COLUMN     "githubId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
