fetch('http://localhost:8080/planillas/obtenerPlanillas')
    .then(res => res.json())
    .then(data => {
        mostrarPlanillas(data);
    })


function mostrarPlanillas(data) {
    let tbody = document.getElementById("table-body");
    console.log(data);

    for (let i = 0; i < data.length; i++) {

        let filas = document.createElement('tr');

        let columna1 = document.createElement('td');
        columna1.innerHTML = data[i].estudianteRepresentante.cta;

        let columna2 = document.createElement('td');
        columna2.innerHTML = data[i].estudianteRepresentante.usuarioObjeto_estudiante.nombres + " " + data[i].estudianteRepresentante.usuarioObjeto_estudiante.apellidos;

        let columna3 = document.createElement('td');
        columna3.innerHTML = data[i].id_planilla;

        let columna4 = document.createElement('td');
        columna4.innerHTML = data[i].nombre_planilla;

        let columna5 = document.createElement('td');
        if (data[i].votos == null) {
            columna5.innerHTML = 0;
        } else {
            columna5.innerHTML = data[i].votos;
        }


        filas.appendChild(columna1);
        filas.appendChild(columna2);
        filas.appendChild(columna3);
        filas.appendChild(columna4);
        filas.appendChild(columna5);

        tbody.appendChild(filas)

    }
}