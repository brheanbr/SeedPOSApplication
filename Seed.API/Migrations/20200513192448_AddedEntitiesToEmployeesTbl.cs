using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.API.Migrations
{
    public partial class AddedEntitiesToEmployeesTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Employees",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateRegistered",
                table: "Employees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Employees",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CompanyId",
                table: "Employees",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Companies_CompanyId",
                table: "Employees",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Companies_CompanyId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_CompanyId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DateRegistered",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Employees");
        }
    }
}
