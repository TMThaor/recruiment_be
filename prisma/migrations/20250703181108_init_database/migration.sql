-- CreateTable
CREATE TABLE "Account" (
    "id" VARCHAR(36) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" VARCHAR(36) NOT NULL,
    "account_id" VARCHAR(36),
    "fullname" VARCHAR(255),
    "email" VARCHAR(255),
    "phoneNumber" VARCHAR(12),
    "dateOfBirth" DATE,
    "education" VARCHAR(255),

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" VARCHAR(36) NOT NULL,
    "account_id" VARCHAR(36) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" VARCHAR(36) NOT NULL,
    "category_id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "requirements" VARCHAR(1000) NOT NULL,
    "benefits" VARCHAR(1000) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "experienceRequired" INTEGER NOT NULL,
    "jobType" VARCHAR(100) NOT NULL,
    "skills" VARCHAR(255) NOT NULL,
    "salaryRange" VARCHAR(100),
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applications" (
    "id" VARCHAR(36) NOT NULL,
    "candidate_id" VARCHAR(36) NOT NULL,
    "job_id" VARCHAR(36) NOT NULL,
    "fullname" VARCHAR(255),
    "email" VARCHAR(255),
    "phoneNumber" VARCHAR(12),
    "dateOfBirth" DATE,
    "education" VARCHAR(255),
    "cv" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sub_Category" (
    "id" VARCHAR(36) NOT NULL,
    "category_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Sub_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" VARCHAR(36) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "message" VARCHAR(1000) NOT NULL,
    "isReplied" VARCHAR(10) NOT NULL,
    "replyBy" VARCHAR(255),
    "created_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" VARCHAR(36) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_account_id_key" ON "Candidate"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_account_id_key" ON "Admin"("account_id");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sub_Category" ADD CONSTRAINT "Sub_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
