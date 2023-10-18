let planillas = [];

fetch('http://localhost:8080/planillas/obtenerPlanillas')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        mostrarPlanillasCards(data);
    })


function mostrarPlanillasCards(data) {
    let cardRow = document.getElementById("card-rows");

    for (let i = 0; i < data.length; i++) {

        let col = document.createElement('div');
        col.setAttribute("class", "col-4");
        cardRow.appendChild(col);

        let card = document.createElement('div');
        card.setAttribute("class", "card");
        col.appendChild(card);

        let cardBody = document.createElement('div');
        cardBody.setAttribute("class", "card-body");
        card.appendChild(cardBody);

        let title = document.createElement('h5');
        title.setAttribute("class", "card-title");
        title.innerHTML = 'Planilla: ' + data[i].nombre_planilla;
        cardBody.appendChild(title);

        
        let button = document.createElement('input');
        button.type = 'button';
        button.id_planilla = data[i].id_planilla;
        button.value = 'Votar';
        button.setAttribute("class", "btn btn-outline-success");
        cardBody.appendChild(button);

    }
}


$(function () {
    $(document).on('click', 'input[type="button"]', function (event) {

        let id_planilla = this.id_planilla;

        let data = new URLSearchParams({
            "id_planilla": id_planilla,
        });

        fetch('http://localhost:8080/planillas/votar', {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: data,
        })
        .then(resp => {
            modificarEstatusVoto();
        })



    });
});

function modificarEstatusVoto() {
    const cta =  localStorage.getItem("cta_estudiante");
    console.log(cta);
 
    let data = new URLSearchParams({
        "cta": cta,
    });

    fetch('http://localhost:8080/estudiante/estatus_voto',{
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body:data
    })
    .then(resp => {
        localStorage.clear();
        location.href="../obtenerPlanillas.html";
    })
}