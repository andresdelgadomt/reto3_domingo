function traerInformacionScore(){
    $.ajax({
        url:"http://localhost:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaScore(respuesta);
        }
    });
}

function pintarRespuestaScore(respuesta){

    let myTable="<table class='table'>";
    myTable+="<tr>";
    myTable+="<th>id</th>";
    myTable+="<th>calificacion</th>";
    myTable+="<th>comentario</th>";
    myTable+="<th>id reservacion</th>";
    myTable+="<th>borrar</th>";
    myTable+="<th>editar campo</th>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idScore+"</td>";
        myTable+="<td>"+respuesta[i].calificacion+"</td>";
        myTable+="<td>"+respuesta[i].comentario+"</td>";
        myTable+="<td>"+respuesta[i].reservations.idReservation+"</td>";
        myTable+="<td><button onclick='borrarElementoScore("+respuesta[i].idScore+")'>Borrar</td>";
        myTable+="<td><button onclick='editarInformacionScore("+respuesta[i].idScore+")'>Actualizar</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoScore").html(myTable);
}
function autoInicio(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"json",
        success:function(json){
            let $select = $("#select-reservacion");

            $.each(json, function(id, name){
                $select.append('<option value=' + name.idReservation + '>' + name.idReservation + '</option>');

                console.log("select "+name.idReservation)
            });

        }
    });
}
function guardarInformacionScore(){
    if($("#comentario").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let var4 = {
            calificacion:$("#select-Calificacion").val(),
            comentario:$("#comentario").val(),
            reservations:{id:$("#select-reservation").val()},
        };
        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),

            url:"http://129.151.121.242:8080/api/Score/save",


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
function editarInformacionScore(idElemento){
    if($("#comentario").val() == ""){
    }else{
        let myData={
            idScore:idElemento,
            calificacion:$("#select-Calificacion").val(),
            comentario:$("#comentario").val(),
            reservation:{id:$("#select-reservation").val()},
        };
        console.log(myData);
        $.ajax({
            url:"http://129.151.121.242:8080/api/Score/update",
            type:"PUT",
            data:JSON.stringify(myData),
            contentType:"application/JSON; charset=utf-8",
            datatype:"JSON",
            success:function(respuesta){
                $("#idScore").val("");
                $("#calificacion").val("");
                $("#comentario").val("");
                $("#reservation").val("");
                traerInformacionScore();
                alert("se ha Actualizado")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function  borrarElementoScore(idElemento){
    let myData={
        idScore:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.121.242:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoScore").empty();
            traerInformacionMessage();
            alert("Se ha Eliminado.")
        }
    });
}