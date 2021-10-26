function traerInformacionReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta){

    let myTable="<table class='table'>";
    myTable+="<tr>";
    myTable+="<th>id</th>";
    myTable+="<th>fecha inicio</th>";
    myTable+="<th>fecha entrega</th>";
    myTable+="<th>estado</th>";
    myTable+="<th>cliente</th>";
    myTable+="<th>correo cliente</th>";
    myTable+="<th>id cliente</th>";
    myTable+="<th>cuatrimoto</th>";
    myTable+="<th>borrar</th>";
    myTable+="<th>editar campo</th>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.idClient+"</td>";
        myTable+="<td>"+respuesta[i].quadbike.name+"</td>";

        myTable+="<td><button onclick='borrarElementoReservation("+respuesta[i].idReservation+")'>Borrar</td>";
        myTable+="<td><button onclick='editarInformacionReservation("+respuesta[i].idReservation+")'>Actualizar</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservation").html(myTable);
}
function autoInicioClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"json",
        success:function(json){
            let $select = $("#select-cliente");

            $.each(json, function(id, name){
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');

                console.log("select "+name.id)
            });

        }
    });
}
function autoInicioQuadbike(){
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"json",
        success:function(json){
            let $select = $("#select-cuatrimoto");

            $.each(json, function(id, name){
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');

                console.log("select "+name.id)
            });

        }
    });

}
function guardarInformacionReservation(){
    if($("#startDate").val() == "" || $("#devolutionDate").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let var4 = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            client:{idClient:$("#select-cliente").val()},
            quadbike:{id:$("#select-cuatrimoto").val()},
        };
        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),

            url:"http://localhost:8080/api/Reservation/save",


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
function editarInformacionReservation(idElemento){
    if($("#startDate").val() == "" || $("#devolutionDate").val() == ""){
    }else{
        let myData={
            idReservation:idElemento,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            client:{idClient:$("#select-cliente").val()},
            quadbike:{id:$("#select-cuatrimoto").val()},
        };
        console.log(myData);
        $.ajax({
            url:"http://localhost:8080/api/Reservation/update",
            type:"PUT",
            data:JSON.stringify(myData),
            contentType:"application/JSON; charset=utf-8",
            datatype:"JSON",
            success:function(respuesta){
                $("#idReservation").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");
                traerInformacionReservation();
                alert("se ha Actualizado")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function  borrarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Se ha Eliminado.")
        }
    });
}