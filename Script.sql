USE [master]
GO
/****** Object:  Database [spaservice]    Script Date: 2/22/2025 11:13:00 PM ******/
CREATE DATABASE [spaservice]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'spaservice', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MINEDUCK\MSSQL\DATA\spaservice.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'spaservice_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MINEDUCK\MSSQL\DATA\spaservice_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [spaservice] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [spaservice].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [spaservice] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [spaservice] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [spaservice] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [spaservice] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [spaservice] SET ARITHABORT OFF 
GO
ALTER DATABASE [spaservice] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [spaservice] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [spaservice] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [spaservice] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [spaservice] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [spaservice] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [spaservice] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [spaservice] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [spaservice] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [spaservice] SET  ENABLE_BROKER 
GO
ALTER DATABASE [spaservice] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [spaservice] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [spaservice] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [spaservice] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [spaservice] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [spaservice] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [spaservice] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [spaservice] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [spaservice] SET  MULTI_USER 
GO
ALTER DATABASE [spaservice] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [spaservice] SET DB_CHAINING OFF 
GO
ALTER DATABASE [spaservice] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [spaservice] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [spaservice] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [spaservice] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [spaservice] SET QUERY_STORE = ON
GO
ALTER DATABASE [spaservice] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [spaservice]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[accountId] [varchar](50) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[status] [bit] NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[roleId] [varchar](50) NOT NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[accountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Application]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Application](
	[applicationId] [varchar](50) NOT NULL,
	[status] [varchar](255) NOT NULL,
	[content] [nvarchar](255) NOT NULL,
	[accountId] [varchar](50) NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[resolvedBy] [varchar](50) NULL,
	[resolvedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[applicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointment](
	[appointmentId] [varchar](50) NOT NULL,
	[startTime] [datetime] NOT NULL,
	[endTime] [datetime] NOT NULL,
	[status] [varchar](10) NOT NULL,
	[requestId] [varchar](50) NOT NULL,
	[employeeId] [varchar](50) NOT NULL,
	[replacementEmployee] [varchar](50) NOT NULL,
	[updatedAt] [datetime] NULL,
	[roomId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[appointmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AttendanceRecords]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AttendanceRecords](
	[attendanceId] [varchar](50) NOT NULL,
	[checkInTime] [datetime] NULL,
	[checkOutTime] [datetime] NULL,
	[employeeId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[attendanceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoryEmployee]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoryEmployee](
	[categoryEmployeeId] [varchar](50) NOT NULL,
	[categoryId] [varchar](50) NOT NULL,
	[employeeId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[categoryEmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Commission]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Commission](
	[commissionId] [varchar](50) NOT NULL,
	[percentage] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[commissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CosmeticCategory]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CosmeticCategory](
	[categoryId] [varchar](50) NOT NULL,
	[categoryName] [varchar](50) NOT NULL,
	[categoryDescription] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[categoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CosmeticProduct]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CosmeticProduct](
	[productId] [varchar](50) NOT NULL,
	[productName] [nvarchar](50) NOT NULL,
	[price] [real] NULL,
	[quantity] [int] NOT NULL,
	[description] [nvarchar](255) NOT NULL,
	[status] [bit] NOT NULL,
	[isSelling] [bit] NOT NULL,
	[image] [varchar](255) NULL,
	[categoryId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[productId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CosmeticTransaction]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CosmeticTransaction](
	[cosmeticTransactionId] [varchar](50) NOT NULL,
	[transactionId] [varchar](50) NOT NULL,
	[orderId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[cosmeticTransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[customerId] [varchar](50) NOT NULL,
	[accountId] [varchar](50) NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[gender] [varchar](10) NOT NULL,
	[phone] [varchar](10) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[dateOfBirth] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[customerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomerMembership]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerMembership](
	[CustomerId] [varchar](50) NOT NULL,
	[MembershipId] [varchar](50) NOT NULL,
	[startDate] [date] NOT NULL,
	[endDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC,
	[MembershipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[employeeId] [varchar](50) NOT NULL,
	[fullName] [nvarchar](50) NOT NULL,
	[position] [varchar](50) NOT NULL,
	[hireDate] [date] NOT NULL,
	[status] [varchar](50) NOT NULL,
	[image] [nvarchar](max) NOT NULL,
	[accountId] [varchar](50) NOT NULL,
	[phone] [varchar](20) NULL,
	[email] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[employeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeCommission]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeCommission](
	[employeeId] [varchar](50) NOT NULL,
	[commissionId] [varchar](50) NOT NULL,
	[transactionId] [varchar](50) NOT NULL,
	[commissionValue] [real] NOT NULL,
	[serviceTransactionId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[employeeId] ASC,
	[commissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[feedbackId] [varchar](50) NOT NULL,
	[feedbackMessage] [nvarchar](100) NOT NULL,
	[rating] [tinyint] NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[createdBy] [varchar](50) NOT NULL,
	[serviceId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[feedbackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Floor]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Floor](
	[floorId] [varchar](50) NOT NULL,
	[floorNum] [int] NOT NULL,
	[categoryId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[floorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GuestApplication]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GuestApplication](
	[guestApplicationId] [nvarchar](50) NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[phoneNumber] [varchar](15) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[applicationId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[guestApplicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Manager]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manager](
	[managerId] [varchar](50) NOT NULL,
	[fullName] [nvarchar](50) NOT NULL,
	[position] [varchar](50) NOT NULL,
	[hireDate] [date] NOT NULL,
	[status] [varchar](50) NOT NULL,
	[image] [nvarchar](max) NOT NULL,
	[accountId] [varchar](50) NOT NULL,
	[phone] [varchar](20) NULL,
	[email] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[managerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Membership]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Membership](
	[membershipId] [varchar](50) NOT NULL,
	[type] [varchar](50) NOT NULL,
	[totalPayment] [real] NOT NULL,
	[discount] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[membershipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[News]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[News](
	[newsId] [varchar](50) NOT NULL,
	[header] [varchar](255) NOT NULL,
	[content] [varchar](max) NOT NULL,
	[createAt] [datetime] NOT NULL,
	[type] [varchar](50) NOT NULL,
	[image] [varchar](255) NOT NULL,
	[categoryId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[newsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[orderId] [varchar](50) NOT NULL,
	[customerId] [varchar](50) NOT NULL,
	[orderDate] [datetime] NOT NULL,
	[totalAmount] [real] NOT NULL,
	[status] [bit] NOT NULL,
	[transactionId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[orderDetailId] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [real] NOT NULL,
	[subtotalAmount] [real] NOT NULL,
	[orderId] [varchar](50) NOT NULL,
	[productId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[orderDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Promotion]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Promotion](
	[promotionId] [varchar](50) NOT NULL,
	[discountValue] [real] NOT NULL,
	[promotionCode] [varchar](50) NOT NULL,
	[promotionName] [varchar](50) NOT NULL,
	[isActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[promotionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Request]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Request](
	[requestId] [varchar](50) NOT NULL,
	[startTime] [datetime] NOT NULL,
	[status] [varchar](10) NOT NULL,
	[customerNote] [nvarchar](255) NOT NULL,
	[managerNote] [nvarchar](255) NULL,
	[serviceId] [varchar](50) NOT NULL,
	[customerId] [varchar](50) NOT NULL,
	[employeeId] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[requestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[roleId] [varchar](50) NOT NULL,
	[roleName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Room]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Room](
	[roomId] [varchar](50) NOT NULL,
	[roomNum] [int] NOT NULL,
	[floorId] [varchar](50) NOT NULL,
	[status] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceCategory]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceCategory](
	[categoryId] [varchar](50) NOT NULL,
	[categoryName] [varchar](50) NOT NULL,
	[categoryDescription] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[categoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceTransaction]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceTransaction](
	[serviceTransactionId] [varchar](50) NOT NULL,
	[transactionId] [varchar](50) NOT NULL,
	[requestId] [varchar](50) NOT NULL,
	[membershipId] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[serviceTransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SpaService]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SpaService](
	[serviceId] [varchar](50) NOT NULL,
	[serviceName] [varchar](50) NOT NULL,
	[price] [real] NOT NULL,
	[duration] [time](7) NOT NULL,
	[description] [nvarchar](255) NOT NULL,
	[serviceImage] [nvarchar](max) NOT NULL,
	[categoryId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[serviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transaction]    Script Date: 2/22/2025 11:13:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transaction](
	[transactionId] [varchar](50) NOT NULL,
	[transactionType] [varchar](10) NOT NULL,
	[totalPrice] [real] NOT NULL,
	[status] [bit] NOT NULL,
	[completeTime] [datetime] NULL,
	[promotionId] [varchar](50) NULL,
	[paymentType] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[transactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'33ba80881a1845c89dd54cea8f3daf6c', N'Ð?ng Minh Ð?c', N'GoogleAuth', 1, CAST(N'2025-02-22T09:21:18.300' AS DateTime), N'eed231e27e6c4309895ef17737569015', NULL)
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'4e27853f21f4429e846af0520f8bba80', N'admin', N'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 1, CAST(N'2025-02-19T14:09:51.983' AS DateTime), N'6945d592f27f49b2adc586dbef316c35', CAST(N'2025-02-19T14:09:51.983' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC001_AI_GEN', N'sophia.m', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2021-05-12T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-09-10T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC002_AI_GEN', N'liam.j', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2022-08-20T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2024-01-15T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC003_AI_GEN', N'emma.w', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2019-11-15T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-05-22T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC004_AI_GEN', N'noah.b', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2018-06-05T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2022-11-01T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC005_AI_GEN', N'olivia.d', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2020-03-18T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-07-19T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC006_AI_GEN', N'william.g', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2023-01-10T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2024-02-05T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC007_AI_GEN', N'ava.r', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2021-07-22T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-10-12T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC008_AI_GEN', N'james.l', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2017-12-05T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2021-06-30T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC009_AI_GEN', N'isabella.h', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2019-09-30T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-08-21T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC010_AI_GEN', N'benjamin.c', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2020-04-14T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2024-01-03T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC011_AI_GEN', N'mia.l', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2022-02-20T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-09-15T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC012_AI_GEN', N'elijah.w', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2016-10-25T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2022-12-28T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC013_AI_GEN', N'charlotte.a', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2021-11-08T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-11-05T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC014_AI_GEN', N'lucas.s', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2018-05-30T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2022-10-19T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC015_AI_GEN', N'amelia.k', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2020-12-18T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-08-30T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC016_AI_GEN', N'mason.a', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2017-04-10T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2022-05-25T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC017_AI_GEN', N'harper.b', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2019-07-21T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-12-15T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC018_AI_GEN', N'ethan.g', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2023-03-15T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2024-01-28T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC019_AI_GEN', N'evelyn.p', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2021-06-10T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2023-09-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ACC020_AI_GEN', N'henry.r', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, CAST(N'2015-09-05T00:00:00.000' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2021-12-31T00:00:00.000' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'c3eb512896ff43ae94f009cf47ade122', N'Dang Minh Duc K18 HCM', N'GoogleAuth', 1, CAST(N'2025-02-22T09:13:09.327' AS DateTime), N'eed231e27e6c4309895ef17737569015', NULL)
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'ef9ecd01879b40d998c594120418bee7', N'US1', N'bf5592a762486141532f278e12e76283f0cb3315929a08ddcde839188a11f544', 1, CAST(N'2025-02-19T20:34:45.370' AS DateTime), N'eed231e27e6c4309895ef17737569015', CAST(N'2025-02-19T20:34:45.370' AS DateTime))
GO
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'100', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP004_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'101', N'945a12c26f724a60bd899ea9c941108d', N'EMP004_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'102', N'425bb31f4b3e4242993e30204f7adacd', N'EMP008_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'103', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP008_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'104', N'54b8784c00c8497483696ccd41f5019a', N'EMP008_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'105', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP008_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'106', N'945a12c26f724a60bd899ea9c941108d', N'EMP008_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'107', N'425bb31f4b3e4242993e30204f7adacd', N'EMP012_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'108', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP012_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'109', N'54b8784c00c8497483696ccd41f5019a', N'EMP012_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'110', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP012_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'111', N'945a12c26f724a60bd899ea9c941108d', N'EMP012_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'126', N'425bb31f4b3e4242993e30204f7adacd', N'EMP016_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'127', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP016_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'128', N'54b8784c00c8497483696ccd41f5019a', N'EMP016_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'129', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP016_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'130', N'425bb31f4b3e4242993e30204f7adacd', N'EMP020_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'131', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP020_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'132', N'54b8784c00c8497483696ccd41f5019a', N'EMP020_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'133', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP020_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'39', N'425bb31f4b3e4242993e30204f7adacd', N'EMP001_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'40', N'425bb31f4b3e4242993e30204f7adacd', N'EMP005_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'41', N'425bb31f4b3e4242993e30204f7adacd', N'EMP009_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'42', N'425bb31f4b3e4242993e30204f7adacd', N'EMP013_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'43', N'425bb31f4b3e4242993e30204f7adacd', N'EMP017_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'44', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP001_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'45', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP005_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'46', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP009_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'47', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP013_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'48', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP017_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'49', N'54b8784c00c8497483696ccd41f5019a', N'EMP001_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'50', N'54b8784c00c8497483696ccd41f5019a', N'EMP005_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'51', N'54b8784c00c8497483696ccd41f5019a', N'EMP009_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'52', N'54b8784c00c8497483696ccd41f5019a', N'EMP013_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'53', N'54b8784c00c8497483696ccd41f5019a', N'EMP017_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'54', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP003_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'55', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP007_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'56', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP011_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'57', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP015_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'58', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP019_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'95', N'945a12c26f724a60bd899ea9c941108d', N'EMP016_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'96', N'945a12c26f724a60bd899ea9c941108d', N'EMP020_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'97', N'425bb31f4b3e4242993e30204f7adacd', N'EMP004_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'98', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP004_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'99', N'54b8784c00c8497483696ccd41f5019a', N'EMP004_AI_GEN')
GO
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'2545dec65c784d9d9b0112d3b0339f81', N'33ba80881a1845c89dd54cea8f3daf6c', N'Đặng Minh Đức', N'Other', N'None', N'duccoi16082004@gmail.com', CAST(N'2025-02-22T09:21:18.300' AS DateTime))
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'de66e371395a4659aac0008cba50c098', N'c3eb512896ff43ae94f009cf47ade122', N'Dang Minh Duc K18 HCM', N'Other', N'None', N'ducdmse183990@fpt.edu.vn', CAST(N'2025-02-22T09:13:09.327' AS DateTime))
GO
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP001_AI_GEN', N'Sophia Martinez', N'Massage Therapist', CAST(N'2021-05-12' AS Date), N'Active', N'sophia.jpg', N'ACC001_AI_GEN', N'555-1234', N'sophia.m@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP002_AI_GEN', N'Liam Johnson', N'Receptionist', CAST(N'2022-08-20' AS Date), N'Active', N'liam.jpg', N'ACC002_AI_GEN', N'555-5678', N'liam.j@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP003_AI_GEN', N'Emma Williams', N'Esthetician', CAST(N'2019-11-15' AS Date), N'Active', N'emma.jpg', N'ACC003_AI_GEN', N'555-9012', N'emma.w@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP004_AI_GEN', N'Noah Brown', N'Spa Manager', CAST(N'2018-06-05' AS Date), N'Active', N'noah.jpg', N'ACC004_AI_GEN', N'555-3456', N'noah.b@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP005_AI_GEN', N'Olivia Davis', N'Massage Therapist', CAST(N'2020-03-18' AS Date), N'Active', N'olivia.jpg', N'ACC005_AI_GEN', N'555-7890', N'olivia.d@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP006_AI_GEN', N'William Garcia', N'Receptionist', CAST(N'2023-01-10' AS Date), N'Active', N'william.jpg', N'ACC006_AI_GEN', N'555-2345', N'william.g@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP007_AI_GEN', N'Ava Rodriguez', N'Esthetician', CAST(N'2021-07-22' AS Date), N'Active', N'ava.jpg', N'ACC007_AI_GEN', N'555-6789', N'ava.r@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP008_AI_GEN', N'James Lopez', N'Spa Manager', CAST(N'2017-12-05' AS Date), N'Active', N'james.jpg', N'ACC008_AI_GEN', N'555-1239', N'james.l@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP009_AI_GEN', N'Isabella Harris', N'Massage Therapist', CAST(N'2019-09-30' AS Date), N'Active', N'isabella.jpg', N'ACC009_AI_GEN', N'555-4567', N'isabella.h@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP010_AI_GEN', N'Benjamin Clark', N'Receptionist', CAST(N'2020-04-14' AS Date), N'Active', N'benjamin.jpg', N'ACC010_AI_GEN', N'555-8901', N'benjamin.c@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP011_AI_GEN', N'Mia Lewis', N'Esthetician', CAST(N'2022-02-20' AS Date), N'Active', N'mia.jpg', N'ACC011_AI_GEN', N'555-2349', N'mia.l@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP012_AI_GEN', N'Elijah Walker', N'Spa Manager', CAST(N'2016-10-25' AS Date), N'Active', N'elijah.jpg', N'ACC012_AI_GEN', N'555-6780', N'elijah.w@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP013_AI_GEN', N'Charlotte Allen', N'Massage Therapist', CAST(N'2021-11-08' AS Date), N'Active', N'charlotte.jpg', N'ACC013_AI_GEN', N'555-3457', N'charlotte.a@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP014_AI_GEN', N'Lucas Scott', N'Receptionist', CAST(N'2018-05-30' AS Date), N'Active', N'lucas.jpg', N'ACC014_AI_GEN', N'555-7895', N'lucas.s@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP015_AI_GEN', N'Amelia King', N'Esthetician', CAST(N'2020-12-18' AS Date), N'Active', N'amelia.jpg', N'ACC015_AI_GEN', N'555-0123', N'amelia.k@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP016_AI_GEN', N'Mason Adams', N'Spa Manager', CAST(N'2017-04-10' AS Date), N'Active', N'mason.jpg', N'ACC016_AI_GEN', N'555-4568', N'mason.a@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP017_AI_GEN', N'Harper Baker', N'Massage Therapist', CAST(N'2019-07-21' AS Date), N'Active', N'harper.jpg', N'ACC017_AI_GEN', N'555-8902', N'harper.b@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP018_AI_GEN', N'Ethan Gonzalez', N'Receptionist', CAST(N'2023-03-15' AS Date), N'Active', N'ethan.jpg', N'ACC018_AI_GEN', N'555-2346', N'ethan.g@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP019_AI_GEN', N'Evelyn Perez', N'Esthetician', CAST(N'2021-06-10' AS Date), N'Active', N'evelyn.jpg', N'ACC019_AI_GEN', N'555-6783', N'evelyn.p@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP020_AI_GEN', N'Henry Ramirez', N'Spa Manager', CAST(N'2015-09-05' AS Date), N'Active', N'henry.jpg', N'ACC020_AI_GEN', N'555-1236', N'henry.r@spa.com')
GO
INSERT [dbo].[News] ([newsId], [header], [content], [createAt], [type], [image], [categoryId]) VALUES (N'01875dca-16bf-46ce-bbdc-0f98795496ae', N'Li?u Trình Mát-Xa T?i Spa Giúp Gi?m Cang Th?ng', N'Mát-xa t?i spa là m?t trong nh?ng li?u pháp giúp gi?m cang th?ng hi?u qu? nh?t. V?i các k? thu?t mát-xa truy?n th?ng nhu Shiatsu, Swedish, hay Deep Tissue, các chuyên viên s? giúp b?n thu giãn, gi?i t?a m?i lo âu và m?t m?i, d?ng th?i c?i thi?n luu thông máu, gi?m dau nh?c co th?.', CAST(N'2025-02-21T10:34:25.343' AS DateTime), N'Blog', N'https://thegrandhotram.com/wp-content/uploads/2021/08/S43695-min.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[News] ([newsId], [header], [content], [createAt], [type], [image], [categoryId]) VALUES (N'0e0b7065-f9b8-46e7-8fe0-440935abde4d', N'Khám Phá Các D?ch V? Spa Cao C?p', N'Các spa cao c?p không ch? chú tr?ng vào ch?t lu?ng d?ch v? mà còn t?o ra m?t không gian thu giãn tuy?t v?i. V?i không gian yên tinh, âm nh?c du duong, ánh sáng d?u nh?, d?ch v? spa cao c?p s? mang l?i cho b?n nh?ng tr?i nghi?m tuy?t v?i và c?m giác thu giãn t?i da. Các li?u trình t? cham sóc da m?t, cham sóc co th? cho d?n các li?u pháp th?i d?c co th? s? giúp b?n c?m th?y tái sinh.', CAST(N'2025-02-21T10:34:32.917' AS DateTime), N'Blog', N'https://thegrandhotram.com/wp-content/uploads/2021/08/S43695-min.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[News] ([newsId], [header], [content], [createAt], [type], [image], [categoryId]) VALUES (N'8c2ad5a3-3a54-4720-a28e-004a72492ce6', N'Tr?i Nghi?m D?ch V? Spa Chuyên Nghi?p', N'D?ch v? spa không ch? giúp thu giãn co th? mà còn c?i thi?n s?c kh?e và tinh th?n. T?i các spa cao c?p, b?n s? du?c t?n hu?ng các li?u trình cham sóc da, mát-xa chuyên sâu, cùng v?i các li?u pháp tr? li?u t? nhiên d? gi?m cang th?ng, ph?c h?i nang lu?ng. Các chuyên viên s? l?a ch?n li?u trình phù h?p nh?t v?i nhu c?u và tình tr?ng s?c kh?e c?a b?n.', CAST(N'2025-02-21T10:33:16.883' AS DateTime), N'Blog', N'https://thegrandhotram.com/wp-content/uploads/2021/08/S43695-min.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[News] ([newsId], [header], [content], [createAt], [type], [image], [categoryId]) VALUES (N'9dfe9b3e-e32f-40b7-b727-3f0a628c6df3', N'D?ch V? Spa Chuyên Bi?t Cho Nam Gi?i', N'Không ch? dành cho ph? n?, các d?ch v? spa hi?n nay dã m? r?ng và phát tri?n m?nh m? cho nam gi?i. Các li?u trình spa dành riêng cho nam bao g?m mát-xa thu giãn, cham sóc da m?t, c?o râu chuyên nghi?p và nhi?u d?ch v? cham sóc khác giúp nam gi?i thu giãn và duy trì phong d?.', CAST(N'2025-02-21T10:34:58.610' AS DateTime), N'Blog', N'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/90/2023/07/31085507/DSC_7463-Edit-1170x780.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[News] ([newsId], [header], [content], [createAt], [type], [image], [categoryId]) VALUES (N'ead33746-20a5-43c0-8ce9-e73d3b666a23', N'Cham Sóc S?c Ð?p V?i D?ch V? Spa', N'Không ch? giúp thu giãn, các d?ch v? spa còn mang l?i nh?ng l?i ích to l?n cho s?c d?p. Các li?u trình cham sóc da, t?y t? bào ch?t, làm tr?ng da và thu giãn co th? giúp b?n c?m th?y nh? nhàng và kh?e kho?n hon bao gi? h?t. Cham sóc s?c d?p t?i spa giúp làm s?ch sâu, kích thích tu?n hoàn máu và nuôi du?ng làn da t? sâu bên trong.', CAST(N'2025-02-21T10:34:14.003' AS DateTime), N'Blog', N'https://thegrandhotram.com/wp-content/uploads/2021/08/S43695-min.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
GO
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'6219a63fab414127aa8ac13f2a3eb2a4', N'Employee')
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'6945d592f27f49b2adc586dbef316c35', N'Admin')
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'70061484c29840fbb22ca3f6b3203e39', N'Manager')
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'eed231e27e6c4309895ef17737569015', N'Customer')
GO
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'425bb31f4b3e4242993e30204f7adacd', N'Relaxing Massage', N'A soothing massage service that helps reduce stress, relieve muscle tension, improve circulation, and bring a sense of relaxation to the body.')
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'4509b8f837a7486e88d40e4aabc9f5f1', N'Steam Bath', N'A relaxing steam bath treatment that helps relax the body, detoxify, improve blood circulation, and provide a refreshing feeling.')
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'54b8784c00c8497483696ccd41f5019a', N'Cosmetic Tattooing', N'A beauty enhancement service that includes eyebrow, eyeliner, and lip tattooing, providing natural-looking results and saving time on daily makeup.')
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'93bd58d65a074b24a4b767c3d69d3cb6', N'Facial Care', N'A deep facial treatment that includes cleansing, exfoliation, moisturizing, and skin regeneration, leaving your skin radiant and smooth.')
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'945a12c26f724a60bd899ea9c941108d', N'Dark Spot & Freckle Treatment', N'A treatment for dark spots and freckles using the latest technology to lighten the skin, reduce pigmentation, and promote a clear, even skin tone.')
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'a80f53515dbd40a6afa2aa7488f6471a', N'Whitening Bath', N'A full-body whitening bath that uses natural products to brighten the skin, even out skin tone, and nourish the skin from within.')
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'c599e1c8a7b24666920497c7a4f99e34', N'Full Body Exfoliation', N'A full body exfoliation treatment using natural ingredients to remove dead skin cells, stimulate skin regeneration, and leave your skin soft and glowing.')
INSERT [dbo].[ServiceCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'd01330077bc445109fbab0b1db832559', N'Acne Treatment', N'A professional acne treatment using advanced technology and specialized products to cleanse the skin, prevent acne breakouts, and improve skin texture.')
GO
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'04d6dcff3d814313a857f8cd484092c8', N'Turkish Hammam Bath', 800000, CAST(N'00:30:00' AS Time), N'A traditional Turkish steam bath to relax and cleanse the skin.', N'https://i.pinimg.com/736x/c2/80/3a/c2803a2f65faebdd961e523bea010120.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'0a44dc3db00748fb94a27c00a6407fd7', N'Deep Cleansing Facial', 1400000, CAST(N'01:00:00' AS Time), N'A thorough facial treatment to cleanse, exfoliate, and hydrate the skin.', N'https://i.pinimg.com/736x/ac/53/be/ac53be822c9786be96edc95680fc032d.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'1060008b0c564e4eb4fa2be6f690d301', N'Gold & Collagen Whitening Bath', 2500000, CAST(N'01:30:00' AS Time), N'A luxurious whitening bath with gold and collagen for radiant skin.', N'https://i.pinimg.com/736x/1d/d6/1a/1dd61a0721d08b594ba5211951df61df.jpg', N'a80f53515dbd40a6afa2aa7488f6471a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'113af08cef024ad891ef147f730a69ff', N'Relaxing Swedish Massage', 1150000, CAST(N'01:00:00' AS Time), N'A soothing full-body massage to ease stress and tension.', N'https://i.pinimg.com/736x/b7/1d/38/b71d3884d20463d8f52b85d63827badf.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'235540cf8ef8454ea2da32b68318aefb', N'Aromatherapy Steam Bath', 1000000, CAST(N'01:00:00' AS Time), N'A steam bath infused with essential oils for a calming, soothing experience.', N'https://i.pinimg.com/736x/17/2b/fa/172bfacb8b304684244f0d670e663552.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'360b4a8abc144a3c83a91833777b8728', N'Lymphatic Drainage Massage', 1400000, CAST(N'01:00:00' AS Time), N'A gentle massage that promotes lymph flow and detoxification.', N'https://i.pinimg.com/736x/3c/fe/55/3cfe55e2c47d4908a7dc4158b99fa65f.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'391b967b441b4d768c75f1869d62e5a2', N'Deep Tissue Massage', 1500000, CAST(N'01:30:00' AS Time), N'A more intense massage to target and release deep muscle tension.', N'https://i.pinimg.com/736x/0f/07/57/0f075764d003645f4d32016a1f22e6b0.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'3cbf51be93bc424d9d3091ed5b57e320', N'Sports Massage', 1900000, CAST(N'01:30:00' AS Time), N'A massage designed to relieve muscle tension after physical activity.', N'https://i.pinimg.com/736x/a4/1e/32/a41e32b1adc9301ea1c81c0ac68ef453.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'3f3d78c1525d44609af7384f6c5689aa', N'Detox Steam Bath', 900000, CAST(N'00:30:00' AS Time), N'A steam bath designed to cleanse the body of toxins.', N'https://i.pinimg.com/736x/2f/52/9e/2f529eacf686db0dd8bfe55df0106e32.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'411701eace114f07aab8cb20b4b43b61', N'Chemical Peel for Pigmentation', 1800000, CAST(N'01:00:00' AS Time), N'A chemical peel treatment to reduce pigmentation and even skin tone.', N'https://i.pinimg.com/736x/00/1d/14/001d1451ca068aaf69c7f8e2030f508c.jpg', N'945a12c26f724a60bd899ea9c941108d')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'43a695b74e404d9bb312dd2de8f92a5b', N'Aloe Vera Whitening Bath', 1900000, CAST(N'01:30:00' AS Time), N'An aloe vera bath to cool and brighten the skin.', N'https://i.pinimg.com/736x/85/c2/a0/85c2a0afb9a28e94a22d73c5d96178f9.jpg', N'a80f53515dbd40a6afa2aa7488f6471a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'489b18ebad414bad934daa6d618c8632', N'Lip Tattooing', 4500000, CAST(N'02:00:00' AS Time), N'Semi-permanent lip tint for a beautiful, defined pout.', N'https://i.pinimg.com/736x/7c/86/68/7c8668d7b48bee04291ffe6c69b1aa81.jpg', N'54b8784c00c8497483696ccd41f5019a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'4c844174bd6d462b857faa272e3f490f', N'Brightening Body Scrub and Whitening Bath', 1700000, CAST(N'01:30:00' AS Time), N'A full-body scrub followed by a whitening bath to brighten the skin.', N'https://i.pinimg.com/736x/88/25/87/8825876fdebff62ff85782dc42726ba7.jpg', N'a80f53515dbd40a6afa2aa7488f6471a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'63bfb7cce38642dfb6973ce91c3ea27e', N'Coffee Body Scrub', 1500000, CAST(N'01:00:00' AS Time), N'A coffee scrub to exfoliate and stimulate circulation.', N'https://i.pinimg.com/736x/00/3d/c1/003dc1573402993327da2d308cd46316.jpg', N'c599e1c8a7b24666920497c7a4f99e34')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'7e6815952c3b46b98e66ec2cb84eb1d5', N'Luxury Diamond Facial', 3500000, CAST(N'01:00:00' AS Time), N'A luxurious facial using diamond powder for exfoliation and rejuvenation.', N'https://i.pinimg.com/736x/7a/39/78/7a39785aa9a021a5ba7971d882f7b2e4.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'8885ba825c934d1ca8a00b3094fbbdc4', N'Brightening Facial', 1000000, CAST(N'01:00:00' AS Time), N'A facial treatment designed to brighten dull skin and restore radiance.', N'https://i.pinimg.com/736x/01/79/f0/0179f085c27b61c881e3a90dcfe1e548.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'8cae563429054a7d9f23644750d3dc82', N'Eucalyptus Steam Bath', 850000, CAST(N'01:00:00' AS Time), N'A refreshing steam bath with eucalyptus to clear the sinuses.', N'https://i.pinimg.com/736x/86/65/29/8665293dd6f6885c60fa8b4ca724a74f.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'8df966624fa04235b326ba27c2c32940', N'Aromatherapy Massage', 1500000, CAST(N'01:30:00' AS Time), N'A relaxing massage using essential oils to calm the mind and body.', N'https://i.pinimg.com/736x/36/f1/04/36f104edf87be329dc2000557d650f20.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'96bc33cc0151476c9816ab5cbd79f071', N'Laser Dark Spot Removal', 2500000, CAST(N'01:30:00' AS Time), N'A laser treatment to lighten dark spots and freckles.', N'https://i.pinimg.com/736x/86/9f/fd/869ffdf2ae4346f2a4c93a3ad993f72f.jpg', N'945a12c26f724a60bd899ea9c941108d')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'a7d4b02500f0493ba36a2ef9370f8c4f', N'Vitamin C Brightening Treatment', 2000000, CAST(N'01:30:00' AS Time), N'A treatment that uses Vitamin C to brighten dark spots and improve skin tone.', N'https://i.pinimg.com/736x/16/f0/77/16f077be9e0ef5aba3a539a6531055e7.jpg', N'945a12c26f724a60bd899ea9c941108d')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'b86075a6791c4400a06e1bcb02f5d862', N'Candle Massage', 1600000, CAST(N'01:30:00' AS Time), N'A relaxing massage using warm candle wax to soothe and hydrate the skin.', N'https://i.pinimg.com/736x/8e/4a/11/8e4a117443af05529330000862cd1a7d.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'ba4aa338374141e2996fbcd599cea5e5', N'Rose Petal Whitening Bath', 2000000, CAST(N'01:30:00' AS Time), N'A rose petal bath that softens and brightens the skin.', N'https://i.pinimg.com/736x/32/7a/30/327a301dc2a52e6640765a88fe40031d.jpg', N'a80f53515dbd40a6afa2aa7488f6471a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'bae4a5a237be408ab8abcc6f43387549', N'Honey & Oat Scrub', 1300000, CAST(N'01:00:00' AS Time), N'A gentle scrub with honey and oats to nourish and exfoliate the skin.', N'https://i.pinimg.com/736x/30/d6/c8/30d6c8b8e4490c0acaa7ac9749c64f3c.jpg', N'c599e1c8a7b24666920497c7a4f99e34')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'c201e0870d894ae587361ee2582b5fae', N'Anti-Aging Facial', 2100000, CAST(N'01:00:00' AS Time), N'A rejuvenating facial treatment with anti-aging ingredients.', N'https://i.pinimg.com/736x/5d/d7/89/5dd789483e997a542236677423fee8f8.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'ca24396009184a03b15937742bc148fb', N'Milk and Honey Whitening Bath', 1000000, CAST(N'01:00:00' AS Time), N'A nourishing bath that lightens and moisturizes the skin.', N'https://i.pinimg.com/736x/de/f8/0e/def80e6fb7e930fc4862c290f3c18c49.jpg', N'a80f53515dbd40a6afa2aa7488f6471a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'cd872d6af44947cba399e3e9ce4edf75', N'Eyebrow Tattooing', 3500000, CAST(N'02:00:00' AS Time), N'Semi-permanent eyebrow tattoo for a natural, fuller look.', N'https://i.pinimg.com/736x/05/01/bb/0501bb758b4e3119896d4cd395fa849e.jpg', N'54b8784c00c8497483696ccd41f5019a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'ceba7df331594e89b3b640fa07026dec', N'Reflexology Massage', 600000, CAST(N'00:30:00' AS Time), N'A massage focusing on pressure points in the feet to promote relaxation.', N'https://i.pinimg.com/736x/4d/ed/08/4ded0853861d12e02610b4262e49a4a5.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'd789409698594f98be36e6e75baf758a', N'Hot Stone Massage', 1200000, CAST(N'01:00:00' AS Time), N'A soothing massage with heated stones to relieve deep muscle tension.', N'https://i.pinimg.com/736x/d5/ba/de/d5bade47fc9fce4849021c1e54823aaf.jpg', N'425bb31f4b3e4242993e30204f7adacd')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'd7b3813a32bf4c91abfdcf4dab98edea', N'Herbal Steam Bath', 700000, CAST(N'00:30:00' AS Time), N'A detoxifying steam bath infused with herbal scents for relaxation.', N'https://i.pinimg.com/736x/4b/53/b7/4b53b7ca89f8673cb4d64da0974290dd.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'dec5e424796744e7b620c0144059b574', N'Oxygen Facial', 2200000, CAST(N'01:00:00' AS Time), N'An oxygen-infused facial treatment that revitalizes the skin and boosts collagen production.', N'https://i.pinimg.com/736x/15/5c/d3/155cd3a33fddb94876d89cb21fd46abb.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'e652aeed43c449bab8ed0bdef838c493', N'Freckle Removal Treatment', 2200000, CAST(N'01:00:00' AS Time), N'A treatment to lighten and remove freckles for a more even skin tone.', N'https://i.pinimg.com/736x/2c/65/95/2c65953d524e901daa995f9a0fa82c9d.jpg', N'945a12c26f724a60bd899ea9c941108d')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'f080e50d793e4b9b9932f434b27411d4', N'Coconut Oil Scrub', 1400000, CAST(N'01:00:00' AS Time), N'A soothing scrub with coconut oil to exfoliate and hydrate the skin.', N'https://i.pinimg.com/736x/4b/31/0d/4b310d6de1a00bd33bd19935ea7a6dca.jpg', N'c599e1c8a7b24666920497c7a4f99e34')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'f5e61a919d03457286013da04494aeb3', N'Charcoal Whitening Bath', 2300000, CAST(N'01:30:00' AS Time), N'A detoxifying charcoal bath that removes impurities and brightens the skin.', N'https://i.pinimg.com/736x/fe/43/b1/fe43b18b3c82cf46e65c2cea8a0f2799.jpg', N'a80f53515dbd40a6afa2aa7488f6471a')
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId]) VALUES (N'f6b3b101fb734b7bbff97662a191cc43', N'Acne Treatment Facial', 900000, CAST(N'01:00:00' AS Time), N'A facial treatment designed to treat acne and prevent future breakouts.', N'https://i.pinimg.com/736x/63/a4/5b/63a45bddda96efc95343a91ede537a43.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6')
GO
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'6d0330b7-e6fe-4cb1-93ef-ed5715406b12', N'Service', 1400000, 0, CAST(N'2025-02-23T12:00:00.000' AS DateTime), NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'a490fab3-dbed-41c3-af83-e888e1c95b40', N'Service', 1150000, 1, CAST(N'2025-02-23T12:00:00.000' AS DateTime), NULL, N'VNPAY')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'ae88e176-b422-4474-ab25-ddbb45aac545', N'Service', 1150000, 0, CAST(N'2025-02-23T12:00:00.000' AS DateTime), NULL, N'VNPAY')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Account__F3DBC57276AC1D9C]    Script Date: 2/22/2025 11:13:00 PM ******/
ALTER TABLE [dbo].[Account] ADD UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Promotio__E9685770BDEA21AC]    Script Date: 2/22/2025 11:13:00 PM ******/
ALTER TABLE [dbo].[Promotion] ADD UNIQUE NONCLUSTERED 
(
	[promotionCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FKAccount946763] FOREIGN KEY([roleId])
REFERENCES [dbo].[Role] ([roleId])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FKAccount946763]
GO
ALTER TABLE [dbo].[Application]  WITH CHECK ADD  CONSTRAINT [FKApplicatio194610] FOREIGN KEY([resolvedBy])
REFERENCES [dbo].[Manager] ([managerId])
GO
ALTER TABLE [dbo].[Application] CHECK CONSTRAINT [FKApplicatio194610]
GO
ALTER TABLE [dbo].[Application]  WITH CHECK ADD  CONSTRAINT [FKApplicatio396292] FOREIGN KEY([accountId])
REFERENCES [dbo].[Account] ([accountId])
GO
ALTER TABLE [dbo].[Application] CHECK CONSTRAINT [FKApplicatio396292]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FKAppointmen118448] FOREIGN KEY([requestId])
REFERENCES [dbo].[Request] ([requestId])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FKAppointmen118448]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FKAppointmen213905] FOREIGN KEY([roomId])
REFERENCES [dbo].[Room] ([roomId])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FKAppointmen213905]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FKAppointmen55642] FOREIGN KEY([employeeId])
REFERENCES [dbo].[Employee] ([employeeId])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FKAppointmen55642]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FKAppointmen998763] FOREIGN KEY([replacementEmployee])
REFERENCES [dbo].[Employee] ([employeeId])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FKAppointmen998763]
GO
ALTER TABLE [dbo].[AttendanceRecords]  WITH CHECK ADD  CONSTRAINT [FKAttendance248059] FOREIGN KEY([employeeId])
REFERENCES [dbo].[Employee] ([employeeId])
GO
ALTER TABLE [dbo].[AttendanceRecords] CHECK CONSTRAINT [FKAttendance248059]
GO
ALTER TABLE [dbo].[CategoryEmployee]  WITH CHECK ADD  CONSTRAINT [FKCategoryEm127434] FOREIGN KEY([employeeId])
REFERENCES [dbo].[Employee] ([employeeId])
GO
ALTER TABLE [dbo].[CategoryEmployee] CHECK CONSTRAINT [FKCategoryEm127434]
GO
ALTER TABLE [dbo].[CategoryEmployee]  WITH CHECK ADD  CONSTRAINT [FKCategoryEm926525] FOREIGN KEY([categoryId])
REFERENCES [dbo].[ServiceCategory] ([categoryId])
GO
ALTER TABLE [dbo].[CategoryEmployee] CHECK CONSTRAINT [FKCategoryEm926525]
GO
ALTER TABLE [dbo].[CosmeticProduct]  WITH CHECK ADD  CONSTRAINT [FKCosmeticPr108056] FOREIGN KEY([categoryId])
REFERENCES [dbo].[CosmeticCategory] ([categoryId])
GO
ALTER TABLE [dbo].[CosmeticProduct] CHECK CONSTRAINT [FKCosmeticPr108056]
GO
ALTER TABLE [dbo].[CosmeticTransaction]  WITH CHECK ADD  CONSTRAINT [FKCosmeticTr609340] FOREIGN KEY([transactionId])
REFERENCES [dbo].[Transaction] ([transactionId])
GO
ALTER TABLE [dbo].[CosmeticTransaction] CHECK CONSTRAINT [FKCosmeticTr609340]
GO
ALTER TABLE [dbo].[Customer]  WITH CHECK ADD  CONSTRAINT [FKCustomer62882] FOREIGN KEY([accountId])
REFERENCES [dbo].[Account] ([accountId])
GO
ALTER TABLE [dbo].[Customer] CHECK CONSTRAINT [FKCustomer62882]
GO
ALTER TABLE [dbo].[CustomerMembership]  WITH CHECK ADD  CONSTRAINT [FKCustomerMe495857] FOREIGN KEY([MembershipId])
REFERENCES [dbo].[Membership] ([membershipId])
GO
ALTER TABLE [dbo].[CustomerMembership] CHECK CONSTRAINT [FKCustomerMe495857]
GO
ALTER TABLE [dbo].[CustomerMembership]  WITH CHECK ADD  CONSTRAINT [FKCustomerMe513790] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([customerId])
GO
ALTER TABLE [dbo].[CustomerMembership] CHECK CONSTRAINT [FKCustomerMe513790]
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FKEmployee613705] FOREIGN KEY([accountId])
REFERENCES [dbo].[Account] ([accountId])
GO
ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FKEmployee613705]
GO
ALTER TABLE [dbo].[EmployeeCommission]  WITH CHECK ADD  CONSTRAINT [FKEmployeeCo153613] FOREIGN KEY([serviceTransactionId])
REFERENCES [dbo].[ServiceTransaction] ([serviceTransactionId])
GO
ALTER TABLE [dbo].[EmployeeCommission] CHECK CONSTRAINT [FKEmployeeCo153613]
GO
ALTER TABLE [dbo].[EmployeeCommission]  WITH CHECK ADD  CONSTRAINT [FKEmployeeCo384416] FOREIGN KEY([employeeId])
REFERENCES [dbo].[Employee] ([employeeId])
GO
ALTER TABLE [dbo].[EmployeeCommission] CHECK CONSTRAINT [FKEmployeeCo384416]
GO
ALTER TABLE [dbo].[EmployeeCommission]  WITH CHECK ADD  CONSTRAINT [FKEmployeeCo818088] FOREIGN KEY([commissionId])
REFERENCES [dbo].[Commission] ([commissionId])
GO
ALTER TABLE [dbo].[EmployeeCommission] CHECK CONSTRAINT [FKEmployeeCo818088]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FKFeedback300803] FOREIGN KEY([serviceId])
REFERENCES [dbo].[SpaService] ([serviceId])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FKFeedback300803]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FKFeedback851355] FOREIGN KEY([createdBy])
REFERENCES [dbo].[Customer] ([customerId])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FKFeedback851355]
GO
ALTER TABLE [dbo].[Floor]  WITH CHECK ADD  CONSTRAINT [FKFloor761332] FOREIGN KEY([categoryId])
REFERENCES [dbo].[ServiceCategory] ([categoryId])
GO
ALTER TABLE [dbo].[Floor] CHECK CONSTRAINT [FKFloor761332]
GO
ALTER TABLE [dbo].[GuestApplication]  WITH CHECK ADD  CONSTRAINT [FKGuestAppli558895] FOREIGN KEY([applicationId])
REFERENCES [dbo].[Application] ([applicationId])
GO
ALTER TABLE [dbo].[GuestApplication] CHECK CONSTRAINT [FKGuestAppli558895]
GO
ALTER TABLE [dbo].[Manager]  WITH CHECK ADD  CONSTRAINT [FKManager812592] FOREIGN KEY([accountId])
REFERENCES [dbo].[Account] ([accountId])
GO
ALTER TABLE [dbo].[Manager] CHECK CONSTRAINT [FKManager812592]
GO
ALTER TABLE [dbo].[News]  WITH CHECK ADD  CONSTRAINT [FKNews310959] FOREIGN KEY([categoryId])
REFERENCES [dbo].[ServiceCategory] ([categoryId])
GO
ALTER TABLE [dbo].[News] CHECK CONSTRAINT [FKNews310959]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FKOrder618118] FOREIGN KEY([transactionId])
REFERENCES [dbo].[CosmeticTransaction] ([cosmeticTransactionId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FKOrder618118]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FKOrder872949] FOREIGN KEY([customerId])
REFERENCES [dbo].[Customer] ([customerId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FKOrder872949]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FKOrderDetai262451] FOREIGN KEY([productId])
REFERENCES [dbo].[CosmeticProduct] ([productId])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FKOrderDetai262451]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FKOrderDetai440612] FOREIGN KEY([orderId])
REFERENCES [dbo].[Order] ([orderId])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FKOrderDetai440612]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FKRequest464370] FOREIGN KEY([serviceId])
REFERENCES [dbo].[SpaService] ([serviceId])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FKRequest464370]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FKRequest559498] FOREIGN KEY([employeeId])
REFERENCES [dbo].[Employee] ([employeeId])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FKRequest559498]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FKRequest796587] FOREIGN KEY([customerId])
REFERENCES [dbo].[Customer] ([customerId])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FKRequest796587]
GO
ALTER TABLE [dbo].[Room]  WITH CHECK ADD  CONSTRAINT [FKRoom528640] FOREIGN KEY([floorId])
REFERENCES [dbo].[Floor] ([floorId])
GO
ALTER TABLE [dbo].[Room] CHECK CONSTRAINT [FKRoom528640]
GO
ALTER TABLE [dbo].[ServiceTransaction]  WITH CHECK ADD  CONSTRAINT [FKServiceTra189582] FOREIGN KEY([membershipId])
REFERENCES [dbo].[Membership] ([membershipId])
GO
ALTER TABLE [dbo].[ServiceTransaction] CHECK CONSTRAINT [FKServiceTra189582]
GO
ALTER TABLE [dbo].[ServiceTransaction]  WITH CHECK ADD  CONSTRAINT [FKServiceTra470968] FOREIGN KEY([requestId])
REFERENCES [dbo].[Request] ([requestId])
GO
ALTER TABLE [dbo].[ServiceTransaction] CHECK CONSTRAINT [FKServiceTra470968]
GO
ALTER TABLE [dbo].[ServiceTransaction]  WITH CHECK ADD  CONSTRAINT [FKServiceTra855570] FOREIGN KEY([transactionId])
REFERENCES [dbo].[Transaction] ([transactionId])
GO
ALTER TABLE [dbo].[ServiceTransaction] CHECK CONSTRAINT [FKServiceTra855570]
GO
ALTER TABLE [dbo].[SpaService]  WITH CHECK ADD  CONSTRAINT [FKSpaService205795] FOREIGN KEY([categoryId])
REFERENCES [dbo].[ServiceCategory] ([categoryId])
GO
ALTER TABLE [dbo].[SpaService] CHECK CONSTRAINT [FKSpaService205795]
GO
ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [FKTransactio965842] FOREIGN KEY([promotionId])
REFERENCES [dbo].[Promotion] ([promotionId])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [FKTransactio965842]
GO
ALTER TABLE [dbo].[Commission]  WITH CHECK ADD  CONSTRAINT [VALID_PERCENTAGE] CHECK  (([percentage]>(0) AND [percentage]<=(100)))
GO
ALTER TABLE [dbo].[Commission] CHECK CONSTRAINT [VALID_PERCENTAGE]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'manually by manager' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Appointment', @level2type=N'COLUMN',@level2name=N'replacementEmployee'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'null if hasn''t checked in' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'AttendanceRecords', @level2type=N'COLUMN',@level2name=N'checkInTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'null if hasn''t checked out' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'AttendanceRecords', @level2type=N'COLUMN',@level2name=N'checkOutTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Trực tiếp/VNPay' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Transaction', @level2type=N'COLUMN',@level2name=N'transactionType'
GO
USE [master]
GO
ALTER DATABASE [spaservice] SET  READ_WRITE 
GO
