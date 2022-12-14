// <auto-generated />
using ControleManutencao;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ControleManutencao.Migrations
{
    [DbContext(typeof(BaseManutencao))]
    [Migration("20220927051502_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("ControleManutencao.Equipamento", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("numero")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.ToTable("Equipamentos");
                });

            modelBuilder.Entity("ControleManutencao.Ordem", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("descricao")
                        .HasColumnType("INTEGER");

                    b.Property<int>("idequipamento")
                        .HasColumnType("INTEGER");

                    b.Property<int>("idplano")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.ToTable("Ordem");
                });

            modelBuilder.Entity("ControleManutencao.Plano", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("descricao")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Planos");
                });
#pragma warning restore 612, 618
        }
    }
}
