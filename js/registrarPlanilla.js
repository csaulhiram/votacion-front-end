let formulario = document.getElementById('formulario-planilla');

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let datos = new FormData(formulario);
    const id_planilla = uuid.v4();
    const nombre_planilla = datos.get('nombre_planilla');
    const estudiante_cta = datos.get('estudiante_cta');


    // Conversión de la información a tipo x-www-form-urlencoded;charset=UTF-8
    let data = new URLSearchParams({
        "id_planilla": id_planilla,
        "nombre_planilla": nombre_planilla,
        "estudiante_cta": estudiante_cta
    });

    

});