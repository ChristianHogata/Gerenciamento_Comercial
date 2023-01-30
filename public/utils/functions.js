

class functions{


    constructor(){
        this.onInputClick();
        this.onLoginPage();
        this.onMenuPrincipalClick();
        this.navMenuClick();
        this.onCelClick();
        this.onButtonClick();
        this.CheckPedido();
        this.SetHora();
        this.mascara();
    } 




    SetHora(){
        setInterval(()=>{
            if(window.location.pathname == "/pedidos"){
                let hora = this.getHours();
                let today = this.getDate();
                     
                document.getElementById('hora').textContent = "Hora:"+ " " + hora;
                document.getElementById('data1').textContent = "Data:" + " " + today;
            }
            
        },1000)
    }

    


    zero(x) {
        if (x < 10) {
            x = '0' + x;
        } 
        return x;
    }



   
    CheckPedido(){
        if(window.location.pathname == "/pedidos"){
            sessionStorage.removeItem("Pedido");
            sessionStorage.removeItem("carrinho");
        }
    }
    


   
    formatarCampos(div,divName) {
        
        if(divName == "VendaDados"){
            div.forEach(el=>{
                if(el.name == "cep"){
                    var v=el.value.replace(/\D/g,"");

                    v=v.replace(/(\d{3})(\d)/,"$1.$2");

                    v=v.replace(/(\d{3})(\d)/,"$1.$2");

                    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

                    el.value = v;
                }
            })
        }   
    }




  

    onMenuPrincipalClick(){
        let menu = document.querySelectorAll('.dropdown-item');
       
        menu.forEach(el=>{
            el.addEventListener('click', ()=>{
                switch(el.name){

                    case "abrir_caixa":
                        $('#ModalAberturaCaixa').modal('show');
                    break;

                    case "fechar_caixa":
                        $('#ModalFechamentoCaixa').modal('show');
                    break;

                }
            })
        })
    }

    
    
    
    



    onInputClick(){
        switch(window.location.pathname){

            case "/pedidos":
                
                let input = document.querySelectorAll('input');
                let btn = document.querySelectorAll('button');
                
                input.forEach(el=>{
                    el.addEventListener("click",()=>{
                 
                    switch(el.id){
                       
                        case "addClient":
                            this.ajax2('GET',window.location.href + '/' + "clientes" + '/' + 'all', "Clientes" );
                            setTimeout(() => {
                                $('#ModalClient').modal('show'); 
                            }, 1000);     
                        break;
    
                        case "codigo":
                            let inputTbVendasCod = document.querySelector("#TbVendas").type = "number";
                        break;
    
                        case "data":
                            let inputTbVendasData = document.querySelector("#TbVendas").type = "date";
                        break;
        
                    } 
                })   
            })
        }
    }


    onPressKey(){

        document.addEventListener("keydown", (btn)=>{
            if(btn.code == "F2"){

             
             this.ajax2('GET',window.location.href + '/' + "produtos" + '/' + 'all', "Produtos");
             

             setTimeout(() => {
                 $('#Modal1').modal('show');
             }, 1000);

            }

            if(btn.code == "F8"){

             this.ajax2('GET',window.location.href + '/' + "Vendas" + '/' + 'all', "Vendas");
             setTimeout(() => {
                 $('#ModalVendas').modal('show');
             }, 1000);
             

            }
         })
    }



    onLoginPage(){
        if(window.location.pathname == "/"){
            let buttonLogin = document.querySelector('#btnEnviar');
            let form = document.querySelector('#formLogin');
            let url;
            
            
            form.addEventListener('submit', ev=>{
                ev.preventDefault();
            })

            
            buttonLogin.addEventListener('click', ()=>{
                
                let array = [];
                let user = form.querySelector('#user').value;
                let pass = form.querySelector('#password').value;
                
                if((user) && (pass)){
                    array.push(user.toLowerCase(),pass.toLowerCase() );
                    url =  window.location.href  + 'login' + '/' + array + '/' + "login";
                    this.ajax('GET',url);
                }
                
            })
        }
    }

    

    onButtonClick(){
        let btn = document.querySelectorAll('button');
        
        
        switch(window.location.pathname){
    
            case "/pedidos":
                
                this.onPressKey();
    
                btn.forEach(bt=>{

                    bt.addEventListener('click',()=>{

                        switch(bt.id){

                            case "btnModal2":
    
                                bt.disabled = true;
        
                                let ModalPedidoQtd = document.querySelector('#Modal2');
                                let id = ModalPedidoQtd.querySelector('input[name="id"]');
                                let qtd = ModalPedidoQtd.querySelector('input[name="qtd"]');
                                let valor_unitario = ModalPedidoQtd.querySelector('input[name="valor_venda"]');
                                let valor_total = ModalPedidoQtd.querySelector('input[name="valor_total"]');
                                let total = Number(valor_unitario.value.replace("¥","")) * Number(qtd.value);
                                valor_total.value = "¥" + total;
                                
        
                                setTimeout(()=>{
                                    if(this.checkProdutoQuantidade() != false){
                                        if(confirm("Deseja finalizar a inclusao deste produto?")){
                                            
                                            let table_pedido_itens = document.querySelector('#tbPedidoItens');
                                            let data = this.getProductData(id.value,"produtos");
                                            let carrinho = [];
                                            let PedidoCarrinho = {
                                                id: data.id,
                                                descricao: data.descricao,
                                                valor_unitario_produto: data.preco_venda,
                                                quantidade: Number(qtd.value),
                                                valor_total: total
                                            }

                                            bt.disabled = false;
                                            
                                            if(sessionStorage.getItem('carrinho')){
                                                carrinho = JSON.parse(sessionStorage.getItem("carrinho")); 
                                            }
                    
                                            
                                            
                                            if(sessionStorage.getItem('PedSabor')){
                                                let sabor = JSON.parse(sessionStorage.getItem('PedSabor'));
                                                PedidoCarrinho.valor_unitario_produto = (Number(PedidoCarrinho.valor_unitario_produto) + Number(sabor.valor_total_sabores));
                                                PedidoCarrinho =  Object.assign(PedidoCarrinho,sabor);  
                                            }

                    
                                            if(sessionStorage.getItem('PedComplementos')){
                                                let complemento = JSON.parse(sessionStorage.getItem('PedComplementos'));
                                                PedidoCarrinho.valor_unitario_produto = Number(PedidoCarrinho.valor_unitario_produto) + Number(complemento.valor_total_complementos);
                                                PedidoCarrinho =  Object.assign(PedidoCarrinho,complemento);
                                                
                                            }
                    
                                            carrinho.push(PedidoCarrinho);
                                            sessionStorage.setItem('carrinho',JSON.stringify(carrinho));

                                            this.CreateTable(table_pedido_itens,JSON.parse(sessionStorage.getItem("carrinho")),"Pedido_item");

                                            sessionStorage.removeItem("PedSabor");
                                            sessionStorage.removeItem("PedComplementos");

                                            this.atualizaMostrador();

                                            $('#Modal2').modal('hide'); 
                                            $('#Modal1').modal('show');
                                        }

                                        bt.disabled = false;
                                    }
                                    else{
                                        bt.disabled = false;
                                    }
                                },1000);

                            break;

    
                            case "btnModal3":                              
                                this.ajax2('GET',window.location.href + '/' + "complementos" + '/' + 'all', "Complementos");
                                $('#Modal3').modal('show');      
                            break;
        
        
                            case "btnSaborConcluir":
                                this.flavorsCount();
                            break;
        
        
                            case "closeModalSabor":
                                $('#Modal4').modal('hide');
                                $('#Modal2').modal('hide');
                            break;

        
                            case "btnComplementoConcluir":
                                this.ComplementCount();
                            break;

        
                            case "closeModalComplemento":
                                $('#Modal3').modal('hide');
                            break;

        
                            case "closeModalConsultaVendas":
                                $('#ModalVendas').modal('hide');
                            break;
        
                            
                            case "venda_balcao":
                                bt.disabled = true; 
                                this.geraPedido(bt,"balcao"); 
                                    
                            break;
        
        
                            case "venda_delivery":
                                bt.disabled = true; 
                                this.geraPedido(bt,"delivery");
                            break;

        
                            case "search":
        
                                let input = document.querySelector("."+bt.name);
                                
                                let data = {
                                    value: input.value,
                                    table: input.name,
                                    data: ""
                                }
                                
                                if(input.value){
                                  
                                    if(input.type == "date"){
                                        data.data = "yes";  
                                    }
                                          
                                    this.ajax2('GET',window.location.href + '/' + JSON.stringify(data) + '/' + "search" , data.table);
                                }
        
                            break;


        
                            case "carrinho":
                                this.ajax2('GET',window.location.href + '/' + "produtos" + '/' + 'all', "Produtos");
                                
                                setTimeout(() => {
                                    $('#Modal1').modal('show');
                                }, 1000);
                                
                            break;
        
                            case "consulta_vendas":
                                this.ajax2('GET',window.location.href + '/' + "Vendas" + '/' + 'all', "Vendas");
                                
        
                                setTimeout(() => {
                                    $('#ModalVendas').modal('show');
                                }, 1000);
        
                            break;

                            case "btnDelete":
                                this.deleteItens();
                            break;

                            case "btnCancelarImpressao":
                                $('#ModalCupom').modal('hide');
                                this.showAlert('Sucesso!',"Pedido finalizado!","alert-success",'yes',window.location.href);
                            break;

                            case "btnImpressao":
                                var conteudo = document.getElementById('conteudoCupom').innerHTML,
                                
                                tela_impressao = window.open('about:blank');
                                tela_impressao.document.write(conteudo);
                                tela_impressao.window.print();
                                tela_impressao.window.close();

                            break;
                        }
                    })
                })
    
            break



            default:
                
            
                btn.forEach(bt=>{
                    bt.addEventListener('click',()=>{
        
                        switch(bt.id){

        
                            case "btnExcluir":

                                let userId;

                                [...document.querySelector('#formCad')].forEach(el=>{
                                    
                                    
                                    
                                    if(el.id == "id"){
                                         userId = el.value;
                                    }
    
                                })
                                
                                this.ajax('GET',window.location.href + '/' + userId + '/' + 'delete');                             
                            break;


    
                            case "btnEditar":
    
                                if(confirm("Deseja editar o registro?")){
        
                                    let buttonBar =  document.querySelector('#btns');
                                    let btnEditar = buttonBar.querySelector('#btnEditar');
                                    let btnVoltar = buttonBar.querySelector('#btnVoltar');   
                                    let btnExcluir = buttonBar.querySelector('#btnExcluir');                
                                    
        
                                    
                                    if(btnEditar){
                                        buttonBar.removeChild(btnExcluir);
                                        buttonBar.removeChild(btnVoltar);
                                        buttonBar.removeChild(btnEditar);                                      
                                    }
                                    
                                    this.CriarBtn(document.querySelector('#btns'),["btnCancelar","btnConfirma"]);
                                                                         
                                
                                    [...document.querySelector('.CadForm')].forEach(el=>{
                                        
                                        if(el.id == "id"){
                                            el.required = true; 
                                        }
                                        else{
                                            el.disabled = false;
                                        }
                                        
                                    });
                                }
                                
                            break;


    
                            case "btnConfirma":
    
                                let dados = {};
                                    
                                [...document.querySelector('#formCad')].forEach(el=>{
    
                                    dados[el.name] = el.value;
                                        
                                })

                               let url =  window.location.href + '/' + JSON.stringify(dados) + '/' + "update";

                                this.CheckForm('GET',url,document.querySelector('#formCad'),'ajax',dados,'');
                                
                                
                                
        
                            break;


    
                            case "btnCancelar":
    
                                window.location.href = window.location.href; 
        
                            break;


    
                            case "btnVoltar":
                                window.location.href = window.location.href; 
                            break;


    
        
                            case "btnSalvar":
                                let form = document.querySelector("#formCad");
                                this.CheckForm('','',form,'form','','');
                                  
                            break;
    
    
                            
    
                            case "abrir_caixa":
                                let form_caixa = document.querySelector("#form_caixa");
                                //let input = form_caixa.querySelectorAll("input");
                                let textArea = form_caixa.querySelector('textarea');
                                
                                form_caixa.addEventListener('submit', ev=>{
                                    ev.preventDefault();
                                })

                                let caixa_abertura = {
                                    usuario: "",
                                    senha: "",
                                    valor_inicial: "",
                                    data_abertura: this.getDate(),
                                    hora_abertura: this.getHours(),
                                    observacao: textArea.value
                                
                                };
                                
                                [...form_caixa].forEach(el=>{
                                    switch(el.name){
                                        case "usuario":
                                            caixa_abertura.usuario = el.value;
                                        break;
        
                                        case "senha":
                                            caixa_abertura.senha = el.value;
                                        break;
        
                                        case "valor_inicial":
                                            caixa_abertura.valor_inicial = el.value;
                                        break;
                                        
                                    }
                                })

                               
                                this.CheckForm("POST","/caixa/abrir",form_caixa,'ajax',caixa_abertura,'json');
                                $('#ModalAberturaCaixa').modal('hide');
                                
    
                            break;


                            case "fechar_caixa":
                                
                                let form_caixa_fechamento = document.querySelector("#form_caixa_fechamento");
                                let textArea2 = form_caixa_fechamento.querySelector('textarea');
                                
                                form_caixa_fechamento.addEventListener('submit', ev=>{
                                    ev.preventDefault();
                                })

                                let caixa_fechamento = {
                                    usuario: "",
                                    senha: "",
                                    valor_fechamento: "",
                                    dinheiro: '',
                                    debito: '',
                                    credito: '',
                                    data_fechamento: this.getDate(),
                                    hora_fechamento: this.getHours(),
                                    observacao: textArea2.value
                                
                                };
                                
                                [...form_caixa_fechamento].forEach(el=>{
                                    switch(el.name){
                                        case "usuario":
                                            caixa_fechamento.usuario = el.value;
                                        break;
        
                                        case "senha":
                                            caixa_fechamento.senha = el.value;
                                        break;
        
                                        case "dinheiro":
                                            caixa_fechamento.dinheiro = el.value;
                                        break;

                                        case "credito":
                                            caixa_fechamento.credito = el.value;
                                        break;

                                        case "debito":
                                            caixa_fechamento.debito = el.value;
                                        break;

                                       
                                        
                                    }
                                })

                                caixa_fechamento.valor_fechamento = Number(caixa_fechamento.dinheiro) + Number(caixa_fechamento.debito) + Number(caixa_fechamento.credito); 
                               
                                this.CheckForm("POST","/caixa/fechamento",form_caixa_fechamento,'ajax',caixa_fechamento,'json');
                                $('#ModalFechamentoCaixa').modal('hide');
                                
    
                            break;
    
                        }
        
                    })
                })
            break;
        }

        
    }





    CheckForm(sendMethod,url,form,method,dados,methodHeader){

        let data;
        let count = 0;

        [...form].forEach(el=>{
            

            if(el.dataset.tipodado == "number"){
           
                if((el.name == "cep") || (el.name == "telefone1") || (el.name == "telefone2")){
                    data = el.value.replace("-","");
                    data = data.replace(" ","");
                    data = data.replace(" ","");
                    
                    
                    if((isNaN(data)) || (el.value == "")){
                        el.style.border = "2px solid";
                        el.style.borderColor  = 'red';
                        el.dataset.erro = 'true'; 
                    }
                    else{
                        el.style.border = "";
                        el.style.borderColor  = ''; 
                        el.dataset.erro = '';  
                    }
                }
                else{

                    if((isNaN(el.value)) || (el.value == "")){
                        el.style.border = "2px solid";
                        el.style.borderColor  = 'red'; 
                        el.dataset.erro = 'true';
                    }
                    else{
                        el.style.border = "";
                        el.style.borderColor  = '';
                        el.dataset.erro = '';
                    }
                }    
            } 
            else{
                if(el.dataset.tipodado == "string"){
                    data = el.value;


                    if(!isNaN(data)){
                        el.style.border = "2px solid";
                        el.style.borderColor  = 'red';
                        el.dataset.erro = 'true'; 
                    }
                    else{
                        el.style.border = "";
                        el.style.borderColor  = ''; 
                        el.dataset.erro = '';  
                    } 
                    
                }
                else{
                    if(el.dataset.tipodado == "any"){
                        data = el.value;
    
    
                        if(!data){
                            el.style.border = "2px solid";
                            el.style.borderColor  = 'red';
                            el.dataset.erro = 'true'; 
                        }
                        else{
                            el.style.border = "";
                            el.style.borderColor  = ''; 
                            el.dataset.erro = '';  
                        } 
                        
                    } 
                }
            } 

            
            
            if(el.dataset.erro == "true"){
                count++;
            }

        })

        if(count <= 0){
            if(method == "form"){
                this.showAlert('Atenção!','Processando, aguarde...',"alert-warning",'block');
                form.submit();
            }
            else{
                this.ajax(sendMethod,url,JSON.stringify(dados),methodHeader);
            }
            
        }
        else{
            this.showAlert('Erro!','Corrija os campos em vermelho para continuar',"alert-danger");
        }
 


    }

    mascara(){
        if(window.location.pathname == "/pedidos"){
            let valor_pago = document.querySelector('#valor_pago');
            let valor_troco = document.querySelector('#valor_troco');
            let valor_total = document.querySelector('#total_a_pagar');

            valor_pago.addEventListener('keyup', el=>{
                valor_pago.value = '¥' + valor_pago.value.replace('¥','');
                valor_troco.value = '¥' + (Number(valor_pago.value.replace('¥','')) - Number(valor_total.value.replace('¥','')));
            });


        }
        
    }



    
    geraPedido(bt,tipoVenda){
        let dadosPedido = document.querySelector("#dadosVenda");
        let inputs = dadosPedido.querySelectorAll("input");
        let id_fp = dadosPedido.querySelector('#id_formaPagamento');
        let clienteId = dadosPedido.querySelector("#addClient");
        let dados = [];
        let carrinho = JSON.parse(sessionStorage.getItem("carrinho"));
        let troco = document.querySelector("#valor_troco");
    
                          
                            
        let Pedido = {
            id_cliente: clienteId.dataset.id_cliente,
            id_formaPagamento: id_fp.value,
            total_a_pagar: Number(0),
            valor_pago: Number(0),
            valor_troco: Number(0),
            data_pedido: this.getDate(),
            hora_pedido: this.getHours(),
            delivery: (tipoVenda == "delivery" ? "S": ""),
            balcao: (tipoVenda == "balcao" ? "S": ""),
            inicio_entrega: "",
            fim_entrega: "",
            id_funcionario: 0,
            id_entregador: 0,
            status_pedido: "1",
        }
     
                           
                            

        inputs.forEach(el=>{
            if(el.name == 'valor_pago'){
                Pedido[el.name] = el.value.replace('¥','');  
            }
            else{
                Pedido[el.name] = el.value;
            }
            
        })

     
        Pedido.total_a_pagar = Pedido.total_a_pagar.replace("¥","");

     
        if(Number(Pedido.valor_pago) - Number(Pedido.total_a_pagar.replace("¥","")) >= 0){
            Pedido.valor_troco = Number(Pedido.valor_pago) - Number(Pedido.total_a_pagar.replace("¥",""));
            troco.value = "¥" + Pedido.valor_troco;
        }



        if(troco.value.replace("¥","") >= 0){
            setTimeout(()=>{

                if(confirm("Deseja finalizar essa venda?")){
                    bt.disabled = false;
                    dados.push(Pedido,carrinho);

                    sessionStorage.setItem("Pedido",JSON.stringify(Pedido));
                   
                    if(!this.checkInputs()){ 
                        this.showAlert('Erro!','Preencha todos os campos!',"alert-danger");
                        
                    }
                    else{
                        let tbVendas = document.querySelectorAll('#tbPedidoItens > tr');
                        if(tbVendas.length > 0){
                            this.showAlert('Atenção!','Processando, aguarde...',"alert-warning",'block');
                            this.ajax("POST","/server",JSON.stringify(dados),"json"); 
                        }
                        else{
                            this.showAlert('Erro!','Adicione algum produto!',"alert-danger");  
                        }
                    }
                }

                bt.disabled = false;

                
            },1000)
        }
     
    }




    zeraInputs(){
        let dados = document.getElementById("dadosVenda");
        let inputs = dados.querySelectorAll("input");
        let select = dados.querySelector("select");

        inputs.forEach(el=>{
            if(el.id != "total_a_pagar"){
                el.value = "";
            }
           
        })

        select.value = "default";
    }




    getHours(){
        let novaHora = new Date();
        let hora = novaHora.getHours();
        let minuto = novaHora.getMinutes();
        minuto = this.zero(minuto);
        hora = hora+':'+minuto;
        return hora;
       
    }



    getDate(location){
        let novaHora = new Date();
        let today = new Date(novaHora);
        if(location){
            today = today.toLocaleDateString(location);
        }
        else{
            today = today.toLocaleDateString();    
        }
        
        return today;
       
    }



    deleteItens(){
        let btn = document.querySelectorAll('#btnDelete');
        let table_pedido_itens = document.querySelector('#tbPedidoItens');
        let carrinho = [];
        
        
        if(btn){
           carrinho = JSON.parse(sessionStorage.getItem("carrinho"));
           btn.forEach(el=>{
                el.addEventListener("click", (bt)=>{
                    if(confirm("Deseja remover esse produto do pedido?")){
                        let coluna = el.parentNode;
                        let linha = coluna.parentNode;
                        let index = carrinho.findIndex(i => i.id === linha.dataset.id);
                        
                        console.log(index);                   
                        carrinho.splice(index,1); 
                       
                       sessionStorage.setItem('carrinho',JSON.stringify(carrinho));
                       this.atualizaMostrador();
                       this.CreateTable(this.CreateTable(table_pedido_itens,JSON.parse(sessionStorage.getItem("carrinho")),"Pedido_item"));
                    }
                })  
            })

            this.atualizaMostrador();  
        }

    }




    deleteVenda(){
        let btnCancelaVenda = document.querySelectorAll('#btnCancelVenda');

        if(btnCancelaVenda[0]){
            btnCancelaVenda.forEach(el=>{
                el.addEventListener("click", bt=>{
                    if(confirm("Deseja realmente excluir essa venda?")){
                        let coluna = el.parentNode;
                        let idVenda = coluna.parentNode;

                        $('#ModalVendas').modal('hide');

                        this.ajax('GET',window.location.href + '/' + idVenda.dataset.id+ '/' + 'update');
                        
                    }
                })
            })
        }
    }




    payMethodAdd(){
        let PayData = document.querySelector("div[name='formaFp']");
        let vlrVenda = PayData.querySelector("#fpValorVenda");
        let vlraPagar = PayData.querySelector("#fpValorApagar");
        let fpValor = PayData.querySelector("#fpValor");
        let forma_pagamento = PayData.querySelector('#fp');
        let data = JSON.parse(sessionStorage.getItem('pagamento'));
        
        vlrVenda.value = "¥" + data.valor_a_Pagar;
        vlraPagar.value = "¥" + data.valor_a_Pagar;

        fpValor.addEventListener('change',()=>{
            data.valor_pago = fpValor.value;
            data.troco = Number(fpValor.value.replace("¥","")) - Number(vlraPagar.value.replace("¥",""));
            data.forma_pagamento = forma_pagamento.value; 
            
            if(Number(fpValor.value) - Number(vlrVenda.value.replace("¥","")) >= 0){
                data.valor_a_Pagar = 0;
            }
            else{
                data.valor_a_Pagar = Math.abs(Number(fpValor.value) - Number(vlrVenda.value.replace("¥","")));
                data.troco = 0;
            } 

            sessionStorage.setItem('pagamento',JSON.stringify(data));

            this.updatePayMethod(PayData);
            
        })
       
    }




    updatePayMethod(form){
        let vlrPago = form.querySelector("#fpValorPago");
        let vlrTroco = form.querySelector("#fpValorTroco");
        let vlr_a_Pagar = form.querySelector("#fpValorApagar");
        let data = JSON.parse(sessionStorage.getItem('pagamento'));
        let table = document.querySelector("#listaFP");

        vlrPago.value = "¥" + data.valor_pago;
        vlrTroco.value = "¥" + data.troco;
        vlr_a_Pagar.value = "¥" + data.valor_a_Pagar;
        
        this.CreateTable(table,[JSON.parse(sessionStorage.getItem('pagamento'))],"Forma_Pagamento");
    }





    atualizaMostrador(){
        let carrinho = JSON.parse(sessionStorage.getItem("carrinho"));
        let valor = 0;
        let total_a_pagar = document.querySelector('#total_a_pagar');
     
        if(window.location.pathname == "/pedidos"){
            if(carrinho){
                carrinho.forEach(el=>{
                    valor = Number(valor) + Number(el.valor_total);

                    let pagamento = {
                        forma_pagamento: "",
                        valor_a_Pagar: Number(valor),
                        valor_pago: 0,
                        troco: 0
                    }
            
                })
            }

            total_a_pagar.value = "¥" + valor;

        }
    }




    navMenuClick(){
        let Novo_Registro = document.querySelector('div[name="Data"]');
        let Pesquisa = document.querySelector('div[name="List"]');
        let navMenu = document.querySelectorAll('.nav-link');
        let menuItens = document.querySelectorAll('.dropdown-item');
        
        navMenu.forEach(button=>{
           
            button.addEventListener('click', ()=>{
              
                switch (button.innerText){
    
                   case 'Pesquisa':
                        button.classList.add('active');
                        Novo_Registro.style.display = 'none';
                        Pesquisa.style.display = '';
                        let form =  Data.querySelector('form');

                        [...form].forEach(el=>{
                            
                            if(el.id){
                                el.value = "";
                                el.required = false;  
                                el.disabled = true;
                            }
                            
                            el.value = "";
                            el.required = true;
                            el.disabled = true;
                        })
                   break;
                   
                   
    
                   case 'Novo Registro':
                        Novo_Registro.style.display = '';
                        Pesquisa.style.display = 'none';
                        let teste =  Novo_Registro.querySelector('form');               
                    
                        this.RemoverBtn(document.querySelector('#btns'));
                        this.CriarBtn(document.querySelector('#btns'),['btnVoltar','btnSalvar']);
                        
                        [...teste].forEach(el=>{
                            
                            if(el.id){
                                el.value = "";
                                el.required = false;
                                el.style.border = "";
                                el.style.borderColor  = ''; 
                                el.dataset.erro = '';  
                            }

                            if(el.id == "id"){
                                el.required = true; 
                                el.style.border = "";
                                el.style.borderColor  = ''; 
                                el.dataset.erro = '';
                            }
                            else{
                                el.value = "";
                                el.required = true;
                                el.disabled = false;
                                el.style.border = "";
                                el.style.borderColor  = ''; 
                                el.dataset.erro = '';
                            } 
                        })
                   break;
    
                   
                }
               
            })
        });

        menuItens.forEach(item=>{
            item.addEventListener('click', el=>{

                switch(item.innerText){

                    case "Pedido":
                        this.ajax('GET',window.location.href.replace(window.location.pathname,'/accessVerify/login'));
                    break;
                }

            })
        })
        
    }




    checkInputs(){
        let inputs = document.querySelectorAll('#dadosVenda > div > div > input');
        let select = document.querySelector('#id_formaPagamento');

        let retorno = true;

        inputs.forEach(el=>{
            if(!el.value){
                retorno = false;  
            }
        })

        if(!select.value){
            retorno = false;  
        }
           
        return retorno; 
    }



    CriarBtn(btnBar,btns){

        btns.forEach(bt=>{
          let botao = document.createElement('button');
            botao.type = "button";
            botao.id = bt;
            botao.classList.add('btn-outline-primary');
            botao.classList.add('btn');
            botao.innerHTML = bt.replace("btn","");
            btnBar.appendChild(botao);
        })
        
        this.onButtonClick();
        
    }




    RemoverBtn(btnBar){

        let btns = btnBar.querySelectorAll('button');

        btns.forEach(bt=>{
            btnBar.removeChild(bt);
        })

    }
    
    


    onCelClick(){
          
        let Novo_Registro = document.querySelector('div[name="Data"]');
        let Pedidos = document.querySelector('div[name="List"]');
        let table = document.querySelectorAll('.tabela > tbody > tr');
        let tableProduto = document.querySelectorAll('.tbProduto> tbody > tr');
        let tabelaCliente = document.querySelectorAll('.tbClient > tbody > tr ');
        let tabelaVendas = document.querySelectorAll('.tbVendas > tbody > tr ');
        

        

        
       
        if(window.location.pathname != "/pedidos"){
            table.forEach(el=>{
    
                el.addEventListener('click', (tr)=>{
        
                    this.RemoverBtn(document.querySelector('#btns'));
                    this.CriarBtn(document.querySelector('#btns'),["btnVoltar","btnExcluir","btnEditar"]);
                    
                    Novo_Registro.style.display = '';
                    Pedidos.style.display = 'none';
                  
                    this.ajax('GET',window.location.href + '/' + el.querySelector('th[name="codigo"]').innerHTML+ '/' +'select'); 
                   
        
                })
        
            })
        }
        else{
            tableProduto.forEach(el=>{
    
                el.addEventListener('click', ()=>{
        
                    
                    $('#Modal1').modal('hide');
                    $('#Modal2').modal('show');
                    this.addProductQtd(el.dataset.id);
                    
        
                })
        
            })
    
    
            tabelaCliente.forEach(el=>{
        
                el.addEventListener('click', ()=>{

                    this.addInputData(el.dataset.id, "#addClient");
                    $('#ModalClient').modal('hide');
        
                })
        
            })


            tabelaVendas.forEach(el=>{
        
                el.addEventListener('click', ()=>{

                    alert(el.dataset.id);
        
                })
        
            })
        }  
    }
    


    checkProdutoQuantidade(){
        let ModalPedidoQtd = document.querySelector('#Modal2');
        let inputs = ModalPedidoQtd.querySelectorAll('input');
        let retorno;

        inputs.forEach(el=>{
            if((el.name == "qtd") && (el.value <= 0)){
                alert("Informe a quantidade do produto!");
                retorno = false;
            }

            if((el.name == "valor_venda") && (el.value.replace("¥","") <= 0)){
                alert("Produto com valor de venda invalido, corrija no cadastro de produtos!");
                retorno = false;
            }

            if((el.name == "valor_total") && (el.value.replace("¥","") <= 0)){
                alert("O valor total da venda deve ser maior do que 0, confira o valor dos produtos!");
                retorno = false;
            }
        })

        return retorno;
    }





    addInputData(id,el){
        
        let input = document.querySelector(el);
        let clientes = JSON.parse(sessionStorage.getItem("clientes"));

        clientes = clientes.find(i => i.id === id);

        input.value = clientes.nome + " " + clientes.sobrenome;
        input.dataset.id_cliente = clientes.id;

    }





    addProductQtd(id){

        let ModalPedidoQtd = document.querySelector('#Modal2');
        let inputs = ModalPedidoQtd.querySelectorAll('input');
        let btnComplemento = ModalPedidoQtd.querySelector("#btnModal3"); 
        

        let produtos = JSON.parse(sessionStorage.getItem("produtos"));

        produtos = produtos.find(i => i.id === id);

        if(produtos.complemento == "S"){
            btnComplemento.style.display = "block";
            btnComplemento.disabled = false;
        }
        else{
            btnComplemento.style.display = "none";
            btnComplemento.disabled = true;  
        }

        if((produtos.fracionado == "S") || (produtos.quantidade_sabores == "1")){
            
            this.ajax2('GET',window.location.href + '/' + "sabores" + '/' + 'all', "Sabores",produtos);
            $('#Modal4').modal('show');
            
        }

        inputs.forEach(el => {

            switch(el.name){

                case "valor_venda":
                    el.value = "¥" + produtos.preco_venda;
                break;

                case "id":
                    el.value = produtos.id;
                break;

                case "qtd":
                    el.value = "";
                break;

                case "valor_total":
                    el.value = "¥"+ 0;
                break;
            }
                    
        });  
    }




    getProductData(id,object){
        
        let dados = JSON.parse(sessionStorage.getItem(object));

        dados = dados.find(i => i.id === id);
        
        return dados;
    }


 



    addProductTable(id,table){

        let dados = JSON.parse(sessionStorage.getItem("produtos"));

        dados = dados.find(i => i.id === id);

    }




    flavorsCount(){
        let table = document.querySelectorAll('input[name="sabor"]');
        let count = 0;
        let id_produto = document.querySelector("#id");
        let quantidade_sabores = this.getProductData(id_produto.value,'produtos');
        let valor_produto = quantidade_sabores.preco_venda;
        let Sabores = {
            valor_total_sabores: 0,
            sabores: "",
            id_sabores: ""
           
        };

    
        quantidade_sabores = quantidade_sabores.quantidade_sabores;
        
        [...table].forEach(el=>{
            if(el.checked){

                count++;                  
                Sabores.sabores = (Sabores.sabores == "" ? "" : Sabores.sabores+",") + " " + el.dataset.sabor;
                Sabores.valor_total_sabores = Number(Sabores.valor_total_sabores) + Number(el.dataset.valor_unitario);
                Sabores.id_sabores = (Sabores.id_sabores == "" ? "" : Sabores.id_sabores+",") + " " + el.dataset.id;
                
            }
 
        })
        
    
        if(!quantidade_sabores){

            alert("Quantidade de sabores nao informada no cadastro desse item, edite o produto no cadastro!");

        }
        else{

            if(count != quantidade_sabores){

                alert("Selecione " + quantidade_sabores + " " + "sabor(es) para este produto!");

            }
            else{

                if(count == quantidade_sabores){
                                  
                    let PedidoQtd = document.querySelector('#Modal2');
                    let inputs = PedidoQtd.querySelectorAll('input');
                    
                    inputs.forEach(el=>{
                        if(el.name == "valor_venda"){
                            el.value = "¥"+ (Number(Sabores.valor_total_sabores) + Number(valor_produto));
                        }
                    })
        
        
                    
                    sessionStorage.setItem('PedSabor',JSON.stringify(Sabores));
        
                    $('#Modal4').modal('hide');
                }
            }
        }    
    }




    ComplementCount(){
        let table = document.querySelectorAll('input[name="complemento"]');
        let count = 0;
        let PedidoQtd = document.querySelector('#Modal2');
        let inputs = PedidoQtd.querySelectorAll('input');
        let id_produto = document.querySelector("#id");
        let Pedido_item = this.getProductData(id_produto.value,'produtos');
        let valor_item = Pedido_item.preco_venda;

       
       
        let Complementos = {
            valor_total_complementos: 0,
            complementos: "",
            id_complementos: ""
           
        };
        
   
        [...table].forEach(el=>{
            if(el.checked){

                count++;                
                Complementos.complementos = (Complementos.complementos == "" ? "" : Complementos.complementos+",") + " " + el.dataset.complemento;   
                Complementos.id_complementos = (Complementos.id_complementos == "" ? "" : Complementos.id_complementos+",") + " " + el.dataset.id; 
                Complementos.valor_total_complementos = Number(Complementos.valor_total_complementos) + Number(el.dataset.valor_unitario);
   
            }
        })


        if(sessionStorage.getItem("PedSabor")){
            let sabor = JSON.parse(sessionStorage.getItem("PedSabor"));
               
            inputs.forEach(el=>{
                if(el.name == "valor_venda"){
                    el.value = "¥"+  (Number(Complementos.valor_total_complementos) + Number(sabor.valor_total_sabores) + Number(valor_item));
                }
            })
        }
        else{
            inputs.forEach(el=>{
                if(el.name == "valor_venda"){
                    el.value = "¥"+ (Number(Complementos.valor_total_complementos) + Number(valor_item));
                }
            })
        }

        sessionStorage.setItem('PedComplementos',JSON.stringify(Complementos));
        $('#Modal3').modal('hide');
            
    }



    showAlert(type,msg,classMsg,timer,path){

        let contentAlert = document.querySelector('#alert');
        let title = contentAlert.querySelector('#title');
        let msgContent = contentAlert.querySelector('#msg');
        let btn = contentAlert.querySelector('#closeModal');

        btn.addEventListener('click',bt=>{
            contentAlert.style.display = 'none';  
        })

        
        if(type == 'Sucesso!'){
            contentAlert.classList.remove('alert-danger');
            contentAlert.classList.remove('alert-warning'); 
        }
        
        if(type == 'Erro!'){
            contentAlert.classList.remove('alert-success');
            contentAlert.classList.remove('alert-warning');
        }

        if(type == 'Aguarde!'){
            contentAlert.classList.remove('alert-success'); 
            contentAlert.classList.remove('alert-danger');
        }

        contentAlert.style.display = 'block';
        contentAlert.classList.add(classMsg);
        title.innerHTML = type;
        msgContent.innerHTML = msg;

        
        if(timer == "yes"){
            $('#loading').modal({
                backdrop: 'static',
                keyboard: false, 
                show: true
            }); 
            $('#loading').modal('show');
    
            setInterval(()=>{
                
                    
                window.location.href = path;
    
            },2000);
        
        }
    
        if(timer == 'block'){
            $('#loading').modal({
                backdrop: 'static',
                keyboard: false, 
                show: true
            }); 
            $('#loading').modal('show');        
        }    
    }



    ajax(method,url,object,methodHeader){

        let ajax = new XMLHttpRequest();

        ajax.open(method,url);

        if(methodHeader){
            ajax.setRequestHeader("Content-Type", "application/json");
        }

        ajax.onload = ev =>{

        

         let obj = JSON.parse(ajax.responseText);

            
            if(obj.type == 'error'){
                console.log(obj);
                this.showAlert('Erro!',obj.message,"alert-danger");

                //window.location.href = window.location.href;
                
            }

            if(obj.type == 'success'){  

                
         
                switch(obj.message){
                    
                    case "Caixa aberto!":
                        $('#ModalAberturaCaixa').modal('hide'); 
                        this.showAlert('Sucesso!',obj.message,"alert-success",'yes',window.location.href);
                    break;
    
                    case "Erro ao abrir caixa!":
                        this.showAlert('Sucesso!',obj.message,"alert-success",'yes',window.location.href);
                    break;
    
                    case "Deletado com sucesso":
                        this.showAlert('Sucesso!',obj.message,"alert-success",'yes',window.location.href);
                    break;
    
                    case "Pedido realizado com sucesso":
                        this.showAlert('Sucesso!',obj.message,"alert-success",'yes','/home');
                    break;
    
    
                    case "Atualizado!":
                        this.showAlert('Sucesso!',obj.message,"alert-success",'yes',window.location.href);
                    break;

                    case "Logado com sucesso":
                        this.showAlert('Sucesso!',obj.message,"alert-success",'yes','/home');
                    break;

                    case "Pedido finalizado!":
                        if(confirm('Deseja imprimir o cupom?')){
                            //let pedido = JSON.parse(sessionStorage.getItem("Pedido"));
                            
                            this.createCupom('GET', window.location.href + '/Cupom');
                             
                        }
                        else{
                            this.showAlert('Sucesso!',obj.message,"alert-success",'yes',window.location.href);
                        }
                        
                    break;

                    case "ok!":
                        window.location.href = "/pedidos";
                    break;
                    
                    case "Caixa Fechado!":
                        $('#ModalFechamentoCaixa').modal('hide'); 
                        this.showAlert('Sucesso!',obj.message,"alert-success",'yes',window.location.href);
                    break;

    
                }
            }
            else{
                let form = document.querySelector('form[name="form"]');

                [...form].forEach(el=>{

                    el.value = obj[0][el.name];

                });
            }

        }

        if(object){
            ajax.send(object);
        }
        else{
            ajax.send();
        }

    }





    ajax2(method,url,modal,produto){

        let ajax = new XMLHttpRequest();

       

        ajax.open(method,url);

        ajax.onload = ev =>{

         let obj = ajax.responseText;
         let obj1 = JSON.parse(obj);

            switch(modal){

                case "Clientes":
                    sessionStorage.removeItem("clientes");
                    sessionStorage.setItem("clientes", JSON.stringify(obj1));
                    this.CreateTable(document.getElementById('tbCliente'),obj1,"Clientes");
                break;

                case "Produtos":
                    sessionStorage.removeItem("produtos");
                    sessionStorage.setItem("produtos", JSON.stringify(obj1));
                    this.CreateTable(document.getElementById('tbProduto'),obj1,"Produtos");
                break;


                case "Vendas":
                    sessionStorage.removeItem("Vendas");
                    sessionStorage.setItem("Vendas", JSON.stringify(obj1));
                    this.CreateTable(document.getElementById('tbVendas'),obj1,"Vendas");
                break;


                case "Complementos":
                    sessionStorage.removeItem("complementos");
                    sessionStorage.setItem("complementos", JSON.stringify(obj1));
                    this.CreateTable(document.getElementById('tbComplemento'),obj1,"Complementos");
                break;

                case "Sabores":
                    sessionStorage.removeItem("sabores");
                    sessionStorage.setItem("sabores", JSON.stringify(obj1));
                    this.CreateTable(document.getElementById('tbSabores'),obj1,"Sabores",produto);
                break;


                case "Vendas":
                    sessionStorage.removeItem("Vendas");
                    sessionStorage.setItem("Vendas", JSON.stringify(obj1));
                    this.CreateTable(document.getElementById('tbVendas'),obj1,"Vendas",produto);
                break;
                
                
            }
        }

        ajax.send();

    }



    CreateTable(table,object,tableName,produto){

        this.UpdateTable(table);
          
        object.forEach(obj=>{

            if(tableName == "Clientes"){

                let tr = document.createElement('tr');
                let id = document.createElement('td');
                let nome = document.createElement('td');
                let sobrenome = document.createElement('td');

                tr.dataset.id = obj.id;
                tr.classList.add ='zebra grid';
                id.classList.add('col-sm-2');
                nome.classList.add('col-sm-2');
                sobrenome.classList.add('col-sm-2');

                id.appendChild(document.createTextNode(obj.id));
                nome.appendChild(document.createTextNode(obj.nome));
                sobrenome.appendChild(document.createTextNode(obj.sobrenome));

                table.appendChild(tr);
                tr.appendChild(id);
                tr.appendChild(nome);
                tr.appendChild(sobrenome);

                    
            }

            if(tableName == "Complementos"){

                let tr = document.createElement('tr');
                let id = document.createElement('td');
                let nome = document.createElement('td');
                let valor = document.createElement('td');
                let checkbox = document.createElement('td');
                let box = document.createElement('input');

                tr.dataset.id = obj.id;
                tr.classList.add ='zebra grid';
                id.classList.add('col-sm-2');
                nome.classList.add('col-sm-2');
                valor.classList.add('col-sm-2');
                box.type = "checkbox";
                box.name = "complemento";
                box.dataset.id = obj.id;
                box.dataset.complemento = obj.descricao;
                box.dataset.valor_unitario = obj.valor_unitario;

                id.appendChild(document.createTextNode(obj.id));
                nome.appendChild(document.createTextNode(obj.descricao));
                valor.appendChild(document.createTextNode("¥" + obj.valor_unitario));
                checkbox.appendChild(box);

                table.appendChild(tr);
                tr.appendChild(id);
                tr.appendChild(nome);
                tr.appendChild(valor);
                tr.appendChild(checkbox);

                    
            }

            if(tableName == "Sabores"){

                let tr = document.createElement('tr');
                let id = document.createElement('td');
                let nome = document.createElement('td');
                let valor = document.createElement('td');
                let checkbox = document.createElement('td');
                let box = document.createElement('input');
                    
                    
                tr.dataset.id = obj.id;
                tr.classList.add ='zebra grid';
                id.classList.add('col-sm-2');
                nome.classList.add('col-sm-2');
                valor.classList.add('col-sm-2');
                checkbox.classList.add('col-sm-2');
                    
                    
                box.type = "checkbox";
                box.name = "sabor";
                box.dataset.id = obj.id;
                box.dataset.sabor = obj.descricao;
                box.dataset.valor_unitario = obj.valor_unitario;

                id.appendChild(document.createTextNode(obj.id));
                nome.appendChild(document.createTextNode(obj.descricao));
                valor.appendChild(document.createTextNode("¥" + obj.valor_unitario));
                checkbox.appendChild(box);

                table.appendChild(tr);
                tr.appendChild(id);
                tr.appendChild(nome);
                tr.appendChild(valor);
                tr.appendChild(checkbox);

            }

            if(tableName == "Produtos"){
                let tr = document.createElement('tr');
                let id = document.createElement('td');
                let nome = document.createElement('td');
                let saldo = document.createElement('td');
                let valor = document.createElement('td');
                    
                tr.dataset.id = obj.id;
                tr.classList.add ='zebra grid';
                id.classList.add('col-sm-1');
                nome.classList.add('col-sm-2');
                saldo.classList.add('col-sm-2');
                valor.classList.add('col-sm-2'); 

                id.appendChild(document.createTextNode(obj.id));
                nome.appendChild(document.createTextNode(obj.descricao));
                saldo.appendChild(document.createTextNode((obj.estoque == '' ? obj.estoque : 0 )));
                valor.appendChild(document.createTextNode('¥' + obj.preco_venda));

                table.appendChild(tr);
                tr.appendChild(id);
                tr.appendChild(nome);
                tr.appendChild(saldo);
                tr.appendChild(valor);
       
            
            }

                
            if(tableName == "Pedido_item"){
                let pedido_item = 1;
                let tr = document.createElement('tr');
                //let pedido = document.createElement('td');
                let descricao = document.createElement('td');
                let qtd = document.createElement('td');
                let valor_uni = document.createElement('td');
                let btnCel = document.createElement('td');
                let btn = document.createElement('button');
                    

                   
                    
                tr.classList.add ='zebra grid';
                //pedido.classList.add('col-sm-2');
                descricao.classList.add('col-sm-2');
                qtd.classList.add('col-sm-2');
                valor_uni.classList.add('col-sm-2'); 
                btnCel.classList.add('col-sm-2');
                btn.style.border = "none";
                btn.style.color = "red";
                btn.id = "btnDelete";
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-file-excel" viewBox="0 0 16 16">
                <path d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 0 1 .064-.704z"/>
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>`;

                //pedido.appendChild(document.createTextNode(pedido_item++));
                descricao.appendChild(document.createTextNode(obj.descricao));
                qtd.appendChild(document.createTextNode(obj.quantidade));
                valor_uni.appendChild(document.createTextNode("¥" + obj.valor_total));
                btnCel.appendChild(btn);

                table.appendChild(tr);
                //tr.appendChild(pedido);
                tr.appendChild(descricao);
                tr.appendChild(qtd);
                tr.appendChild(valor_uni);
                tr.appendChild(btnCel);
                    
                /* console.log(table);
                console.log(object);
                console.log(tableName);*/
                    
            
            }


            if(tableName == "Forma_Pagamento"){

                let tr = document.createElement('tr');
                let fp = document.createElement('td');
                let valor = document.createElement('td');
                let btnCel = document.createElement('td');
                let btn = document.createElement('button');
                    
                    
                    
                tr.classList.add ='zebra grid';
                fp.classList.add('col-sm-2');
                valor.classList.add('col-sm-2');
                btnCel.classList.add('col-sm-2');
                btn.style.border = "none";
                btn.style.color = "red";
                btn.name = "btnCancel";
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-file-excel" viewBox="0 0 16 16">
                <path d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 0 1 .064-.704z"/>
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>`;

                fp.appendChild(document.createTextNode(obj.forma_pagamento));
                valor.appendChild(document.createTextNode("¥" + obj.valor_pago));
                btnCel.appendChild(btn);

                table.appendChild(tr);
                tr.appendChild(btnCel);
                tr.appendChild(fp);
                tr.appendChild(valor);
                    
            }


            if(tableName == "Vendas"){

                let tr = document.createElement('tr');
                let id = document.createElement('td');
                let cliente = document.createElement('td');
                let valor = document.createElement('td');
                let data = document.createElement('td');
                let situacao = document.createElement('td');
                let btnCel = document.createElement('td');
                let btn = document.createElement('button');
                let nul = document.createElement('td');
                    
                    

                    
                tr.dataset.id = obj.id;
                tr.classList.add ='zebra grid';
                id.classList.add('col-sm-2');
                cliente.classList.add('col-sm-2');
                valor.classList.add('col-sm-2');
                data.classList.add('col-sm-2');
                situacao.classList.add('col-sm-2');
                nul.classList.add('col-sm-2');
                btnCel.classList.add('col-sm-2');
                btn.style.border = "none";
                btn.style.color = "red";
                btn.name = "btnCancelVenda";
                btn.id = "btnCancelVenda";
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-file-excel" viewBox="0 0 16 16">
                <path d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 0 1 .064-.704z"/>
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>`;

                id.appendChild(document.createTextNode(obj.id));
                cliente.appendChild(document.createTextNode(obj.nome_cliente));
                valor.appendChild(document.createTextNode("¥" + obj.valor_total));
                data.appendChild(document.createTextNode(obj.data_pedido));
                nul.appendChild(document.createTextNode(""));
                situacao.appendChild(document.createTextNode((obj.status_pedido == 1 ? "Concluido" : "Cancelado")));
                btnCel.appendChild(btn);

                table.appendChild(tr);
                tr.appendChild(id);
                tr.appendChild(cliente);
                tr.appendChild(valor);
                tr.appendChild(data);
                tr.appendChild(situacao);
 
                if(obj.status_pedido == 2){
                    tr.style.color = "red";
                    tr.appendChild(nul);
                }
                else{
                    tr.appendChild(btnCel);
                }      
            }  
        })

        this.onCelClick();
        this.deleteVenda(); 
        this.deleteItens();       
    }

    

    
    UpdateTable(table){                  
        table.innerHTML = ""; 
    }




    createCupom(method, url){

        let ajax = new XMLHttpRequest();

        ajax.open(method,url);


        ajax.onload = ev =>{
            
            let obj = ajax.responseText;
            let obj1 = JSON.parse(obj);

            console.log(obj1);
        
            let tableBody = document.getElementById('produtosCupomBody');
            let tableFooter = document.querySelectorAll('#produtosCupomFooter > tr > td');
    
    
            obj1.forEach(el=>{
                let tr = document.createElement('tr');
                let descricao = document.createElement('td');
                let qtd = document.createElement('td');
                let valor = document.createElement('td');
            
                descricao.appendChild(document.createTextNode(el.descricao_produto + ' ' + (el.descricao_sabor ? el.descricao_sabor : '' ) + ' ' + (el.descricao_complemento ? el.descricao_complemento : '')));
                qtd.appendChild(document.createTextNode(' ' + el.quantidade_produto));
                valor.appendChild(document.createTextNode('¥' + Number(el.valor_unitario_produto) * Number(el.quantidade_produto)));
            
                tableBody.appendChild(tr);
                tr.appendChild(descricao);
                tr.appendChild(qtd);
                tr.appendChild(valor);
            });
    
            [...tableFooter].forEach(el=>{
                switch(el.id){
                    case 'subTotal':
                        el.innerHTML = '¥' +  obj1[0].valor_total;
                    break;
    
                    case 'total':
                        el.innerHTML = '¥' + obj1[0].valor_total;
                    break;
    
                    case 'PagDinheiro':
                        el.innerHTML = '¥' + obj1[0].valor_pago;
                    break;
    
                    case 'PagTroco':
                        el.innerHTML = '¥' + obj1[0].valor_troco;
                    break;

                    case 'NumPedido':
                        el.innerHTML = 'Pedido:' + ' ' + obj1[0].id;  
                    break;
                }
            })
            
            $('#ModalCupom').modal({
                backdrop: 'static',
                keyboard: false, 
                show: true
            }); 

            $('#ModalCupom').modal('show');
            
     
        
        }
        ajax.send();

    }    

    


        
        

    
}


    

