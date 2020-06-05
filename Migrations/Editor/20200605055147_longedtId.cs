using Microsoft.EntityFrameworkCore.Migrations;

namespace DBProject.Migrations.Editor
{
    public partial class longedtId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "EditorId",
                table: "Editor",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "CertId",
                table: "Editor",
                nullable: false,
                computedColumnSql: "10000 + [JournalistId]",
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "CertId",
                table: "Editor",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldComputedColumnSql: "10000 + [JournalistId]");

            migrationBuilder.AlterColumn<int>(
                name: "EditorId",
                table: "Editor",
                type: "int",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");
        }
    }
}
