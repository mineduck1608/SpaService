
/****** Object:  Database [spaservice]    Script Date: 3/18/2025 9:40:25 PM ******/
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
/****** Object:  Table [dbo].[Account]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[Application]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Application](
	[applicationId] [varchar](50) NOT NULL,
	[status] [varchar](255) NOT NULL,
	[content] [nvarchar](255) NOT NULL,
	[accountId] [varchar](50) NULL,
	[createdAt] [datetime] NOT NULL,
	[resolvedBy] [varchar](50) NULL,
	[resolvedAt] [datetime] NULL,
	[managerNote] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[applicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointment](
	[appointmentId] [varchar](50) NOT NULL,
	[startTime] [datetime] NOT NULL,
	[endTime] [datetime] NOT NULL,
	[status] [varchar](20) NOT NULL,
	[requestId] [varchar](50) NOT NULL,
	[updatedAt] [datetime] NULL,
	[roomId] [varchar](50) NOT NULL,
	[employeeId] [varchar](50) NOT NULL,
	[checkIn] [datetime] NULL,
	[checkOut] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[appointmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AttendanceRecords]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[CartCosmeticProduct]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CartCosmeticProduct](
	[id] [varchar](50) NOT NULL,
	[customerId] [varchar](50) NOT NULL,
	[productId] [varchar](50) NOT NULL,
	[quantity] [int] NOT NULL,
	[included] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoryEmployee]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[Commission]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[CosmeticCategory]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[CosmeticProduct]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CosmeticProduct](
	[productId] [varchar](50) NOT NULL,
	[productName] [nvarchar](50) NOT NULL,
	[price] [real] NOT NULL,
	[quantity] [int] NOT NULL,
	[description] [nvarchar](255) NOT NULL,
	[status] [bit] NOT NULL,
	[isSelling] [bit] NOT NULL,
	[image] [varchar](255) NULL,
	[categoryId] [varchar](50) NOT NULL,
	[isDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[productId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CosmeticTransaction]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[Customer]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[customerId] [varchar](50) NOT NULL,
	[accountId] [varchar](50) NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[gender] [varchar](10) NOT NULL,
	[phone] [varchar](20) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[dateOfBirth] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[customerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomerMembership]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerMembership](
	[CustomerId] [varchar](50) NOT NULL,
	[MembershipId] [varchar](50) NOT NULL,
	[startDate] [date] NOT NULL,
	[endDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC,
	[MembershipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[EmployeeCommission]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[Feedback]    Script Date: 3/18/2025 9:40:26 PM ******/
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
	[appointmentId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[feedbackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Floor]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Floor](
	[floorId] [varchar](50) NOT NULL,
	[floorNum] [int] NOT NULL,
	[categoryId] [varchar](50) NOT NULL,
	[isDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[floorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GuestApplication]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[Manager]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[Membership]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[News]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[News](
	[newsId] [varchar](50) NOT NULL,
	[header] [varchar](255) NOT NULL,
	[content] [varchar](max) NOT NULL,
	[type] [varchar](50) NOT NULL,
	[image] [varchar](255) NOT NULL,
	[categoryId] [varchar](50) NOT NULL,
	[createdAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[newsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 3/18/2025 9:40:26 PM ******/
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
	[address] [nvarchar](255) NOT NULL,
	[recepientName] [nvarchar](50) NULL,
	[phone] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[orderDetailId] [varchar](50) NOT NULL,
	[quantity] [int] NOT NULL,
	[subTotalAmount] [real] NOT NULL,
	[orderId] [varchar](50) NOT NULL,
	[productId] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[orderDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Promotion]    Script Date: 3/18/2025 9:40:26 PM ******/
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
	[isDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[promotionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Request]    Script Date: 3/18/2025 9:40:26 PM ******/
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
	[createdAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[requestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[Room]    Script Date: 3/18/2025 9:40:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Room](
	[roomId] [varchar](50) NOT NULL,
	[roomNum] [int] NOT NULL,
	[floorId] [varchar](50) NOT NULL,
	[status] [bit] NOT NULL,
	[isDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[roomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceCategory]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[ServiceTransaction]    Script Date: 3/18/2025 9:40:26 PM ******/
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
/****** Object:  Table [dbo].[SpaService]    Script Date: 3/18/2025 9:40:26 PM ******/
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
	[isDeleted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[serviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transaction]    Script Date: 3/18/2025 9:40:26 PM ******/
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
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'13785b9fa1414ba28328dbd09918fe86', N'duccoi16082004@gmail.com', N'GoogleAuth', 1, CAST(N'2025-03-09T04:18:27.137' AS DateTime), N'eed231e27e6c4309895ef17737569015', NULL)
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'23c9d9858f0b46789dcae69c543e92d4', N'employeeTest', N'75bdebd45687b37cfdd178dd5c7084686d22d56855e70f92a27dd7bf1a04525d', 1, CAST(N'2025-03-17T15:30:37.553' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2025-03-17T15:30:37.553' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'4e27853f21f4429e846af0520f8bba80', N'admin', N'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 1, CAST(N'2025-02-19T14:09:51.983' AS DateTime), N'6945d592f27f49b2adc586dbef316c35', CAST(N'2025-02-19T14:09:51.983' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'6636a9e9f21649ff8ffde8d7c88ef396', N'Ngoc', N'bf5592a762486141532f278e12e76283f0cb3315929a08ddcde839188a11f544', 1, CAST(N'2025-03-05T14:26:55.890' AS DateTime), N'eed231e27e6c4309895ef17737569015', CAST(N'2025-03-05T14:26:55.890' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'80afc5b8a7ef41e39ac72ac9579fc1ee', N'ngocdtse183959@fpt.edu.vn', N'GoogleAuth', 1, CAST(N'2025-03-05T04:14:04.747' AS DateTime), N'eed231e27e6c4309895ef17737569015', NULL)
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'901c4cf49b7c4f8e8880ee05e2faa6fe', N'ducdm160804@gmail.com', N'GoogleAuth', 1, CAST(N'2025-03-15T03:52:49.423' AS DateTime), N'eed231e27e6c4309895ef17737569015', NULL)
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'9cff6325d33844ea88a2edf6914895d6', N'managerAccount', N'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 1, CAST(N'2025-03-11T11:00:22.640' AS DateTime), N'70061484c29840fbb22ca3f6b3203e39', CAST(N'2025-03-11T11:00:22.640' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'a5086aa620714784b545ed57f24b7acc', N'employeeAccount', N'75bdebd45687b37cfdd178dd5c7084686d22d56855e70f92a27dd7bf1a04525d', 1, CAST(N'2025-03-13T23:17:21.747' AS DateTime), N'6219a63fab414127aa8ac13f2a3eb2a4', CAST(N'2025-03-13T23:17:21.747' AS DateTime))
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'aaf7cae70d2c47e1b1781ef32477e2d4', N'dangngoc4332@gmail.com', N'GoogleAuth', 1, CAST(N'2025-03-05T01:11:09.407' AS DateTime), N'eed231e27e6c4309895ef17737569015', NULL)
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
INSERT [dbo].[Account] ([accountId], [username], [password], [status], [createdAt], [roleId], [updatedAt]) VALUES (N'd06c4efc6b3b414d8fc6dad83fb04067', N'ducdmse183990@fpt.edu.vn', N'GoogleAuth', 1, CAST(N'2025-03-16T13:47:29.413' AS DateTime), N'eed231e27e6c4309895ef17737569015', NULL)
GO
INSERT [dbo].[Application] ([applicationId], [status], [content], [accountId], [createdAt], [resolvedBy], [resolvedAt], [managerNote]) VALUES (N'131eb77228ef4c34b159f2efadf5f519', N'Denied', N'223233223', N'a5086aa620714784b545ed57f24b7acc', CAST(N'2025-03-15T15:23:06.340' AS DateTime), N'4e27853f21f4429e846af0520f8bba80', CAST(N'2025-03-18T09:05:22.803' AS DateTime), N'Not accepted')
GO
INSERT [dbo].[Appointment] ([appointmentId], [startTime], [endTime], [status], [requestId], [updatedAt], [roomId], [employeeId], [checkIn], [checkOut]) VALUES (N'15b733c8e24744388744bfbc03c6d611', CAST(N'2025-03-18T08:00:00.000' AS DateTime), CAST(N'2025-03-18T09:00:00.000' AS DateTime), N'Pending', N'16f9355535154e60855f007b062456eb', CAST(N'2025-03-16T17:31:47.683' AS DateTime), N'RM_204_AI_GEN', N'EMP008_AI_GEN', NULL, NULL)
INSERT [dbo].[Appointment] ([appointmentId], [startTime], [endTime], [status], [requestId], [updatedAt], [roomId], [employeeId], [checkIn], [checkOut]) VALUES (N'1e62237159334bbf95dfdb92c0c30781', CAST(N'2025-03-20T08:00:00.000' AS DateTime), CAST(N'2025-03-20T10:00:00.000' AS DateTime), N'Pending', N'f0e5b4121b684d74b69b908dcd4c54dc', CAST(N'2025-03-16T19:36:51.903' AS DateTime), N'RM_301_AI_GEN', N'EMP001_AI_GEN', NULL, NULL)
INSERT [dbo].[Appointment] ([appointmentId], [startTime], [endTime], [status], [requestId], [updatedAt], [roomId], [employeeId], [checkIn], [checkOut]) VALUES (N'30e943e9f2b8485b9bdb16476ce62bce', CAST(N'2025-03-19T08:00:00.000' AS DateTime), CAST(N'2025-03-19T09:00:00.000' AS DateTime), N'Pending', N'6cb760cbbd074e76a93d06c654d429bc', CAST(N'2025-03-16T17:32:26.843' AS DateTime), N'RM_204_AI_GEN', N'EMP009_AI_GEN', NULL, NULL)
INSERT [dbo].[Appointment] ([appointmentId], [startTime], [endTime], [status], [requestId], [updatedAt], [roomId], [employeeId], [checkIn], [checkOut]) VALUES (N'9ec5123dbeef4b88b11c6f9dce9c31db', CAST(N'2025-03-18T08:00:00.000' AS DateTime), CAST(N'2025-03-18T08:30:00.000' AS DateTime), N'Not processed', N'31ca779889de43758896018a6c4b104c', CAST(N'2025-03-16T16:57:03.883' AS DateTime), N'RM_202_AI_GEN', N'EMP005_AI_GEN', NULL, NULL)
INSERT [dbo].[Appointment] ([appointmentId], [startTime], [endTime], [status], [requestId], [updatedAt], [roomId], [employeeId], [checkIn], [checkOut]) VALUES (N'9fe6c8eaee0f4ae6ab3dcb5cdaf3eeee', CAST(N'2025-03-20T09:00:00.000' AS DateTime), CAST(N'2025-03-20T10:00:00.000' AS DateTime), N'Pending', N'e3bc91028a9c466aae115be6d7583baf', CAST(N'2025-03-16T17:37:07.903' AS DateTime), N'RM_203_AI_GEN', N'EMP009_AI_GEN', NULL, NULL)
INSERT [dbo].[Appointment] ([appointmentId], [startTime], [endTime], [status], [requestId], [updatedAt], [roomId], [employeeId], [checkIn], [checkOut]) VALUES (N'c3034548b8be4e90aac7927918ef29f7', CAST(N'2025-03-11T08:00:00.000' AS DateTime), CAST(N'2025-03-11T09:00:00.000' AS DateTime), N'Finished', N'690f0266f160458cad699946c76b61d0', CAST(N'2025-03-10T09:53:03.260' AS DateTime), N'RM_105_AI_GEN', N'EMP008_AI_GEN', CAST(N'2025-03-11T10:45:54.293' AS DateTime), CAST(N'2025-03-11T10:58:08.313' AS DateTime))
INSERT [dbo].[Appointment] ([appointmentId], [startTime], [endTime], [status], [requestId], [updatedAt], [roomId], [employeeId], [checkIn], [checkOut]) VALUES (N'd8ce39db85c948f18596545605fbf533', CAST(N'2025-03-11T16:00:00.000' AS DateTime), CAST(N'2025-03-11T17:00:00.000' AS DateTime), N'Finished', N'8f42cc3369d14ad7b5868fdb538c098f', CAST(N'2025-03-11T10:46:24.407' AS DateTime), N'RM_104_AI_GEN', N'EMP001_AI_GEN', CAST(N'2025-03-11T10:46:33.090' AS DateTime), CAST(N'2025-03-11T10:50:08.033' AS DateTime))
GO
INSERT [dbo].[AttendanceRecords] ([attendanceId], [checkInTime], [checkOutTime], [employeeId]) VALUES (N'b4f7d753-cc86-4e6e-bfd6-ad6dc42e9ef6', CAST(N'2025-03-18T10:46:04.917' AS DateTime), CAST(N'2025-03-18T10:47:32.520' AS DateTime), N'ab086c2624a24a2da92199afdc2bff1a')
GO
INSERT [dbo].[CartCosmeticProduct] ([id], [customerId], [productId], [quantity], [included]) VALUES (N'166c779ff90441f3b8085b48ddd8c46e', N'96b3b0fb13fe4453a479e86833236b6e', N'3732e5ef19e7455a8d9f45978deaf6d1', 1, 1)
INSERT [dbo].[CartCosmeticProduct] ([id], [customerId], [productId], [quantity], [included]) VALUES (N'4a44e65d94b6470b8e1c38d726c25565', N'00a3c7a80b4148adbc53925baaad1a3b', N'bcbcd68175334df98a1ab68adf293c41', 1, 1)
INSERT [dbo].[CartCosmeticProduct] ([id], [customerId], [productId], [quantity], [included]) VALUES (N'70bdee94358c403c8aa9a4380eb5c2c6', N'9e33c10b42654c479cb55260a001782e', N'c0e20756f5f046c7ae0281c81acab4b1', 10, 1)
INSERT [dbo].[CartCosmeticProduct] ([id], [customerId], [productId], [quantity], [included]) VALUES (N'aaab4ac760bf40509a8441965da4706d', N'00a3c7a80b4148adbc53925baaad1a3b', N'c49f1c2c6f3f4c249ff4ff1f52248448', 10, 1)
INSERT [dbo].[CartCosmeticProduct] ([id], [customerId], [productId], [quantity], [included]) VALUES (N'cf8e1ded5f454ecfa4d772c9bbc34d45', N'fceb972bd4294b8a978725ab4d9a8cb0', N'63983449e6214c2d9a975c09ac8e4d87', 5, 1)
GO
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
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'58', N'93bd58d65a074b24a4b767c3d69d3cb6', N'EMP019_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'95', N'945a12c26f724a60bd899ea9c941108d', N'EMP016_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'96', N'945a12c26f724a60bd899ea9c941108d', N'EMP020_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'97', N'425bb31f4b3e4242993e30204f7adacd', N'EMP004_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'98', N'4509b8f837a7486e88d40e4aabc9f5f1', N'EMP004_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'99', N'54b8784c00c8497483696ccd41f5019a', N'EMP004_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'cc275e36d12848dca92c4a7a6b350797', N'425bb31f4b3e4242993e30204f7adacd', N'EMP008_AI_GEN')
INSERT [dbo].[CategoryEmployee] ([categoryEmployeeId], [categoryId], [employeeId]) VALUES (N'fea18680b5004fbdb58ea68f1123e3f4', N'945a12c26f724a60bd899ea9c941108d', N'EMP004_AI_GEN')
GO
INSERT [dbo].[Commission] ([commissionId], [percentage]) VALUES (N'commission', 5)
GO
INSERT [dbo].[CosmeticCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'1b040762690d46098d01066097738dec', N'Face Masks', N'Face masks are skincare products that help hydrate, brighten, and rejuvenate the skin. There are various types, including sheet masks, gel masks, and cream masks, each suited for different skin needs and types.')
INSERT [dbo].[CosmeticCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'4b97b39b22624a85a3d7c0ab753a8c6d', N'Cleansers', N'Cleansers help remove dirt, oil, and impurities from the skin. There are options available for every skin type, from dry to oily.')
INSERT [dbo].[CosmeticCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'56d48b50bf9d4b54815536d3d74c2b85', N'Makeup Removers', N'Makeup removers are essential products to cleanse the skin, removing makeup, dirt, and oil. Available in different formulations for various skin types, including oily, dry, and sensitive.')
INSERT [dbo].[CosmeticCategory] ([categoryId], [categoryName], [categoryDescription]) VALUES (N'f6508d79b0ce4847a750ebe531912afa', N'Moisturizers', N'Moisturizers help protect and nourish the skin, keeping it hydrated and soft. Products range from daily hydration to anti-aging treatments.')
GO
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'230a6c8f8eee485baed97d5b2a87881e', N'Nivea Soft Moisturizing Cream', 150000, 76, N'Nivea Soft Moisturizing Cream provides intense hydration to the skin, leaving it soft and smooth throughout the day. Suitable for both face and body, especially for dry skin.', 1, 1, N'https://product.hstatic.net/1000006063/product/nivea_soft_refreshingly_soft_moisturizing_cream_50ml_7cca9711d899459e99e45779ab702d7f_1024x1024.jpg', N'f6508d79b0ce4847a750ebe531912afa', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'3732e5ef19e7455a8d9f45978deaf6d1', N'Vita Geric Hydra Mask', 16000, 96, N'It typically contains ingredients like niacinamide, hyaluronic acid, and plant extracts to improve skin elasticity, soothe irritation, and promote a radiant complexion.', 1, 1, N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2F3018713-3.jpg?alt=media&token=0d77493f-2ad3-4ec9-822d-f9436f322d56', N'1b040762690d46098d01066097738dec', 0)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'63983449e6214c2d9a975c09ac8e4d87', N'Senka Perfect Whip Cleanser', 60000, 113, N'Senka Perfect Whip Cleanser creates a rich, soft foam that cleanses deeply while being gentle on the skin. It removes impurities without stripping the skin''s natural moisture.', 1, 1, N'https://medias.watsons.vn/publishing/WTCVN-201983-side-zoom.jpg?version=1730212812', N'4b97b39b22624a85a3d7c0ab753a8c6d', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'ae3f0f87284747c9914f0444fe0107f9', N'Laneige Water Bank Moisturizer', 350000, 23, N'Laneige Water Bank Moisturizer delivers long-lasting hydration to dry and dehydrated skin. It brightens and softens the skin, keeping it plump and healthy-looking all day.', 1, 1, N'https://www.laneige.com.vn/media/catalog/product/a/r/artboard_1_copy.jpg', N'f6508d79b0ce4847a750ebe531912afa', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'af1f49e0099847778c94afe17d4e4ed0', N'Bioderma Sensibio Micellar Water', 200000, 37, N'Bioderma Sensibio Micellar Water effectively removes makeup and cleanses sensitive skin without irritation. It also soothes and refreshes the skin instantly.', 1, 1, N'https://instijl.net/shops/187391/files/458498209/720x600x2/bioderma-sensibio-h2o-makeup-removing-micellar-wat.webp', N'56d48b50bf9d4b54815536d3d74c2b85', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'bcbcd68175334df98a1ab68adf293c41', N'Vitamin C Brightening Mask', 24000, 1, N'This brightening face mask with Vitamin C helps to even out skin tone, reduce dark spots, and fight signs of aging. Perfect for dull, uneven skin.', 1, 1, N'https://cdn-mms.hktvmall.com/hktv/mms/uploadProductImage/1bd8/478e/8ddd/azOZhTKYBV20230704214707_515.jpg', N'1b040762690d46098d01066097738dec', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'c0e20756f5f046c7ae0281c81acab4b1', N'L''Occitane Rejuvenating Face Mask', 25000, 20, N'A luxurious rejuvenating face mask by L''Occitane, providing deep hydration and nourishment, leaving the skin feeling soft, smooth, and revitalized.', 1, 1, N'https://mt.loccitane.com/cdn/shop/files/1200_PNG-11EMR006I20_texture_RVB.png?crop=center&height=1024&v=1733123964&width=1024', N'1b040762690d46098d01066097738dec', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'c49f1c2c6f3f4c249ff4ff1f52248448', N'Aloe Vera Sheet Mask', 19000, 30, N'This soothing Aloe Vera sheet mask helps hydrate and calm the skin, ideal for dry, tired skin. Suitable for all skin types, especially sensitive skin.', 1, 1, N'https://product.hstatic.net/200000551679/product/real_nature_aloe_mask_sheet_-_concept_07076791d5224a3fb406ea27df1974ed_1024x1024.jpg', N'1b040762690d46098d01066097738dec', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'd23367f14dbb4d7b85d374853c9aefaa', N'Cetaphil Gentle Skin Cleanser', 180000, 60, N'Cetaphil Gentle Skin Cleanser is perfect for sensitive skin, cleansing without irritation. It hydrates and leaves the skin feeling clean and refreshed without any harsh chemicals.', 1, 1, N'https://concung.com/2022/10/59291-93481-large_mobile/sua-rua-mat-diu-nhe-cetaphil-gentle-skin-cleanser-125ml-new.jpg', N'4b97b39b22624a85a3d7c0ab753a8c6d', 1)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'e9847d13e1d949c0a10620cf13890c39', N'Naruko Mask', 24000, 100, N'Infused with potent natural extracts and advanced technology, it hydrates, brightens, and revitalizes your skin, targeting dryness, dullness, and uneven texture to refine pores and boost radiance.', 1, 1, N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2F6725078286545-40037219336401-7_700x700.webp?alt=media&token=bfbeecb1-02d0-4a6a-8622-1a4eb3d87077', N'1b040762690d46098d01066097738dec', 0)
INSERT [dbo].[CosmeticProduct] ([productId], [productName], [price], [quantity], [description], [status], [isSelling], [image], [categoryId], [isDeleted]) VALUES (N'f2eab2ba94974430b83c89184192de4a', N'Garnier Micellar Water', 200000, 97, N'Garnier Micellar Water gently removes makeup and impurities, suitable for all skin types. Leaves the skin feeling fresh and clean without any greasy residue.', 1, 1, N'https://dep7ngay.vn/cdn/shop/files/6607205236945-39576972853457_1024x1024.jpg?v=1697125945', N'56d48b50bf9d4b54815536d3d74c2b85', 1)
GO
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'0a17a7d512b44b8ab027563347215848', N'1cbc16e5090b43379b72ea4117b21b21', N'7b0985c1de4d4c61a4971e4664e5ec0a')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'1f5bcae44c9848fe897353e49803a444', N'e2c04d3c8ade45ec836ede0ac2bd59d3', N'c298bfd9084d46f198fbbb80bcad957b')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'3d709984d958478286661683746d4dd5', N'3a31385ae8a34d008cd2140c7c5f6188', N'44e0fec6c5f04607b11e97ffedc9209d')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'4287c0b9547f4c08b106fa13f71e8865', N'57aab57b1ac74a94a6368a1db7b681e6', N'60fc7c773b564c319570a04f07bbb679')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'57f09d10cd3a44da8674328b62f2f7b5', N'de7d19cf4fae408caca285f8101ea845', N'71414751a4724862bbe753ad8fd5f762')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'658d0b19a98a4584add35cb9b5ee503a', N'65db78609b594cd98fcff9164947fa5d', N'60ed00af251343f2a7ce97591e1990b6')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'760e984a25d5489dbf791e781aa3fde0', N'a61b4e508eeb431d9fc1127958e433d6', N'a2398180968741288354aa03ee272e11')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'7b67bc410d674321961dc1d6e47af053', N'52ca877fb8894c8ca2b60f0ffe08f6e9', N'60aa26771cfe4ae69ba5b35ad4a537fe')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'84e3a7a96c474615952c8738b1aed17d', N'5182d511a5c8405897517ee7b6ffcdba', N'b6045fe74e154a70b77c2cc0188f01c7')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'9ce213f5947e4979a8e557cee42ba20f', N'bcd47e513bbf42219faae248309de37c', N'e64206f9c5454bb1b2152339b02fa38b')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'a6f422b7dabe4f3b96b0e9c283ce70a3', N'0135ddbd6cb2475db717c88637fec8ec', N'552d9e35d5114c228b208c1de3022d15')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'aa125be6073a43bfb947f22a2b8208af', N'606bedd70c394a2091928a9879f23572', N'1f9e2acae054487c87d710680bb65093')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'b8ea3f6eaa644853a802cc09c70f03a7', N'd3b54dfc8f5b4568bf0cdc7715ecf743', N'b13ab62b88024430a5f5b59443177496')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'c31672b2c1ef4e43842f09c4bc460df1', N'77e833ac08d54ca5a3415699d3bb86c1', N'fbc3386cf7d84b7c91242490120b4ac5')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'e81fee567e06488b9e61f0127e482b8e', N'5533452d33674cfabb6c8664cf1f2748', N'51b66964915d40be9c6ebcc47cb797f7')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'f4df1ef55f8b4a36b2d27c42ecc4a8dd', N'191040fbd3e74656af5a4dc4a8c003b3', N'40347273b8274452998a79c1e93b5917')
INSERT [dbo].[CosmeticTransaction] ([cosmeticTransactionId], [transactionId], [orderId]) VALUES (N'fae4303911fe41b1b6bb250b34d52f54', N'd73cb82703b8442f98ee410d31b6e3f8', N'568e7fc61ba74195800e362bd41365a6')
GO
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'00a3c7a80b4148adbc53925baaad1a3b', N'80afc5b8a7ef41e39ac72ac9579fc1ee', N'Dang Thanh Ngoc (K18 HCM)', N'Other', N'None', N'ngocdtse183959@fpt.edu.vn', CAST(N'2025-03-05T04:14:04.747' AS DateTime))
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'6d499d0bf2354f4b8318aaa80c4d6d76', N'd06c4efc6b3b414d8fc6dad83fb04067', N'Dang Minh Duc K18 HCM', N'Other', N'None', N'ducdmse183990@fpt.edu.vn', CAST(N'2025-03-16T13:47:29.413' AS DateTime))
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'96b3b0fb13fe4453a479e86833236b6e', N'901c4cf49b7c4f8e8880ee05e2faa6fe', N'Đức Đặng Minh', N'Male', N'None', N'ducdm160804@gmail.com', CAST(N'2025-03-16T00:00:00.000' AS DateTime))
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'9e33c10b42654c479cb55260a001782e', N'6636a9e9f21649ff8ffde8d7c88ef396', N'Dang Thanh Ngoc', N'Male', N'0846410449', N'dangngoc4331@gmail.com', CAST(N'2004-11-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'fceb972bd4294b8a978725ab4d9a8cb0', N'13785b9fa1414ba28328dbd09918fe86', N'Đặng Minh Đức', N'Male', N'None', N'duccoi16082004@gmail.com', CAST(N'2004-08-16T00:00:00.000' AS DateTime))
INSERT [dbo].[Customer] ([customerId], [accountId], [fullName], [gender], [phone], [email], [dateOfBirth]) VALUES (N'ffffaaee28ea4616b81e2e3cb7482ba5', N'aaf7cae70d2c47e1b1781ef32477e2d4', N'Ngoc Dang  D', N'Other', N'0977298912', N'dangngoc4332@gmail.com', CAST(N'2025-03-05T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[CustomerMembership] ([CustomerId], [MembershipId], [startDate], [endDate]) VALUES (N'fceb972bd4294b8a978725ab4d9a8cb0', N'1', CAST(N'2025-03-16' AS Date), NULL)
INSERT [dbo].[CustomerMembership] ([CustomerId], [MembershipId], [startDate], [endDate]) VALUES (N'ffffaaee28ea4616b81e2e3cb7482ba5', N'4', CAST(N'2021-01-01' AS Date), CAST(N'2029-01-01' AS Date))
GO
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'ab086c2624a24a2da92199afdc2bff1a', N'Duc Minh Dang', N'Esthetician', CAST(N'2025-03-13' AS Date), N'Working', N'sophia.jpg', N'a5086aa620714784b545ed57f24b7acc', N'0977300912', N'ducdm160804@gmail.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'b701df1c7eff40489967ae713e60db51', N'Dang Minh Duc', N'Receptionist', CAST(N'2025-03-17' AS Date), N'Working', N'1', N'23c9d9858f0b46789dcae69c543e92d4', N'0977399182', N'duccoi160820042@gmail.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP001_AI_GEN', N'Sophia Martinezz', N'Massage Therapist', CAST(N'0001-01-01' AS Date), N'Working', N'sophia.jpg', N'ACC001_AI_GEN', N'555-1234', N'sophia.m@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP002_AI_GEN', N'Liam Johnson', N'Receptionist', CAST(N'2022-08-20' AS Date), N'Working', N'liam.jpg', N'ACC002_AI_GEN', N'555-5678', N'liam.j@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP003_AI_GEN', N'Emma Williams', N'Esthetician', CAST(N'2019-11-15' AS Date), N'Working', N'emma.jpg', N'ACC003_AI_GEN', N'555-9012', N'emma.w@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP004_AI_GEN', N'Noah Brown', N'Spa Manager', CAST(N'2018-06-05' AS Date), N'Working', N'noah.jpg', N'ACC004_AI_GEN', N'555-3456', N'noah.b@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP005_AI_GEN', N'Olivia Davis', N'Massage Therapist', CAST(N'2020-03-18' AS Date), N'Working', N'olivia.jpg', N'ACC005_AI_GEN', N'555-7890', N'olivia.d@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP006_AI_GEN', N'William Garcia', N'Receptionist', CAST(N'2023-01-10' AS Date), N'Working', N'william.jpg', N'ACC006_AI_GEN', N'555-2345', N'william.g@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP007_AI_GEN', N'Ava Rodriguez', N'Esthetician', CAST(N'2021-07-22' AS Date), N'Working', N'ava.jpg', N'ACC007_AI_GEN', N'555-6789', N'ava.r@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP008_AI_GEN', N'James Lopez', N'Spa Manager', CAST(N'2017-12-05' AS Date), N'Working', N'james.jpg', N'ACC008_AI_GEN', N'555-1239', N'james.l@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP009_AI_GEN', N'Isabella Harris', N'Massage Therapist', CAST(N'2019-09-30' AS Date), N'Working', N'isabella.jpg', N'ACC009_AI_GEN', N'555-4567', N'isabella.h@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP010_AI_GEN', N'Benjamin Clark', N'Receptionist', CAST(N'2020-04-14' AS Date), N'Working', N'benjamin.jpg', N'ACC010_AI_GEN', N'555-8901', N'benjamin.c@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP011_AI_GEN', N'Mia Lewis', N'Esthetician', CAST(N'2022-02-20' AS Date), N'Working', N'mia.jpg', N'ACC011_AI_GEN', N'555-2349', N'mia.l@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP012_AI_GEN', N'Elijah Walker', N'Spa Manager', CAST(N'2016-10-25' AS Date), N'Working', N'elijah.jpg', N'ACC012_AI_GEN', N'555-6780', N'elijah.w@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP013_AI_GEN', N'Charlotte Allen', N'Massage Therapist', CAST(N'2021-11-08' AS Date), N'Working', N'charlotte.jpg', N'ACC013_AI_GEN', N'555-3457', N'charlotte.a@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP014_AI_GEN', N'Lucas Scott', N'Receptionist', CAST(N'2018-05-30' AS Date), N'Working', N'lucas.jpg', N'ACC014_AI_GEN', N'555-7895', N'lucas.s@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP015_AI_GEN', N'Amelia King', N'Esthetician', CAST(N'2020-12-18' AS Date), N'Working', N'amelia.jpg', N'ACC015_AI_GEN', N'555-0123', N'amelia.k@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP016_AI_GEN', N'Mason Adams', N'Spa Manager', CAST(N'2017-04-10' AS Date), N'Working', N'mason.jpg', N'ACC016_AI_GEN', N'555-4568', N'mason.a@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP017_AI_GEN', N'Harper Baker', N'Massage Therapist', CAST(N'2019-07-21' AS Date), N'Working', N'harper.jpg', N'ACC017_AI_GEN', N'555-8902', N'harper.b@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP018_AI_GEN', N'Ethan Gonzalez', N'Receptionist', CAST(N'2023-03-15' AS Date), N'Working', N'ethan.jpg', N'ACC018_AI_GEN', N'555-2346', N'ethan.g@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP019_AI_GEN', N'Evelyn Perez', N'Esthetician', CAST(N'2021-06-10' AS Date), N'Working', N'evelyn.jpg', N'ACC019_AI_GEN', N'555-6783', N'evelyn.p@spa.com')
INSERT [dbo].[Employee] ([employeeId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'EMP020_AI_GEN', N'Henry Ramirez', N'Spa Manager', CAST(N'2015-09-05' AS Date), N'Retired', N'henry.jpg', N'ACC020_AI_GEN', N'555-1236', N'henry.r@spa.com')
GO
INSERT [dbo].[EmployeeCommission] ([employeeId], [commissionId], [transactionId], [commissionValue], [serviceTransactionId]) VALUES (N'EMP001_AI_GEN', N'commission', N'bc3348c3-aca7-4c3e-b956-1683f8a5c804', 0, N'2831f8b7-be9f-4315-976c-e455953dd51f')
INSERT [dbo].[EmployeeCommission] ([employeeId], [commissionId], [transactionId], [commissionValue], [serviceTransactionId]) VALUES (N'EMP008_AI_GEN', N'commission', N'd1f143b2-f98a-428e-85d9-4fbe408a9de6', 57500, N'2e554683-0246-4f9f-8032-adcbd37c5470')
GO
INSERT [dbo].[Feedback] ([feedbackId], [feedbackMessage], [rating], [createdAt], [createdBy], [appointmentId]) VALUES (N'ec3108f6-53f2-4b6e-a332-e74d931c98d4', N'Good Service. I will turn back some day', 5, CAST(N'2025-03-15T04:15:00.357' AS DateTime), N'fceb972bd4294b8a978725ab4d9a8cb0', N'c3034548b8be4e90aac7927918ef29f7')
GO
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_01_AI_GEN', 1, N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_02_AI_GEN', 2, N'4509b8f837a7486e88d40e4aabc9f5f1', 0)
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_03_AI_GEN', 3, N'54b8784c00c8497483696ccd41f5019a', 0)
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_04_AI_GEN', 4, N'93bd58d65a074b24a4b767c3d69d3cb6', 0)
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_05_AI_GEN', 5, N'945a12c26f724a60bd899ea9c941108d', 0)
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_06_AI_GEN', 6, N'a80f53515dbd40a6afa2aa7488f6471a', 0)
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_07_AI_GEN', 7, N'c599e1c8a7b24666920497c7a4f99e34', 0)
INSERT [dbo].[Floor] ([floorId], [floorNum], [categoryId], [isDeleted]) VALUES (N'FLOOR_08_AI_GEN', 8, N'd01330077bc445109fbab0b1db832559', 0)
GO
INSERT [dbo].[Manager] ([managerId], [fullName], [position], [hireDate], [status], [image], [accountId], [phone], [email]) VALUES (N'd85f371c4c06477b8ea29449675e674f', N'Manager', N'Cosmetic Manager', CAST(N'2025-03-11' AS Date), N'Working', N'null', N'9cff6325d33844ea88a2edf6914895d6', N'0977300911', N'duccoi16082003@gmail.com')
GO
INSERT [dbo].[Membership] ([membershipId], [type], [totalPayment], [discount]) VALUES (N'1', N'Gold', 3E+07, 5)
INSERT [dbo].[Membership] ([membershipId], [type], [totalPayment], [discount]) VALUES (N'2', N'Silver', 1E+07, 2)
INSERT [dbo].[Membership] ([membershipId], [type], [totalPayment], [discount]) VALUES (N'3', N'Platinum', 6E+07, 7)
INSERT [dbo].[Membership] ([membershipId], [type], [totalPayment], [discount]) VALUES (N'4', N'Diamond', 1E+08, 10)
GO
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'25fba301-fe13-4e9d-aa62-6bc62b28573d', N'Relax and Rejuvenate with SPASERVICE123 – Exclusive First-Time Discount!', N'Are you ready to indulge in the ultimate spa experience? At SPASERVICE123, we offer top-tier spa treatments designed to relax, rejuvenate, and refresh your mind and body. Whether you’re looking for a soothing massage, a luxurious facial, or a revitalizing steam bath, we’ve got the perfect service for you.  And now, for a limited time, we’re offering an exclusive first-time 5% discount!', N'Promotion', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2FWeb-ENG-ANS-Summer-Treatres-1.jpg?alt=media&token=22c66312-5ffc-4395-b438-d0314e1e0cd0', N'c599e1c8a7b24666920497c7a4f99e34', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'43a7c626-ecf9-4364-8c2b-e8a7d9eaaefa', N'Whitening Bath: A Luxurious Way to Achieve Radiant Skin', N'A whitening bath is a luxurious skincare treatment designed to brighten and even out skin tone while providing deep hydration and relaxation. Whether done at a spa or at home, this treatment uses natural and nourishing ingredients to enhance the skin’s glow and softness.', N'Blog', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2Fmilk-bath.jpg?alt=media&token=f3691eb9-23ac-4a09-a252-02898ca9ea09', N'a80f53515dbd40a6afa2aa7488f6471a', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'939635c7-bcb8-4689-a66b-ae95f4f924d9', N'The Ultimate Guide to Cosmetic Tattooing: Enhance Your Natural Beauty', N'Cosmetic tattooing, also known as permanent makeup or micropigmentation, has gained popularity as a long-lasting solution for enhancing facial features. This beauty procedure involves implanting pigments into the skin to create the appearance of makeup, making it ideal for those who want to save time on daily beauty routines or enhance their natural features.', N'Blog', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2FEyebrow-Powder-tattoo-1024x683.jpg?alt=media&token=ad7aad35-0610-4249-af38-b09e23c4ee95', N'54b8784c00c8497483696ccd41f5019a', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'a7735d78-b820-4a5d-b83a-18f62a9b6761', N'Grand Opening - Special Discounts Up to 50%!', N'Join us for our Grand Opening Celebration on April 20, 2025! ', N'Event', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2FBowood-Spa-09.avif?alt=media&token=438094a3-7d98-4b98-9dba-03554336597c', N'4509b8f837a7486e88d40e4aabc9f5f1', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'ba279cbc-9857-4bca-9f83-36a0f6667b45', N'The Ultimate Guide to Facial Care: Achieve Radiant and Healthy Skin', N'Facial care is an essential part of a self-care routine, helping to maintain a clear, youthful, and healthy complexion. Proper skincare involves cleansing, moisturizing, and protecting the skin from environmental damage. Whether you have dry, oily, or combination skin, a personalized skincare regimen can help you achieve the best results.', N'Blog', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2Ffacial.jpg?alt=media&token=72aeb443-4c33-40bf-8312-818cfdb69bec', N'93bd58d65a074b24a4b767c3d69d3cb6', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'e1e9c250-d4fc-43d6-8a9a-8d3e9787f342', N'The Ultimate Guide to Steam Baths: Benefits and Relaxation', N'A steam bath is a centuries-old wellness practice that provides a host of benefits for both the body and mind. Whether you''re looking to detoxify, improve circulation, or simply relax, steam baths offer a soothing and rejuvenating experience. In this guide, we’ll explore the benefits, process, and tips for making the most of your steam bath experience.', N'Blog', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2FThinkstockPhotos-178560558.jpg?alt=media&token=3e7c3265-02cb-4a22-977b-3824e791078c', N'4509b8f837a7486e88d40e4aabc9f5f1', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'ecc8d9ec-043b-481d-b1d5-bb3aa57fdc2d', N'Massage Therapy: Relax, Heal, and Rejuvenate', N'Massage therapy is a cornerstone of spa treatments, offering both relaxation and therapeutic benefits. Whether you’re looking to relieve stress, ease muscle pain, or simply enjoy a soothing experience, massages can be tailored to meet your needs.', N'Blog', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2Fmassage.jpg?alt=media&token=09b20d6c-c32a-4e16-9a6d-2a24ba74e214', N'425bb31f4b3e4242993e30204f7adacd', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
INSERT [dbo].[News] ([newsId], [header], [content], [type], [image], [categoryId], [createdAt]) VALUES (N'f41e2e1d-58d8-48d2-9e67-610c91306572', N'Effective Dark Spot & Freckle Treatment: Achieve Clear, Even-Toned Skin', N'Dark spots and freckles are common skin concerns that affect people of all skin types. While freckles are often genetic and harmless, dark spots can result from sun exposure, aging, or post-inflammatory hyperpigmentation. Fortunately, there are various treatments available to reduce their appearance and restore an even skin tone.', N'Blog', N'https://firebasestorage.googleapis.com/v0/b/badmintoncourtbooking-183b2.appspot.com/o/cosmetic-products%2FPigmentation%20%26%20Dark%20Spot%20Removal%20Treatment.avif?alt=media&token=39612b5b-0dea-4617-83cd-4633cd31895d', N'945a12c26f724a60bd899ea9c941108d', CAST(N'2025-03-15T08:57:50.897' AS DateTime))
GO
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'1f9e2acae054487c87d710680bb65093', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T02:34:20.800' AS DateTime), 312000, 1, N'S107.3013, Vinhomes Grandpark, Long Thanh My street, District 9', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'40347273b8274452998a79c1e93b5917', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T03:12:17.257' AS DateTime), 24000, 1, N'S107.3013, Vinhomes Grandpark, Long Thanh My street, District 9', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'44e0fec6c5f04607b11e97ffedc9209d', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-17T13:52:20.030' AS DateTime), 16000, 0, N'171/3 group 31', N'Đặng Minh Đức', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'51b66964915d40be9c6ebcc47cb797f7', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-17T14:49:14.020' AS DateTime), 16000, 0, N'171/3 group 31', N'sd', N'sdsd')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'552d9e35d5114c228b208c1de3022d15', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T03:37:45.427' AS DateTime), 475000, 1, N'S107.3013, Vinhomes Grandpark, Long Thanh My street, District 9', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'568e7fc61ba74195800e362bd41365a6', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-16T11:12:56.860' AS DateTime), 24000, 1, N'171/3 group 31', N'Đặng Minh Đức', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'60aa26771cfe4ae69ba5b35ad4a537fe', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T03:47:43.590' AS DateTime), 180500, 1, N'S107.3013, Vinhomes Grandpark, Long Thanh My street, District 9', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'60ed00af251343f2a7ce97591e1990b6', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T03:38:19.750' AS DateTime), 475000, 1, N'S107.3013, Vinhomes Grandpark, Long Thanh My street, District 9', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'60fc7c773b564c319570a04f07bbb679', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T03:59:47.637' AS DateTime), 203300, 1, N'S107.3013, Vinhomes Grandpark, Long Thanh My street, District 9', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'71414751a4724862bbe753ad8fd5f762', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-17T14:35:11.023' AS DateTime), 300000, 0, N'171/3 group 31', N'Đặng Minh Đức', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'7b0985c1de4d4c61a4971e4664e5ec0a', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-16T11:09:25.807' AS DateTime), 60000, 1, N'171/3 group 31', N'Đặng Minh Đức', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'a2398180968741288354aa03ee272e11', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T02:47:28.033' AS DateTime), 712000, 1, N'S107.3013, Vinhomes Grandpark, Long Thanh My street, District 9', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'b13ab62b88024430a5f5b59443177496', N'00a3c7a80b4148adbc53925baaad1a3b', CAST(N'2025-03-09T03:30:25.297' AS DateTime), 150000, 1, N'123', N'Dang Thanh Ngoc (K18 HCM)', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'b6045fe74e154a70b77c2cc0188f01c7', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-16T11:02:14.320' AS DateTime), 200000, 1, N'171/3 group 31', N'Đặng Minh Đức', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'c298bfd9084d46f198fbbb80bcad957b', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-16T11:01:28.037' AS DateTime), 200000, 1, N'171/3 group 31', N'Đặng Minh Đức', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'e64206f9c5454bb1b2152339b02fa38b', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-16T18:16:52.427' AS DateTime), 60000, 1, N'171/3 group 31', N'Đặng Minh Đức', N'None')
INSERT [dbo].[Order] ([orderId], [customerId], [orderDate], [totalAmount], [status], [address], [recepientName], [phone]) VALUES (N'fbc3386cf7d84b7c91242490120b4ac5', N'fceb972bd4294b8a978725ab4d9a8cb0', CAST(N'2025-03-17T14:33:23.290' AS DateTime), 582000, 0, N'223', N'Đặng Minh Đức', N'None')
GO
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'04a1d8a2599c456982a828faa2a53e9d', 1, 150000, N'fbc3386cf7d84b7c91242490120b4ac5', N'230a6c8f8eee485baed97d5b2a87881e')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'101ea9430e104d459df1b3aa77de91a2', 1, 332500, N'552d9e35d5114c228b208c1de3022d15', N'ae3f0f87284747c9914f0444fe0107f9')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'1d05446304c44bdb9e08ccb0f5109a06', 1, 60000, N'e64206f9c5454bb1b2152339b02fa38b', N'63983449e6214c2d9a975c09ac8e4d87')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'4647b4c6cb844463b8277c3e036f47cb', 1, 332500, N'60ed00af251343f2a7ce97591e1990b6', N'ae3f0f87284747c9914f0444fe0107f9')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'47400da815004b29bfa2eebfaf7c9970', 1, 142500, N'552d9e35d5114c228b208c1de3022d15', N'230a6c8f8eee485baed97d5b2a87881e')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'47ae2f70df3b47bb9364520a030d72b8', 1, 24000, N'40347273b8274452998a79c1e93b5917', N'bcbcd68175334df98a1ab68adf293c41')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'486241c1afc74c1eb4c9f6e418adf5ad', 13, 312000, N'1f9e2acae054487c87d710680bb65093', N'bcbcd68175334df98a1ab68adf293c41')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'4f87db5130cd4bbea1be26456bb1a8f4', 1, 200000, N'c298bfd9084d46f198fbbb80bcad957b', N'af1f49e0099847778c94afe17d4e4ed0')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'526b082e56e1443ead991c15e5ee6a20', 1, 16000, N'44e0fec6c5f04607b11e97ffedc9209d', N'3732e5ef19e7455a8d9f45978deaf6d1')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'594fe62e9fde4e38806a12bfdb8de720', 2, 32000, N'fbc3386cf7d84b7c91242490120b4ac5', N'3732e5ef19e7455a8d9f45978deaf6d1')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'5cc51de349aa48e1b1fc599d6f051207', 1, 142500, N'60ed00af251343f2a7ce97591e1990b6', N'230a6c8f8eee485baed97d5b2a87881e')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'69765daa795849998203f8058a9ee0ab', 1, 150000, N'b13ab62b88024430a5f5b59443177496', N'230a6c8f8eee485baed97d5b2a87881e')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'6b8dc6a7637347e98ade4d0dcca13004', 1, 24000, N'568e7fc61ba74195800e362bd41365a6', N'bcbcd68175334df98a1ab68adf293c41')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'75bcec36421d43c2bba5a844b16d1d59', 1, 60000, N'7b0985c1de4d4c61a4971e4664e5ec0a', N'63983449e6214c2d9a975c09ac8e4d87')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'7be08a2383124305ae08b68e8a410470', 1, 200000, N'b6045fe74e154a70b77c2cc0188f01c7', N'f2eab2ba94974430b83c89184192de4a')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'85f447195ea341bcb00c40081180b855', 5, 300000, N'71414751a4724862bbe753ad8fd5f762', N'63983449e6214c2d9a975c09ac8e4d87')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'9d45e47dc49f4aa0bd6181c7c60dfa59', 10, 180500, N'60fc7c773b564c319570a04f07bbb679', N'c49f1c2c6f3f4c249ff4ff1f52248448')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'a81dc0a49efc4c78ae0faa852cb132aa', 1, 16000, N'51b66964915d40be9c6ebcc47cb797f7', N'3732e5ef19e7455a8d9f45978deaf6d1')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'ad4bf19dcb1d4615a948ba6c85238be0', 2, 400000, N'fbc3386cf7d84b7c91242490120b4ac5', N'af1f49e0099847778c94afe17d4e4ed0')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'bcb339ec21ea4190af705bba0faac076', 2, 400000, N'a2398180968741288354aa03ee272e11', N'f2eab2ba94974430b83c89184192de4a')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'c041c1e4d14b49d1b9f9240d205583ab', 1, 22800, N'60fc7c773b564c319570a04f07bbb679', N'bcbcd68175334df98a1ab68adf293c41')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'cd1434f1d7cc4f1cb6117d71a5aafc48', 10, 180500, N'60aa26771cfe4ae69ba5b35ad4a537fe', N'c49f1c2c6f3f4c249ff4ff1f52248448')
INSERT [dbo].[OrderDetail] ([orderDetailId], [quantity], [subTotalAmount], [orderId], [productId]) VALUES (N'e4dcb0ea0e2943f2a59702102cfdf25a', 13, 312000, N'a2398180968741288354aa03ee272e11', N'bcbcd68175334df98a1ab68adf293c41')
GO
INSERT [dbo].[Promotion] ([promotionId], [discountValue], [promotionCode], [promotionName], [isActive], [isDeleted]) VALUES (N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', 5, N'SPASERVICE123', N'Discount first time code', 1, 0)
INSERT [dbo].[Promotion] ([promotionId], [discountValue], [promotionCode], [promotionName], [isActive], [isDeleted]) VALUES (N'8a2d308a-adde-4f78-acb6-c48a97a9c2de', 2, N'DUCCOI123', N'MINHDUC', 1, 0)
GO
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'058531a72708435caed0489cf7abfb18', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:07:04.753' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'16f9355535154e60855f007b062456eb', CAST(N'2025-03-18T08:00:00.000' AS DateTime), N'Completed', N'', NULL, N'235540cf8ef8454ea2da32b68318aefb', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T17:23:55.493' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'18542aa9d9b94233af291c8dafc02d1d', CAST(N'2025-03-17T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'489b18ebad414bad934daa6d618c8632', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T17:02:01.173' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'1a9345b96442472b8849f9961a99ac15', CAST(N'2025-03-21T08:00:00.000' AS DateTime), N'Denied', N'', N'Deny', N'04d6dcff3d814313a857f8cd484092c8', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T17:24:29.820' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'1b77aae931644f6b95519d33ea88f5ac', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:20:38.697' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'1e84ebb855564e0ebc55646279432b90', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:14:50.570' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'2150527f589648db92438a3e2fd3e9ab', CAST(N'2025-03-13T09:00:00.000' AS DateTime), N'Denied', N'', N'Not accept', N'cd872d6af44947cba399e3e9ce4edf75', N'00a3c7a80b4148adbc53925baaad1a3b', N'EMP017_AI_GEN', CAST(N'2025-03-09T08:56:13.690' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'31ca779889de43758896018a6c4b104c', CAST(N'2025-03-18T08:00:00.000' AS DateTime), N'Completed', N'', NULL, N'04d6dcff3d814313a857f8cd484092c8', N'96b3b0fb13fe4453a479e86833236b6e', N'EMP004_AI_GEN', CAST(N'2025-03-16T16:18:50.813' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'3f149e7fea59485f8d13534e60e5968c', CAST(N'2025-03-10T00:00:00.000' AS DateTime), N'Denied', N'', N'Not accept', N'360b4a8abc144a3c83a91833777b8728', N'00a3c7a80b4148adbc53925baaad1a3b', N'EMP017_AI_GEN', CAST(N'2025-03-09T09:51:25.227' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'3fd13b3b2efd49e1b46ca91676a0f4b9', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Denied', N'', N'Ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:21:40.280' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'403d8f643c104052a9b5af240eb1e726', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:55:49.917' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'4316788c824f47bbbaaa3552bc8c9788', CAST(N'2025-03-29T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-17T14:31:18.627' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'507a715dcb6e48519cdd3520fb6be9f2', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:49:28.117' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'51466319d59345b58f0d8ba02525e104', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:14:19.880' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'51eed673b7ef4217b7e8d373fc75cf37', CAST(N'2025-03-22T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'04d6dcff3d814313a857f8cd484092c8', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-17T13:29:56.853' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'5935321634bd476ea1e62305190871c7', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:54:31.800' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'5c5a9a15c9cf486a94dc56ea01f6d281', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:17:17.037' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'5fece7a791e54b0187c672a350c79769', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:25:29.313' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'690f0266f160458cad699946c76b61d0', CAST(N'2025-03-12T08:00:00.000' AS DateTime), N'Completed', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', N'EMP001_AI_GEN', CAST(N'2025-03-09T11:18:50.650' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'6cb760cbbd074e76a93d06c654d429bc', CAST(N'2025-03-19T08:00:00.000' AS DateTime), N'Completed', N'', NULL, N'235540cf8ef8454ea2da32b68318aefb', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T17:22:54.617' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'6f282a91e3224287aee0e43747113e0e', CAST(N'2025-03-22T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-17T13:32:09.607' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'733754b1c7a34095a53a7701fb0c28e6', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:13:42.977' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'762ecce332c245eea33010f3c798432e', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:14.160' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'76e5001c2fb74df2b52d0491176823ec', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Denied', N'', N'Ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:21:18.777' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'7a96f0bf116445c096d86abde45a5dd1', CAST(N'2025-03-20T15:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:30.597' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'7b18a74f3e1242f4836946081205a625', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:15.220' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'80ac9b9c8c57491d960d61d6a3d5ec14', CAST(N'2025-03-20T15:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:29.153' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'82174ee01c634efc87fc723ee08460a2', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:15.320' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'8398aee2e8f54256885234436c03019f', CAST(N'2025-03-17T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'3cbf51be93bc424d9d3091ed5b57e320', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:48:48.100' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'8405e86216ca4ff6850d54e6ce0a67a5', CAST(N'2025-03-20T15:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:47.440' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'89e9ee3f2ade41b9a60d0aaecd763b53', CAST(N'2025-03-20T15:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:32.530' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'8a1cda7df5064cb5813d810b7582023a', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:55:17.330' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'8b4295e427e844568100d274e3ce1677', CAST(N'2025-03-20T15:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:49:33.277' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'8f42cc3369d14ad7b5868fdb538c098f', CAST(N'2025-03-10T12:00:00.000' AS DateTime), N'Denied', N'', N'ưewe', N'360b4a8abc144a3c83a91833777b8728', N'00a3c7a80b4148adbc53925baaad1a3b', N'EMP017_AI_GEN', CAST(N'2025-03-09T09:53:26.557' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'9157c0fcbd1b4e75821c781ce4d914bd', CAST(N'2025-03-17T08:00:00.000' AS DateTime), N'Denied', N'', N'Ok', N'489b18ebad414bad934daa6d618c8632', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T17:02:05.647' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'94319971169c491e84bbbd4ad006544b', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:15:48.623' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'97ef7e34fec949e59d34c39cb30deaed', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:50:01.543' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'9940523d52ac44889515333cd15b6b5f', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:58:49.533' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'99aa0f38acef4445a492d8e46bf29799', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:05:05.080' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'9d1ea3f029ed48f3a2a703bc8b7ab97a', CAST(N'2025-03-22T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:51:59.497' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'a239e13da1564b8fbda264f31b256c14', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:15:43.220' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'a8c03bf59ab3409887d30d036493fc26', CAST(N'2025-03-17T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'3cbf51be93bc424d9d3091ed5b57e320', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T20:48:51.737' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'b1235c4aac3b4993a906b94928d5906f', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:13:31.970' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'b51f14bf71db4a7fb0ceae26e0b3a33b', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:58:40.347' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'c52d495e7eff4677b3fb4b247dc9d739', CAST(N'2025-03-17T08:00:00.000' AS DateTime), N'Denied', N'', N'Duplicate Request', N'04d6dcff3d814313a857f8cd484092c8', N'96b3b0fb13fe4453a479e86833236b6e', N'EMP001_AI_GEN', CAST(N'2025-03-16T16:18:24.973' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'c536389497664c979c3ee1e7f41304a3', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:04:30.797' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'd718fe44c9804efb97ebe016ad698214', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:14:56.603' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'd9f0774063c04c6280231d981c6c62f8', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:20:37.797' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'e02ef3505a4740b88fbbbe05d1b1240d', CAST(N'2025-03-19T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'04d6dcff3d814313a857f8cd484092c8', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:28:03.300' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'e0d0a085c016429a90a81fef4a13d37c', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:26:21.873' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'e3bc91028a9c466aae115be6d7583baf', CAST(N'2025-03-20T09:00:00.000' AS DateTime), N'Completed', N'', NULL, N'235540cf8ef8454ea2da32b68318aefb', N'fceb972bd4294b8a978725ab4d9a8cb0', N'EMP012_AI_GEN', CAST(N'2025-03-16T17:34:49.837' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'e5615a3931a1464ca0f915bc9eb21582', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:55:16.343' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'eb900732d6dd47af92f3d92f178f2d66', CAST(N'2025-03-27T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'0a44dc3db00748fb94a27c00a6407fd7', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-17T14:33:46.980' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'eccb9e3cba7144a6972ec84def57f424', CAST(N'2025-03-20T09:00:00.000' AS DateTime), N'Denied', N'', N'ok', N'235540cf8ef8454ea2da32b68318aefb', N'fceb972bd4294b8a978725ab4d9a8cb0', N'EMP017_AI_GEN', CAST(N'2025-03-16T17:34:30.410' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'eea0a85343794229895505f863dcbc60', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T22:04:14.380' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'f0e5b4121b684d74b69b908dcd4c54dc', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Completed', N'', NULL, N'489b18ebad414bad934daa6d618c8632', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T19:35:35.020' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'f29912979409471f9cccda229a194b86', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:56:41.433' AS DateTime))
INSERT [dbo].[Request] ([requestId], [startTime], [status], [customerNote], [managerNote], [serviceId], [customerId], [employeeId], [createdAt]) VALUES (N'f855a2883cd14f229fc1d2f37396fff5', CAST(N'2025-03-20T08:00:00.000' AS DateTime), N'Pending', N'', NULL, N'113af08cef024ad891ef147f730a69ff', N'fceb972bd4294b8a978725ab4d9a8cb0', NULL, CAST(N'2025-03-16T21:54:54.173' AS DateTime))
GO
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'6219a63fab414127aa8ac13f2a3eb2a4', N'Employee')
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'6945d592f27f49b2adc586dbef316c35', N'Admin')
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'70061484c29840fbb22ca3f6b3203e39', N'Manager')
INSERT [dbo].[Role] ([roleId], [roleName]) VALUES (N'eed231e27e6c4309895ef17737569015', N'Customer')
GO
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_101_AI_GEN', 101, N'FLOOR_01_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_102_AI_GEN', 102, N'FLOOR_01_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_103_AI_GEN', 103, N'FLOOR_01_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_104_AI_GEN', 104, N'FLOOR_01_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_105_AI_GEN', 105, N'FLOOR_01_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_106_AI_GEN', 106, N'FLOOR_01_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_201_AI_GEN', 201, N'FLOOR_02_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_202_AI_GEN', 202, N'FLOOR_02_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_203_AI_GEN', 203, N'FLOOR_02_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_204_AI_GEN', 204, N'FLOOR_02_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_205_AI_GEN', 205, N'FLOOR_02_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_206_AI_GEN', 206, N'FLOOR_02_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_207_AI_GEN', 207, N'FLOOR_02_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_301_AI_GEN', 301, N'FLOOR_03_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_302_AI_GEN', 302, N'FLOOR_03_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_303_AI_GEN', 303, N'FLOOR_03_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_304_AI_GEN', 304, N'FLOOR_03_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_305_AI_GEN', 305, N'FLOOR_03_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_306_AI_GEN', 306, N'FLOOR_03_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_401_AI_GEN', 401, N'FLOOR_04_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_402_AI_GEN', 402, N'FLOOR_04_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_403_AI_GEN', 403, N'FLOOR_04_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_404_AI_GEN', 404, N'FLOOR_04_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_405_AI_GEN', 405, N'FLOOR_04_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_406_AI_GEN', 406, N'FLOOR_04_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_407_AI_GEN', 407, N'FLOOR_04_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_501_AI_GEN', 501, N'FLOOR_05_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_502_AI_GEN', 502, N'FLOOR_05_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_503_AI_GEN', 503, N'FLOOR_05_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_504_AI_GEN', 504, N'FLOOR_05_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_505_AI_GEN', 505, N'FLOOR_05_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_506_AI_GEN', 506, N'FLOOR_05_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_601_AI_GEN', 601, N'FLOOR_06_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_602_AI_GEN', 602, N'FLOOR_06_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_603_AI_GEN', 603, N'FLOOR_06_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_604_AI_GEN', 604, N'FLOOR_06_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_605_AI_GEN', 605, N'FLOOR_06_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_606_AI_GEN', 606, N'FLOOR_06_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_607_AI_GEN', 607, N'FLOOR_06_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_701_AI_GEN', 701, N'FLOOR_07_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_702_AI_GEN', 702, N'FLOOR_07_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_703_AI_GEN', 703, N'FLOOR_07_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_704_AI_GEN', 704, N'FLOOR_07_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_705_AI_GEN', 705, N'FLOOR_07_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_706_AI_GEN', 706, N'FLOOR_07_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_801_AI_GEN', 801, N'FLOOR_08_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_802_AI_GEN', 802, N'FLOOR_08_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_803_AI_GEN', 803, N'FLOOR_08_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_804_AI_GEN', 804, N'FLOOR_08_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_805_AI_GEN', 805, N'FLOOR_08_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_806_AI_GEN', 806, N'FLOOR_08_AI_GEN', 1, 0)
INSERT [dbo].[Room] ([roomId], [roomNum], [floorId], [status], [isDeleted]) VALUES (N'RM_807_AI_GEN', 807, N'FLOOR_08_AI_GEN', 1, 0)
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
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'022ad554-2061-48c8-bcdd-5834950abf15', N'e1c358b4-2d93-4f24-94d5-9fea5e0739cb', N'f29912979409471f9cccda229a194b86', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'1f1b3a2e-84dd-49a1-a0ce-dab3d0b07edc', N'002c08dd-0071-4cff-bf2f-25bb079c7e55', N'16f9355535154e60855f007b062456eb', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'1fa603c9-0929-4e29-a496-45e07ccb2fe1', N'c94b78a6-dba0-438c-9cc3-42a516b0c9c9', N'8a1cda7df5064cb5813d810b7582023a', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'24fca263-b1e6-47e3-af09-d61970232d3b', N'45925cad-e4ab-4bf6-8fe4-3d43f9f9c2fa', N'1b77aae931644f6b95519d33ea88f5ac', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'2831f8b7-be9f-4315-976c-e455953dd51f', N'bc3348c3-aca7-4c3e-b956-1683f8a5c804', N'8f42cc3369d14ad7b5868fdb538c098f', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'2ab30b62-5da6-4661-92f7-2bec15152810', N'bd8063ff-374d-4d0e-963d-a0039426f1e2', N'c52d495e7eff4677b3fb4b247dc9d739', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'2e554683-0246-4f9f-8032-adcbd37c5470', N'd1f143b2-f98a-428e-85d9-4fbe408a9de6', N'690f0266f160458cad699946c76b61d0', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'33de5a2b-d4d2-400f-bc4b-88c3f5c4a8b5', N'64197a27-9ed6-4de0-84d5-58b20104678c', N'3fd13b3b2efd49e1b46ca91676a0f4b9', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'3fc66b8a-da99-46f9-92ef-718e7b46e5f6', N'99a7d757-57e6-4997-b8bc-bb9a1889c6c3', N'3f149e7fea59485f8d13534e60e5968c', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'4177e9a1-1987-479f-a05a-5246c7073f78', N'5c73b782-2600-4018-8c29-060112d41033', N'6cb760cbbd074e76a93d06c654d429bc', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'420256bb-678f-4f70-b30f-dd8514864386', N'6f42b5e7-37e4-4588-9dcb-611263ccfcd4', N'058531a72708435caed0489cf7abfb18', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'47765acf-b81b-49b5-92f9-aa6ad2940107', N'21e34fdf-29d9-4dc5-8628-c574f3a831ff', N'51466319d59345b58f0d8ba02525e104', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'49e46808-3a23-44ab-a92f-bc5226bb36dc', N'71d26a58-c175-4488-8636-25a7fb52e984', N'a239e13da1564b8fbda264f31b256c14', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'4e1bf35b-9563-470e-9cc7-3aa329514ba9', N'ee35a9ae-61bb-4bb4-a276-3e4b4e94e924', N'c536389497664c979c3ee1e7f41304a3', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'4ecf3dac-d168-4581-b09e-ab6534d42fab', N'dc63f52e-c3a8-4422-9b94-95277bc4474f', N'2150527f589648db92438a3e2fd3e9ab', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'55fd124b-8c4e-46d6-bbe8-08751daec829', N'7a6f4bec-2a8e-4819-8503-58e8d224ba91', N'd9f0774063c04c6280231d981c6c62f8', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'569ad3f7-f3de-466a-8899-28e70c89702c', N'aa5c92b8-7ae6-487f-aabe-7723c5605e86', N'eea0a85343794229895505f863dcbc60', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'61a6ac54-2b6c-40b9-938b-913c6edfb316', N'df8c0cad-cef4-428a-a002-9f2381955299', N'99aa0f38acef4445a492d8e46bf29799', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'61b5cd0d-0134-4fa5-89cf-85ae815e788d', N'b626d29e-a167-448d-9784-aa36ba0cf4e2', N'5c5a9a15c9cf486a94dc56ea01f6d281', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'665db444-c5f3-40b7-8da4-103288979fae', N'bcf45e1f-fd9f-4f13-a58f-5a9fd822fd89', N'9940523d52ac44889515333cd15b6b5f', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'6d778d60-f6a7-4c19-9df2-305fbed29220', N'5abc8d72-593e-4202-aba1-739a94026409', N'eb900732d6dd47af92f3d92f178f2d66', N'1')
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'7204fb55-4a18-4222-b7fe-695b650fff8c', N'901198fd-7ee7-4732-9328-eebe4e6980b9', N'f855a2883cd14f229fc1d2f37396fff5', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'772ae0e1-526e-48e1-a6b2-5845b19b1876', N'22b667fb-33bf-4619-81dd-d08cedf5c1b9', N'76e5001c2fb74df2b52d0491176823ec', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'8a2db36a-d4c4-44f9-bf6a-8f1377128217', N'85511fff-6973-4d39-9390-36fac66e0dab', N'5935321634bd476ea1e62305190871c7', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'99598dbc-545a-4b3a-bb5a-b5dba323f837', N'8d84b270-6ad2-4ab9-9096-125f76df5c7c', N'1a9345b96442472b8849f9961a99ac15', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'9a82c66d-4cb1-459a-aa97-31a9e8023441', N'c8c897f0-69e9-427f-a52a-51646eacdea4', N'4316788c824f47bbbaaa3552bc8c9788', N'1')
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'9cfdd717-bc94-463f-b7b8-b36f34fad1c2', N'2e73ba35-fdb9-40c2-9858-33a371a981a7', N'94319971169c491e84bbbd4ad006544b', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'9e8c62d7-d371-4dbc-84f9-2258d0afda78', N'ba1a410e-975c-4f2b-ad81-7968dcd8531d', N'e02ef3505a4740b88fbbbe05d1b1240d', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'a05f6228-09cd-4d1e-ab0a-44eaa2358574', N'fca43111-de52-4edf-92f0-ec32368e4fb8', N'b1235c4aac3b4993a906b94928d5906f', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'aed15063-3a49-4d64-818d-209fdabb8d5e', N'c18465d8-356b-48ce-b293-56ece5444c98', N'9157c0fcbd1b4e75821c781ce4d914bd', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'afa30f98-a21a-46f1-a190-6a6352840465', N'104dabea-cdbd-4d39-8d8d-f32ec4af4c18', N'97ef7e34fec949e59d34c39cb30deaed', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'bbf210eb-00ec-4b12-8edc-dffc93738b5c', N'c385104e-7a0d-4d27-b809-b275f61f1a30', N'507a715dcb6e48519cdd3520fb6be9f2', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'c0443b52-5ac7-4be8-b3a1-beea109bcd38', N'eb9f2d1a-90b0-40ef-8902-e60eac3342bf', N'6f282a91e3224287aee0e43747113e0e', N'1')
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'c7474288-47ac-4470-a63d-2522857bf3e6', N'bdc73ab7-defb-4f58-b543-34834290aa49', N'5fece7a791e54b0187c672a350c79769', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'c76bd5e4-6a96-4e75-83c4-75cc92272aee', N'214e25ef-f46e-4126-99c3-922249537134', N'd718fe44c9804efb97ebe016ad698214', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'd533fe97-7c5e-47c5-9e73-99a93da00058', N'1993044a-e02e-4aee-aa6e-8c6d6b4dc63f', N'e5615a3931a1464ca0f915bc9eb21582', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'd7299b55-c452-4c1d-845b-9e6733a886d7', N'04a02ff1-38e1-4991-82da-040435baea3e', N'733754b1c7a34095a53a7701fb0c28e6', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'e31dddd7-a0a7-4f54-ba6c-5eb29f77a7f9', N'd3745e1a-0239-4def-a377-b12db49f5515', N'e0d0a085c016429a90a81fef4a13d37c', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'ec2a5ed9-c3f1-4df1-9ef9-1f282035458d', N'3a7cb335-0a4e-4ba7-8e85-ea7493a576e8', N'403d8f643c104052a9b5af240eb1e726', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'edfd56ee-7871-4a58-a00d-1cf5be48ed7c', N'e1f74594-f09d-455d-91c6-478c174866a1', N'31ca779889de43758896018a6c4b104c', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'ef5ac47a-89cd-43cb-9c68-e6d4500608db', N'ec35ffe6-f688-473b-bb8e-7dc73c5c24c5', N'51eed673b7ef4217b7e8d373fc75cf37', N'1')
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'f1d0980e-e3f2-4fdf-b73c-67492f8e1dac', N'9d9fd128-0315-45f1-ab6f-af4fbc342d61', N'b51f14bf71db4a7fb0ceae26e0b3a33b', NULL)
INSERT [dbo].[ServiceTransaction] ([serviceTransactionId], [transactionId], [requestId], [membershipId]) VALUES (N'f671f389-64e9-4b9f-a796-78c4c11e85a0', N'94d4c311-b5f4-4d6d-a0ba-96e8dfac9cb8', N'1e84ebb855564e0ebc55646279432b90', NULL)
GO
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'04d6dcff3d814313a857f8cd484092c8', N'Turkish Hammam Bath', 800000, CAST(N'00:30:00' AS Time), N'A traditional Turkish steam bath to relax and cleanse the skin.', N'https://i.pinimg.com/736x/c2/80/3a/c2803a2f65faebdd961e523bea010120.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'0a44dc3db00748fb94a27c00a6407fd7', N'Deep Cleansing Facial', 1400000, CAST(N'01:00:00' AS Time), N'A thorough facial treatment to cleanse, exfoliate, and hydrate the skin.', N'https://i.pinimg.com/736x/ac/53/be/ac53be822c9786be96edc95680fc032d.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'1060008b0c564e4eb4fa2be6f690d301', N'Gold & Collagen Whitening Bath', 2500000, CAST(N'01:30:00' AS Time), N'A luxurious whitening bath with gold and collagen for radiant skin.', N'https://i.pinimg.com/736x/1d/d6/1a/1dd61a0721d08b594ba5211951df61df.jpg', N'a80f53515dbd40a6afa2aa7488f6471a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'113af08cef024ad891ef147f730a69ff', N'Relaxing Swedish Massage', 1150000, CAST(N'01:00:00' AS Time), N'A soothing full-body massage to ease stress and tension.', N'https://i.pinimg.com/736x/b7/1d/38/b71d3884d20463d8f52b85d63827badf.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'235540cf8ef8454ea2da32b68318aefb', N'Aromatherapy Steam Bath', 1000000, CAST(N'01:00:00' AS Time), N'A steam bath infused with essential oils for a calming, soothing experience.', N'https://i.pinimg.com/736x/17/2b/fa/172bfacb8b304684244f0d670e663552.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'360b4a8abc144a3c83a91833777b8728', N'Lymphatic Drainage Massage', 1400000, CAST(N'01:00:00' AS Time), N'A gentle massage that promotes lymph flow and detoxification.', N'https://i.pinimg.com/736x/3c/fe/55/3cfe55e2c47d4908a7dc4158b99fa65f.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'391b967b441b4d768c75f1869d62e5a2', N'Deep Tissue Massage', 1500000, CAST(N'01:30:00' AS Time), N'A more intense massage to target and release deep muscle tension.', N'https://i.pinimg.com/736x/0f/07/57/0f075764d003645f4d32016a1f22e6b0.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'3cbf51be93bc424d9d3091ed5b57e320', N'Sports Massage', 1900000, CAST(N'01:30:00' AS Time), N'A massage designed to relieve muscle tension after physical activity.', N'https://i.pinimg.com/736x/a4/1e/32/a41e32b1adc9301ea1c81c0ac68ef453.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'3f3d78c1525d44609af7384f6c5689aa', N'Detox Steam Bath', 900000, CAST(N'00:30:00' AS Time), N'A steam bath designed to cleanse the body of toxins.', N'https://i.pinimg.com/736x/2f/52/9e/2f529eacf686db0dd8bfe55df0106e32.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'411701eace114f07aab8cb20b4b43b61', N'Chemical Peel for Pigmentation', 1800000, CAST(N'01:00:00' AS Time), N'A chemical peel treatment to reduce pigmentation and even skin tone.', N'https://i.pinimg.com/736x/00/1d/14/001d1451ca068aaf69c7f8e2030f508c.jpg', N'945a12c26f724a60bd899ea9c941108d', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'43a695b74e404d9bb312dd2de8f92a5b', N'Aloe Vera Whitening Bath', 1900000, CAST(N'01:30:00' AS Time), N'An aloe vera bath to cool and brighten the skin.', N'https://i.pinimg.com/736x/85/c2/a0/85c2a0afb9a28e94a22d73c5d96178f9.jpg', N'a80f53515dbd40a6afa2aa7488f6471a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'489b18ebad414bad934daa6d618c8632', N'Lip Tattooing', 4500000, CAST(N'02:00:00' AS Time), N'Semi-permanent lip tint for a beautiful, defined pout.', N'https://i.pinimg.com/736x/7c/86/68/7c8668d7b48bee04291ffe6c69b1aa81.jpg', N'54b8784c00c8497483696ccd41f5019a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'4c844174bd6d462b857faa272e3f490f', N'Brightening Body Scrub and Whitening Bath', 1700000, CAST(N'01:30:00' AS Time), N'A full-body scrub followed by a whitening bath to brighten the skin.', N'https://i.pinimg.com/736x/88/25/87/8825876fdebff62ff85782dc42726ba7.jpg', N'a80f53515dbd40a6afa2aa7488f6471a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'63bfb7cce38642dfb6973ce91c3ea27e', N'Coffee Body Scrub', 1500000, CAST(N'01:00:00' AS Time), N'A coffee scrub to exfoliate and stimulate circulation.', N'https://i.pinimg.com/736x/00/3d/c1/003dc1573402993327da2d308cd46316.jpg', N'c599e1c8a7b24666920497c7a4f99e34', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'7e6815952c3b46b98e66ec2cb84eb1d5', N'Luxury Diamond Facial', 3500000, CAST(N'01:00:00' AS Time), N'A luxurious facial using diamond powder for exfoliation and rejuvenation.', N'https://i.pinimg.com/736x/7a/39/78/7a39785aa9a021a5ba7971d882f7b2e4.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'8885ba825c934d1ca8a00b3094fbbdc4', N'Brightening Facial', 1000000, CAST(N'01:00:00' AS Time), N'A facial treatment designed to brighten dull skin and restore radiance.', N'https://i.pinimg.com/736x/01/79/f0/0179f085c27b61c881e3a90dcfe1e548.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'8cae563429054a7d9f23644750d3dc82', N'Eucalyptus Steam Bath', 850000, CAST(N'01:00:00' AS Time), N'A refreshing steam bath with eucalyptus to clear the sinuses.', N'https://i.pinimg.com/736x/86/65/29/8665293dd6f6885c60fa8b4ca724a74f.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'8df966624fa04235b326ba27c2c32940', N'Aromatherapy Massage', 1500000, CAST(N'01:30:00' AS Time), N'A relaxing massage using essential oils to calm the mind and body.', N'https://i.pinimg.com/736x/36/f1/04/36f104edf87be329dc2000557d650f20.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'96bc33cc0151476c9816ab5cbd79f071', N'Laser Dark Spot Removal', 2500000, CAST(N'01:30:00' AS Time), N'A laser treatment to lighten dark spots and freckles.', N'https://i.pinimg.com/736x/86/9f/fd/869ffdf2ae4346f2a4c93a3ad993f72f.jpg', N'945a12c26f724a60bd899ea9c941108d', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'a7d4b02500f0493ba36a2ef9370f8c4f', N'Vitamin C Brightening Treatment', 2000000, CAST(N'01:30:00' AS Time), N'A treatment that uses Vitamin C to brighten dark spots and improve skin tone.', N'https://i.pinimg.com/736x/16/f0/77/16f077be9e0ef5aba3a539a6531055e7.jpg', N'945a12c26f724a60bd899ea9c941108d', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'b86075a6791c4400a06e1bcb02f5d862', N'Candle Massage', 1600000, CAST(N'01:30:00' AS Time), N'A relaxing massage using warm candle wax to soothe and hydrate the skin.', N'https://i.pinimg.com/736x/8e/4a/11/8e4a117443af05529330000862cd1a7d.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'ba4aa338374141e2996fbcd599cea5e5', N'Rose Petal Whitening Bath', 2000000, CAST(N'01:30:00' AS Time), N'A rose petal bath that softens and brightens the skin.', N'https://i.pinimg.com/736x/32/7a/30/327a301dc2a52e6640765a88fe40031d.jpg', N'a80f53515dbd40a6afa2aa7488f6471a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'bae4a5a237be408ab8abcc6f43387549', N'Honey & Oat Scrub', 1300000, CAST(N'01:00:00' AS Time), N'A gentle scrub with honey and oats to nourish and exfoliate the skin.', N'https://i.pinimg.com/736x/30/d6/c8/30d6c8b8e4490c0acaa7ac9749c64f3c.jpg', N'c599e1c8a7b24666920497c7a4f99e34', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'c201e0870d894ae587361ee2582b5fae', N'Anti-Aging Facial', 2100000, CAST(N'01:00:00' AS Time), N'A rejuvenating facial treatment with anti-aging ingredients.', N'https://i.pinimg.com/736x/5d/d7/89/5dd789483e997a542236677423fee8f8.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'ca24396009184a03b15937742bc148fb', N'Milk and Honey Whitening Bath', 1000000, CAST(N'01:00:00' AS Time), N'A nourishing bath that lightens and moisturizes the skin.', N'https://i.pinimg.com/736x/de/f8/0e/def80e6fb7e930fc4862c290f3c18c49.jpg', N'a80f53515dbd40a6afa2aa7488f6471a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'cd872d6af44947cba399e3e9ce4edf75', N'Eyebrow Tattooing', 3500000, CAST(N'02:00:00' AS Time), N'Semi-permanent eyebrow tattoo for a natural, fuller look.', N'https://i.pinimg.com/736x/05/01/bb/0501bb758b4e3119896d4cd395fa849e.jpg', N'54b8784c00c8497483696ccd41f5019a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'ceba7df331594e89b3b640fa07026dec', N'Reflexology Massage', 600000, CAST(N'00:30:00' AS Time), N'A massage focusing on pressure points in the feet to promote relaxation.', N'https://i.pinimg.com/736x/4d/ed/08/4ded0853861d12e02610b4262e49a4a5.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'd789409698594f98be36e6e75baf758a', N'Hot Stone Massage', 1200000, CAST(N'01:00:00' AS Time), N'A soothing massage with heated stones to relieve deep muscle tension.', N'https://i.pinimg.com/736x/d5/ba/de/d5bade47fc9fce4849021c1e54823aaf.jpg', N'425bb31f4b3e4242993e30204f7adacd', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'd7b3813a32bf4c91abfdcf4dab98edea', N'Herbal Steam Bath', 700000, CAST(N'00:30:00' AS Time), N'A detoxifying steam bath infused with herbal scents for relaxation.', N'https://i.pinimg.com/736x/4b/53/b7/4b53b7ca89f8673cb4d64da0974290dd.jpg', N'4509b8f837a7486e88d40e4aabc9f5f1', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'dec5e424796744e7b620c0144059b574', N'Oxygen Facial', 2200000, CAST(N'01:00:00' AS Time), N'An oxygen-infused facial treatment that revitalizes the skin and boosts collagen production.', N'https://i.pinimg.com/736x/15/5c/d3/155cd3a33fddb94876d89cb21fd46abb.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'e652aeed43c449bab8ed0bdef838c493', N'Freckle Removal Treatment', 2200000, CAST(N'01:00:00' AS Time), N'A treatment to lighten and remove freckles for a more even skin tone.', N'https://i.pinimg.com/736x/2c/65/95/2c65953d524e901daa995f9a0fa82c9d.jpg', N'945a12c26f724a60bd899ea9c941108d', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'f080e50d793e4b9b9932f434b27411d4', N'Coconut Oil Scrub', 1400000, CAST(N'01:00:00' AS Time), N'A soothing scrub with coconut oil to exfoliate and hydrate the skin.', N'https://i.pinimg.com/736x/4b/31/0d/4b310d6de1a00bd33bd19935ea7a6dca.jpg', N'c599e1c8a7b24666920497c7a4f99e34', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'f5e61a919d03457286013da04494aeb3', N'Charcoal Whitening Bath', 2300000, CAST(N'01:30:00' AS Time), N'A detoxifying charcoal bath that removes impurities and brightens the skin.', N'https://i.pinimg.com/736x/fe/43/b1/fe43b18b3c82cf46e65c2cea8a0f2799.jpg', N'a80f53515dbd40a6afa2aa7488f6471a', 0)
INSERT [dbo].[SpaService] ([serviceId], [serviceName], [price], [duration], [description], [serviceImage], [categoryId], [isDeleted]) VALUES (N'f6b3b101fb734b7bbff97662a191cc43', N'Acne Treatment Facial', 900000, CAST(N'01:00:00' AS Time), N'A facial treatment designed to treat acne and prevent future breakouts.', N'https://i.pinimg.com/736x/63/a4/5b/63a45bddda96efc95343a91ede537a43.jpg', N'93bd58d65a074b24a4b767c3d69d3cb6', 0)
GO
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'002c08dd-0071-4cff-bf2f-25bb079c7e55', N'Service', 1000000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'0135ddbd6cb2475db717c88637fec8ec', N'Product', 475000, 0, NULL, N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'04a02ff1-38e1-4991-82da-040435baea3e', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'104dabea-cdbd-4d39-8d8d-f32ec4af4c18', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'191040fbd3e74656af5a4dc4a8c003b3', N'Product', 24000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'1993044a-e02e-4aee-aa6e-8c6d6b4dc63f', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'1cbc16e5090b43379b72ea4117b21b21', N'Product', 60000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'214e25ef-f46e-4126-99c3-922249537134', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'21e34fdf-29d9-4dc5-8628-c574f3a831ff', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'22b667fb-33bf-4619-81dd-d08cedf5c1b9', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'2e73ba35-fdb9-40c2-9858-33a371a981a7', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'3a31385ae8a34d008cd2140c7c5f6188', N'Product', 16000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'3a7cb335-0a4e-4ba7-8e85-ea7493a576e8', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'45925cad-e4ab-4bf6-8fe4-3d43f9f9c2fa', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'4bae168170a04446a615f11cdfb0a685', N'Product', 182400, 0, NULL, N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'5182d511a5c8405897517ee7b6ffcdba', N'Product', 200000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'52ca877fb8894c8ca2b60f0ffe08f6e9', N'Product', 180500, 1, CAST(N'2025-03-09T10:48:58.417' AS DateTime), N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'5533452d33674cfabb6c8664cf1f2748', N'Product', 16000, 0, CAST(N'2025-03-17T14:49:13.970' AS DateTime), NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'57aab57b1ac74a94a6368a1db7b681e6', N'Product', 203300, 1, CAST(N'2025-03-09T11:01:19.340' AS DateTime), N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'5abc8d72-593e-4202-aba1-739a94026409', N'Service', 1330000, 0, CAST(N'2025-03-17T14:33:47.040' AS DateTime), NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'5c73b782-2600-4018-8c29-060112d41033', N'Service', 1000000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'606bedd70c394a2091928a9879f23572', N'Product', 312000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'64197a27-9ed6-4de0-84d5-58b20104678c', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'65db78609b594cd98fcff9164947fa5d', N'Product', 475000, 0, NULL, N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'6f42b5e7-37e4-4588-9dcb-611263ccfcd4', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'71d26a58-c175-4488-8636-25a7fb52e984', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'77e833ac08d54ca5a3415699d3bb86c1', N'Product', 582000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'7a6f4bec-2a8e-4819-8503-58e8d224ba91', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'85511fff-6973-4d39-9390-36fac66e0dab', N'Service', 1150000, 1, CAST(N'2025-03-16T22:55:05.883' AS DateTime), NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'8d84b270-6ad2-4ab9-9096-125f76df5c7c', N'Service', 800000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'901198fd-7ee7-4732-9328-eebe4e6980b9', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'94d4c311-b5f4-4d6d-a0ba-96e8dfac9cb8', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'99a7d757-57e6-4997-b8bc-bb9a1889c6c3', N'Service', 1400000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'9d9fd128-0315-45f1-ab6f-af4fbc342d61', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'a61b4e508eeb431d9fc1127958e433d6', N'Product', 712000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'aa5c92b8-7ae6-487f-aabe-7723c5605e86', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'b626d29e-a167-448d-9784-aa36ba0cf4e2', N'Service', 1150000, 1, CAST(N'2025-03-16T21:18:07.827' AS DateTime), NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'ba1a410e-975c-4f2b-ad81-7968dcd8531d', N'Service', 800000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'bc3348c3-aca7-4c3e-b956-1683f8a5c804', N'Service', 1400000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'bcd47e513bbf42219faae248309de37c', N'Product', 60000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'bcf45e1f-fd9f-4f13-a58f-5a9fd822fd89', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'bd8063ff-374d-4d0e-963d-a0039426f1e2', N'Service', 800000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'bdc73ab7-defb-4f58-b543-34834290aa49', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'c18465d8-356b-48ce-b293-56ece5444c98', N'Service', 4500000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'c385104e-7a0d-4d27-b809-b275f61f1a30', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'c8c897f0-69e9-427f-a52a-51646eacdea4', N'Service', 1092500, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'c94b78a6-dba0-438c-9cc3-42a516b0c9c9', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'd1f143b2-f98a-428e-85d9-4fbe408a9de6', N'Service', 1150000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'd3745e1a-0239-4def-a377-b12db49f5515', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'd3b54dfc8f5b4568bf0cdc7715ecf743', N'Product', 150000, 1, CAST(N'2025-03-09T10:32:00.470' AS DateTime), NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'd73cb82703b8442f98ee410d31b6e3f8', N'Product', 24000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'dc63f52e-c3a8-4422-9b94-95277bc4474f', N'Service', 3500000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'de7d19cf4fae408caca285f8101ea845', N'Product', 300000, 0, CAST(N'2025-03-17T14:35:10.983' AS DateTime), NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'df8c0cad-cef4-428a-a002-9f2381955299', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'e1c358b4-2d93-4f24-94d5-9fea5e0739cb', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'e1f74594-f09d-455d-91c6-478c174866a1', N'Service', 1.1E+07, 1, CAST(N'2025-03-16T16:19:15.400' AS DateTime), NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'e2c04d3c8ade45ec836ede0ac2bd59d3', N'Product', 200000, 0, NULL, NULL, N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'eb9f2d1a-90b0-40ef-8902-e60eac3342bf', N'Service', 1035000, 1, CAST(N'2025-03-17T13:32:47.197' AS DateTime), N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'ec35ffe6-f688-473b-bb8e-7dc73c5c24c5', N'Service', 720000, 0, NULL, N'6def2186-7a27-4a2f-a814-2cfbe5db5c0d', N'Cash')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'ee35a9ae-61bb-4bb4-a276-3e4b4e94e924', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
INSERT [dbo].[Transaction] ([transactionId], [transactionType], [totalPrice], [status], [completeTime], [promotionId], [paymentType]) VALUES (N'fca43111-de52-4edf-92f0-ec32368e4fb8', N'Service', 1150000, 0, NULL, NULL, N'VnPay')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Account__F3DBC572E2F91974]    Script Date: 3/18/2025 9:40:26 PM ******/
ALTER TABLE [dbo].[Account] ADD UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Promotio__E968577068D77586]    Script Date: 3/18/2025 9:40:26 PM ******/
ALTER TABLE [dbo].[Promotion] ADD UNIQUE NONCLUSTERED 
(
	[promotionCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CosmeticProduct] ADD  DEFAULT ((1)) FOR [isDeleted]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FKAccount946763] FOREIGN KEY([roleId])
REFERENCES [dbo].[Role] ([roleId])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FKAccount946763]
GO
ALTER TABLE [dbo].[Application]  WITH CHECK ADD  CONSTRAINT [FK_Application_ResolvedBy_Account] FOREIGN KEY([resolvedBy])
REFERENCES [dbo].[Account] ([accountId])
GO
ALTER TABLE [dbo].[Application] CHECK CONSTRAINT [FK_Application_ResolvedBy_Account]
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
ALTER TABLE [dbo].[AttendanceRecords]  WITH CHECK ADD  CONSTRAINT [FKAttendance248059] FOREIGN KEY([employeeId])
REFERENCES [dbo].[Employee] ([employeeId])
GO
ALTER TABLE [dbo].[AttendanceRecords] CHECK CONSTRAINT [FKAttendance248059]
GO
ALTER TABLE [dbo].[CartCosmeticProduct]  WITH CHECK ADD  CONSTRAINT [FKCartCosmet861510] FOREIGN KEY([customerId])
REFERENCES [dbo].[Customer] ([customerId])
GO
ALTER TABLE [dbo].[CartCosmeticProduct] CHECK CONSTRAINT [FKCartCosmet861510]
GO
ALTER TABLE [dbo].[CartCosmeticProduct]  WITH CHECK ADD  CONSTRAINT [FKCartCosmet941400] FOREIGN KEY([productId])
REFERENCES [dbo].[CosmeticProduct] ([productId])
GO
ALTER TABLE [dbo].[CartCosmeticProduct] CHECK CONSTRAINT [FKCartCosmet941400]
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
ALTER TABLE [dbo].[CosmeticTransaction]  WITH CHECK ADD  CONSTRAINT [FKCosmeticTr963293] FOREIGN KEY([orderId])
REFERENCES [dbo].[Order] ([orderId])
GO
ALTER TABLE [dbo].[CosmeticTransaction] CHECK CONSTRAINT [FKCosmeticTr963293]
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
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FKFeedback524908] FOREIGN KEY([appointmentId])
REFERENCES [dbo].[Appointment] ([appointmentId])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FKFeedback524908]
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
USE [master]
GO
ALTER DATABASE [spaservice] SET  READ_WRITE 
GO
