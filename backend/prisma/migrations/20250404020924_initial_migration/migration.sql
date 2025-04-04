-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_PROCESS', 'COMPLETED', 'FAILURE');

-- CreateTable
CREATE TABLE "SurveyReport" (
    "id" SERIAL NOT NULL,
    "total_records" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'IN_PROCESS',
    "filepath" TEXT NOT NULL,
    "filepath_result" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptaded_at" TIMESTAMP(3),

    CONSTRAINT "SurveyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "code" TEXT NOT NULL,
    "note_one" INTEGER NOT NULL,
    "note_two" INTEGER NOT NULL,
    "result" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptaded_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("code")
);
