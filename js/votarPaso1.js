let respuestaNegativa = document.getElementById("respuestaNegativa");
let formulario = document.getElementById("formulario");

// Obtener datos del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let datos = new FormData(formulario);
    const cta = datos.get('cta');
    buscarEstudiante(cta);
});


// Buscar al usuario
function buscarEstudiante(cta) {
    fetch(`http://localhost:8080/estudiante/obtenerEstudiantePorCTA?cta=${cta}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    })
        .then(res => res.json())
        .then(res => {
            if (res == null) {
                console.error("no existe el estudiante");
                respuestaNegativa.innerText = "";
                respuestaNegativa.innerText = "¡No existe el Estudiante!\n";
            } else {
                if(res.estatus_voto == 0) {
                    console.log("el usuario no ha votado");
                    localStorage.setItem("cta_estudiante", cta);
                    location.href = "../votarEtapa2.html"
                }else{
                    console.error("El usuario ya votó");
                    respuestaNegativa.innerText = "";
                    respuestaNegativa.innerText = "¡El usuario ya votó!\n";
                }
            }
        })
}
