using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Admin.Repository.Migrations
{
    public partial class AdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AdminUsers",
                columns: new[] { "Id", "CreatedAt", "Password", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("d4e7eafa-57e3-4a8b-84e1-75f8b256c863"), new DateTime(2022, 2, 23, 17, 10, 5, 672, DateTimeKind.Local).AddTicks(3723), "lg2YcG/GVJleM/MIIWmdlk0m0HhB1OtSOWGe12Fbx8zZEL4VMvjqRt3LRYgI2rarwT+jrH+mREaJ65oV0+WqPwMpX74=", new DateTime(2022, 2, 23, 17, 10, 5, 672, DateTimeKind.Local).AddTicks(9866), "admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminUsers");
        }
    }
}
