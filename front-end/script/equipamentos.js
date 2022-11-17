var url = 'http://localhost:3000/';

function cadastrarEquipamento() {
    let body =
    {
        'Numero': document.getElementById('numero').value,
    };

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
            console.log(output)
            alert('Cadastro efetuado! :D')
        })
        .catch((error) => {
            console.log(error)
            alert('Não foi possível efetuar o cadastro! :(')
        })

        document.getElementById('numero').value=''; // Limpa o campo
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