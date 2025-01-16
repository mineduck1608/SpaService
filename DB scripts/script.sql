CREATE TABLE Account (
  accountId varchar(50) NOT NULL, 
  username  varchar(50) NOT NULL UNIQUE, 
  password  nvarchar(max) NOT NULL, 
  status    bit NOT NULL, 
  createdAt datetime NOT NULL, 
  roleId    varchar(50) NOT NULL, 
  PRIMARY KEY (accountId));
CREATE TABLE Appointment (
  appointmentId varchar(50) NOT NULL, 
  status        varchar(10) NOT NULL, 
  requestId     varchar(50) NOT NULL, 
  employeeId    varchar(50) NOT NULL, 
  PRIMARY KEY (appointmentId));
CREATE TABLE Category (
  categoryId          varchar(50) NOT NULL, 
  categoryName        varchar(50) NOT NULL, 
  categoryImage       nvarchar(max) NOT NULL, 
  categoryDescription nvarchar(255) NOT NULL, 
  PRIMARY KEY (categoryId));
CREATE TABLE CategoryEmployee (
  categoryId varchar(50) NOT NULL, 
  employeeId varchar(50) NOT NULL, 
  PRIMARY KEY (categoryId, 
  employeeId));
CREATE TABLE Commission (
  commissionId varchar(50) NOT NULL, 
  percentage   int NOT NULL, 
  PRIMARY KEY (commissionId), 
  CONSTRAINT VALID_PERCENTAGE 
    CHECK (percentage >0 AND percentage <= 100));
CREATE TABLE Customer (
  customerId   varchar(50) NOT NULL, 
  accountId    varchar(50) NOT NULL, 
  fullName     nvarchar(255) NOT NULL, 
  gender       varchar(10) NOT NULL, 
  phone        varchar(10) NOT NULL, 
  email        nvarchar(100) NOT NULL, 
  dateOfBirth  datetime NOT NULL, 
  membershipId varchar(50) NULL, 
  PRIMARY KEY (customerId));
CREATE TABLE Employee (
  employeeId varchar(50) NOT NULL, 
  fullName   nvarchar(50) NOT NULL, 
  position   varchar(50) NOT NULL, 
  hireDate   date NOT NULL, 
  status     varchar(50) NOT NULL, 
  image      nvarchar(max) NOT NULL, 
  accountId  varchar(50) NOT NULL, 
  PRIMARY KEY (employeeId));
CREATE TABLE EmployeeCommission (
  employeeId      varchar(50) NOT NULL, 
  commissionId    varchar(50) NOT NULL, 
  transactionId   varchar(50) NOT NULL, 
  commissionValue float(10) NOT NULL, 
  PRIMARY KEY (employeeId, 
  commissionId, 
  transactionId));
CREATE TABLE Feedback (
  feedbackId      varchar(50) NOT NULL, 
  feedbackMessage nvarchar(255) NOT NULL, 
  rating          int NOT NULL, 
  createdAt       datetime NOT NULL, 
  createdBy       varchar(50) NOT NULL, 
  serviceId       varchar(50) NOT NULL, 
  PRIMARY KEY (feedbackId));
CREATE TABLE Membership (
  membershipId varchar(50) NOT NULL, 
  type         varchar(50) NOT NULL, 
  min          float(10) NOT NULL, 
  max          float(10) NOT NULL, 
  discount     int NOT NULL, 
  PRIMARY KEY (membershipId));
CREATE TABLE Promotion (
  promotionId   varchar(50) NOT NULL, 
  discountValue float(10) NOT NULL, 
  promotionCode varchar(50) NOT NULL UNIQUE, 
  promotionName varchar(50) NOT NULL, 
  isActive      bit NOT NULL, 
  PRIMARY KEY (promotionId));
CREATE TABLE Request (
  requestId    varchar(50) NOT NULL, 
  startTime    datetime NOT NULL, 
  endTime      datetime NOT NULL, 
  status       varchar(10) NOT NULL, 
  customerNote nvarchar(255) NULL, 
  managerNote  nvarchar(255) NULL, 
  serviceId    varchar(50) NOT NULL, 
  customerId   varchar(50) NOT NULL, 
  PRIMARY KEY (requestId));
CREATE TABLE Role (
  roleId   varchar(50) NOT NULL, 
  roleName nvarchar(50) NOT NULL, 
  PRIMARY KEY (roleId));
CREATE TABLE Schedule (
  scheduleId   varchar(50) NOT NULL, 
  startTime    datetime NOT NULL, 
  endTime      datetime NOT NULL, 
  checkInTime  datetime NULL, 
  checkOutTime datetime NULL, 
  status       varchar(50) NOT NULL, 
  employeeId   varchar(50) NOT NULL, 
  PRIMARY KEY (scheduleId));
EXEC sp_addextendedproperty 
  @NAME = N'MS_Description', @VALUE = N'null if hasn''t checked in', 
  @LEVEL0TYPE = N'Schema', @LEVEL0NAME = N'dbo', 
  @LEVEL1TYPE = N'Table', @LEVEL1NAME = N'Schedule', 
  @LEVEL2TYPE = N'Column', @LEVEL2NAME = N'checkInTime';
EXEC sp_addextendedproperty 
  @NAME = N'MS_Description', @VALUE = N'null if hasn''t checked out', 
  @LEVEL0TYPE = N'Schema', @LEVEL0NAME = N'dbo', 
  @LEVEL1TYPE = N'Table', @LEVEL1NAME = N'Schedule', 
  @LEVEL2TYPE = N'Column', @LEVEL2NAME = N'checkOutTime';
CREATE TABLE SpaService (
  serviceId    varchar(50) NOT NULL, 
  serviceName  varchar(50) NOT NULL, 
  price        float(10) NOT NULL, 
  duration     time(7) NOT NULL, 
  description  nvarchar(255) NOT NULL, 
  serviceImage nvarchar(max) NOT NULL, 
  categoryId   varchar(50) NOT NULL, 
  PRIMARY KEY (serviceId));
CREATE TABLE [Transaction] (
  transactionId   varchar(50) NOT NULL, 
  transactionType varchar(10) NOT NULL, 
  totalPrice      float(10) NOT NULL, 
  status          bit NOT NULL, 
  appointmentId   varchar(50) NULL, 
  promotionId     varchar(50) NULL, 
  membershipId    varchar(50) NULL, 
  PRIMARY KEY (transactionId));
ALTER TABLE Account ADD CONSTRAINT FKAccount946763 FOREIGN KEY (roleId) REFERENCES Role (roleId);
ALTER TABLE Customer ADD CONSTRAINT FKCustomer62882 FOREIGN KEY (accountId) REFERENCES Account (accountId);
ALTER TABLE Employee ADD CONSTRAINT FKEmployee613705 FOREIGN KEY (accountId) REFERENCES Account (accountId);
ALTER TABLE Customer ADD CONSTRAINT FKCustomer595641 FOREIGN KEY (membershipId) REFERENCES Membership (membershipId);
ALTER TABLE CategoryEmployee ADD CONSTRAINT FKCategoryEm89344 FOREIGN KEY (categoryId) REFERENCES Category (categoryId);
ALTER TABLE CategoryEmployee ADD CONSTRAINT FKCategoryEm127434 FOREIGN KEY (employeeId) REFERENCES Employee (employeeId);
ALTER TABLE SpaService ADD CONSTRAINT FKSpaService221665 FOREIGN KEY (categoryId) REFERENCES Category (categoryId);
ALTER TABLE Request ADD CONSTRAINT FKRequest464370 FOREIGN KEY (serviceId) REFERENCES SpaService (serviceId);
ALTER TABLE Schedule ADD CONSTRAINT FKSchedule904727 FOREIGN KEY (employeeId) REFERENCES Employee (employeeId);
ALTER TABLE Appointment ADD CONSTRAINT FKAppointmen118448 FOREIGN KEY (requestId) REFERENCES Request (requestId);
ALTER TABLE Feedback ADD CONSTRAINT FKFeedback851355 FOREIGN KEY (createdBy) REFERENCES Customer (customerId);
ALTER TABLE Feedback ADD CONSTRAINT FKFeedback300803 FOREIGN KEY (serviceId) REFERENCES SpaService (serviceId);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio520442 FOREIGN KEY (appointmentId) REFERENCES Appointment (appointmentId);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio965842 FOREIGN KEY (promotionId) REFERENCES Promotion (promotionId);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio702984 FOREIGN KEY (membershipId) REFERENCES Membership (membershipId);
ALTER TABLE EmployeeCommission ADD CONSTRAINT FKEmployeeCo384416 FOREIGN KEY (employeeId) REFERENCES Employee (employeeId);
ALTER TABLE EmployeeCommission ADD CONSTRAINT FKEmployeeCo818088 FOREIGN KEY (commissionId) REFERENCES Commission (commissionId);
ALTER TABLE EmployeeCommission ADD CONSTRAINT FKEmployeeCo831824 FOREIGN KEY (transactionId) REFERENCES [Transaction] (transactionId);
ALTER TABLE Request ADD CONSTRAINT FKRequest796587 FOREIGN KEY (customerId) REFERENCES Customer (customerId);
ALTER TABLE Appointment ADD CONSTRAINT FKAppointmen55642 FOREIGN KEY (employeeId) REFERENCES Employee (employeeId);
