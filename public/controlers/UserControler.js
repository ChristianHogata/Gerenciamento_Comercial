 


class UserControler {
    

   

    /* RENDERIZA A PAGINA DE ACORDO COM A REQUISIÇÃO */
    static RenderView(req,res,page,title,query,values,method,table,table2){
        
        let conn = require('../models/db');
        let tab = table.replace('"','');
        tab = tab.replace('"','');

        switch(method){
        
            case "GET":
                conn.select(query).then((results,reject)=>{

                    if(results){
                        res.render(page, { 
                            title: title,
                            object: results

                        });
                    }
  
                }).catch(()=>{
                    this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                });  
            break;


            case "POST":
                if(table == "Clientes"){
                

                    let check =  setInterval(() => {
                        console.log('começou');
                        conn.select(`Select * from public."Semaforo" where "operacao" = '${tab}'`).then((results,reject)=>{
                            
                            if(!results[0]){

                                this.LockOperation(conn,table,req);
                                console.log('LOCKED');
                                conn.insert(query.query1,values.value1).then((results1,reject1)=>{

                                    if(results1){
                                        conn.insert(query.query2,values.value2).then((results2,reject2)=>{
                
                                            if(results2){
                                                conn.update('update "Endereco" set id_usuario =  (select max(id) from "Clientes") where id_endereco = (select max(id_endereco) from "Endereco")').then((results3,reject3) =>{
                       
                                                    if(results3){
                                                        conn.select('select * from ' + '"'+table +'"'+ " " + 'inner join' + ' ' + '"'+table2+'"' + ' ' + 'on id = id_usuario ORDER BY id asc limit 10').then((results4,reject)=>{
                                                            
                                                            if(results4){
                                                                res.render(page, { 
                                                                    title: title,
                                                                    object: results4
                                                                });

                                                                this.UnlockOperation(conn,table,req);
                                                                console.log('UNLOCKED'); 
                                                                clearInterval(check);
                                                            }

                                                        }).catch(()=>{
                                                            this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                                                        }); 
                                                    }
                                                    
                                                }).catch(()=>{
                                                    this.ShowMessage(res,'error',"Houve um erro ao atualizar os dados, contate o suporte!");
                                                });
                                            }
                                        
                                        }).catch(()=>{
                                            this.ShowMessage(res,'error',"Houve um erro ao inserir os dados, contate o suporte!");
                                        });
                                    }
                                    
                                }).catch(()=>{
                                    this.ShowMessage(res,'error',"Houve um erro ao inserir os dados, contate o suporte!");
                                });
                            }               
                        }); 
                    }, 5000); 
                }

                if(table == "Fornecedores"){
                    let check =  setInterval(() => {
                        console.log('começou');
                        conn.select(`Select * from public."Semaforo" where "operacao" = '${tab}'`).then((results,reject)=>{

                            if(!results[0]){
                                this.LockOperation(conn,table,req);
                                console.log('LOCKED');

                                conn.insert(query.query1,values.value1).then((results1,reject1)=>{
    
                                    if(results1){
                                        conn.insert(query.query2,values.value2).then((results2,reject2)=>{
                
                                            if(results2){
                                                conn.update('update "Endereco_Fornecedor" set id_usuario =  (select max(id) from "Fornecedores") where id_endereco_fornecedor = (select max(id_endereco_fornecedor) from "Endereco_Fornecedor")').then((results3,err) =>{
                    
                                                  if(results3){
                                                        conn.select('select * from ' + '"'+table +'"'+ " " +  'inner join' + ' ' + '"'+table2+'"' + ' ' + 'on id = id_usuario ORDER BY id asc limit 10').then((results4,reject)=>{
                                                            
                                                            if(results4){
                                                                res.render(page, { 
                                                                    title: title,
                                                                    object: results4
                                                                });
                                                                
                                                                this.UnlockOperation(conn,table,req);
                                                                console.log('UNLOCKED'); 
                                                                clearInterval(check);
                                                            }
                                                           
                                        
                                                        }).catch(()=>{
                                                            this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                                                        });
                                                    }
                                                    
                                                    
                                                }).catch(()=>{
                                                    this.ShowMessage(res,'error',"Houve um erro ao atualizar os dados, contate o suporte!");
                                                });
                                            }
                                            
                                            
                                        }).catch(()=>{
                                            this.ShowMessage(res,'error',"Houve um erro ao inserir os dados, contate o suporte!");
                                        });
                                    }
                                    
                                    
                                }).catch(()=>{
                                    this.ShowMessage(res,'error',"Houve um erro ao inserir os dados, contate o suporte!");
                                });
                            }            
                        }); 
                    }, 5000);   
                }


                if(table == "Produtos"){
                    let check =  setInterval(() => {
                        console.log('começou');
                        conn.select(`Select * from public."Semaforo" where "operacao" = '${tab}'`).then((results,reject)=>{

                            if(!results[0]){
                                this.LockOperation(conn,table,req);
                                console.log('LOCKED');

                                conn.insert(query.query1,values.value1).then((results1,reject1)=>{
    
                                    if(results1){
                                        conn.select('select * from ' + '"'+ table +'"'+ ' ORDER BY id asc limit 10').then((results,reject)=>{
                     
                                            if(results){
                                                res.render(page, { 
                                                    title: title,
                                                    object: results
                                                }); 
                                                
                                                this.UnlockOperation(conn,table,req);
                                                console.log('UNLOCKED'); 
                                                clearInterval(check);
                                            }
                                           
                  
                                 
                                        }).catch(()=>{
                                            this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                                        }); 
                                    }
                                }).catch(()=>{
                                    this.ShowMessage(res,'error',"Houve um erro ao inserir os dados, contate o suporte!");
                                });  
                            }            
                        }); 
                    }, 5000);
                }
            break;
        }    
    }

    
    

    /* RESPONDE REQUISIÇÕES AJAX */
    static ReturnAjax(req,res,table,id,action,table2,query,values,query2,values2){
        let conn = require('../models/db');

        /* VERIFICA A AÇÃO DA REQUISIÇÃO */
        switch (action){

            case "select":

                if(table == '"Produtos"'){
                    conn.select('select * from' + ' ' + table  + ' ' + 'where id =' + ' ' + id).then((results,reject)=>{

                        if(results){
                            this.ShowData(res,'data',results);
                        }
                        

                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                    });
                }
                else{
                    
                    conn.select('select * from' + ' ' + table  + ' ' + 'inner join' + ' ' + table2 + ' ' + 'on id = id_usuario' + ' ' + ' where id =' + ' '+ id).then((results,reject)=>{

                        if(results){
                            this.ShowData(res,'data',results);
                        }
                       

                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                    });
                }

            break;



            case "delete":

                if(table == '"Produtos"'){
                    conn.delete(query,values).then((results,reject)=>{
                        if(results){
                            this.ShowMessage(res,'success',"Deletado com sucesso");
                        }
   
                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Esse produto já está associado a um registro no banco de dados, desative-o!");
                    });
                }

                
                if((table == '"Clientes"') || (table == '"Fornecedores"')){
                    conn.delete('delete from' + ' ' + table + ' ' + 'where id =' + ' '+ id).then((results1,reject1)=>{
                    
                        if(results1){
                            conn.delete('delete from' + ' ' + table2 + ' ' + 'where id_usuario =' + ' '+ id).then((results,reject)=>{
                                
                                if(results){
                                    this.ShowMessage(res,'success',"Deletado com sucesso");
                                }
    
                            }).catch(()=>{
                                this.ShowMessage(res,'error',"Esse cliente já está associado a um registro no banco de dados, desative-o!");
                            });
                        }
                       
                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Esse cliente já está associado a um registro no banco de dados, desative-o!");
                    });
                } 

            break;



            case "insert":

                let tab = table.replace('"','');
                tab = tab.replace('"','');
                
                let check =  setInterval(() => {
                        console.log('começou');
                        conn.select(`Select * from public."Semaforo" where "operacao" = '${tab}'`).then((results,reject)=>{
                            
                            if(!results[0]){

                                this.LockOperation(conn,table,req);
                                console.log('LOCKED');
                                conn.insert(query.query1,values.value1).then((results,reject1)=>{
                
                                    if(results){  
                                        conn.insert(query.query3,values.value3).then((result2,reject2)=>{
                                          
                                            if(result2){
                                                let itens = values2;
                                                let count = 0;
                                                let value;
                        
                                                itens[count].forEach(el=>{
                        
                                                    count++;
                                                    value = [el.id,el.descricao,el.quantidade,el.valor_unitario_produto, (el.sabores ? el.sabores : ""), (el.valor_total_sabores ? el.valor_total_sabores : 0), (el.complementos ? el.complementos : ""), (el.valor_total_complementos ? el.valor_total_complementos : 0), 1 ];
                                                        
                                                    conn.insert(query.query2,value);
                        
                                                });
                                                this.UnlockOperation(conn,table,req);
                                                console.log('UNLOCKED');
                                               
                                                this.ShowMessage(res,'success',"Pedido finalizado!");
                                            }
                                        }).catch(()=>{
                                            this.ShowMessage(res,'error',"Houve um erro ao inserir os dados, contate o suporte!");
                                         });    
                                    }            
                                }).catch(()=>{
                                    this.ShowMessage(res,'error',"Houve um erro ao inserir os dados, contate o suporte!");
                                }); 
                                clearInterval(check);  
                            }               
                        }); 
                    }, 5000); 
 
            break;



            case "update":

                if(table == '"Pedidos"'){
                    
                    conn.update(query.query1).then((results,reject) =>{
                     
                        if(results){

                            conn.update(query.query2).then((result2,reject) =>{

                                if(result2){

                                    conn.update(query.query3).then((result3,reject) =>{

                                        if(result3){
                                            this.ShowMessage(res,'success',"Atualizado!");
                                        }
                                    }).catch(()=>{
                                        this.ShowMessage(res,'error',"Houve um erro ao cancelar, contate o suporte!");
                                    });

                                }

                            }).catch(()=>{
                                this.ShowMessage(res,'error',"Houve um erro ao cancelar, contate o suporte!");
                            });
                            
                        } 
                      
                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Houve um erro ao cancelar, contate o suporte!");
                    });

                }


                if((table == '"Clientes"') || (table == '"Fornecedores"')){
                    conn.update(query).then((results,reject) =>{

                       if(results){
                            conn.update(query2).then((results2,reject2) =>{

                                if(results2){
                                    this.ShowMessage(res,'success',"Atualizado!");
                                }                              
        
                            }).catch(()=>{
                                this.ShowMessage(res,'error',"Houve um erro ao editar, contate o suporte!");
                            });
                        }                

                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Houve um erro ao editar, contate o suporte!");
                    });
                }



                if(table == '"Produtos"'){
                    conn.update(query).then((results,reject) =>{

                        if(results){
                            
                            this.ShowMessage(res,'success',"Atualizado!");
           
                        }                
 
                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Houve um erro ao editar, contate o suporte!");
                    });
                }



                

                if(table == '"Pedido_itens"'){
                    
                    conn.update(query).then((results,reject) =>{

                        if(results){
                            this.ShowMessage(res,'success',"deletado com sucesso");
                        }
                        
                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Houve um erro ao editar, contate o suporte!");
                    });

                }



            break;

            


            case "search":

              //console.log("SELECT * FROM public."+'"Produtos"'+" where descricao like " +"'%"+ id +"%'");
                conn.select(query,values).then((results,reject)=>{

                    if(results){
                        this.ShowData(res,'data',results);
                    }               
        
                }).catch(()=>{
                    this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                });
                
            break;




            case "all":

                if(table2 == ""){
                    if(id == "Vendas"){
                        conn.select('select * from' + ' ' + table  + ' ' + 'order by id desc').then((results,reject)=>{

                            if(results){
                                this.ShowData(res,'data',results);
                            }
    
                        }).catch(()=>{
                            this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                        });
                    }
                    else{
                        conn.select('select * from' + ' ' + table  + ' ').then((results,reject)=>{

                            if(results){
                                this.ShowData(res,'data',results);
                            }
                          
                
                        }).catch(()=>{
                            this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                        });
                    }
                    
                }
                else{
                    conn.select('SELECT * FROM public."Clientes" inner join "Endereco" on id = id_usuario').then((results,reject)=>{

                        if(results){
                            this.ShowData(res,'data',results);
                        }
                                        
            
                    }).catch(()=>{
                        this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                    });

                }

            break; 


            
            case "login":

               let array = id.split(',');
                
               conn.select("select * from usuarios where usuario ="+ ' ' + "'" + array[0] + "'" + ' ' + 'and password =' + ' ' + "'" + array[1] + "'").then((results,reject1)=>{
                    console.log(results);
                if(results){
                       console.log('c');
                        let id = results[0]['id'];
                        req.session.UserId = id;
                        req.session.logged = true; 

                        conn.select("select id from caixa where data_fechamento is null").then((results2,reject2)=>{
                            if(results2[0]){
                                console.log('d');
                                let idCaixa = results2[0]['id'];
                                req.session.idCaixa = idCaixa;
                                this.ShowMessage(res,'success',"Logado com sucesso");
                            }
                            else{
                                this.ShowMessage(res,'success',"Logado com sucesso");
                            }
                           
                        });
                        
                    }
                 
            
                }).catch(()=>{
                    console.log('erroo');
                    this.ShowMessage(res,'error',"Login ou Senha incorretos");
                }); 

            break;


            case "abre_caixa":

                
                conn.select(query.query1).then((results,reject1)=>{
                    
                   

                    if(results[0]){
                        conn.insert(query.query2,values.value2).then((results2,reject2)=>{

                            if(results2){
                                
                                conn.select("select id from caixa where data_fechamento is null").then((results3,reject3)=>{
                                    if(results3[0]){
                                        let idCaixa = results3[0]['id'];
                                        req.session.idCaixa = idCaixa;                                  
                                        this.ShowMessage(res,'success',"Caixa aberto!");
                                    }
                                    else{
                                        this.ShowMessage(res,'error',reject3);
                                    }
                                })
        
                            }
                            else{
                                this.ShowMessage(res,'error',"Login ou Senha incorretos");
                            }
                        })
                    }
                    else{
                        this.ShowMessage(res,'error',"Login ou Senha incorretos");
                    }
                });

            break;

            case "fecha_caixa":

                
                conn.select(query.query1).then((results,reject1)=>{
                    

                    if(results[0]){
                        conn.insert(query.query2).then((results2,reject2)=>{

                            if(results2){
                            
                                conn.update(query.query3).then((results3,reject3)=>{
                                    if(results3){
                                        req.session.idCaixa = null;                                 
                                        this.ShowMessage(res,'success',"Caixa Fechado!");
                                        
                                    }
                                    else{
                                        this.ShowMessage(res,'error',reject3);
                                    }
                                })
        
                            }
                            else{
                                this.ShowMessage(res,'error',"Login ou Senha incorretos");
                            }
                        })
                    }
                    else{
                        this.ShowMessage(res,'error',"Login ou Senha incorretos");
                    }
                });

            break;

            case 'Cupom':
                conn.select(query.query1).then((results,reject)=>{

                    if(results){
                        this.ShowData(res,'data',results);
                    }
                  
        
                }).catch(()=>{
                    this.ShowMessage(res,'error',"Houve um erro ao buscar os dados, contate o suporte!");
                });
            break;
    
        }
    }


    static ShowMessage(res,type,msg) {

        let data = {
            type: type,
            message: msg
        }

        

        switch(type){
            case "error":
                res.status(200).json(data);
            break;

            case "success":
                res.status(200).json(data);
            break;
        }
        
    }

    static ShowData(res,type,data) {

        let dataJson = data;
        dataJson['type'] = type;

        res.status(200).json(dataJson);
        
    }

    static CheckOperation(conn,table){

        let tab = table.replace('"','');
        tab = tab.replace('"','');

        conn.select(`Select * from public."Semaforo" where "operacao" = '${tab}'`).then((results,reject)=>{
           
            if(results){
                return true;
            }
            else{
                return false;   
            }
                        
        });          
    }


    static LockOperation(conn,table,req){

        let operacao = table.replace('"','');
        operacao = operacao.replace('"','');

        conn.insert(`INSERT INTO public."Semaforo" ("operacao", "user_id") values('${operacao}','${req.session.UserId}')`).then((results,reject)=>{   
                        
        });          
    }


    static UnlockOperation(conn,table,req){

        let operacao = table.replace('"','');
        operacao = operacao.replace('"','');

        conn.insert(`DELETE From public."Semaforo" WHERE "operacao" = '${operacao}' AND "user_id" = '${req.session.UserId}'`).then((results,reject)=>{   
                        
        });          
    }

    

    
}


module.exports = UserControler;








    

