using Microsoft.EntityFrameworkCore.Migrations;

namespace hackhathonTarnow.Migrations
{
    public partial class plates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsPremium",
                table: "Users",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<string>(
                name: "DefaultPlate",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultPlate",
                table: "Users");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPremium",
                table: "Users",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}
