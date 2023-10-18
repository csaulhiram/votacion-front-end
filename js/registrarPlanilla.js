let formulario = document.getElementById('formulario-planilla');



fetch('http://localhost:8080/estudiante/obtenerEstudiantes')
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
        columna2.innerHTML = data[i].usuarioObjeto_estudiante.nombres + ' ' +  data[i].usuarioObjeto_estudiante.apellidos;

        let columna3 = document.createElement('td');
        columna3.innerHTML = data[i].usuarioObjeto_estudiante.perfil;

        filas.appendChild(columna1);
        filas.appendChild(columna2);
        filas.appendChild(columna3);

        tbody.appendChild(filas);

    }
}

// Obtener información del formulario y parsearla
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let datos = new FormData(formulario);
    const id_planilla = uuid.v4();
    const nombre_planilla = datos.get('nombre_planilla');
    const estudianteRepresentante = datos.get('estudiante_cta');

    // Parsear información
    let data = new URLSearchParams({
        "id_planilla": id_planilla,
        "nombre_planilla": nombre_planilla,
        "estudianteRepresentante": estudianteRepresentante
    });

    registrarPlanilla(data, estudianteRepresentante);
});

// Registro de la planilla
function registrarPlanilla(data, estudianteRepresentante) {
    fetch('http://localhost:8080/planillas/registrarPlanilla', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
           // localStorage.setItem('estudiante_cta', estudianteRepresentante)

           location.href = "../obtenerPlanillas.html";
        })
}