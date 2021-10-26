function traerInformacionMessage(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }
    });
}

function pintarRespuestaMessage(respuesta){

    let myTable="<table class='table'>";
    myTable+="<tr>";
    myTable+="<th>id</th>";
    myTable+="<th>mensaje texto</th>";
    myTable+="<th>nombre cliente</th>";
    myTable+="<th>nombre cuatrimoto</th>";
    myTable+="<th>borrar</th>";
    myTable+="<th>editar campo</th>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].quadbike.name+"</td>";
        myTable+="<td><button onclick='borrarElementoMessage("+respuesta[i].idMessage+")'>Borrar</td>";
        myTable+="<td><button onclick='editarInformacionMessage("+respuesta[i].idMessage+")'>Actualizar</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").html(myTable);
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
function guardarInformacionMessage(){
    if($("#messageText").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let var4 = {
            messageText:$("#messageText").val(),
            client:{idClient:$("#select-cliente").val()},
            quadbike:{id:$("#select-cuatrimoto").val()},
        };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),

            url:"http://localhost:8080/api/Message/save",


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
function editarInformacionMessage(idElemento){
    if($("#messsageText").val() == "" ||$("#select-cliente").val()== ""){
    }else{
        let myData={
            idMessage:idElemento,
            messageText:$("#messageText").val(),
            client:{id:$("#select-cliente").val()},
        };
        console.log(myData);
        $.ajax({
            url:"http://localhost:8080/api/Message/update",
            type:"PUT",
            data:JSON.stringify(myData),
            contentType:"application/JSON; charset=utf-8",
            datatype:"JSON",
            success:function(respuesta){
                $("#idMessage").val("");
                $("#messageText").val("");
                traerInformacionMessage();
                alert("se ha Actualizado")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function  borrarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
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
