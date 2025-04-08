-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_PROCESS', 'COMPLETED', 'FAILURE');

-- CreateTable
CREATE TABLE "SurveyUpload" (
    "id" SERIAL NOT NULL,
    "total_records" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'IN_PROCESS',
    "filepath" TEXT NOT NULL,
    "filepath_result" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "SurveyUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "code" TEXT NOT NULL,
    "note_one" INTEGER NOT NULL,
    "note_two" INTEGER NOT NULL,
    "result" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "surveyUploadId" INTEGER,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_surveyUploadId_fkey" FOREIGN KEY ("surveyUploadId") REFERENCES "SurveyUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;
