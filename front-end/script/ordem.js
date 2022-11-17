var url = 'http://localhost:3000/';

function cadastrarOrdem() {
    let body =
    {
        'idplano': document.getElementById('idplano').value,
        'idequipamento': document.getElementById('idequipamento').value,

        'descricao': document.getElementById('ordemdescricao').value,
    };

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
        .catch((error) => {
            console.log(error)
            alert('Não foi possível criar a ordem!')
        })

    document.getElementById('idplano').value = ''
    document.getElementById('idequipamento').value = ''
    document.getElementById('ordemdescricao').value = ''
}


function listarOrdem() {

    let idOrdem = document.getElementById('idOrdem').value

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
                divOrdem.style.backgroundColor = '#f1eaeae2'


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

            if (ordens.length == 0) {
                alert('Nenhuma ordem encontrada!')
            }
        })
}