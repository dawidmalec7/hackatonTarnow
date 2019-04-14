using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace hackhathonTarnow.Migrations
{
    public partial class parking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parkings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    NumberOfPlaces = table.Column<int>(nullable: false),
                    NumberOfFreePlaces = table.Column<int>(nullable: false),
                    NumberOfFreeCarsPlaces = table.Column<int>(nullable: false),
                    NumberOfFreeDisabledPlaces = table.Column<int>(nullable: false),
                    NumberOfFreeCyclesPlaces = table.Column<int>(nullable: false),
                    Longtitude = table.Column<float>(nullable: false),
                    Latitude = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parkings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parkings");
        }
    }
}
