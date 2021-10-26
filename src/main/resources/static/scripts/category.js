function traerInformacionCategorias(){
    $.ajax({
        url:"http://129.151.121.242:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategoria(respuesta);
        }
    });
}

function pintarRespuestaCategoria(respuesta){

    let myTable="<table class='table'>";
    myTable+="<tr>";
    myTable+="<th>id</th>";
    myTable+="<th>nombre</th>";
    myTable+="<th>descripcion</th>";
    myTable+="<th>borrar</th>";
    myTable+="<th>editar campo</th>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td><button onclick='borrarElementoCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="<td><button onclick='editarInformacionCategorias("+respuesta[i].id+")'>Modificar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCategorias").html(myTable);
}

function guardarInformacionCategorias(){
    if($("#Cname").val() == "" || $("#Cdescription").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let var2 = {
            name:$("#Cname").val(),
            description:$("#Cdescription").val()
        };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url:"http://129.151.121.242:8080/api/Category/save",


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
function editarInformacionCategorias(idElemento){
    if($("#Cname").val() == "" || $("#Cdescription").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let myData={
            id:idElemento,
            name:$("#Cname").val(),
            description:$("#Cdescription").val()

        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.121.242:8080/api/Category/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                $("#id").val("");
                $("#Cname").val("");
                $("#Cdescription").val("");
                traerInformacionCategorias();
                alert("se ha Actualizado correctamente la categoria")
            }
        });
    }

}
function  borrarElementoCategoria(idElemento){
    let myData={
        id:idElemento
    };
    $.ajax({
        url:"http://129.151.121.242:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:JSON.stringify(myData),
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategorias").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });
}
