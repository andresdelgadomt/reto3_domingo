function traerInformacionCuatrimotos(){
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaBikes(respuesta);
        }
    });
}

function pintarRespuestaBikes(respuesta){

    let myTable="<table class='table'>";
    myTable+="<tr>";
    myTable+="<th>nombre</th>";
    myTable+="<th>marca</th>";
    myTable+="<th>año</th>";
    myTable+="<th>descripcion</th>";
    myTable+="<th>categoria</th>";
    myTable+="<th>borrar</th>";
    myTable+="<th>editar campo</th>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td><button onclick='borrarElementoCuatrimoto("+respuesta[i].id+")'>Borrar</td>";
        myTable+="<td><button onclick='editarInformacionCuatrimoto("+respuesta[i].id+")'>Actualizar</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCuatrimoto").html(myTable);
}
function autoInicio(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"json",
        success:function(json){
            let $select = $("#select-category");

            $.each(json, function(id, name){
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');

                console.log("select "+name.id)
            });

        }
    });
}
function guardarInformacionCuatrimoto(){
    if($("#Qname").val() == "" || $("#Qbrand").val() == "" || $("#Qyear").val() == "" || $("#Qdescription").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let var3 = {
            name:$("#Qname").val(),
            brand:$("#Qbrand").val(),
            year:$("#Qyear").val(),
            description:$("#Qdescription").val(),
            category:{id:$("#select-category").val()},
        };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),

            url:"http://localhost:8080/api/Quadbike/save",


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
function editarInformacionCuatrimoto(idElemento){
    if($("#Qname").val() == "" || $("#Qbrand").val() == "" || $("#Qyear").val() == "" || $("#Qdescription").val() == "" || $("#select-cliente").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let myData={
            id:idElemento,
            name:$("#Qname").val(),
            brand:$("#Qbrand").val(),
            year:$("#Qyear").val(),
            description:$("#Qdescription").val(),
            category:{id:$("#select-category").val()},

        }
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://localhost:8080/api/Quadbike/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoCuatrimoto").empty();
                $("#id").val("");
                $("#Qname").val("");
                $("#Qbrand").val("");
                $("#Qyear").val("");
                $("#Qdescription").val("");
                traerInformacionCuatrimotos();
                alert("se ha Actualizado")
            }
        });
    }
}

function  borrarElementoCuatrimoto(idElemento){
    let myData={
        id:idElemento
    };
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/"+idElemento,
        type:"DELETE",
        data:JSON.stringify(myData),
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategorias").empty();
            traerInformacionCuatrimotos();
            alert("Se ha Eliminado.")
        }
    });
}