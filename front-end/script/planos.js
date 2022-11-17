var url = 'http://localhost:3000/';

function cadastrarPlano() {
    let body =
    {
        'Descricao': document.getElementById('descricao').value,
    };

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

        document.getElementById('descricao').value=''; // Limpa o campo
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
    fetch(url + 'planos')
        .then(response => response.json())
        .then((usuarios) => {
            let listaUsuarios = document.getElementById('lista-planos')

            while (listaUsuarios.firstChild) {
                listaUsuarios.removeChild(listaUsuarios.firstChild)
            }

            for (let usuario of usuarios) {
                let divUsuario = document.createElement('div')
                divUsuario.setAttribute('class', 'form')

                let divDescricao = document.createElement('input')
                divDescricao.placeholder = 'Descricao'
                divDescricao.value = usuario.descricao
                divUsuario.appendChild(divDescricao)

                let btnRemover = document.createElement('button')
                btnRemover.innerHTML = 'Remover'
                btnRemover.onclick = u => removerPlano(usuario.id)
                btnRemover.style.marginRight = '5px'

                let btnAtualizar = document.createElement('button')
                btnAtualizar.innerHTML = 'Atualizar'
                btnAtualizar.onclick = u => atualizarPlano(usuario.id, divDescricao)
                btnAtualizar.style.marginLeft = '5px'

                let divBotoes = document.createElement('div')
                divBotoes.style.display = 'flex'
                divBotoes.appendChild(btnRemover)
                divBotoes.appendChild(btnAtualizar)
                divUsuario.appendChild(divBotoes)

                listaUsuarios.appendChild(divUsuario)
            }
        })



}

function removerPlano(id) {
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