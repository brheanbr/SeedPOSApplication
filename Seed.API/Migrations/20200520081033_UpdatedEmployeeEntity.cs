using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.API.Migrations
{
    public partial class UpdatedEmployeeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Employees");
        }
    }
}
