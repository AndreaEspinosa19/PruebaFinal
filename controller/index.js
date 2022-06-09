
window.token = '';

$("#BotonPrueba").on("click",()=>{
         $.ajax({
            url: 'https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php?operation=getchallenge&username=prueba',
            type: 'get',
            success: function(response){
                console.log(response.result.token);
                window.token = response.result.token;
                $.ajax({
                    url:'https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php',
                    type:'post',
                    data:{
                        operation:'login',
                        username:'prueba',
                        accessKey:md5(response.result.token+'Vn4HOWtkJOsPX7t')
                    },
                    success:function(response){
                        let url_document = `https://develop.datacrm.la/anieto/anietopruebatecnica/webservice.php?operation=query&sessionName=${response.result.sessionName}&query=select * from Contacts;`; 
                        console.log(url_document);
                        $.ajax({
                            url:url_document,
                            type:'get',


                            success:function(response){
                                $("#table_body").html('');
                                $.each(response.result,(key,element)=>{
                                    $("#table_body").append(`
                                    <tr>
                                        <td>${element.id}</td>
                                        <td>${element.contact_no}</td>
                                        <td>${element.lastname}</td>
                                        <td>${element.createdtime}</td>                    
                                    </tr> 
                                    `);
                                });
                            },
                            error:function(err){
                                console.log(err);
                            }
                        });
                    },
                    error:function(err){
                        console.log(err);
                    }
                });

            },
            error: function(err){
                console.log(err);
            }, 
        })
});
