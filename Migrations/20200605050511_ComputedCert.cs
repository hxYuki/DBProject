﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace DBProject.Migrations
{
    public partial class ComputedCert : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "CertId",
                table: "Journalists",
                nullable: false,
                computedColumnSql: "10000 + [JournalistId]",
                oldClrType: typeof(long),
                oldType: "bigint",
                oldComputedColumnSql: "10000 + ', ' + [JournalistId]");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "CertId",
                table: "Journalists",
                type: "bigint",
                nullable: false,
                computedColumnSql: "10000 + ', ' + [JournalistId]",
                oldClrType: typeof(long),
                oldComputedColumnSql: "10000 + [JournalistId]");
        }
    }
}
