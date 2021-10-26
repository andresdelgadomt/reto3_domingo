function traerInformacionClientes(){
    $.ajax({
        url:"http://129.151.121.242:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta){

    let myTable="<table class='table'>";
    myTable+="<tr>";
    myTable+="<th>correo</th>";
    myTable+="<th>contraseña</th>";
    myTable+="<th>nombre</th>";
    myTable+="<th>edad</th>";
    myTable+="<th>borrar</th>";
    myTable+="<th>editar campo</th>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td><button onclick='borrarElementoClientes("+respuesta[i].idClient+")'>Borrar</td>";
        myTable+="<td><button onclick='editarInformacionClientes("+respuesta[i].idClient+")'>Actualizar</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCliente").html(myTable);
}

function guardarInformacionClientes(){
    if($("#CLemail").val() == "" || $("#CLpassword").val() == "" || $("#CLname").val() == "" || $("#CLage").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let var4 = {
            email:$("#CLemail").val(),
            password:$("#CLpassword").val(),
            name:$("#CLname").val(),
            age:$("#CLage").val(),
        };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),

            url:"http://129.151.121.242:8080/api/Client/save",


            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()

            },

            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }

}
function editarInformacionClientes(idElemento){
    if($("#CLemail").val() == "" || $("#CLpassword").val() == "" || $("#CLname").val() == "" || $("#CLage").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let myData={
            idClient:idElemento,
            name:$("#CLname").val(),
            email:$("#CLemail").val(),
            password:$("#CLpassword").val(),
            age:$("#CLage").val(),
        };
        console.log(myData);
        $.ajax({
            url:"http://129.151.121.242:8080/api/Client/update",
            type:"PUT",
            data:JSON.stringify(myData),
            contentType:"application/JSON; charset=utf-8",
            datatype:"JSON",
            success:function(respuesta){
                $("#idClient").val("");
                $("#CLname").val("");
                $("#CLemail").val("");
                $("#CLpassword").val("");
                $("#CLage").val("");
                traerInformacionClientes();
                alert("se ha Actualizado")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function  borrarElementoClientes(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.121.242:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCliente").empty();
            traerInformacionClientes();
            alert("Se ha Eliminado.")
        }
    });
}
