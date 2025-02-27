-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "creator" TEXT NOT NULL,
    "mainFeatures" TEXT[],
    "useCases" TEXT[],
    "website" TEXT NOT NULL,
    "logoImageUrl" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);
