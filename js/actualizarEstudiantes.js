let eliminarUsuario = document.getElementById("eliminarUsuario");


let formularioEstudiante = document.getElementById('formularioEstudiante');
document.getElementById("nombres").value = localStorage.getItem('nombres');
document.getElementById("apellidos").value = localStorage.getItem('apellidos');
document.getElementById("email").value = localStorage.getItem('email');
document.getElementById("password").value = localStorage.getItem('password');



formularioEstudiante.addEventListener("submit", (e) => {
    e.preventDefault();
    let datos = new FormData(formularioEstudiante);
    let nombres = datos.get('nombres');
    let apellidos = datos.get('apellidos');
    let password = datos.get('password');


    let data = new URLSearchParams({
        "id_usuario": localStorage.getItem('id_usuario'),
        "nombres": nombres,
        "apellidos": apellidos,
        "password": password,
        "email": localStorage.getItem("email"),
        "perfil": localStorage.getItem("perfil")
    });


    fetch("http://localhost:8080/usuarios/modificarUsuario", {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
    })
        .then(res => res.json())
        .then(data => {
            localStorage.clear();
            location.href = "../obtenerEstudiantes.html";
            console.log(data)
        })
});


eliminarUsuario.addEventListener("click", () => {
    // para planillas
    let estudiante_cta = new URLSearchParams({
        "estudiante_cta": localStorage.getItem('cta')
    });

    // para estudiante
    let id = new URLSearchParams({
        "id": localStorage.getItem('cta')
    });

    // Elimina un registro estudiante y sus planillas si es que tiene.
    fetch('http://localhost:8080/planillas/elimnarPlanilla', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: estudiante_cta,
    })
        .then(res => {
            console.log(res);
            fetch('http://localhost:8080/estudiante/eliminarEstudiante', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: id,
            })
                .then(res => {
                    console.log(res);
                    localStorage.clear();
                    location.href = "../obtenerEstudiantes.html";
                })
        })
})
