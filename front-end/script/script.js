// https://localhost:7150/planos

var url = 'http://localhost:3000/';



function cadastrarPlano() {
	//validacao de alguns dos inputs

	if (!validaDescricao('descricao')) {
		return
	}


	//construcao do json que vai no body da criacao de usuario	

	let body =
	{
		'Descricao': document.getElementById('descricao').value,
	};

	//envio da requisicao usando a FETCH API

	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "cadastrar/planos",
		{
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(body)
		})
		//checa se requisicao deu certo
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		//trata resposta
		.then((output) => {
			console.log(output)
			alert('Cadastro efetuado! :D')
		})
		//trata erro
		.catch((error) => {
			console.log(error)
			alert('Não foi possível efetuar o cadastro! :(')
		})
}

function atualizarPlano(id, divDescricao) {
	let body =
	{
		'Descricao': divDescricao.value,
	}

	fetch(url + "atualizar/plano/" + id,
		{
			'method': 'PUT',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(body)
		})
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		.then((output) => {
			listarPlanos()
			console.log(output)
			alert('Usuário atualizado! \\o/')
		})
		.catch((error) => {
			console.log(error)
			alert('Não foi possível atualizar o usuário :/')
		})
}




function listarPlanos() {
	//da um GET no endpoint "usuarios"
	fetch(url + 'planos')
		.then(response => response.json())
		.then((usuarios) => {
			//pega div que vai conter a lista de usuarios
			let listaUsuarios = document.getElementById('lista-planos')

			//limpa div
			while (listaUsuarios.firstChild) {
				listaUsuarios.removeChild(listaUsuarios.firstChild)
			}

			//preenche div com usuarios recebidos do GET
			for (let usuario of usuarios) {
				//cria div para as informacoes de um usuario
				let divUsuario = document.createElement('div')
				divUsuario.setAttribute('class', 'form')

				//pega o nome do usuario
				let divDescricao = document.createElement('input')
				divDescricao.placeholder = 'Descricao'
				divDescricao.value = usuario.descricao
				divUsuario.appendChild(divDescricao)


				// //cria o botao para remover o usuario
				let btnRemover = document.createElement('button')
				btnRemover.innerHTML = 'Remover'
				btnRemover.onclick = u => remover(usuario.id)
				btnRemover.style.marginRight = '5px'

				// //cria o botao para atualizar o usuario
				let btnAtualizar = document.createElement('button')
				btnAtualizar.innerHTML = 'Atualizar'
				btnAtualizar.onclick = u => atualizarPlano(usuario.id, divDescricao)
				btnAtualizar.style.marginLeft = '5px'

				// //cria a div com os dois botoes
				let divBotoes = document.createElement('div')
				divBotoes.style.display = 'flex'
				divBotoes.appendChild(btnRemover)
				divBotoes.appendChild(btnAtualizar)
				divUsuario.appendChild(divBotoes)

				//insere a div do usuario na div com a lista de usuarios
				listaUsuarios.appendChild(divUsuario)
			}
		})

}

function remover(id) {
	fetch(url + 'deletar/plano/' + id,
		{
			'method': 'DELETE',
			'redirect': 'follow'
		})
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		.then((output) => {
			listarPlanos()
			console.log(output)
			alert('Usuário removido! >=]')
		})
		.catch((error) => {
			console.log(error)
			alert('Não foi possível remover o usuário :/')
		})
}

function cadastrarEquipamento() {
	//construcao do json que vai no body da criacao de usuario	

	let body =
	{
		'Numero': document.getElementById('numero').value,
	};

	//envio da requisicao usando a FETCH API

	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "cadastrar/equipamento",
		{
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(body)
		})
		//checa se requisicao deu certo
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		//trata resposta
		.then((output) => {
			console.log(output)
			alert('Cadastro efetuado! :D')
		})
		//trata erro
		.catch((error) => {
			console.log(error)
			alert('Não foi possível efetuar o cadastro! :(')
		})
}

function listarEquip() {

	fetch(url + 'equipamentos')
		.then(response => response.json())
		.then((equipamentos) => {
			let listaEquipamentos = document.getElementById('lista-equipamento')

			while (listaEquipamentos.firstChild) {
				listaEquipamentos.removeChild(listaEquipamentos.firstChild)
			}

			for (let equipamento of equipamentos) {
				let divEquipamento = document.createElement('div')
				divEquipamento.setAttribute('class', 'form')

				let divNumero = document.createElement('input')
				divNumero.placeholder = 'Numero'
				divNumero.value = equipamento.numero
				divEquipamento.appendChild(divNumero)

				let btnRemover = document.createElement('button')
				btnRemover.innerHTML = 'Remover'
				btnRemover.onclick = u => removerEquipamentos(equipamento.id)
				btnRemover.style.marginRight = '5px'

				let btnAtualizar = document.createElement('button')
				btnAtualizar.innerHTML = 'Atualizar'
				btnAtualizar.onclick = u => atualizarEquipamento(equipamento.id, divNumero)
				btnAtualizar.style.marginLeft = '5px'

				let divBotoes = document.createElement('div')
				divBotoes.style.display = 'flex'
				divBotoes.appendChild(btnRemover)
				divBotoes.appendChild(btnAtualizar)
				divEquipamento.appendChild(divBotoes)

				listaEquipamentos.appendChild(divEquipamento)
			}

		})

}

function removerEquipamentos(id) {
	fetch(url + 'deletar/' + id,
		{
			'method': 'DELETE',
			'redirect': 'follow'
		})
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		.then((output) => {
			listarEquip()
			console.log(output)
			alert('Plano removido! >=]')
		})
		.catch((error) => {
			console.log(error)
			alert('Não foi possível remover Equipamento:/')
		})
}


function atualizarEquipamento(id, divNumero) {
	let body =
	{
		'Numero': divNumero.value,
	}

	fetch(url + "atualizar/" + id,
		{
			'method': 'PUT',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(body)
		})
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		.then((output) => {
			listarEquip()
			console.log(output)
			alert('Plano atualizado!')
		})
		.catch((error) => {
			console.log(error)
			alert('Não foi possível atualizar o plano!')
		})
}








function validaDescricao(id) {
	let divNome = document.getElementById('descricao')
	if (divNome.value.trim().length >= 2) {
		divNome.style.border = 'solid 1px black'
		return true
	}
	else {
		divNome.style.border = 'solid 1px red'
		return false
	}
}


function cadastrarOrdem() {
	//construcao do json que vai no body da criacao de usuario	

	let body =
	{
		'idplano': document.getElementById('idplano').value,
		'idequipamento': document.getElementById('idequipamento').value,

		'descricao': document.getElementById('ordemdescricao').value,
	};

	//envio da requisicao usando a FETCH API

	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "criar/ordem",
		{
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(body)
		})
		//checa se requisicao deu certo
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		//trata resposta
		.then((output) => {
			if (output == "Equipamento Invalido!") {
				alert('Equipamento Invalido!')
			}
			if (output == "Plano Invalido!") {
				alert('Plano Invalido!')
			}
			if (output == "Ordem Criada!") {
				alert('Ordem de Serviço criada!')
			}
			console.log(output)
		})
		//trata erro
		.catch((error) => {
			console.log(error)
			// alert('Não foi possível criar a ordem!')
		})
}


function listarOrdem() {

	let idOrdem = document.getElementById('idOrdem').value

	//da um GET no endpoint "usuarios"
	fetch(url + 'ordem/equipamento/' + idOrdem)

		.then(response => response.json())
		.then((ordens) => {
			let listaOrdem = document.getElementById('lista-ordem')

			while (listaOrdem.firstChild) {
				listaOrdem.removeChild(listaOrdem.firstChild)
			}

			for (let ordem of ordens) {
				let divOrdem = document.createElement('div')
				divOrdem.style.margin = '5px'
				divOrdem.style.padding = '5px'
				divOrdem.style.backgroundColor = '#f0f0f0'


				let divDescricao = document.createElement('div')
				divDescricao.innerHTML = 'Descricao: ' + ordem.descricao
				divOrdem.appendChild(divDescricao)

				let divEquipamento = document.createElement('div')
				divEquipamento.innerHTML = 'Equipamento: ' + ordem.idequipamento
				divOrdem.appendChild(divEquipamento)

				let divPlano = document.createElement('div')
				divPlano.innerHTML = 'Plano: ' + ordem.idplano
				divOrdem.appendChild(divPlano)

				listaOrdem.appendChild(divOrdem)
			}
		})
}

