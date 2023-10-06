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

    let cta = new URLSearchParams({
        "id": localStorage.getItem('cta')
    });



    // Elimina de la tabla estudiante
    fetch('http://localhost:8080/estudiante/eliminarEstudiante', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: cta,
    })
    .then(res => {
        location.href = "../obtenerEstudiantes.html";
    })
})
