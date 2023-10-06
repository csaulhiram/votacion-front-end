let formularioEstudiante = document.getElementById('formularioEstudiante');
let respuestaPositiva = document.getElementById('respuestaPositiva');
let respuestaNegativa = document.getElementById('respuestaNegativa');


formularioEstudiante.addEventListener("submit", (e) => {
    e.preventDefault();


    let datos = new FormData(formularioEstudiante);
    const cta = uuid.v4();
    const carrera = datos.get('carrera');

    let data = new URLSearchParams({
        "cta": cta,
        "carrera": carrera,
        "estatus_voto": 0,
        "usuarioObjeto_estudiante": localStorage.getItem("id_usuario")
    });

    fetch('http://localhost:8080/estudiante/registrarEstudiante', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
    })
        .then(res => res.json())
        .then(data =>{
            localStorage.removeItem('id_usuario');
            location.href = "../registrarDatos.html";
            console.log(data)
        })
});