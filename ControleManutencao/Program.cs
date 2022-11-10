using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;



namespace ControleManutencao
{
// Equipamento 
//Dados basico ID Unico & Numero do tipo Inteiro
	class Equipamento
    {
        public int id {get; set; }
        public int numero {get; set; }
    }

///Plano de manutenção
//Id do tipo unico e descrição do tipo String
	class Plano
    {
        public int id {get; set; }
        public string? descricao {get; set; }
    }

//classe ordem
//Id unico, mais id do plano e id do equipamento, tambem 
    class Ordem
    {
        public int id {get; set; }
        public int idplano {get; set; }
        public int idequipamento{get; set; }
        public int descricao{get; set; }
    }

   	// Criação da base de dados
    class BaseManutencao : DbContext
    {
        public BaseManutencao(DbContextOptions options) : base(options)
        {

        }
		//Criação das tabelas no banco de dados Manutenção
        public DbSet<Equipamento> Equipamentos { get; set; } = null!;
		public DbSet<Plano> Planos { get; set; } = null!;
        public DbSet<Ordem> Ordem { get; set; } = null!;
	}

	
	class Program
	{
		static void Main(string[] args)
		{	
			// biblioteca SQLite
			var builder = WebApplication.CreateBuilder(args);
			var connectionString = builder.Configuration.GetConnectionString("Manutencao") ?? "Data Source=Manutencao.db";
			builder.Services.AddSqlite<BaseManutencao>(connectionString);

            // swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new() { Title = "Trabalho", Version = "v1" });
                }
            );

			//adiciona politica permissiva de cross-origin ao builder
			builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
			var app = builder.Build();

			app.UseCors();
			

            //Cadastrar Plano
			app.MapPost("/cadastrar/planos", (BaseManutencao baseManutencao, Plano plano) =>
			{
				baseManutencao.Planos.Add(plano);
				baseManutencao.SaveChanges();
				return "Plano Cadastrado!";
			});

            //Alterar plano
            app.MapPost("/atualizar/plano/{id}", (BaseManutencao baseManutencao, Plano planoAtualizado, int id) =>
			{
				var plano = baseManutencao.Planos.Find(id);
				plano.descricao= planoAtualizado.descricao;
				baseManutencao.SaveChanges();
				return "Plano Atualizado";
			});

            //Deletar Plano
            app.MapPost("/deletar/plano/{id}", (BaseManutencao baseManutencao, int id) =>
			{
                //Plano.GetPlano(baseManutencao.Planos.id);
				var plano = baseManutencao.Planos.Find(id);
				baseManutencao.Remove(plano);
				baseManutencao.SaveChanges();
				return "Plano Deletado";
			});

            //listar Plano
			app.MapGet("/planos", (BaseManutencao baseManutencao) => {
				return baseManutencao.Planos.ToList();

				//lambida utiliza na linguagem os comandos "sql"
			});

            //Cadastrar equipamento
			app.MapPost("/cadastrar/equipamento", (BaseManutencao baseManutencao, Equipamento equipamento) =>
			{
				baseManutencao.Equipamentos.Add(equipamento);
				baseManutencao.SaveChanges();
				return "Equipamento Cadastrado";
			});
            //Alterar Equipamento VERIFICAR POIS TEM O MESMO EXTENSAO
            app.MapPost("/atualizar/{id}", (BaseManutencao baseManutencao, Equipamento equipamentoAtualizado, int id) =>
			{
				var equipamento = baseManutencao.Equipamentos.Find(id);
				equipamento.numero = equipamentoAtualizado.numero;
				baseManutencao.SaveChanges();
				return "Equipamento atualizado";
			});
            //Deletar Equipamento
            app.MapPost("/deletar/{id}", (BaseManutencao baseManutencao, int id) =>
			{
				var equipamento = baseManutencao.Equipamentos.Find(id);
				baseManutencao.Remove(equipamento);
				baseManutencao.SaveChanges();
				return "Equipamento Deletado";
			});

            //listar equipamentos
			app.MapGet("/equipamentos", (BaseManutencao baseManutencao) => {
				return baseManutencao.Equipamentos.ToList();
			});

			// Cadastrar Ordem
			app.MapPost("/criar/ordem", (BaseManutencao baseManutencao, Ordem ordem) =>
			{

			baseManutencao.Ordem.Add(ordem);

			// Verifica se o id equipemento inserido esta na base de equipamento, se for null
			// ele exibe uma mensagem
			if (baseManutencao.Equipamentos.Find(ordem.idequipamento) == null)
			{
				return "Equipamento Invalido!";
			}
			// Verifica se o id do Plano inserido esta na base de dados do plano, se for null
			// ele exibe uma mensagem
			if (baseManutencao.Planos.Find(ordem.idplano) == null)
			{
				return "Plano Invalido!";
			}

				baseManutencao.SaveChanges();
				return "Ordem Criada!";
			}
			);

			// Visualizar todas as ordens utilizando o ToList, ele busca toda a tabela, e exibe em uma lista
			app.MapGet("/ordem", (BaseManutencao baseManutencao) => {
			return baseManutencao.Ordem.ToList();
			});

			// Visualizar ordem com id, utiliando o Find, que busca o atributo especifico informado na URL dentro da tabela
			app.MapGet("/ordem/{id}", (BaseManutencao baseManutencao, int id) => {
				return baseManutencao.Ordem.Find(id);
			});

			// Visualizar ordens por equipamento
			app.MapGet("/ordem/equipamento/{idequipamento}", (BaseManutencao baseManutencao, int idequipamento) => {
			// trazer todas as ordens onde o equipamento na URL é igual o equipamento da tabela ordem
			return baseManutencao.Ordem.Where(s => s.idequipamento == idequipamento);
					
			});

			// Visualizar ordens por plano
			app.MapGet("/ordem/plano/{idplano}", (BaseManutencao baseManutencao, int idplano) => {
			// trazer todas as ordens onde o plano digitado na URL (idplano) é igual o idplano da tabela ordem
			return baseManutencao.Ordem.Where(s => s.idplano == idplano);
				
			});

			// referencia utilizada para usar Where
			// https://stackoverflow.com/questions/71936335/asp-net-minimal-api-find-by-usernamestring

			app.Run("http://localhost:3000");


        }
    }

}

        