-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUYER', 'SELLER', 'MERCHANT', 'INSPECTOR', 'ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('DEALER', 'RENTAL_COMPANY', 'LOGISTICS', 'REPAIR', 'FINANCE', 'INSURANCE', 'EXPORT_SERVICE');

-- CreateEnum
CREATE TYPE "SellerType" AS ENUM ('PERSONAL', 'MERCHANT', 'PLATFORM');

-- CreateEnum
CREATE TYPE "OwnershipStatus" AS ENUM ('UNKNOWN', 'PARTIAL', 'VERIFIED');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('NONE', 'BOOKED', 'INSPECTED', 'CERTIFIED');

-- CreateEnum
CREATE TYPE "TradeMode" AS ENUM ('P2P', 'CONSIGNMENT', 'PLATFORM_OWNED');

-- CreateEnum
CREATE TYPE "MachineStatus" AS ENUM ('PENDING_REVIEW', 'APPROVED', 'REJECTED', 'CERTIFIED', 'SOLD', 'HIDDEN');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('PRICE_INQUIRY', 'VIEW_APPOINTMENT', 'TRADE_SERVICE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'MATCHED', 'DEAL', 'INVALID');

-- CreateEnum
CREATE TYPE "InspectionOrderStatus" AS ENUM ('PENDING', 'ASSIGNED', 'INSPECTING', 'REPORT_READY', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InspectionGrade" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateEnum
CREATE TYPE "TradeOrderStatus" AS ENUM ('DRAFT', 'DEPOSIT_PENDING', 'DEPOSIT_PAID', 'CONTRACT_SIGNED', 'DELIVERY_PENDING', 'COMPLETED', 'DISPUTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MerchantApplicationStatus" AS ENUM ('NEW', 'CONTACTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'BUYER',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CompanyType" NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "tonnage" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerPhone" TEXT NOT NULL,
    "sellerType" "SellerType" NOT NULL DEFAULT 'PERSONAL',
    "ownershipStatus" "OwnershipStatus" NOT NULL DEFAULT 'UNKNOWN',
    "inspectionStatus" "InspectionStatus" NOT NULL DEFAULT 'NONE',
    "tradeMode" "TradeMode" NOT NULL DEFAULT 'P2P',
    "status" "MachineStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "isUrgent" BOOLEAN NOT NULL DEFAULT false,
    "isCertified" BOOLEAN NOT NULL DEFAULT false,
    "isMainstreamModel" BOOLEAN NOT NULL DEFAULT true,
    "mainImage" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachinePhoto" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MachinePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineSpec" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "engine" TEXT,
    "hydraulicPump" TEXT,
    "bucketCapacity" DOUBLE PRECISION,
    "operatingWeight" DOUBLE PRECISION,
    "origin" TEXT,
    "serialNumber" TEXT,
    "engineNumber" TEXT,

    CONSTRAINT "MachineSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnershipDoc" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,

    CONSTRAINT "OwnershipDoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "type" "InquiryType" NOT NULL DEFAULT 'PRICE_INQUIRY',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "budgetMin" DOUBLE PRECISION NOT NULL,
    "budgetMax" DOUBLE PRECISION NOT NULL,
    "preferredBrands" TEXT NOT NULL,
    "tonnageMin" DOUBLE PRECISION NOT NULL,
    "tonnageMax" DOUBLE PRECISION NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "expectedYear" INTEGER,
    "maxWorkingHours" INTEGER,
    "needInspection" BOOLEAN NOT NULL DEFAULT true,
    "needLogistics" BOOLEAN NOT NULL DEFAULT false,
    "needFinance" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionOrder" (
    "id" TEXT NOT NULL,
    "machineId" TEXT,
    "requesterName" TEXT NOT NULL,
    "requesterPhone" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "preferredTime" TIMESTAMP(3),
    "note" TEXT,
    "status" "InspectionOrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InspectionOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionReport" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "orderId" TEXT,
    "grade" "InspectionGrade" NOT NULL,
    "engineScore" INTEGER NOT NULL,
    "hydraulicScore" INTEGER NOT NULL,
    "chassisScore" INTEGER NOT NULL,
    "electricScore" INTEGER NOT NULL,
    "appearanceScore" INTEGER NOT NULL,
    "riskSummary" TEXT NOT NULL,
    "valuationMin" DOUBLE PRECISION NOT NULL,
    "valuationMax" DOUBLE PRECISION NOT NULL,
    "reportUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InspectionReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValuationRecord" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "tonnage" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "province" TEXT NOT NULL,
    "conditionGrade" TEXT NOT NULL,
    "isMainstreamModel" BOOLEAN NOT NULL DEFAULT true,
    "valuationMin" DOUBLE PRECISION NOT NULL,
    "valuationMax" DOUBLE PRECISION NOT NULL,
    "suggestedListingPrice" DOUBLE PRECISION NOT NULL,
    "suggestedDealPrice" DOUBLE PRECISION NOT NULL,
    "riskNotes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ValuationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeOrder" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "buyerPhone" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerPhone" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "depositAmount" DOUBLE PRECISION NOT NULL,
    "status" "TradeOrderStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogisticsLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fromProvince" TEXT NOT NULL,
    "fromCity" TEXT NOT NULL,
    "toProvince" TEXT NOT NULL,
    "toCity" TEXT NOT NULL,
    "machineInfo" TEXT NOT NULL,
    "needInsurance" BOOLEAN NOT NULL DEFAULT false,
    "needFinance" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogisticsLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantApplication" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hasOfflineYard" BOOLEAN NOT NULL DEFAULT false,
    "canProvideInspection" BOOLEAN NOT NULL DEFAULT false,
    "canProvideRepair" BOOLEAN NOT NULL DEFAULT false,
    "canProvideLogistics" BOOLEAN NOT NULL DEFAULT false,
    "canProvideFinance" BOOLEAN NOT NULL DEFAULT false,
    "status" "MerchantApplicationStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "Machine_brand_model_province_city_status_idx" ON "Machine"("brand", "model", "province", "city", "status");

-- CreateIndex
CREATE INDEX "Machine_price_idx" ON "Machine"("price");

-- CreateIndex
CREATE INDEX "Machine_year_idx" ON "Machine"("year");

-- CreateIndex
CREATE INDEX "Machine_workingHours_idx" ON "Machine"("workingHours");

-- CreateIndex
CREATE INDEX "Machine_tonnage_idx" ON "Machine"("tonnage");

-- CreateIndex
CREATE INDEX "Machine_status_isCertified_isUrgent_idx" ON "Machine"("status", "isCertified", "isUrgent");

-- CreateIndex
CREATE INDEX "MachinePhoto_machineId_idx" ON "MachinePhoto"("machineId");

-- CreateIndex
CREATE UNIQUE INDEX "MachineSpec_machineId_key" ON "MachineSpec"("machineId");

-- CreateIndex
CREATE INDEX "OwnershipDoc_machineId_idx" ON "OwnershipDoc"("machineId");

-- CreateIndex
CREATE INDEX "Inquiry_machineId_idx" ON "Inquiry"("machineId");

-- CreateIndex
CREATE INDEX "Inquiry_status_createdAt_idx" ON "Inquiry"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BuyRequest_status_createdAt_idx" ON "BuyRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BuyRequest_province_city_idx" ON "BuyRequest"("province", "city");

-- CreateIndex
CREATE INDEX "InspectionOrder_machineId_idx" ON "InspectionOrder"("machineId");

-- CreateIndex
CREATE INDEX "InspectionOrder_status_createdAt_idx" ON "InspectionOrder"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "InspectionReport_orderId_key" ON "InspectionReport"("orderId");

-- CreateIndex
CREATE INDEX "InspectionReport_machineId_idx" ON "InspectionReport"("machineId");

-- CreateIndex
CREATE INDEX "ValuationRecord_brand_model_province_idx" ON "ValuationRecord"("brand", "model", "province");

-- CreateIndex
CREATE INDEX "ValuationRecord_createdAt_idx" ON "ValuationRecord"("createdAt");

-- CreateIndex
CREATE INDEX "TradeOrder_machineId_idx" ON "TradeOrder"("machineId");

-- CreateIndex
CREATE INDEX "TradeOrder_status_createdAt_idx" ON "TradeOrder"("status", "createdAt");

-- CreateIndex
CREATE INDEX "LogisticsLead_createdAt_idx" ON "LogisticsLead"("createdAt");

-- CreateIndex
CREATE INDEX "MerchantApplication_status_createdAt_idx" ON "MerchantApplication"("status", "createdAt");

-- CreateIndex
CREATE INDEX "MerchantApplication_province_city_idx" ON "MerchantApplication"("province", "city");

-- CreateIndex
CREATE INDEX "AuditLog_targetType_targetId_idx" ON "AuditLog"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "MachinePhoto" ADD CONSTRAINT "MachinePhoto_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineSpec" ADD CONSTRAINT "MachineSpec_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnershipDoc" ADD CONSTRAINT "OwnershipDoc_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionOrder" ADD CONSTRAINT "InspectionOrder_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionReport" ADD CONSTRAINT "InspectionReport_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionReport" ADD CONSTRAINT "InspectionReport_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "InspectionOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeOrder" ADD CONSTRAINT "TradeOrder_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
