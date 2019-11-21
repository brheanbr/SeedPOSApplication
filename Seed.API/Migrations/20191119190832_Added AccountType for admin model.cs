using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.API.Migrations
{
    public partial class AddedAccountTypeforadminmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountType",
                table: "Admin",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountType",
                table: "Admin");
        }
    }
}
