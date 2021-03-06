﻿// <auto-generated />
using DBProject.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DBProject.Migrations
{
    [DbContext(typeof(JournalistContext))]
    partial class JournalistContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DBProject.Models.Journalist", b =>
                {
                    b.Property<long>("JournalistId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Age")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Banished")
                        .HasColumnType("bit");

                    b.Property<long>("CertId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasComputedColumnSql("10000 + [JournalistId]");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("Intro")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phonenumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("JournalistId");

                    b.ToTable("Journalists");
                });
#pragma warning restore 612, 618
        }
    }
}
