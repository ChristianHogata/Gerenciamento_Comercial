var express = require('express');
const { ReturnAjax } = require('../public/controlers/UserControler');
var router = express.Router();
var userControler = require('../public/controlers/UserControler');





/* Pagina de login */
router.get('/', function(req, res, next) {
  if((req.session.UserId) && (req.session.logged == true)){ 
    userControler.RenderView(req,res,'home','Mokutech','','','GET','home','','');
  }
  else{
    userControler.RenderView(req,res,'index','Mokutech','','','GET','','','');
  }
  
});

router.get('/teste', function(req, res, next) {
  
  
    userControler.RenderView(req,res,'RelPedido','Mokutech','','','GET','','','');
  
  
});





/* Pagina inicial */
router.get('/home',  (req,res,next)=>{
  console.log(req.session.UserId);
  if((req.session.UserId) && (req.session.logged == true)){ 
    userControler.RenderView(req,res,'home','Mokutech','','','GET','home');
  }
  else{
    userControler.RenderView(req,res,'error','Mokutech','','','GET','');
  }
 

});



/* Pagina produtos */
router.get('/produtos',  (req,res,next)=>{
  if((req.session.UserId) && (req.session.logged == true)){
    userControler.RenderView(req,res,'CadProduto','Mokutech','select * from "Produtos" ORDER BY descricao asc limit 10','','GET','produtos');
  }
  else{
    userControler.RenderView(req,res,'error','Mokutech','','','GET','');
  }
  
});


/* Pagina clientes */
router.get('/clientes',  (req,res,next)=>{
  if((req.session.UserId) && (req.session.logged == true)){
    userControler.RenderView(req,res,'CadClientes','Mokutech','select * from "Clientes" inner join "Endereco" on id = id_usuario','','GET','clientes','Endereco');
  }
  else{
    userControler.RenderView(req,res,'error','Mokutech','','','GET','');
  }
});



/* Pagina fornecedores */
router.get('/fornecedores', (req,res,next)=>{
  if((req.session.UserId) && (req.session.logged == true)){
    userControler.RenderView(req,res,'CadFornecedores','Mokutech','select * from "Fornecedores" inner join "Endereco_Fornecedor" on id = id_usuario','','GET','fornecedores',"Endereco_Fornecedor");
  }
  else{
    userControler.RenderView(req,res,'error','Mokutech','','','GET','');
  }
})



/* Pagina pedidos */
router.get('/pedidos', (req,res,next)=>{
  if((req.session.UserId) && (req.session.logged == true) && (req.session.idCaixa)){
    
    userControler.RenderView(req,res,'MovPedido','Mokutech','','','GET','',"");

  }
  else{
    userControler.RenderView(req,res,'error','Mokutech','','','GET','');
  }
  
})






/* ROTAS PARA RECEBER AJAX */

/* ROTA AJAX PARA LOGIN */
router.get('/login/:id/:method',  (req,res,next)=>{

  
  userControler.ReturnAjax(req,res,'',req.params.id,req.params.method," ");

});

router.get('/pedidos/:method', function(req, res, next) {
  
  let query = {
    query1: `Select * from public."Pedidos" pd inner join public."Pedido_itens" pi
    on pd.id = pi.id_pedido
    where pd.id = (Select max(id) from public."Pedidos") `
  }

  userControler.ReturnAjax(req,res,'','',req.params.method," ",query);


});


router.get('/GetCupom/:method/:id', function(req, res, next) {
  
  let query = {
    query1: `Select pd.*, pi.*, cl.*, ed.*, fp.descricao as formaPgtNome from public."Pedidos" pd inner join public."Pedido_itens" pi
    on pd.id = pi.id_pedido
    inner join public."Forma_pagamento" fp
    on pd.id_forma_pagamento = fp.id
    inner join public."Clientes" cl
	  on cl.id = pd.id_cliente
    inner join public."Endereco" ed
	  on cl.id = ed.id_usuario
    where pd.id = ${req.params.id} `,
    
    query2 :  `Select pd.*, pi.*, cl.*, ed.*, fp.descricao as formaPgtNome from public."Pedidos" pd inner join public."Pedido_itens" pi
    on pd.id = pi.id_pedido
    inner join public."Forma_pagamento" fp
    on pd.id_forma_pagamento = fp.id
    inner join public."Clientes" cl
	  on cl.id = pd.id_cliente
    inner join public."Endereco" ed
	  on cl.id = ed.id_usuario
    where pd.id = (Select max(id) from public."Pedidos") `
  }

  if(req.params.method ==  'FinalizouVenda'){
    console.log('ok');
    userControler.ReturnAjax(req,res,'','','Cupom'," ",query.query2);
  }
  else{
    console.log('ok2');
    userControler.ReturnAjax(req,res,'','',req.params.method," ",query.query1);  
  }


});



router.get('/accessVerify/:id',  (req,res,next)=>{

  if((!req.session.UserId) && (!req.session.logged == true)){
    
    userControler.ShowMessage(res,'error','Faça o login para acessar essa pagina!');
  }
  else{
    
    if(!req.session.idCaixa){
      
      userControler.ShowMessage(res,'error','Abra o caixa para acessar essa tela!');
    }
    else{
      
      userControler.ShowMessage(res,'success','ok!');
    }
  }
});






/* ROTA AJAX PARA PRODUTOS */
router.get('/produtos/:id/:method',  (req,res,next)=>{


  if(req.params.method == "update"){

    

    let data = JSON.parse(req.params.id);
  
    let query = {
      query1: 'update "Produtos" set grupo =' + ' ' + "'" +data.grupo +"'" + ', '  + 'descricao =' + ' ' +"'"+ data.descricao +"'"+ ', ' + 'peso_liquido =' + ' '  + data.peso_liquido + ', ' + 'preco_custo =' + ' ' + data.preco_custo + ', ' + 'preco_venda =' + ' '  + data.preco_venda + ', ' + 'estoque =' + ' '  +data.estoque+ ', ' + 'unidade_entrada =' + ' '  +"'"+data.unidade_entrada+"'"+ ', ' + 'ean =' + ' '  +"'"+data.ean+"'" +  ', ' + 'peso_bruto =' + ' '  + data.peso_bruto + ', ' + 'complemento =' + ' '  +"'"+ data.complemento+"'" + ', '  + 'fracionado =' + ' '  +"'"+ data.fracionado+"'" + ', ' + 'quantidade_sabores =' + ' '  +"'"+ data.quantidade_sabores+"'" + ', ' + 'quantidade_minima =' + ' '  + data.quantidade_minima+ ' ' + 'where id = ' + ' ' + data.id
    }
    console.log(query.query1);

    userControler.ReturnAjax(req,res,'"Produtos"',req.params.id,req.params.method,'',query.query1,'','','');
    

  }
  if(req.params.method == "delete"){

   
  
    let query = {
      query1: 'delete from "Produtos"' + ' ' + 'where id = ' + ' ' + req.params.id
    }

    userControler.ReturnAjax(req,res,'"Produtos"',req.params.id,req.params.method,'',query.query1,'');
    

  }
  if(req.params.method == "select"){
    userControler.ReturnAjax(req,res,'"Produtos"',req.params.id,req.params.method," ");
  }

  
  
});




/* ROTA AJAX PARA CLIENTES */
router.get('/clientes/:id/:method', (req,res,next)=>{
  
  
  /* CASO O METODO SEJA PARA ATUALIZAR */
  if(req.params.method == "update"){

    let data = JSON.parse(req.params.id);
  
    let query = {
      query1: 'update "Clientes" set passaporte =' + ' ' + "'" +data.passaporte +"'" + ', ' + 'nome=' + ' ' +"'"+ data.nome +"'" + ', ' + 'sobrenome =' + ' ' +"'"+ data.sobrenome +"'"+ ', ' + 'email =' + ' '  +"'"+ data.email+"'" + ', ' + 'telefone1 =' + ' ' +"'"+ data.telefone1 +"'"+ ', ' + 'telefone2 =' + ' '  +"'"+ data.telefone2+"'" + ' ' + 'where id = ' + ' ' + data.id,
      query2: 'update "Endereco" set endereco =' + ' ' +"'"+ data.endereco +"'"+ ', ' + 'numero=' + ' ' +"'"+ data.numero +"'"+ ', ' + 'referencia =' + ' ' +"'"+ data.referencia +"'"+ ', ' + 'cep =' + ' ' +"'"+ data.cep +"'"+ ', ' + 'cidade =' + ' ' +"'"+ data.cidade +"'"+ ', ' + 'provincia =' + ' ' +"'"+ data.provincia +"'" + ' ' + 'where id_usuario = ' + ' ' + data.id
    }

    userControler.ReturnAjax(req,res,'"Clientes"',req.params.id,req.params.method,'"Endereco"',query.query1,'',query.query2,'');
    //userControler.ReturnAjax(req,res,'"Endereco"',req.params.id,req.params.method,'',query.query2,'');

  }
    
  else{
    userControler.ReturnAjax(req,res,'"Clientes"',req.params.id,req.params.method,'"Endereco"');
  }

})




/* ROTA AJAX PARA FORNECEDORES */
router.get('/fornecedores/:id/:method', (req,res,next)=>{

  if(req.params.method == "update"){

    let data = JSON.parse(req.params.id);
  
    let query = {
      query1: 'update "Fornecedores" set razao_social =' + ' ' + "'" +data.razao_social +"'" + ', ' + 'nome_fantasia=' + ' ' +"'"+ data.nome_fantasia +"'" + ', ' + 'responsavel =' + ' ' +"'"+ data.responsavel +"'"+ ', ' + 'email =' + ' '  +"'"+ data.email+"'" + ', ' + 'telefone1 =' + ' ' +"'"+ data.telefone1 +"'"+ ', ' + 'telefone2 =' + ' '  +"'"+ data.telefone2+"'" + ', ' + 'observacao =' + ' '  +"'"+ data.observacao+"'" + ' ' + 'where id = ' + ' ' + data.id,
      query2: 'update "Endereco_Fornecedor" set endereco =' + ' ' +"'"+ data.endereco +"'"+ ', ' + 'numero=' + ' ' +"'"+ data.numero +"'"+ ', ' + 'complemento =' + ' ' +"'"+ data.complemento +"'"+ ', ' + 'cep =' + ' ' +"'"+ data.cep +"'"+ ', ' + 'cidade =' + ' ' +"'"+ data.cidade +"'"+ ', ' + 'provincia =' + ' ' +"'"+ data.provincia +"'" + ' ' + 'where id_usuario = ' + ' ' + data.id
    }

    
    userControler.ReturnAjax(req,res,'"Fornecedores"',req.params.id,req.params.method,'"Endereco_Fornecedor"',query.query1,'',query.query2,'');

  }
  else{
    userControler.ReturnAjax(req,res,'"Fornecedores"',req.params.id,req.params.method,'"Endereco_Fornecedor"');
  }
  

})





/* ROTA AJAX PARA PEDIDOS */
router.get('/pedidos/:id/:method', (req,res,next)=>{

  
  if(req.params.id == "clientes"){
    userControler.ReturnAjax(req,res,'"Clientes"',req.params.id,req.params.method,"");
  }

  if(req.params.id == "produtos"){
    
    userControler.ReturnAjax(req,res,'"Produtos"',req.params.id,req.params.method,"");
  }
  
  if(req.params.id == "complementos"){
    
    userControler.ReturnAjax(req,res,'"Complementos"',req.params.id,req.params.method,"");

  }

  if(req.params.id == "sabores"){
    
    userControler.ReturnAjax(req,res,'"Sabores"',req.params.id,req.params.method,"");

  }


  if(req.params.id == "Vendas"){
    
    userControler.ReturnAjax(req,res,'"Pedidos"',req.params.id,req.params.method,"");

  }

  if(req.params.method == "update"){

    let query = {
      query1: 'update "Pedidos" set status_pedido =  2 where id =' + ' ' + req.params.id,
      query2: 'update "Pedido_itens" set status_item =  2 where id_pedido =' + ' ' + req.params.id,
      query3: 'DELETE FROM public."movCaixa" where id_pedido =' + ' ' + req.params.id
    }

    userControler.ReturnAjax(req,res,'"Pedidos"',req.params.id,req.params.method,'',query,'','','');

  }

  if(req.params.method == "Historico"){
    let query = {
      query1: `select pd.id, pd.valor_total, pd.data_pedido, 
      cl.nome 
      from public."Pedidos" pd 
      inner join public."Clientes" cl 
      on cl.id = pd.id_cliente
      where pd.status_pedido <> 2 
      and cl.id = ${req.params.id}`
  
    }

    userControler.ReturnAjax(req,res,'','',req.params.method,'',query,'','','');

  }


  if(req.params.method == "HistoricoItens"){
    console.log('chegou');
    let query = {
      query1: `select pi.descricao_produto, pi.descricao_sabor, pi.descricao_complemento,
      pi.quantidade_produto 
      from public."Pedidos" pd 
	    inner join public."Pedido_itens" pi 
      on pd.id = pi.id_pedido
      where pd.status_pedido <> 2 
      and pi.id_pedido = ${req.params.id}`
  
    }

    userControler.ReturnAjax(req,res,'','',req.params.method,'',query,'','','');

  }

  
  if(req.params.method == "search"){

    let data = JSON.parse(req.params.id);

    switch(data.table){
      case "Produtos":
        if(data.search == '*'){
          userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Produtos" order by descricao limit 10');
        }
        else{
          userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Produtos"'+" where descricao ilike " +"'%"+ data.value +"%'" + 'order by descricao limit 10',"");
        }
      break;

      case "Vendas":

        if(data.data == "yes"){
          data.value = data.value.split('-').reverse().join('/');
          
          userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Pedidos"'+" where data_pedido = " +' '+ "'"+data.value+"'" + 'order by id DESC',"");
          
        }
        else{
          if(data.search == '*'){
            userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Pedidos"'+" order by id DESC ");
          }
          else{
            userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Pedidos"'+" where id = " +' '+ "'"+data.value+"'" + 'order by id DESC',"");
          }
          
        }

      break;

      case "Sabores":
          userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Sabores"'+" where descricao ilike " +"'%"+ data.value +"%'","");
      break;

      case "Complementos":
        userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Complementos"'+" where descricao ilike " +"'%"+ data.value +"%'","");
      break;


      case "Clientes":
        if(data.search == '*'){
          userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Clientes" order by nome limit 10');
        }
        else{
          userControler.ReturnAjax(req,res,"","",req.params.method,"","SELECT * FROM public."+'"Clientes"'+" where nome ilike " +"'%"+ data.value +"%' or telefone1 ilike " +"'%"+ data.value +"%' or telefone2 ilike " +"'%"+ data.value +"%' " + 'order by nome limit 10' ,"");
        }
      break;

    }
  }

})






/* REQUISIÇÕES POST  */

router.post('/produtos',(req,res,next)=>{

  let query = {
    query1: 'INSERT INTO public."Produtos" ( situacao, grupo, descricao, ean, peso_bruto, peso_liquido, preco_custo, preco_venda, estoque, unidade_entrada, complemento, fracionado, quantidade_sabores, quantidade_minima) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
  }

  let value = {
    value1: [req.body.situacao, req.body.grupo, req.body.descricao, req.body.ean, req.body.peso_bruto, req.body.peso_liquido,req.body.preco_custo, req.body.preco_venda, req.body.estoque, req.body.unidade_entrada, req.body.complemento, req.body.fracionado, req.body.quantidade_sabores, req.body.quantidade_minima]
  }


  userControler.RenderView(req,res,'CadProduto','Mokutech',query,value,'POST','Produtos');

})


router.post("/server",(req,res,next)=>{

  let Pedido = req.body[0];
  let ItensPedido = req.body;
  ItensPedido.splice(ItensPedido[0],1);
  let count = 0 ;

  let query = {
    query1: 'INSERT INTO public."Pedidos" (valor_total, valor_pago, valor_troco, id_cliente, id_forma_pagamento, delivery, balcao, id_funcionario, id_entregador, status_pedido, nome_cliente, data_pedido, hora_pedido, inicio_entrega, fim_entrega) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
    query2: 'INSERT INTO public."Pedido_itens" (id_pedido, id_produto, descricao_produto, quantidade_produto, valor_unitario_produto, descricao_sabor, valor_total_sabor, descricao_complemento, valor_total_complemento, status_item) VALUES((select max(id) from "Pedidos"),$1, $2, $3, $4, $5, $6, $7, $8, $9)',
    query3: 'INSERT INTO public."movCaixa" (id_caixa, id_pedido, valor_movimento, tipo_operacao) VALUES($1, (select max(id) from "Pedidos"), $2, $3)',
  }

  let value = {
    value1: [(Pedido.total_a_pagar ? Pedido.total_a_pagar : 0), (Pedido.valor_pago ? Pedido.valor_pago : 0), (Pedido.valor_troco ? Pedido.valor_troco : 0), Pedido.id_cliente, Pedido.id_formaPagamento, Pedido.delivery, Pedido.balcao, req.session.UserId, Pedido.id_entregador, Pedido.status_pedido, Pedido.nome, Pedido.data_pedido, Pedido.hora_pedido, Pedido.inicio_entrega, Pedido.fim_entrega],
    value2: [],
    value3: [req.session.idCaixa,Pedido.total_a_pagar,'V']
  }
  

  

  userControler.ReturnAjax(req,res,'"Pedidos"',"","insert","",query,value,'',ItensPedido);
  
});



router.post('/clientes', (req,res,next)=>{

  

  let query = {
    query1: 'INSERT INTO public."Clientes" (passaporte,nome, sobrenome, email, telefone1, telefone2) VALUES($1, $2, $3, $4, $5, $6)',
    query2: 'INSERT INTO public."Endereco" (id_usuario, endereco, numero, referencia, cep, cidade, provincia) VALUES($1, $2, $3, $4, $5, $6, $7)'  
  }

  let value = {
    value1: [req.body.passaporte, req.body.nome, req.body.sobrenome, req.body.email, req.body.telefone1, req.body.telefone2],
    value2: [req.body.id, req.body.endereco, req.body.numero, req.body.referencia, req.body.cep, req.body.cidade, req.body.provincia] 
  }

  //console.log(value.value1)

  userControler.RenderView(req,res,'CadClientes','Mokutech',query,value,'POST','Clientes',"Endereco");

})

router.post('/fornecedores', (req,res,next)=>{


  
  let query = {
    query1: 'INSERT INTO public."Fornecedores" ( razao_social, nome_fantasia, responsavel, email, observacao, telefone1, telefone2) VALUES($1, $2, $3, $4, $5, $6, $7)',
    query2: 'INSERT INTO public."Endereco_Fornecedor" (endereco, numero, provincia, cep, cidade, complemento) VALUES($1, $2, $3, $4, $5, $6)'  
  }

  let value = {
    value1: [req.body.razao_social, req.body.nome_fantasia, req.body.responsavel, req.body.email, req.body.observacao, req.body.telefone1, req.body.telefone2 ],
    value2: [req.body.endereco, req.body.numero, req.body.provincia, req.body.cep, req.body.cidade, req.body.complemento] 
  }

  //console.log(value.value1)

  userControler.RenderView(req,res,'CadFornecedores','Mokutech',query,value,'POST','Fornecedores',"Endereco_Fornecedor");

 // userControler.RenderView(req,res,'CadClientes','Mokutech',query,[req.body.regime_tributario, req.body.cnpj, req.body.ie, req.body.razao_social, req.body.nome_fantasia,  req.body.responsavel, req.body.email, req.body.observacao],'POST','Fornecedores');

})

router.post('/pedidos', (req,res,next)=>{
  
})


router.post('/caixa/:method', (req,res,next)=>{

  if(req.params.method == "abrir"){
    if(req.session.idCaixa){
      console.log(req.session.idCaixa);
      userControler.ShowMessage(res,'error','O caixa já foi aberto');
      
    }
    else{
      let dados = req.body;
      
    
      let query = {
        query1: 'select * from usuarios where usuario = '+ ' ' + "'"+dados.usuario+"'" + ' ' + 'and password = ' + ' ' + "'"+dados.senha+"'",
        query2: 'INSERT INTO public."caixa" ( funcionario_abertura, valor_abertura, data_abertura, hora_abertura) VALUES($1, $2, $3, $4)'
        
      }
    
      let value = {
        value2: [dados.usuario, dados.valor_inicial, dados.data_abertura, dados.hora_abertura] 
      }
    
    
      userControler.ReturnAjax(req,res,'caixa',"","abre_caixa","",query,value);
    
    }
  }
  else{
    if(!req.session.idCaixa){
      userControler.ShowMessage(res,'error','Não existe um caixa aberto!');
      
    } 
    else{
      let dados = req.body;
      let total_inserido = Number(dados.dinheiro) + Number(dados.debito) + Number(dados.credito);
    
      console.log(dados.valor_fechamento);
      let query = {
        query1: 'select * from usuarios where usuario = '+ ' ' + "'"+dados.usuario+"'" + ' ' + 'and password = ' + ' ' + "'"+dados.senha+"'",
        query2: 'SELECT id FROM public."caixa" where data_fechamento is null',
        query3:` 
        update public."caixa" set 
        "hora_fechamento" = '${dados.hora_fechamento}', "funcionario_fechamento" = '${dados.usuario}', 
        "data_fechamento" =   '${dados.data_fechamento}', "valor_fechamento" = ${dados.valor_fechamento},
        "dinheiro_inserido" = ${dados.dinheiro}, "debito_inserido" =  ${dados.debito},
        "credito_inserido" =  ${dados.credito}, "total_inserido" =  ${total_inserido}
        where id = (select id from public."caixa" where data_fechamento is null)`   
      }
    
    
      userControler.ReturnAjax(req,res,'caixa',"","fecha_caixa","",query);  
    }  
  }
  
  
  
  
})


module.exports = router;
