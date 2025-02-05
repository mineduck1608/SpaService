using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repositories.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    categoryId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    categoryName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    categoryImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryDescription = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__23CAF1D8A4D253FF", x => x.categoryId);
                });

            migrationBuilder.CreateTable(
                name: "Commission",
                columns: table => new
                {
                    commissionId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    percentage = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Commissi__6A570BF27C360413", x => x.commissionId);
                });

            migrationBuilder.CreateTable(
                name: "Membership",
                columns: table => new
                {
                    membershipId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    discount = table.Column<int>(type: "int", nullable: false),
                    TotalPayment = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Membersh__86AA3B17022CD897", x => x.membershipId);
                });

            migrationBuilder.CreateTable(
                name: "Promotion",
                columns: table => new
                {
                    promotionId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    discountValue = table.Column<float>(type: "real", nullable: false),
                    promotionCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    promotionName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Promotio__99EB696E44B49C9D", x => x.promotionId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    roleId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    roleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Role__CD98462A7CAD45DD", x => x.roleId);
                });

            migrationBuilder.CreateTable(
                name: "SpaService",
                columns: table => new
                {
                    serviceId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    serviceName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    price = table.Column<float>(type: "real", nullable: false),
                    duration = table.Column<TimeOnly>(type: "time", nullable: false),
                    description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    serviceImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SpaServi__455070DFB8D54B16", x => x.serviceId);
                    table.ForeignKey(
                        name: "FKSpaService221665",
                        column: x => x.categoryId,
                        principalTable: "Category",
                        principalColumn: "categoryId");
                });

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    accountId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    roleId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Account__F267251EDC136022", x => x.accountId);
                    table.ForeignKey(
                        name: "FKAccount946763",
                        column: x => x.roleId,
                        principalTable: "Role",
                        principalColumn: "roleId");
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    customerId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    accountId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    fullName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    gender = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    phone = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    dateOfBirth = table.Column<DateTime>(type: "datetime", nullable: false),
                    membershipId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__B611CB7DD123CF42", x => x.customerId);
                    table.ForeignKey(
                        name: "FKCustomer595641",
                        column: x => x.membershipId,
                        principalTable: "Membership",
                        principalColumn: "membershipId");
                    table.ForeignKey(
                        name: "FKCustomer62882",
                        column: x => x.accountId,
                        principalTable: "Account",
                        principalColumn: "accountId");
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    employeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    fullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    position = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    hireDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    status = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    accountId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Phone = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__C134C9C148E32653", x => x.employeeId);
                    table.ForeignKey(
                        name: "FKEmployee613705",
                        column: x => x.accountId,
                        principalTable: "Account",
                        principalColumn: "accountId");
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    feedbackId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    feedbackMessage = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    rating = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    createdBy = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    serviceId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Feedback__2613FD2480E83971", x => x.feedbackId);
                    table.ForeignKey(
                        name: "FKFeedback300803",
                        column: x => x.serviceId,
                        principalTable: "SpaService",
                        principalColumn: "serviceId");
                    table.ForeignKey(
                        name: "FKFeedback851355",
                        column: x => x.createdBy,
                        principalTable: "Customer",
                        principalColumn: "customerId");
                });

            migrationBuilder.CreateTable(
                name: "Request",
                columns: table => new
                {
                    requestId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    startTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    endTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    status = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    customerNote = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    managerNote = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    serviceId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    customerId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Request__E3C5DE31F2E1788E", x => x.requestId);
                    table.ForeignKey(
                        name: "FKRequest464370",
                        column: x => x.serviceId,
                        principalTable: "SpaService",
                        principalColumn: "serviceId");
                    table.ForeignKey(
                        name: "FKRequest796587",
                        column: x => x.customerId,
                        principalTable: "Customer",
                        principalColumn: "customerId");
                });

            migrationBuilder.CreateTable(
                name: "CategoryEmployee",
                columns: table => new
                {
                    categoryId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    employeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__2FD9BD442CF73D8A", x => new { x.categoryId, x.employeeId });
                    table.ForeignKey(
                        name: "FKCategoryEm127434",
                        column: x => x.employeeId,
                        principalTable: "Employee",
                        principalColumn: "employeeId");
                    table.ForeignKey(
                        name: "FKCategoryEm89344",
                        column: x => x.categoryId,
                        principalTable: "Category",
                        principalColumn: "categoryId");
                });

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    scheduleId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    startTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    endTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    checkInTime = table.Column<DateTime>(type: "datetime", nullable: true, comment: "null if hasn't checked in"),
                    checkOutTime = table.Column<DateTime>(type: "datetime", nullable: true, comment: "null if hasn't checked out"),
                    status = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    employeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Schedule__A532EDD49C495185", x => x.scheduleId);
                    table.ForeignKey(
                        name: "FKSchedule904727",
                        column: x => x.employeeId,
                        principalTable: "Employee",
                        principalColumn: "employeeId");
                });

            migrationBuilder.CreateTable(
                name: "Appointment",
                columns: table => new
                {
                    appointmentId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    status = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    requestId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    employeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Appointm__D06765FEFE7307EE", x => x.appointmentId);
                    table.ForeignKey(
                        name: "FKAppointmen118448",
                        column: x => x.requestId,
                        principalTable: "Request",
                        principalColumn: "requestId");
                    table.ForeignKey(
                        name: "FKAppointmen55642",
                        column: x => x.employeeId,
                        principalTable: "Employee",
                        principalColumn: "employeeId");
                });

            migrationBuilder.CreateTable(
                name: "Transaction",
                columns: table => new
                {
                    transactionId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    transactionType = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    totalPrice = table.Column<float>(type: "real", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    appointmentId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    promotionId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    membershipId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Transact__9B57CF725A7D221F", x => x.transactionId);
                    table.ForeignKey(
                        name: "FKTransactio520442",
                        column: x => x.appointmentId,
                        principalTable: "Appointment",
                        principalColumn: "appointmentId");
                    table.ForeignKey(
                        name: "FKTransactio702984",
                        column: x => x.membershipId,
                        principalTable: "Membership",
                        principalColumn: "membershipId");
                    table.ForeignKey(
                        name: "FKTransactio965842",
                        column: x => x.promotionId,
                        principalTable: "Promotion",
                        principalColumn: "promotionId");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeCommission",
                columns: table => new
                {
                    employeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    commissionId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    transactionId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    commissionValue = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__840AEEB11E590AF8", x => new { x.employeeId, x.commissionId, x.transactionId });
                    table.ForeignKey(
                        name: "FKEmployeeCo384416",
                        column: x => x.employeeId,
                        principalTable: "Employee",
                        principalColumn: "employeeId");
                    table.ForeignKey(
                        name: "FKEmployeeCo818088",
                        column: x => x.commissionId,
                        principalTable: "Commission",
                        principalColumn: "commissionId");
                    table.ForeignKey(
                        name: "FKEmployeeCo831824",
                        column: x => x.transactionId,
                        principalTable: "Transaction",
                        principalColumn: "transactionId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_roleId",
                table: "Account",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "UQ__Account__F3DBC572F6F4CF80",
                table: "Account",
                column: "username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_employeeId",
                table: "Appointment",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_requestId",
                table: "Appointment",
                column: "requestId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryEmployee_employeeId",
                table: "CategoryEmployee",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Customer_accountId",
                table: "Customer",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Customer_membershipId",
                table: "Customer",
                column: "membershipId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_accountId",
                table: "Employee",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCommission_commissionId",
                table: "EmployeeCommission",
                column: "commissionId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCommission_transactionId",
                table: "EmployeeCommission",
                column: "transactionId");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_createdBy",
                table: "Feedback",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_serviceId",
                table: "Feedback",
                column: "serviceId");

            migrationBuilder.CreateIndex(
                name: "UQ__Promotio__E9685770FFA5DACE",
                table: "Promotion",
                column: "promotionCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Request_customerId",
                table: "Request",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_Request_serviceId",
                table: "Request",
                column: "serviceId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_employeeId",
                table: "Schedule",
                column: "employeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SpaService_categoryId",
                table: "SpaService",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_appointmentId",
                table: "Transaction",
                column: "appointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_membershipId",
                table: "Transaction",
                column: "membershipId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_promotionId",
                table: "Transaction",
                column: "promotionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryEmployee");

            migrationBuilder.DropTable(
                name: "EmployeeCommission");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.DropTable(
                name: "Commission");

            migrationBuilder.DropTable(
                name: "Transaction");

            migrationBuilder.DropTable(
                name: "Appointment");

            migrationBuilder.DropTable(
                name: "Promotion");

            migrationBuilder.DropTable(
                name: "Request");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "SpaService");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Membership");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
