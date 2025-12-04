USE [MicroclearLight_July23]
GO
/****** Object:  Table [GCC].[GCC_AIPs]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_AIPs](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[GazetteNumber] [nvarchar](35) NULL,
	[Duty] [decimal](16, 6) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_CountryCodesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_CountryCodesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[Alpha3Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](255) NULL,
	[LocationId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_Currencies]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_Currencies](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[Type] [varchar](20) NULL,
	[Value] [decimal](12, 8) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_CurrencyCodesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_CurrencyCodesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](255) NULL,
	[CurrencyId] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_CustomsDataTypesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_CustomsDataTypesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](255) NULL,
	[CCPCode] [varchar](10) NULL,
	[CCPIds] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_CustomsDeclarations]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_CustomsDeclarations](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[DeclarationNumber] [nvarchar](200) NOT NULL,
	[Version] [int] NOT NULL,
	[DeclarationDate] [datetime] NOT NULL,
	[DeclarationType] [nvarchar](10) NOT NULL,
	[PortType] [nvarchar](10) NOT NULL,
	[DeliveryOrderNumber] [nvarchar](200) NULL,
	[ImporterExporterName] [nvarchar](200) NOT NULL,
	[ImporterExporterCustomsId] [nvarchar](200) NOT NULL,
	[NetWeight] [decimal](16, 6) NOT NULL,
	[CarrierCaptainDriver] [nvarchar](max) NULL,
	[IntercessorCompany] [nvarchar](200) NULL,
	[GrossWeight] [decimal](16, 6) NOT NULL,
	[CarrierName] [nvarchar](max) NULL,
	[CommercialRegistrationNumber] [nvarchar](35) NULL,
	[TinNumber] [nvarchar](35) NULL,
	[Measurement] [nvarchar](10) NOT NULL,
	[VoyageFlightNumber] [nvarchar](max) NULL,
	[ExportedTo] [nvarchar](200) NULL,
	[NumberOfPackages] [int] NULL,
	[BlAwbManifestNo] [nvarchar](200) NULL,
	[PortOfLoading] [nvarchar](256) NULL,
	[MarksAndNumbers] [nvarchar](max) NULL,
	[PortOfDischarge] [nvarchar](256) NULL,
	[DestinationCountryCode] [nvarchar](10) NULL,
	[ClearingAgentName] [nvarchar](200) NULL,
	[ClearingAgentCode] [nvarchar](35) NULL,
	[LicenseNumber] [nvarchar](35) NULL,
	[RiskOutcome] [nvarchar](10) NULL,
	[ValuationMethod] [nvarchar](10) NULL,
	[OtherRemarks] [nvarchar](512) NULL,
	[ReleaseDate] [datetime] NOT NULL,
	[Route] [nvarchar](256) NULL,
	[ExitPort] [nvarchar](256) NULL,
	[TotalDuty] [decimal](16, 6) NOT NULL,
	[Vat] [decimal](16, 6) NULL,
	[ExciseTax] [decimal](16, 6) NULL,
	[OtherCharges] [decimal](16, 6) NULL,
	[DueNumber] [nvarchar](200) NULL,
	[UnifiedCustomsCode] [nvarchar](200) NULL,
	[DefiniteFee] [decimal](16, 6) NOT NULL,
	[Insured] [decimal](16, 6) NULL,
 CONSTRAINT [PK__GCC_Cust__3214EC07BCFDA32D] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_CustomsPortTypesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_CustomsPortTypesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](255) NULL,
	[GCCPortType] [int] NULL,
	[LocationTypeTypeId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_DataEntityTypes]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_DataEntityTypes](
	[DataEntityTypeId] [int] IDENTITY(1,1) NOT NULL,
	[EntityTypeName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[TableName] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedAt] [datetime2](3) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DataEntityTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY],
UNIQUE NONCLUSTERED 
(
	[EntityTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_DocumentTypesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_DocumentTypesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
	[DocumentId] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_DueNumbers]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_DueNumbers](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Version] [int] NOT NULL,
	[DeclarationId] [bigint] NOT NULL,
	[TransferDeclarationNumber] [nvarchar](250) NOT NULL,
	[TransferPort] [nvarchar](100) NOT NULL,
	[TransferDeclarationDate] [nvarchar](100) NOT NULL,
	[DueAmount] [decimal](16, 6) NOT NULL,
	[DestinationCountry] [nvarchar](100) NOT NULL,
	[FirstEntryCountry] [nvarchar](100) NOT NULL,
	[FirstEntryPort] [nvarchar](100) NOT NULL,
	[FirstEntryDeclarationNumber] [nvarchar](250) NOT NULL,
	[FirstEntryDeclarationDate] [nvarchar](100) NOT NULL,
	[Status] [nvarchar](10) NOT NULL,
	[ReceiptFileRef] [nvarchar](250) NULL,
 CONSTRAINT [PK__GCC_DueN__3214EC071234D4AE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_DueNumberStatusesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_DueNumberStatusesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_GCCPortCodesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_GCCPortCodesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](10) NULL,
	[Country] [nvarchar](100) NULL,
	[EnglishPortType] [nvarchar](100) NULL,
	[ArabicPortType] [nvarchar](100) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[LocationId] [int] NULL,
	[CountryId] [int] NULL,
 CONSTRAINT [PK__GCC_GCCP__3214EC074C3034DF] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_ItemDetails]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_ItemDetails](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[Quantity] [decimal](16, 3) NOT NULL,
	[Unit] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_Items]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_Items](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[DeclarationId] [bigint] NOT NULL,
	[HsCode] [nvarchar](100) NOT NULL,
	[GoodsDescription] [nvarchar](512) NOT NULL,
	[OriginCountryCode] [varchar](20) NOT NULL,
	[CifForeignValue] [decimal](16, 6) NOT NULL,
	[CifLocalValue] [decimal](16, 6) NOT NULL,
	[DutyRate] [nvarchar](200) NOT NULL,
	[IncomeType] [nvarchar](200) NULL,
	[TotalDuty] [decimal](16, 6) NOT NULL,
	[NetWeight] [decimal](16, 6) NOT NULL,
	[GrossWeight] [decimal](16, 6) NOT NULL,
	[ExemptionApprovalRef] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_LanguageCodesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_LanguageCodesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](10) NULL,
	[LanguageFamily] [nvarchar](200) NULL,
	[ArabicLanguageName] [nvarchar](200) NULL,
	[EnglishLanguageName] [nvarchar](200) NULL,
	[NativeName] [nvarchar](200) NULL,
 CONSTRAINT [PK__GCC_Lang__3214EC07F0EBC080] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_Packages]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_Packages](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[Quantity] [decimal](16, 0) NULL,
	[Type] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_PackageTypesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_PackageTypesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](10) NULL,
	[EnglishName] [nvarchar](200) NULL,
	[ArabicName] [nvarchar](200) NULL,
	[AdditionalEnglishDescription] [nvarchar](max) NULL,
	[AdditionalArabicDescription] [nvarchar](max) NULL,
	[EnglishCategory] [nvarchar](100) NULL,
	[ArabicCategory] [nvarchar](100) NULL,
	[TypeId] [nvarchar](250) NULL,
 CONSTRAINT [PK__GCC_Pack__3214EC0759FA5C6E] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_PaymentMethodsLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_PaymentMethodsLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
	[TypeId] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_Payments]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_Payments](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[DeclarationId] [bigint] NOT NULL,
	[Method] [varchar](10) NULL,
	[No] [varchar](200) NULL,
	[Date] [datetime] NULL,
	[Bank] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_ProviderFeedbacks]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_ProviderFeedbacks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FeedbackId] [nvarchar](200) NOT NULL,
	[OriginalRequestId] [nvarchar](200) NOT NULL,
	[ApiEndpoint] [nvarchar](max) NOT NULL,
	[ErrorResponseJson] [nvarchar](max) NULL,
	[OutboundRequestHeader] [nvarchar](50) NULL,
	[CreatedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_Restrictions]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_Restrictions](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[Agency] [nvarchar](200) NOT NULL,
	[ReleaseRef] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_RiskResultsLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_RiskResultsLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_TransferReceiptListOfDues]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_TransferReceiptListOfDues](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[TransferReceiptId] [bigint] NOT NULL,
	[DueReference] [nvarchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_TransferReceipts]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_TransferReceipts](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Version] [int] NOT NULL,
	[FileName] [nvarchar](200) NOT NULL,
	[ImageUrl] [nvarchar](512) NOT NULL,
	[FileDate] [char](14) NOT NULL,
	[Amount] [decimal](16, 6) NOT NULL,
	[DueNumber] [nvarchar](200) NULL,
 CONSTRAINT [PK__GCC_Tran__3214EC07B433B939] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_UnitCodesLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_UnitCodesLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Quantity] [nvarchar](max) NULL,
	[Code] [nvarchar](max) NOT NULL,
	[ArabicDescription] [nvarchar](max) NULL,
	[EnglishDescription] [nvarchar](max) NULL,
	[ConversionFactor] [nvarchar](max) NULL,
	[Symbol] [nvarchar](50) NULL,
	[Description] [nvarchar](255) NULL,
	[MeasurementUnitId] [nvarchar](250) NULL,
 CONSTRAINT [PK__GCC_Unit__3214EC0702720F00] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY] TEXTIMAGE_ON [SECONDARY]
GO
/****** Object:  Table [GCC].[GCC_ValuationMethodsLookup]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [GCC].[GCC_ValuationMethodsLookup](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NULL,
	[ArabicDescription] [nvarchar](255) NULL,
	[EnglishDescription] [nvarchar](255) NULL,
	[Notes] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [SECONDARY]
) ON [SECONDARY]
GO
ALTER TABLE [GCC].[GCC_CustomsDeclarations] ADD  CONSTRAINT [DF_GCC_CustomsDeclarations_Version]  DEFAULT ((1)) FOR [Version]
GO
ALTER TABLE [GCC].[GCC_DataEntityTypes] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [GCC].[GCC_DataEntityTypes] ADD  DEFAULT (getutcdate()) FOR [CreatedAt]
GO
ALTER TABLE [GCC].[GCC_DueNumbers] ADD  CONSTRAINT [DF_GCC_DueNumbers_version]  DEFAULT ((1)) FOR [Version]
GO
ALTER TABLE [GCC].[GCC_ProviderFeedbacks] ADD  DEFAULT (getutcdate()) FOR [CreatedOn]
GO
ALTER TABLE [GCC].[GCC_TransferReceipts] ADD  CONSTRAINT [DF_GCC_TransferReceipts_Version]  DEFAULT ((1)) FOR [Version]
GO
ALTER TABLE [GCC].[GCC_TransferReceipts] ADD  DEFAULT ('') FOR [DueNumber]
GO
ALTER TABLE [GCC].[GCC_AIPs]  WITH CHECK ADD FOREIGN KEY([ItemId])
REFERENCES [GCC].[GCC_Items] ([Id])
GO
ALTER TABLE [GCC].[GCC_Currencies]  WITH CHECK ADD FOREIGN KEY([ItemId])
REFERENCES [GCC].[GCC_Items] ([Id])
GO
ALTER TABLE [GCC].[GCC_DueNumbers]  WITH CHECK ADD  CONSTRAINT [FK__GCC_DueNu__Decla__2D18D623] FOREIGN KEY([DeclarationId])
REFERENCES [GCC].[GCC_CustomsDeclarations] ([Id])
GO
ALTER TABLE [GCC].[GCC_DueNumbers] CHECK CONSTRAINT [FK__GCC_DueNu__Decla__2D18D623]
GO
ALTER TABLE [GCC].[GCC_ItemDetails]  WITH CHECK ADD FOREIGN KEY([ItemId])
REFERENCES [GCC].[GCC_Items] ([Id])
GO
ALTER TABLE [GCC].[GCC_Items]  WITH CHECK ADD  CONSTRAINT [FK__GCC_Items__Decla__1911DD76] FOREIGN KEY([DeclarationId])
REFERENCES [GCC].[GCC_CustomsDeclarations] ([Id])
GO
ALTER TABLE [GCC].[GCC_Items] CHECK CONSTRAINT [FK__GCC_Items__Decla__1911DD76]
GO
ALTER TABLE [GCC].[GCC_Packages]  WITH CHECK ADD FOREIGN KEY([ItemId])
REFERENCES [GCC].[GCC_Items] ([Id])
GO
ALTER TABLE [GCC].[GCC_Payments]  WITH CHECK ADD  CONSTRAINT [FK__GCC_Payme__Decla__2A3C6978] FOREIGN KEY([DeclarationId])
REFERENCES [GCC].[GCC_CustomsDeclarations] ([Id])
GO
ALTER TABLE [GCC].[GCC_Payments] CHECK CONSTRAINT [FK__GCC_Payme__Decla__2A3C6978]
GO
ALTER TABLE [GCC].[GCC_Restrictions]  WITH CHECK ADD FOREIGN KEY([ItemId])
REFERENCES [GCC].[GCC_Items] ([Id])
GO
/****** Object:  StoredProcedure [dbo].[usp_GetDeclDocListForGCC_CUAInt]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_GetDeclDocListForGCC_CUAInt]
(
    @DeclarationNumber Nvarchar(100)
)
AS
BEGIN
    SELECT
        ROW_NUMBER() OVER 
        (
            PARTITION BY D.DeclarationId 
            ORDER BY ISNULL(DDD_Ara.Description, DDD.Description)
        ) AS [DocSeqNo],

        D.DeclarationNumber AS [relatedDeclarationNumber],
        D.DeclarationId AS [relatedDeclarationId],

        --Connect with the master data "أنواع الوثائق" map with document type and get the details here.
        GCCD.Code AS [documentCategory],

        DDD.Document_Id AS [documentType],
        sd.DocumentName AS [documentName],
        sd.DocumentId AS [documentIdNumber],

        NULL AS [documentLanguage],

        --Contents shall get for each document separately.
        NULL AS [documentContent],

        CONVERT(VARCHAR(35), sd.DocumentId) + '.pdf' AS [fileName],
        sd.newFileName_dfs AS FilePath
    FROM 
        Declarations D

        INNER JOIN dbo.DeclarationDocuments DD 
            ON DD.DeclarationId = D.DeclarationId

        INNER JOIN dbo.Documents DDD 
            ON DD.DocumentId = DDD.DocumentId

        INNER JOIN ScanRequestUploadDocs sd 
            ON sd.DeclarationDocumentType = DD.DeclarationDocumentId
           AND sd.DeclarationId = D.DeclarationId
           AND sd.UploadedFrom = 'Declarations'

        LEFT OUTER JOIN dbo.Documents_ara DDD_Ara 
            ON DDD.DocumentId = DDD_Ara.DocumentId

        LEFT OUTER JOIN gcc.GCC_DocumentTypesLookup GCCD 
            ON GCCD.DocumentId = DD.DocumentId

        --LEFT OUTER JOIN GCCLanguage GCClang ON GCClang.Code = DD.DocumentId
    WHERE 
        D.DeclarationNumber = @DeclarationNumber;
END
GO
/****** Object:  StoredProcedure [GCC].[DueNumberPreviewSP_QRGCC]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [GCC].[DueNumberPreviewSP_QRGCC]
(
    @dueNumber AS VARCHAR(50) --           
)
AS
BEGIN
    SELECT 
        Declarations.DeclarationNumber AS 'transferDeclarationNumber',

        --Case LEN(TransPort.LocationCode)
        --WHEN  3 THEN   TransPort.LocationCode
        --ELSE SUBSTRING (TransPort.LocationCode,3,3)
        --END
        --As 'transferPort',
        GCCtransferPort.Code AS 'transferPort', -- atif  

        Declarations.DeclarationDate AS 'transferDeclarationDate',

        Du.DutyAmount AS dueAmount,

        'KW' AS 'destinationCountry', -- static  mpping

        --FirstEntryCountry.LocationCode as 'firstEntryCountry',
        GCCfirstEntryCountry.Code AS 'firstEntryCountry', --atif

        --FirstEntryPort.LocationCode as 'firstEntryPort',
        GCCfirstEntryCountry.Code AS 'firstEntryPort', --atif

        --CASE LEN(FirstEntryPort.LocationCode )
        --WHEN  3 THEN   FirstEntryPort.LocationCode
        --ELSE SUBSTRING (FirstEntryPort.LocationCode,3,3)
        --END
        --As 'firstEntryPort',

        FirstEntryPort.StateId,

        Du.FEDeclarationDate AS 'firstEntryDeclarationDate',

        CASE Du.StateId
            WHEN 'DuesCreated'              THEN 'CRE'
            WHEN 'DuesKuwaitClosedState'    THEN 'CLS'
            WHEN 'DuesRejectedState'        THEN 'REJ'
            WHEN 'DuesPaymentReceivedState' THEN 'PRS'
        END AS 'status', --- i cant map 

        DT.TransferNo AS 'receiptFileRef'
    FROM 
        Declarations
        INNER JOIN Dues Du 
            ON Du.KwDeclarationID = Declarations.DeclarationId
        INNER JOIN Locations TransPort 
            ON TransPort.LocationId = Declarations.OwnerLocId
        INNER JOIN Locations FirstEntryPort 
            ON FirstEntryPort.LocationId = Du.FEDPort
        INNER JOIN Locations FirstEntryCountry 
            ON FirstEntryCountry.LocationId = FirstEntryPort.ParentId
        LEFT OUTER JOIN DuesTransfer DT  
            ON DT.DuesTransferId = Du.DueTransferId
        LEFT OUTER JOIN GCC_CustomsPortTypesLookup GCCtransferPort 
            ON GCCtransferPort.LocationTypeTypeId = TransPort.LocationTypeTypeId --atif 
        LEFT OUTER JOIN GCC_CountryCodesLookup GCCfirstEntryCountry 
            ON GCCfirstEntryCountry.LocationId = FirstEntryCountry.LocationId --atif 
        LEFT OUTER JOIN GCC_CustomsPortTypesLookup GCCfirstEntryPort  
            ON GCCfirstEntryPort.LocationTypeTypeId = TransPort.LocationTypeTypeId --atif   
        --INNER JOIN  GCCDueStatus  GCCStatus   on GCCStatus.LocationId = TransPort.LocationId  
    WHERE 
        Du.FinalDestinationCountry = 5150
        AND Declarations.DeclarationNumber = @dueNumber;
END
GO
/****** Object:  StoredProcedure [GCC].[Gcc_customdeclartioninquiryairimport]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	------

CREATE PROCEDURE [GCC].[Gcc_customdeclartioninquiryairimport]  @DeclarationId VARCHAR(50) , @Phase nvarchar(30)
AS
BEGIN

Declare @MaqasaCount int
Declare @BWHOrgPOL NVARCHAR(250)
Declare @TotalBills Nvarchar(50) 
 
 Declare @AntiDumpingCuoff date = '2018-11-12'
	Declare @ADDutyAmount decimal(18,3),@ADRegulations varchar(500)
 
Select @ADRegulations=
 STUFF((SELECT ', '+RegulationNo 
		FROM (SELECT DT.RegulationNo FROM DeclarationDuties OC    
 left join Declarations D On D.declarationId=OC.DeclarationId
 left join Duties DT on DT.DutyId=OC.DutyId
 WHERE OC.DeclarationId = @DeclarationId
  AND (OC.DUTYID IN (      
   SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations      
       --WHERE ConfigName IN ('PreventiveDutiesList', 'PreventiveDutiesListForCement')  --= 'PreventiveDutiesList'      
    WHERE ConfigName IN ('PreventiveDutiesList')  --= 'PreventiveDutiesList'      
       ), ',')      
       )   -- Including  Preventive Duties      
       
 OR OC.DUTYID IN (      
    SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations      
       WHERE ConfigName IN ('PreventiveDutiesListForCement')  --= 'PreventiveDutiesListForCement'      
       ), ',')      
       )  -- Including  Preventive DutiesList ForCement      
    
   OR OC.DUTYID IN (      
    SELECT DutyId      
    FROM AntiDumpingDutiesConfig      
    WHERE StateId = 'DutiesConfigCreatedState'      
     AND @AntiDumpingCuoff <= CONVERT(Date,D.DateCreated)      
    ) -- Including Anti-dumping duties      
 OR OC.DutyId= dbo.KWConstantFn('GBL_Constants.Duties.AntiDumpingCement_Iran')      
  ) )BB   FOR XML PATH('')),1,1,'') --as 'RegulationNo'


SELECT @ADDutyAmount=SUM(OC.DutyValue) 
 FROM DeclarationDuties OC    
 left join Declarations D On D.declarationId=OC.DeclarationId
 WHERE OC.DeclarationId = @DeclarationId
  AND (DUTYID IN (      
   SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations      
       --WHERE ConfigName IN ('PreventiveDutiesList', 'PreventiveDutiesListForCement')  --= 'PreventiveDutiesList'      
    WHERE ConfigName IN ('PreventiveDutiesList')  --= 'PreventiveDutiesList'      
       ), ',')      
       )   -- Including  Preventive Duties      
       
 OR DUTYID IN (      
    SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations      
       WHERE ConfigName IN ('PreventiveDutiesListForCement')  --= 'PreventiveDutiesListForCement'      
       ), ',')      
       )  -- Including  Preventive DutiesList ForCement      
    
   OR DUTYID IN (      
    SELECT DutyId      
    FROM AntiDumpingDutiesConfig      
    WHERE StateId = 'DutiesConfigCreatedState'      
     AND @AntiDumpingCuoff <= CONVERT(Date,D.DateCreated)      
    ) -- Including Anti-dumping duties      
 OR DutyId= dbo.KWConstantFn('GBL_Constants.Duties.AntiDumpingCement_Iran')      
  )

Select @MaqasaCount = Count(MaqasaAttachmentId) from MaqasaAttachments where DeclarationId = @DeclarationId

Select @TotalBills= N'عدد بوالص الشحن في طلب توحيد الشحن السريع:'+cast(Count(Distinct IB.HouseBillId) as nvarchar) from CourierConsolidationRequest CCR  
Inner join IBInvoices IB on CCR.CCRequestId = IB.CCRequestId  
Inner Join DeliveryOrders DO on CCR.DeliveryOrderId = DO.DeliveryOrderId  
Inner Join Declarations D on DO.DeliveryOrderId = D.DeliveryOrderId  
Where D.DeclarationId=@DeclarationId and IB.stateid!='AirwayBillDeletedState'
--Below added in Case condition for BWH-(DR-Import) Bayan in print to show Org Name as Port of loading
SELECT @BWHOrgPOL=ISNULL(UPPER(DeclReqOrg.LocalDescription),'-')   From Declarations D 
LEFT OUTER JOIN HouseBills HB ON D.DeliveryOrderId=HB.DeliveryOrderId LEFT OUTER JOIN DeclareRequest DR ON
HB.HouseBillId=DR.HouseBillId LEFT OUTER JOIN  Organizations DeclReqOrg on DeclReqOrg.OrganizationId = DR.OwnerOrgId
where DeclarationId=@DeclarationId and ISNULL(DR.DRBillType,0)=dbo.KWConstantfn('GBL_Locations.DRType.DRImport')

SELECT    
	isnull(dbo.TrimDecNumberFn(Declarations.DeclarationNumber), Declarations.TempDeclNumber) AS DeclarationNumber,   
              SUBSTRING(DeclarationTypes.LocalDescription,0,40) AS DeclarationType,  
              Declarations.TempDeclNumber AS path,  
              dbo.GetBCLocalURLFn('empty=true&Show_Text=Y&X=0.06&text=' + Declarations.TempDeclNumber) AS xpath,  
              dbo.GetBCLocalURLFn('Show_Text=Y&text=' + Declarations.TempDeclNumber) AS ypath,  
			CASE WHEN declarations.DeclarationDate > '2015-02-04 00:00:00.000'
				THEN 
					case CustomsControlProcedures.CCPCode 
					when 'DR' then  isnull(CargoVw.MRNumber, '-')  + CASE WHEN BF.BFNumber IS NOT NULL THEN '<br/>' + ' EF '+ BF.BFNumber ELSE '' End + ISNULL('<br/>' + 'Remarks: ' +ISNULL(Declarations_ara.Remarks,Declarations.Remarks),'')  
					else ' B '+ isnull(CargoVw.HouseBillNumber, '-') +  ' M '+ isnull(CargoVw.MRNumber_1, '-')  + CASE WHEN BF.BFNumber IS NOT NULL THEN '<br/>' + ' EF '+ BF.BFNumber ELSE '' End  + CASE WHEN CargoVw.ReferenceHouseBillId IS NOT NULL THEN '<br/>' +' MWB : '+ isnull(MasterHouseBill.HouseBillNumber, '-') ELSE ''  END  + ISNULL('<br/>' + 'Remarks: ' +ISNULL(Declarations_ara.Remarks,Declarations.Remarks),'') 
					End 
				ELSE
					case CustomsControlProcedures.CCPCode 
					when 'DR' then  isnull(CargoVw.MRNumber, '-')  + ISNULL('<br/>' + 'Remarks: ' +ISNULL(Declarations_ara.Remarks,Declarations.Remarks),'')  
					else ' B '+ isnull(CargoVw.HouseBillNumber, '-') +  ' M '+ isnull(CargoVw.MRNumber_1, '-')  + CASE WHEN CargoVw.ReferenceHouseBillId IS NOT NULL THEN '<br/>' +' MWB : '+ isnull(MasterHouseBill.HouseBillNumber, '-') ELSE '' END  + ISNULL('<br/>' + 'Remarks: ' +ISNULL(Declarations_ara.Remarks,Declarations.Remarks),'') 
					End
				END	as 'B\L - AWB No./Manif', 
              UPPER(OwnerLoc.LocalDescription) 'Carrier Type',   
              CONVERT(CHAR(12),Declarations.DeclarationDate) AS [Date],   
  	      CustomsControlProcedures.CCPCode  as	'BillType_1',
              UPPER(SUBSTRING(CustomsControlProcedures.LocalDescription,0,30)) 'BillType',  
	      case when isnull(CargoVw.JourneyId, '') != '' then CargoVw.DeliveryOrderNumber else '' End as 'DeliveryOrderNumber', 	
 	      CargoVw.ConsigneeName as 'Consignee',
	      CargoVw.CaptainName as 'Captain Name',
	      CargoVw.CarrierName as 'Carrier Name',
	      CargoVw.Voyage  as 'Voyage/Flight No.',
	      CargoVw.ExportedTo_LA as 'Exported To',
 	              Case when @BWHOrgPOL <> '-' then @BWHOrgPOL  
	   ELSE ISNULL(CargoVw.PortOfLoading_Cont_Name,'-')  + ' / ' + ISNULL(UPPER(CargoVw.PortOfLoading),'-') END AS "Port Of Loading",    

          
          CargoVw.PortOfDischarge AS 'Port Of Discharge',
	      CASE WHEN ISNULL(declarations.FinalDestination,'') ='' THEN CargoVw.PortOfDestination ELSE UPPER(FDC.LocalDescription) END AS 'Destination',
	      CargoVw.TradeLicenseNumber as 'TradeLicenseNumber',
	      CargoVw.Intercessor as 'Intercessor',
	      Declarations.DeclarationId AS 'DeclarationId',  	
	      CargoVw.TradeLicenseNumber AS 'PassportNumber',  
	      CargoVw.Intercessor as 'ENDorsementAgentName',
	      CargoVw.ConsigneeId as 'ConsigneeId',
	      ''  AS ENDorsementID ,
		  case when Cargovw.CCRequestId is not null then @TotalBills else  
  		'Marks: ' + CASE ISNULL(CargoVw.Marks,'') WHEN '' THEN '-' ELSE  ISNULL(SUBSTRING(CargoVw.Marks,0,100),'-') END +
		 '<br/>' + 'Numbers: ' + dbo.GetRefDeclForDeclFn(@DeclarationId) + ' ' + dbo.[GetRenewalReasonFn](@DeclarationId) +
		  '<br/>' +  isnull('(' + isnull(EType.LocalDescription, Etype.name) + ':' +
		   Convert(varchar(2), isnull(Declarations.ExpiryPeriod, 0))  + ' / '+ Convert(nvarchar(10), 
		   Declarations.TempAdmissionExpiredOn,103) +  N' : تأريخ الإنتهاء' + ')', '' )  +
		    '<br/>' + dbo.GetRefDeclForHBFn(CargoVw.BaseHouseBillId) +  ' / ' + Convert(varchar(3),@MaqasaCount) + N' : عدد بيانات المقاصة' END  
			
			AS Marks, 
              'Marks: ' + ISNULL(CargoVw.Marks,'-') AS MarksAndNumbers, 
	Declarations.NWt AS 'Net Weight',
		CargoVw.GWeight_NewC	AS 'Gross Weight',  
             		isnull( ISNULL(CargoVw.WtUOM_A,CargoVw.WtUOM), '') AS 'Measurement',  
                	CargoVw.Quantity_NewC AS 'No of Packages',      
              '-' AS 'InspectionReasons' ,   
              '-' AS 'InspectionInspector',   
	      N'  مدقق ' + ':' +  isnull(Declarations.AuditorId, '-') AS 'InspectionSuprtvisor' , 
			  --dbo.[GetAEODeclListFn](@DeclarationId)  AS 'InspectionRemarks', 
			  dbo.GetBayanInvoices_QRGCC(@DeclarationId) AS 'InspectionRemarks',      
			  (dbo.fn_formatdate(ReleaseDate, 'dd/MM/yyyy hh:mm:ss tt') + N' / ' + Declarations.ReleasedBy)  AS 'InspectionReleaseDate', 
              ISNULL(AgentOrg.LocalDescription,'-') AS 'ClearingAgent',  
              ISNULL(AgentOrg.TradeLicenseNumber,'-') AS 'LicenceNo',   
              Declarations.AuditorId,  
              Declarations.AuditedDate,  
              Declarations.AuditorSupervisorId,  
              Declarations.ApprovedDate,         
                --(Select UPPER(ISNULL(dbo.[GetNameByPersonalId_Rpt_Fn](U.PersonalId),'-'))) as CreatedBy,  
				Declarations.CreatedBy AS CreatedBy,
		'Air' PortType, '' FormatNum,
   isnull(isnull(TransInPort.localdescription,TransInPort.Name) + ',' + isnull(TransOutPort.localdescription,TransOutPort.Name), '-') as 'Route',
	CONVERT(varchar(20), Declarations.ExitDate, 22)  as 'TransitDate',
	(CONVERT(varchar(20), Declarations.TransitInsDate, 22)+' / '+Declarations.TransitInsId)  AS 'TransitInspectorDate' , @Phase as 'Phase' 
	,ConsigneeOrg.OrganizationCode as UnifiedCustomsCode
		,'' AS VAT
		,'' AS ExciseTax
		,@ADDutyAmount AS DumpingDuty
		,@ADRegulations as RegulationNo
		,case when (select COUNT(1) from DeclarationAEOList DA JOIN Declarations D ON DA.DeclarationId=D.DeclarationId     
where DA.StateId <> 'DeclarationAEOListDeletedState' and D.StateId not in ('DeclarationCreatedState','DeclarationModifiedState','DutyCalculatedState','DeclarationRejected')     
and DA.DeclarationId= Declarations.DeclarationId    
AND DA.CountriesAEOListId not in (select ISNULL(CountriesAEOListId,0) from KuwaitAEOList))>0 then 'y' 
when (select COUNT(1) from DeclarationAEOList DA JOIN Declarations D ON DA.DeclarationId=D.DeclarationId     
where DA.StateId <> 'DeclarationAEOListDeletedState' and D.StateId not in ('DeclarationCreatedState','DeclarationModifiedState','DutyCalculatedState','DeclarationRejected')     
and DA.DeclarationId= Declarations.DeclarationId    
AND DA.CountriesAEOListId in (select ISNULL(CountriesAEOListId,0) from KuwaitAEOList))>0 then 'y'
else 'n' end as ISGCCAEOLogo
,
--case when (select COUNT(1) from DeclarationAEOList DA JOIN Declarations D ON DA.DeclarationId=D.DeclarationId     
--where DA.StateId <> 'DeclarationAEOListDeletedState' and D.StateId not in ('DeclarationCreatedState','DeclarationModifiedState','DutyCalculatedState','DeclarationRejected')     
--and DA.DeclarationId= Declarations.DeclarationId    
--AND DA.CountriesAEOListId in (select ISNULL(CountriesAEOListId,0) from KuwaitAEOList))>0 then 'y' else 'n' end 
'n' as ISKWTAEOLogo
,[dbo].[GetAEODeclListFn_GCC](Declarations.DeclarationId) as GCCAEOCode
--,[dbo].[GetAEODeclListFn](Declarations.DeclarationId) as KWTAEOCode
,'' AS KWTAEOCode
,case when (Declarations.DeclarationNumber is null or Declarations.DeclarationNumber ='') then 'n' else 'y' end as IsQRRequired
, case when  (GCC_CustomsDataTypesLookup.code is not null) then GCC_CustomsDataTypesLookup.code  else '999' end  as DeclarationType ---atif 
, case when  (GCC_CustomsPortTypesLookup.code is not null) then GCC_CustomsPortTypesLookup.code  else '999' end  as PortType ---atif 
, case when  (FD.code is not null) then FD.code  else '999' end  as destinationCountryCode  ---atif 
, case when  (gccuom.code is not null) then gccuom.code  else '999' end  as measurement ---atif 
, '' as RiskOutcome ---atif 
,'' as ValuationMethod ---atif 
            FROM Declarations   
				INNER JOIN CustomsControlProcedures ON Declarations.CustomsControlProcedureId = CustomsControlProcedures.CustomsControlProcedureId   
				inner join CargoVw on 	Declarations.DeclarationId = CargoVw.DeclarationId
				LEFT OUTER JOIN      Declarations_ara ON Declarations.DeclarationId = Declarations_ara.DeclarationId  
				LEFT OUTER JOIN      Types DeclarationTypes ON Declarations.DeclarationType=DeclarationTypes.TypeId   
				LEFT OUTER JOIN      Locations OwnerLoc ON Declarations.OwnerLocId = OwnerLoc.LocationId  
				LEFT OUTER JOIN Organizations ConsigneeOrg ON Declarations.ConsigneeId = ConsigneeOrg.OrganizationId  
				LEFT OUTER JOIN      Organizations AgentOrg ON Declarations.AgentId = AgentOrg.OrganizationId  
				LEFT OUTER JOIN      HouseBills MasterHouseBill ON MasterHouseBill.HouseBillId = CargoVw.ReferenceHouseBillId  		
				Left outer join Types EType on EType.TypeId =  Declarations.ExpiryType
				left outer join TransitRoute on Declarations.DeclarationId = TransitRoute.DeclarationId
				left outer join Locations TransInPort on TransInPort.LocationId = TransitRoute.InPortId
				left outer join Locations TransOutPort on TransOutPort.LocationId = TransitRoute.OutPortId
				--left outer join MaqasaAttachments on  Declarations.DeclarationId = MaqasaAttachments.DeclarationId
				Left outer Join PassengerDetails pd on DEclarations.DeliveryOrderId = pd.DeliveryOrderId
				--Left outer join DeliveryOrders PRDo on pd.DeliveryOrderId = PRDo.DeliveryOrderId 	
				LEFT OUTER JOIN dbo.BForm bf ON bf.DeliveryOrderId = dbo.Declarations.DeliveryOrderId AND bf.StateId='BFormApprovedByCustomsState'					
                left outer join Locations FDC on FDC.LocationId = Declarations.FinalDestination		
				
				LEFT OUTER JOIN GCC_CustomsDataTypesLookup ON GCC_CustomsDataTypesLookup.CCPCode =customscontrolprocedures.CCPCode -- atif 
           LEFT OUTER JOIN GCC_CustomsPortTypesLookup
                        ON gcc.GCC_CustomsPortTypesLookup.LocationTypeTypeId = OwnerLoc.locationid --atif 
           LEFT OUTER JOIN GCC_UnitCodesLookup gccuom
                        ON gccuom.measurementunitid = cargovw.wtuom -- atif 
           LEFT OUTER JOIN GCC_CountryCodesLookup FD
                        ON FD.locationid = declarations.finaldestination --atif 
    --left outer join GCCRMSStatus on  --riskOutcome --atif not mapped  
	--left outer join Users U on U.UserId=Declarations.CreatedBy	
WHERE       
             (Declarations.DeclarationId = @DeclarationId)  
END


GO
/****** Object:  StoredProcedure [GCC].[GCC_CustomDeclartionInquiryDutyInfo]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


  
  
  
CREATE PROC [GCC].[GCC_CustomDeclartionInquiryDutyInfo] @DeclarationNumber VARCHAR(50)          
AS          
DECLARE @TotalDuty NUMERIC(18, 3)          
 ,@OtherCharges NUMERIC(18, 3)          
 ,@Deposits NUMERIC(18, 3)  ,@DumpDuty NUMERIC(18, 3)          
          
BEGIN          
          
 Declare @AntiDumpingCuoff date = '2018-11-12', @DeclarationDate date          
 Select @DeclarationDate = CONVERT(Date,DateCreated) From declarations D where declarationId=@DeclarationNumber          
        
 SELECT @TotalDuty = SUM(DD.DutyValue)          
 FROM DeclarationDuties DD          
 WHERE DD.DeclarationId = @DeclarationNumber          
  AND DD.Typeid IN (          
   dbo.KWConstantfn('GBL_Types.DUTY_TYPE.DUTIES')          
   ,dbo.KWConstantfn('GBL_Types.DUTY_TYPE.TAXES')          
   ,dbo.KWConstantfn('GBL_Types.DUTY_TYPE.EXEMPTIONS')          
   ) --Duties, Taxes, Exemptions          
  AND DUTYID --!=dbo.KWConstantfn('GBL_Types.DUTY.TEMP_ADM_DEP_EXEM')          
  NOT IN (          
   SELECT dbo.KWConstantfn('GBL_Types.DUTY.TEMP_ADM_DEP_EXEM')          
             
   UNION          
             
   (          
     SELECT *          
     FROM SplitToTable((          
        SELECT ConfigValue          
        FROM Configurations          
        --WHERE ConfigName IN ('PreventiveDutiesList', 'PreventiveDutiesListForCement') --= 'PreventiveDutiesList'          
  WHERE ConfigName IN ('PreventiveDutiesList') --= 'PreventiveDutiesList'          
        ), ',')          
    )  -- Excluding Preventive Duties          
      
 UNION          
    (          
     SELECT *          
     FROM SplitToTable((          
        SELECT ConfigValue          
        FROM Configurations          
       WHERE ConfigName IN ('PreventiveDutiesListForCement') --= 'PreventiveDutiesList'          
        ), ',') -- Excluding PreventiveDutiesListForCement        
    )         
       
   UNION          
             
   (          
    SELECT DutyId          
    FROM AntiDumpingDutiesConfig          
    WHERE StateId = 'DutiesConfigCreatedState' And          
      @AntiDumpingCuoff <= @DeclarationDate             
         
    ) --Excluding Anti-dumping Duties           
   )          
          
 SELECT @OtherCharges = SUM(OC.DutyValue)          
 FROM DeclarationDuties OC          
 WHERE OC.DeclarationId = @DeclarationNumber          
  AND -- OC.Typeid in (dbo.KWConstantfn('GBL_Types.DUTY_TYPE.CHARGES'),dbo.KWConstantfn('GBL_Types.DUTY_TYPE.PENALTY')) --Charges, Penalty          
  (          
   OC.Typeid IN (          
          
    dbo.KWConstantfn('GBL_Types.DUTY_TYPE.CHARGES')          
    ,dbo.KWConstantfn('GBL_Types.DUTY_TYPE.PENALTY')          
    ) --Charges, Penalty            
  )        
          
 SELECT @Deposits = SUM(Dep.DutyValue)          
 FROM DeclarationDuties Dep          
 WHERE Dep.DeclarationId = @DeclarationNumber          
  AND (          
   Dep.Typeid = dbo.KWConstantfn('GBL_Types.DUTY_TYPE.DEPOSITS') --Deposits          
   OR DUTYID = dbo.KWConstantfn('GBL_Types.DUTY.TEMP_ADM_DEP_EXEM')          
   )          
 SELECT @DumpDuty = SUM(DD.DutyValue)        
 FROM DeclarationDuties DD        
 WHERE DD.DeclarationId = @DeclarationNumber        
  AND DD.Typeid IN (        
   dbo.KWConstantfn('GBL_Types.DUTY_TYPE.DUTIES')        
   ,dbo.KWConstantfn('GBL_Types.DUTY_TYPE.TAXES')        
   ,dbo.KWConstantfn('GBL_Types.DUTY_TYPE.EXEMPTIONS')        
   ) --Duties, Taxes, Exemptions        
  AND DUTYID --!=dbo.KWConstantfn('GBL_Types.DUTY.TEMP_ADM_DEP_EXEM')        
   IN         
   (        
    (        
     SELECT *        
     FROM SplitToTable((        
        SELECT ConfigValue        
        FROM Configurations        
        --WHERE ConfigName IN ('PreventiveDutiesList', 'PreventiveDutiesListForCement') --= 'PreventiveDutiesList'        
  WHERE ConfigName IN ('PreventiveDutiesList') --= 'PreventiveDutiesList'        
        ), ',')        
    )  -- Excluding Preventive Duties        
          
     UNION        
    (        
     SELECT *        
     FROM SplitToTable((        
        SELECT ConfigValue        
        FROM Configurations        
       WHERE ConfigName IN ('PreventiveDutiesListForCement') --= 'PreventiveDutiesList'        
        ), ',') -- Excluding PreventiveDutiesListForCement      
    )       
       
 UNION        
    (        
    --Excluding Anti-dumping Duties         
    SELECT DutyId        
    FROM AntiDumpingDutiesConfig        
    WHERE StateId = 'DutiesConfigCreatedState' AND        
      @AntiDumpingCuoff <= @DeclarationDate           
    )       
 UNION     
 SELECT dbo.KWConstantFn('GBL_Constants.Duties.AntiDumpingCement_Iran')       
   )     
    
         
 SELECT @TotalDuty AS "Total Duties"          
  ,@OtherCharges AS "Other Charges"          
  ,@Deposits AS "Insured"          
  --,ISNULL(@TotalDuty, 0) + ISNULL(@OtherCharges, 0)  + ISNULL(@DumpDuty, 0) AS "Definite"   
  ,case when ISNULL(@TotalDuty, 0) + ISNULL(@OtherCharges, 0)  + ISNULL(@DumpDuty, 0)=0 then null else ISNULL(@TotalDuty, 0) + ISNULL(@OtherCharges, 0)  + ISNULL(@DumpDuty, 0) end AS "Definite"  
  ,@DumpDuty as "Dumping"           
END   

GO
/****** Object:  StoredProcedure [GCC].[GCC_CustomDeclartionInquiryInvDetails]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






--exec BayanInvDetPrintPreviewSP_V2023 8565043  
CREATE PROCEDURE [GCC].[GCC_CustomDeclartionInquiryInvDetails]              
  (              
   @DeclarationNumber as varchar (50)--           
  )               
                
  AS              
  Declare @RestrictionTypeId varchar(500)            
  set @RestrictionTypeId  = dbo.GetRestrictionTypeFn()            
  DECLARE @DeclarationDate DATETIME
  SELECT @DeclarationDate = DeclarationDate FROM Declarations WHERE DeclarationNumber = @DeclarationNumber
             
                
  SELECT               
                
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then IsNull(dbo.TariffItems.Code, '') when '1' then ' - ' end  AS [HS_CODE],              
   dbo.CommercialInvoiceItems.DateCreated,              
   ISNULL(substring(CommercialInvoiceItems_ara.Description,0,35), lower(substring(CommercialInvoiceItems.Description,0,35))) as Descr, 
  --- SubString(Locations.LocalDescription,0,16)   as LOCATION,
   --ISNULL(dbo.CommercialInvoiceItems.TotalCIFAmount,0) as TotalCIFAmount,               
   dbo.GetValueNoZeroEnd(ISNULL(dbo.CommercialInvoiceItems.TotalCIFAmount,0)) as TotalCIFAmount,
   '-' AS [GOODS_CLASSIFICATION] ,                
   CommercialInvoiceItems.IsExempted ,              
   CommercialInvoiceItems.ExemptionFor ,              
   Code=case CommercialInvoiceItems.IsExempted               
    when     '1'    then   Exm.Code               
    when    '0'    then    '-'    end,              
   Sources=case CommercialInvoiceItems.IsExempted               
    when     '1'    then     Exm.LocalDescription              
    when      '0'    then    '-'    end,              
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, ''))               
    when     '0'    then     dbo.CommercialInvoices.CurrencyId          
    when     '1'    then     ' - '    end      AS CURRENCY,               
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then round(ISNULL(convert(decimal(9,6),dbo.CommercialInvoices.ExchangeRate),0),6) end as RATE,            
   '' AS [INVOICE_TYPE] ,               
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then  TYPES_PACK.LocalDescription  when '1' then ' - ' end  AS [PACKAGE_TYPE] ,                 
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then 
	CASE WHEN dbo.CommercialInvoiceItems.NoOfPackages = 0 then '-' 
		ELSE CAST(IsNull(dbo.CommercialInvoiceItems.NoOfPackages,0) AS VARCHAR(50)) END  end AS [TOTAL_NO._PACKAGES],                
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then  
	CASE WHEN dbo.CommercialInvoiceItems.Quantity = 0 then '-' 
		ELSE CAST(dbo.GetValueNoZeroEnd(dbo.CommercialInvoiceItems.Quantity) AS VARCHAR(50)) END end AS QUANTITY,                
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then 
	CASE WHEN dbo.CommercialInvoiceItems.Gross = 0 then '-' 
		ELSE CAST(dbo.GetValueNoZeroEnd(dbo.CommercialInvoiceItems.Gross) AS VARCHAR(50)) END end AS WEIGHT,                
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then 
	CASE WHEN dbo.CommercialInvoiceItems.WEIGHT = 0 then '-' 
		ELSE CAST(dbo.GetValueNoZeroEnd(dbo.CommercialInvoiceItems.WEIGHT) AS VARCHAR(50)) END end AS Net,        
       
  ISNULL(Convert(nVarchar(100),CAST(DRA.DR AS FLOAT)) +' %',  case when DRA.CalculationFormulaId is NULL then '' else (case CommercialInvoiceItems.IsExempted when '1' then '' else 'F' end) end) AS DutyRatePercentage,     
                
   CommercialInvoiceItems.IsExempted as Exempted,              
   --IsNull(CommercialInvoiceItems.TotalDuty,0) As DutyValue,               
   case when CommercialInvoiceItems.TotalDuty=0 then null else CommercialInvoiceItems.TotalDuty end As DutyValue,   
   dbo.CommercialInvoiceItems.IsArabCountry ,              
   --case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then TYPES_QTY.LocalDescription  when '1' then ' - ' end  AS WUOM, --commented by atif 
   case dbo.GetValueByHSCodeFn(IsNull(dbo.TariffItems.Code, '')) when '0' then 
	CASE WHEN dbo.CommercialInvoiceItems.TotalPrice = 0 then '-' 
	ELSE (convert(varchar(50),isnull(CommercialInvoiceItems.TotalPrice, 0))) END end AS 'Foreign Value',              
   CommercialInvoiceItems.IsRestricted,              
   --case isnull(CommercialInvoiceItems.IsRestricted, '0') when  '1' then isnull(TYPES_Restriction.LocalDescription, '') when '0' then '-' end as Agency,              
  case isnull(CommercialInvoiceItems.RestrictionTypeId, '0') when '0' then '-' else (case when charindex(''''+CommercialInvoiceItems.RestrictionTypeId+'''', @RestrictionTypeId) != 0 then isnull(TYPES_Restriction.LocalDescription, '') else CommercialInvoiceItems.RestrictionTypeId End) end as Agency,                
  -- case isnull(CommercialInvoiceItems.IsRestricted, '0') when  '1' then isnull(CommercialInvoiceItems.RestrictionRelRef,'') when '0' then '-' end as ReleaseRef,             
        case isnull(CommercialInvoiceItems.IsRestricted, '0') when  '1' then isnull(isnull(CommercialInvoiceItems_ara.RestrictionRelRef,CommercialInvoiceItems.RestrictionRelRef),'') when '0' then '-' end as ReleaseRef,              
   --case @LandBill when '' then '' else 'Land' end PortType,               
   '' as PortType,               
  isnull(OrgExem.OrganizationCode , CommercialInvoiceItems.ExemptionRef)  AS "Exem Beneficiary", CommercialInvoiceItems.CommercialInvoiceItemId                
  -- CommercialInvoiceItems.ExemptionRef AS "Exem_Beneficiary" 
    ,isnull(
	(
	--Select Sum(isnull(CIID.DutyValue,0)) from CommercialInvoiceItemDuties CIID where CIID.CommercialInvoiceItemId=CommercialInvoiceItems.CommercialInvoiceItemId
	Select  STUFF((SELECT ', '+AntiDumpPer 
		FROM (SELECT DT.AntiDumpPer FROM CommercialInvoiceItemDuties CIID 
 left join Duties DT on DT.DutyId=CIID.DutyId
 where CIID.CommercialInvoiceItemId=CommercialInvoiceItems.CommercialInvoiceItemId
   AND DT.AntiDumpPer is not null
   
   /*(CIID.DUTYID IN (      
     
   SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations           
    WHERE ConfigName IN ('PreventiveDutiesList')       
       ), ',')      
       )      
       
 OR CIID.DUTYID IN (      
    SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations      
       WHERE ConfigName IN ('PreventiveDutiesListForCement')        
       ), ',')      
       )      
    
   OR CIID.DUTYID IN (      
    SELECT DutyId      
    FROM AntiDumpingDutiesConfig      
    WHERE --StateId = 'DutiesConfigCreatedState'      
     --AND 
	 '2018-11-12' <= CONVERT(Date,Declarations.DateCreated)      
    )    
 OR CIID.DutyId= dbo.KWConstantFn('GBL_Constants.Duties.AntiDumpingCement_Iran')      
 -- ) group by CIID.CommercialInvoiceItemId),0) 
  ) */
  )BB   FOR XML PATH('')),1,1,'')),'') as AIPDuty 
  , isnull((Select  STUFF((SELECT ', '+RegulationNo 
		FROM (SELECT DT.RegulationNo FROM CommercialInvoiceItemDuties CIID 
 left join Duties DT on DT.DutyId=CIID.DutyId
 where CIID.CommercialInvoiceItemId=CommercialInvoiceItems.CommercialInvoiceItemId
  AND DT.RegulationNo is not null 
  /*(AND (CIID.DUTYID IN (      
   SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations      
       --WHERE ConfigName IN ('PreventiveDutiesList', 'PreventiveDutiesListForCement')  --= 'PreventiveDutiesList'      
    WHERE ConfigName IN ('PreventiveDutiesList')  --= 'PreventiveDutiesList'      
       ), ',')      
       )   -- Including  Preventive Duties      
       
 OR CIID.DUTYID IN (      
    SELECT *      
    FROM SplitToTable((      
       SELECT ConfigValue      
       FROM Configurations      
       WHERE ConfigName IN ('PreventiveDutiesListForCement')  --= 'PreventiveDutiesListForCement'      
       ), ',')      
       )  -- Including  Preventive DutiesList ForCement      
    
   OR CIID.DUTYID IN (      
    SELECT DutyId      
    FROM AntiDumpingDutiesConfig      
    WHERE --StateId = 'DutiesConfigCreatedState'           AND 
	'2018-11-12' <= CONVERT(Date,Declarations.DateCreated)      
    ) -- Including Anti-dumping duties      
 OR CIID.DutyId= dbo.KWConstantFn('GBL_Constants.Duties.AntiDumpingCement_Iran')      
  )*/
   )BB   FOR XML PATH('')),1,1,'')),'') as   RegulationNo,
  null as DumpingDuty                      
  ,GCCCountries.LocationCode as LocationCode --added by atif  
         , GCCCurrency.code  as CurrencyTypeCode  -- added by atif   
   --,GCCUOM.code as WUOM --added by atif  gives an error in join 
   ,GCC_PackageTypesLookup.Code  PackageTypeCode -- added by atif   
		
  FROM                   
   Declarations               
   INNER JOIN dbo.CommercialInvoices ON dbo.Declarations.DeclarationId = dbo.CommercialInvoices.DeclarationId               
   INNER JOIN dbo.CommercialInvoiceItems ON dbo.CommercialInvoices.CommercialInvoiceId = dbo.CommercialInvoiceItems.CommercialInvoiceId               
   INNER JOIN dbo.TariffItems ON dbo.CommercialInvoiceItems.TariffItemId = dbo.TariffItems.TariffItemId               
   --INNER JOIN dbo.Locations ON dbo.CommercialInvoiceItems.CountryOfOrigin = dbo.Locations.LocationId              
  LEFT OUTER JOIN dbo.Types  TYPES_PACK ON dbo.CommercialInvoiceItems.PackageType = TYPES_PACK.TypeId               
 INNER JOIN dbo.Types  TYPES_INV ON dbo.CommercialInvoices.TypeId =TYPES_INV.TypeId              
   LEFT OUTER JOIN  dbo.CommercialInvoiceItems_ara ON dbo.CommercialInvoiceItems_ara.CommercialInvoiceItemId = dbo.CommercialInvoiceItems.CommercialInvoiceItemId               
   LEFT OUTER JOIN dbo.MeasurementUnits  TYPES_QTY ON dbo.CommercialInvoiceItems.QtyType = TYPES_QTY .MeasurementUnitId  
   LEFT OUTER JOIN dbo.Types Exm On  Exm.TypeId = CommercialInvoiceItems.ExemptionFor            
   LEFT OUTER JOIN dbo.Types TYPES_Restriction ON (Case When charindex(',', CommercialInvoiceItems.RestrictionTypeId) > 0 then null else CommercialInvoiceItems.RestrictionTypeId END) = TYPES_Restriction.TypeId             
   left outer join Organizations OrgExem on    OrgExem.OrganizationId = dbo.CommercialInvoiceItems.ExemptionBnf  
   left outer join GCCCountries on GCCCountries.LocationId =dbo.CommercialInvoiceItems.CountryOfOrigin  -- added by atif
   left outer Join GCCCurrency on GCCCurrency.CurrencyId=dbo.CommercialInvoices.CurrencyId  -- added by atif
   left outer join GCC_PackageTypesLookup on GCC_PackageTypesLookup.TypeId= TYPES_PACK.LocalDescription  --added by atif 
   --left outer join GCCUOM on GCCUOM.MeasurementUnitId =TYPES_QTY .MeasurementUnitId  --added by atif  --gives error 
   
   LEFT JOIN (  SELECT       
                 SUM( DutyRates.DutyRatePercentage) DR,    
                 CommercialInvoiceItemId,     
                 CalculationFormulaId    
                 FROM (SELECT * FROM dbo.CommercialInvoiceItems     
                 OUTER APPLY  (SELECT * FROM dbo.SplitToTable(dbo.CommercialInvoiceItems.DutyId,',')) t)CII                                       
				 LEFT JOIN dbo.DutyRates ON CII.items = dbo.DutyRates.DutyId      
                 WHERE CII.DeclarationId = @DeclarationNumber     
                 	 AND DutyRates.FromDate <= @DeclarationDate AND DutyRates.ToDate >= @DeclarationDate
				 GROUP BY CommercialInvoiceItemId,CalculationFormulaId ) DRA  ON DRA.CommercialInvoiceItemId=CommercialInvoiceItems.CommercialInvoiceItemId    
  WHERE                     
    dbo.Declarations.DeclarationId = @DeclarationNumber and              
    ISNULL(TariffItems.Code,'') != ''            
  order by              
   dbo.CommercialInvoiceItems.DateCreated 



GO
/****** Object:  StoredProcedure [GCC].[GCC_CustomDeclartionInquiryMainDetails]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [GCC].[GCC_CustomDeclartionInquiryMainDetails] (@DeclarationNumber VARCHAR(50))      
AS      
BEGIN      
 DECLARE @BillType VARCHAR(20)      
  ,@TranBillType VARCHAR(50)      
  ,@ImportBillType VARCHAR(50)      
 DECLARE @ExportBillType VARCHAR(50)      
  ,@LandTypeCarrier VARCHAR(50)      
 DECLARE @SeaBill VARCHAR(35)      
 DECLARE @LandBill VARCHAR(35)      
 DECLARE @BillReason VARCHAR(35)      
 DECLARE @DateCreated DATETIME      
  ,@LocationTypeTypeId VARCHAR(35)      
  ,@Result INT      
 DECLARE @Phase NVARCHAR(30)      
      
 SET @Result = 0      
      
 DECLARE @DeliveryOrderId BIGINT      
  ,@CCPId BIGINT      
      
 SELECT @CCPId = Declarations.CustomsControlProcedureId      
  ,@DeliveryOrderId = Declarations.DeliveryOrderId      
  ,@LocationTypeTypeId = CustomsControlProcedures.LocationTypeTypeId      
  ,@DateCreated = Declarations.DecDateCreated      
  ,@BillType = Declarations.billType      
  ,@BillReason = Declarations.BillReason      
  ,@LandBill = CASE CustomsControlProcedures.LocationTypeTypeId      
   WHEN dbo.KWConstantfn('GBL_Types.PORT_TYPES.LANDPORT')      
    THEN CustomsControlProcedures.CustomsControlProcedureId      
   ELSE ''      
   END      
  ,@SeaBill = CASE CustomsControlProcedures.LocationTypeTypeId      
   WHEN dbo.KWConstantfn('GBL_Types.PORT_TYPES.SEAPORT')      
    THEN CustomsControlProcedures.CustomsControlProcedureId      
   WHEN dbo.KWConstantfn('GBL_Types.PORT_TYPES.FREEZONE')      
    THEN CustomsControlProcedures.CustomsControlProcedureId      
   ELSE ''      
   END      
  ,@Result = CASE isnull(CustomsControlProcedures.Phase, 2)      
   WHEN 2      
    THEN 0      
   ELSE 1      
   END      
  ,@Phase = CASE isnull(CustomsControlProcedures.Phase, 2)      
   WHEN 2      
    THEN 'V 2.0'      
   ELSE 'V 3.0'      
   END      
 FROM Declarations      
 INNER JOIN CustomsControlProcedures ON Declarations.CustomsControlProcedureId = CustomsControlProcedures.CustomsControlProcedureId      
 WHERE Declarations.DeclarationId = @DeclarationNumber      
      
 --exec @Result  = LiveStatusSp @LocationTypeTypeId = @LocationTypeTypeId, @DateTime = @DateCreated        
 /*Added by Ramesh 12-Apr-23 - Port type to be considered on master housebill for Bonded Inbound declaration */      
 IF (      
   @CCPId IN (      
    dbo.KWConstantFn('GBL_CustomsControlProcedures.SEA.BWHInbound')      
    ,dbo.KWConstantFn('GBL_CustomsControlProcedures.AIR.BWHInbound')      
    )      
   )      
 BEGIN --Bonded Inbound        
  SET @LandBill = ''      
  SET @SeaBill = ''      
      
  SELECT @LandBill = CASE L.LocationTypetypeId      
    WHEN dbo.KWConstantfn('GBL_Types.PORT_TYPES.LANDPORT')      
     THEN @CCPId      
    ELSE ''      
    END      
   ,@SeaBill = CASE L.LocationTypetypeId      
    WHEN dbo.KWConstantfn('GBL_Types.PORT_TYPES.SEAPORT')      
     THEN @CCPId      
    WHEN dbo.KWConstantfn('GBL_Types.PORT_TYPES.FREEZONE')      
     THEN @CCPId      
    ELSE ''      
    END      
  FROM Housebills HB      
  INNER JOIN Locations L ON HB.OwnerLocId = L.LocationId      
  WHERE HB.DeliveryOrderId = @DeliveryOrderId      
 END --Bonded Inbound        
   /*Ends Added by Ramesh 12-Apr-23 - Port type to be considered on master housebill for Bonded Inbound declaration */      
      
 --Project Constants Used        
 SELECT @TranBillType = '1341'      
  ,@ImportBillType = '1342'      
  ,@ExportBillType = '1343'      
  ,@LandTypeCarrier = '4001'      
      
 BEGIN      
   IF (      
     @BillType = @ImportBillType      
     OR @BillType = @tranBillType      
     )      
   BEGIN      
    IF (@BillReason = '3B2675AD992B43799E7160C613072F35') --Offline GENERAL EXPRES Bill Reason        
    BEGIN      
     PRINT 'BayanAirExportSp_QRGCC'      
      
     EXEC BayanAirExportSp_QRGCC @DeclarationNumber      
      ,@Phase      
    END      
    ELSE      
    BEGIN      
     IF (      
       @SeaBill NOT IN (      
        ''      
        ,'0'      
        )      
       )      
     BEGIN      
      PRINT 'BayanSeaImportSp_QRGCC'      
      
      EXEC BayanSeaImportSp_QRGCC @DeclarationNumber      
       ,@Phase --, @LandTypeCarrier , @BillType, @ImportBillType, @TranBillType         
     END      
     ELSE IF (      
       @LandBill NOT IN (      
        ''      
        ,'0'      
        )      
       )      
     BEGIN      
      PRINT 'BayanLandImportSp_QRGCC'      
      
      EXEC BayanLandImportSp_QRGCC @DeclarationNumber      
       ,@Phase --, @LandTypeCarrier , @BillType, @ImportBillType, @TranBillType         
     END      
     ELSE      
     BEGIN      
      PRINT 'BayanAirImportSp_QRGCC'
	  EXEC gcc.Gcc_customdeclartioninquiryairimport @declarationId= @DeclarationNumber ,@Phase=@phase
      ---- commented by atif
      --EXEC BayanAirImportSp_QRGCC @DeclarationNumber      
      -- ,@Phase --, @LandTypeCarrier , @BillType, @ImportBillType, @TranBillType         
     END      
    END      
   END      
   ELSE IF (@BillType = @ExportBillType)      
   BEGIN      
    IF (      
      @SeaBill NOT IN (      
       ''      
       ,'0'      
       )      
      )      
     EXEC BayanSeaExportSp_QRGCC @DeclarationNumber      
      ,@Phase      
    ELSE IF (      
      @LandBill NOT IN (      
       ''      
       ,'0'      
       )      
      )      
     EXEC BayanLandExportSp_QRGCC @DeclarationNumber      
      ,@Phase      
    ELSE      
     EXEC BayanAirExportSp_QRGCC @DeclarationNumber      
      ,@Phase      
   END      
    
 END      
END          

GO
/****** Object:  StoredProcedure [GCC].[GCC_CustomDeclartionInquiryPaymentDetails]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [GCC].[GCC_CustomDeclartionInquiryPaymentDetails](@DeclarationNumber VARCHAR(50))          
AS    
          
begin          
 Declare @DecCreatedDate Datetime   
 Select @DecCreatedDate = DecDateCreated From Declarations Where DeclarationId = @DeclarationNumber  
   
 DECLARE @RcptNo AS NVARCHAR(300), @CheckDate AS VARCHAR(300), @BankName AS NVARCHAR(300),     
            @PayNo AS VARCHAR(300), @PayDate AS VARCHAR(300),  @Amount AS VARCHAR(30)    
          
      --Declare @BankReceiptPaymentType AS VARCHAR(35), @BankReceiptCheckType AS VARCHAR(35)    
      --SELECT @BankReceiptCheckType='12007', @BankReceiptPaymentType='14003'     
     
      SELECT @RcptNo = '', @CheckDate = '', @BankName = '', @PayNo = '', @PayDate = '', @Amount = ''    
     
      IF(convert(date,@DecCreatedDate) < '2018-04-18')  
      Begin  
      SELECT  Top 2    
            @RcptNo = @RcptNo + '/' + ISNULL(Checks.ReceiptNumber, Checks.CheckNumber) ,     
            @CheckDate = @CheckDate + '/' + replace(CONVERT(varchar(9),isnull(ReceiptDate, Checks.DateIssued),6), ' ', ''),   
            --replace(CONVERT(varchar(9),Checks.DateIssued,6), ' ', ''), --CONVERT(CHAR(12),Checks.DateIssued),     
            @BankName = @BankName+ '/ ' + ISNULL(ISNULL(Custbank.Name, Organizations.Name), '-') ,     
            @PayNo = Payments.PaymentNumber,     
            --@PayDate =  @PayDate + '/' + replace(CONVERT(varchar(9),Payments.PaymentDate,6), ' ', ''), --CONVERT(CHAR(12),Payments.PaymentDate) ,    
            @PayDate =   replace(CONVERT(varchar(9),Payments.PaymentDate,6), ' ', ''),        
            @Amount = @Amount + '/' + CONVERT(CHAR(12),PaymentTransactions.Amount)    
      FROM Payments     
            INNER JOIN PaymentTransactions ON Payments.PaymentId = PaymentTransactions.PaymentId AND PaymentTransactions.TypeId in ('14003','14002') --= @BankReceiptPaymentType     
            INNER JOIN  Accounts ON PaymentTransactions.AccountId = Accounts.AccountId     
            INNER JOIN Checks ON PaymentTransactions.PaymentTransactionId = Checks.PaymentTransactionId  AND Checks.TypeId in ('12007',dbo.KWConstantfn('GBL_Types.RECEIPT_TYPES.CASH')) --= @BankReceiptCheckType     
            left Outer join Organizations ON (Accounts.OrganizationId = Organizations.OrganizationId and Checks.ReceiptNumber is null) -- Receipt No is not available before customs Cashier update.    
            Left outer join Organizations CustBank on (Checks.BankId = CustBank.OrganizationId and checks.ReceiptNumber is not null) -- Receipt No is mandatory after Customs Cashier update    
      WHERE         
            (Payments.DeclarationId = @DeclarationNumber)    
   END  
 Else  
 Begin  
   
   Select Top 2   
   @RcptNo = @RcptNo + '/ ' + rest.ReceiptNumber,  
   @CheckDate = @CheckDate + '/' + replace(CONVERT(varchar(9),rest.CheckDate,6), ' ', ''),  
   @BankName = @BankName+ '/ ' + rest.BankName,  
   @Amount = @Amount + '/' + rest.Amount  
   From   
   (SELECT Distinct  
            Case when PaymentTransactions.TypeId = dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment') then isnull(DR.ReceiptNumber, '') else ISNULL(Checks.ReceiptNumber, Checks.CheckNumber) End as ReceiptNumber,     
            Case when PaymentTransactions.TypeId = dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment') then DR.ReceiptDate else isnull(Checks.ReceiptDate, Checks.DateIssued) End as CheckDate,    
            case when PaymentTransactions.TypeId = dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment') then N'بوابة الدفع الإلكتروني' 
            when isnull(Checks.TypeId,'') = dbo.KWConstantfn('GBL_PaymentTypes.KNETPOS') THEN N' نقاط البيع - كي نت '
            else ISNULL(ISNULL(Custbank.Name, Organizations.Name), '-') End as BankName,  
   CONVERT(CHAR(12),PaymentTransactions.Amount) as Amount               
      FROM Payments     
            INNER JOIN PaymentTransactions ON Payments.PaymentId = PaymentTransactions.PaymentId AND PaymentTransactions.TypeId in ('14003','14002',dbo.KWConstantfn('GBL_PaymentTypes.KNETPOS'),dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment')) --= @BankReceiptPaymentType     
            INNER JOIN Accounts ON PaymentTransactions.AccountId = Accounts.AccountId     
            left Outer join Checks ON PaymentTransactions.PaymentTransactionId = Checks.PaymentTransactionId  AND Checks.TypeId in ('12007',dbo.KWConstantfn('GBL_Types.RECEIPT_TYPES.CASH') ,dbo.KWConstantfn('GBL_PaymentTypes.KNETPOS')) --= @BankReceiptCheckType     
            left Outer join DeclarationReceipts DR on (DR.DeclarationId = Payments.DeclarationId and DR.StateId='DeclarationReceiptsCreatedState')
            left Outer join Organizations ON (Accounts.OrganizationId = Organizations.OrganizationId and Checks.ReceiptNumber is null) -- Receipt No is not available before customs Cashier update.    
            Left outer join Organizations CustBank on (Checks.BankId = CustBank.OrganizationId and checks.ReceiptNumber is not null) -- Receipt No is mandatory after Customs Cashier update    
      WHERE         
            (Payments.DeclarationId = @DeclarationNumber) ) as rest  
              
              
 /*  
  SELECT  Top 2    
            @RcptNo = @RcptNo + '/' + case when PaymentTransactions.TypeId = dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment') then isnull(DR.ReceiptNumber, '') else ISNULL(Checks.ReceiptNumber, Checks.CheckNumber) End ,     
            @CheckDate = @CheckDate + '/' + case when PaymentTransactions.TypeId = dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment') then replace(CONVERT(varchar(9),DR.ReceiptDate,6), ' ', '') else replace(CONVERT(varchar(9),isnull(Checks.ReceiptDate, Ch
  
ecks.DateIssued),6), ' ', '') End,   
            --replace(CONVERT(varchar(9),Checks.DateIssued,6), ' ', ''), --CONVERT(CHAR(12),Checks.DateIssued),     
            @BankName = @BankName+ '/ ' + case when PaymentTransactions.TypeId = dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment') then N'بوابة الدفع كي نت' else ISNULL(ISNULL(Custbank.Name, Organizations.Name), '-') End ,     
            --@PayNo = Payments.PaymentNumber,     
            --@PayDate =  @PayDate + '/' + replace(CONVERT(varchar(9),Payments.PaymentDate,6), ' ', ''), --CONVERT(CHAR(12),Payments.PaymentDate) ,    
           @Amount = @Amount + '/' + CONVERT(CHAR(12),PaymentTransactions.Amount)    
      FROM Payments     
            INNER JOIN PaymentTransactions ON Payments.PaymentId = PaymentTransactions.PaymentId AND PaymentTransactions.TypeId in ('14003','14002',dbo.KWConstantfn('GBL_PaymentTypes.OnlinePayment')) --= @BankReceiptPaymentType     
            INNER JOIN Accounts ON PaymentTransactions.AccountId = Accounts.AccountId     
            left Outer join Checks ON PaymentTransactions.PaymentTransactionId = Checks.PaymentTransactionId  AND Checks.TypeId in ('12007',dbo.KWConstantfn('GBL_Types.RECEIPT_TYPES.CASH')) --= @BankReceiptCheckType     
            left Outer join DeclarationReceipts DR on DR.DeclarationId = Payments.DeclarationId  
            left Outer join Organizations ON (Accounts.OrganizationId = Organizations.OrganizationId and Checks.ReceiptNumber is null) -- Receipt No is not available before customs Cashier update.    
            Left outer join Organizations CustBank on (Checks.BankId = CustBank.OrganizationId and checks.ReceiptNumber is not null) -- Receipt No is mandatory after Customs Cashier update    
      WHERE         
            (Payments.DeclarationId = @DeclarationNumber)    
   */  
     
  Select @PayNo = @PayNo + case when @PayNo = '' then '' else '/ ' End  + isnull(ReceiptNumber, ''),  
    @PayDate  = @PayDate + case when @PayDate = '' then '' else '/' End + replace(CONVERT(varchar(9),ReceiptDate,6), ' ', '')   
  From DeclarationReceipts where DeclarationId = @DeclarationNumber  
 End  
  
     
      SELECT SUBSTRING(@RcptNo, 2, LEN(@RcptNo)) AS CheckNumber, --66  
   @PayDate AS [Cheque Issued Date], --64    
            isnull(LOWER(SUBSTRING(@BankName, 2, LEN(@BankName))), '-') AS Name, --65, 68  
            @PayNo AS PaymentNumber,  --63   
            SUBSTRING(@CheckDate,2, LEN(@CheckDate )) AS [Recipt Date], --67  
            SUBSTRING(@Amount, 2, LEN(@Amount)) AS Amount    
end  
  
GO
/****** Object:  StoredProcedure [GCC].[GCC_CustomsDeclarationInquiry]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

  
  
  
  
CREATE        PROCEDURE [GCC].[GCC_CustomsDeclarationInquiry]      
(      
 @DeclarationNumber as varchar (50)--,      
     
)      
AS      
set nocount on      
  Declare @DateCreated datetime    
  Select @DateCreated=DateCreated from Declarations where DeclarationId=@DeclarationNumber    
EXEC GCC.GCC_CustomDeclartionInquiryPaymentDetails @DeclarationNumber      
    
 EXEC GCC.GCC_CustomDeclartionInquiryInvDetails @DeclarationNumber    
  
EXEC GCC.GCC_CustomDeclartionInquiryDutyInfo  @DeclarationNumber      
EXEC GCC.GCC_CustomDeclartionInquiryMainDetails @DeclarationNumber          
  
  
GO
/****** Object:  StoredProcedure [GCC].[TransferReceiptPreviewSP_QRGCC]    Script Date: 12/4/2025 1:12:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [GCC].[TransferReceiptPreviewSP_QRGCC]
(
    @DueNumber VARCHAR(50)
)
AS
BEGIN
    SET NOCOUNT ON;
Select  DT.TransferNo as 'fileName',

DT.FileData as 'image',

DT.TransferDate as  'fileDate',

DT.TotalAmount as 'amount',

STUFF(

(SELECT ', ' + du.DueNo

         FROM Dues du

         JOIN DuesTransfer sc ON du.DueTransferId = sc.DuesTransferId

       

         FOR XML PATH('')),

        1, 2, ''

    ) AS 'listOfDues'--Du.DueNo as

   from  DuesTransfer DT

 Where DT.FileData is  not  null 
END;
GO
