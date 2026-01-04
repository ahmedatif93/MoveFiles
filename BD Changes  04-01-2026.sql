

CREATE TABLE GCC.GCC_SupportUsers
(
    UserId            INT IDENTITY(1,1) PRIMARY KEY,
    Password          NVARCHAR(256)      NOT NULL,
    MobileNumber      NVARCHAR(20)       NOT NULL,
    EmailId           NVARCHAR(150)      NOT NULL,
    CivilId           NVARCHAR(50)       NOT NULL,
    FirstName         NVARCHAR(100)      NOT NULL,
    LastName          NVARCHAR(100)      NOT NULL,
    IsActive          BIT                NOT NULL DEFAULT 1,
    CreatedDate       DATETIME           NOT NULL DEFAULT SYSDATETIME()


);
GO

CREATE TABLE GCC.GCC_SupportUsersOTPs
(
    Id                INT IDENTITY(1,1) PRIMARY KEY,
    UserId            INT               NOT NULL,
    OTPCode           NVARCHAR(10)      NOT NULL,
    CreatedDate       DATETIME          NOT NULL DEFAULT SYSDATETIME(),
    ExpirationDate    DATETIME          NOT NULL,
    InvalidAttempts   INT               NOT NULL DEFAULT 0,
	IsUsed		      bit				NOT NULL,
    CONSTRAINT FK_SupportUsersOTPs_User
        FOREIGN KEY (UserId)
        REFERENCES GCC.GCC_SupportUsers(UserId)
);
GO
CREATE TABLE GCC.GCC_AuditingTable
(
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT               NULL,
    Action          NVARCHAR(200)     NOT NULL,
    LogId           NVARCHAR(100)     NULL,
	ExraData        NVARCHAR(max)     NULL,
    DateCreated     DATETIME          NOT NULL DEFAULT SYSDATETIME(),
    CreatedBy       NVARCHAR(100)     NOT NULL,

    CONSTRAINT FK_Auditing_User
        FOREIGN KEY (UserId)
        REFERENCES GCC.GCC_SupportUsers(UserId)
);
GO