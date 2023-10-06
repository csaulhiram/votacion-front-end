

let formulario = document.getElementById('formulario');
let respuestaPositiva = document.getElementById('respuestaPositiva');
let respuestaNegativa = document.getElementById('respuestaNegativa');

// Registro de información del usuario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let datos = new FormData(formulario);
    const id_usuario = uuid.v4();
    const nombres = datos.get('nombres');
    const apellidos = datos.get('apellidos');
    const email = datos.get('email');
    const password = datos.get('password');
    const perfil = datos.get('perfil');


    // Conversión de la información a tipo x-www-form-urlencoded;charset=UTF-8
    let data = new URLSearchParams({
        "id_usuario": id_usuario,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "password": password,
        "perfil": perfil
    });


    // Registro de la información personal del usuario
    fetch('http://localhost:8080/usuarios/registrarUsuario', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                respuestaPositiva.innerHTML = "Usuario añadido con éxito";
               
                localStorage.setItem("id_usuario", data.id_usuario);
                console.log(localStorage.getItem("id_usuario"));
                registrarUsuario(data);
            }
        })
        .catch(function (err) {
            if (err) {
                respuestaNegativa.innerHTML = "No se pudo añadir al usuario";
                // redireccion
                //location.href = "../home.html";
            }

            console.error(err);
        });
})


function registrarUsuario(data) {
    const { perfil } = data;
    if (perfil == "Administrador") {
        let id = uuid.v4();

        let dataAdmin = new URLSearchParams({
            "id_admin": id,
            "usuarioObjeto": localStorage.getItem('id_usuario')
        });

        fetch('http://localhost:8080/admin/registrarAdmin', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: dataAdmin,
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    respuestaPositiva.innerHTML = "Usuario añadido con éxito";
                }
                localStorage.removeItem('id_usuario');
                location.href = "../registrarDatos.html";
            })
            .catch(function (err) {
                if (err) {
                    respuestaNegativa.innerHTML = "No se pudo añadir al usuario";
                }

                console.error(err);
            });

    } else if (perfil == "Estudiante") {
        location.href = "../registrarEstudiante.html";
    }
}
