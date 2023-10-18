

let estudiantes = [];
fetch('http://localhost:8080/estudiante/obtenerEstudiantes')
    .then(res => res.json())
    .then(data => {
      estudiantes = data;
        mostrarEstudiantes(data);
    })


function mostrarEstudiantes(data) {
    let tbody = document.getElementById("table-body");

    for (let i = 0; i < data.length; i++) {

        let filas = document.createElement('tr');

        let button = document.createElement('input');
        button.type = 'button';
        button.cta = data[i].cta;
        button.value = data[i].cta;
        button.style.border = "none";
        button.style.backgroundColor = "transparent";


        let columna1 = document.createElement('td');
        columna1.appendChild(button);

        let columna2 = document.createElement('td');
        columna2.innerHTML = data[i].carrera;

        let columna3 = document.createElement('td');
        columna3.innerHTML = data[i].estatus_voto;

        let columna4 = document.createElement('td');
        columna4.innerHTML = data[i].usuarioObjeto_estudiante.nombres;

        let columna5 = document.createElement('td');
        columna5.innerHTML = data[i].usuarioObjeto_estudiante.apellidos;

        let columna6 = document.createElement('td');
        columna6.innerHTML = data[i].usuarioObjeto_estudiante.email;

        let columna7 = document.createElement('td');
        columna7.innerHTML = data[i].usuarioObjeto_estudiante.perfil;

        filas.appendChild(columna1);
        filas.appendChild(columna2);
        filas.appendChild(columna3);
        filas.appendChild(columna4);
        filas.appendChild(columna5);
        filas.appendChild(columna6);
        filas.appendChild(columna7);

        tbody.appendChild(filas);

    }
}

$(function () {
    $(document).on('click', 'input[type="button"]', function (event) {

        let cta = this.cta;
        var estudiante = estudiantes.find(student => student.cta == cta);
        console.log(estudiante);
        localStorage.setItem('cta', cta);
        localStorage.setItem('nombres', estudiante.usuarioObjeto_estudiante.nombres);
        localStorage.setItem('apellidos', estudiante.usuarioObjeto_estudiante.apellidos);
        localStorage.setItem('email', estudiante.usuarioObjeto_estudiante.email);
        localStorage.setItem('id_usuario', estudiante.usuarioObjeto_estudiante.id_usuario);
        localStorage.setItem('password', estudiante.usuarioObjeto_estudiante.password);
        localStorage.setItem('perfil', estudiante.usuarioObjeto_estudiante.perfil);
       


        window.location.href = '../actualizarEstudiante.html';

    });
});

