using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace hackhathonTarnow.Migrations
{
    public partial class ChangeNameToSpaceType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spaces_Parkings_ParkingId",
                table: "Spaces");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Spaces");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Spaces");

            migrationBuilder.AddColumn<DateTime>(
                name: "ActivationDate",
                table: "Users",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ParkingId",
                table: "Spaces",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Spaces",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<string>(
                name: "SpaceType",
                table: "Spaces",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ParkingHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    ParkingId = table.Column<Guid>(nullable: false),
                    HowLong = table.Column<int>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingHistories", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Spaces_Parkings_ParkingId",
                table: "Spaces",
                column: "ParkingId",
                principalTable: "Parkings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spaces_Parkings_ParkingId",
                table: "Spaces");

            migrationBuilder.DropTable(
                name: "ParkingHistories");

            migrationBuilder.DropColumn(
                name: "ActivationDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SpaceType",
                table: "Spaces");

            migrationBuilder.AlterColumn<Guid>(
                name: "ParkingId",
                table: "Spaces",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Spaces",
                nullable: false,
                oldClrType: typeof(Guid))
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Spaces",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Spaces",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Spaces_Parkings_ParkingId",
                table: "Spaces",
                column: "ParkingId",
                principalTable: "Parkings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
