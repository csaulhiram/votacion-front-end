fetch('http://localhost:8080/estudiante/estudiantesSinVoto')
    .then(res => res.json())
    .then(data => {
        mostrarEstudiantes(data)
    })

function mostrarEstudiantes(data) {
    let tbody = document.getElementById("table-body");

    for (let i = 0; i < data.length; i++) {

        let filas = document.createElement('tr');

        let columna1 = document.createElement('td');
        columna1.innerHTML = data[i].cta;

        let columna2 = document.createElement('td');
        columna2.innerHTML = data[i].usuarioObjeto_estudiante.nombres + ' ' + data[i].usuarioObjeto_estudiante.apellidos;

        let columna3 = document.createElement('td');
        columna3.innerHTML = data[i].carrera;

        filas.appendChild(columna1);
        filas.appendChild(columna2);
        filas.appendChild(columna3);

        tbody.appendChild(filas);

    }
}