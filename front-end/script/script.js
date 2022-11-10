// https://localhost:7150/planos

var url = 'http://localhost:3000/planos';

function listar()
{
	fetch(url )
	.then(response => response.json())
    .then(data => {
        let divUsuario = document.getElementById('divUsuario');

        console.log(data);

        data.forEach(element => {
            let p = document.createElement('p');
            p.innerHTML = element.descricao;
            divUsuario.appendChild(p);
        }
        );
    })
}

