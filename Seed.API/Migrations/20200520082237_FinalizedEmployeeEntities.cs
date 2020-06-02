using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.API.Migrations
{
    public partial class FinalizedEmployeeEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "Employees");
        }
    }
}
