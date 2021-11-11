using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace webAPI.Migrations
{
    public partial class updateUserstbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn("Password", "users");
            migrationBuilder.AddColumn<byte[]>(
                name: "Password",
                table: "users",
                nullable: false,
                defaultValue:"lio"
                //oldClrType: typeof(string),
                //oldType: "nvarchar(max)"
                );

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordKey",
                table: "users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordKey",
                table: "users");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(byte[]));
        }
    }
}
