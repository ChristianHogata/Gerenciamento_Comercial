class LoginControler {

  constructor(formId){
    this.formId = document.getElementById(formId);
    this.OnSubmit();
    
   
  }  



  OnSubmit(){

    let form = this.formId;
    let btn = form.querySelector('#btnEnviar');
    let user = form.querySelector('#user');
    let password = form.querySelector('#password');

    this.formId.addEventListener('submit', (ev)=>{

        ev.preventDefault();
        this.ajax();
        
    })

  }


  ajax(){
    let ajax = new XMLHttpRequest();
    ajax.open('POST', 'http://localhost:3000/login?nome=chris');
    ajax.onload = event =>{
      let response = ajax.responseText;
      alert(response);
    }

    ajax.send();
  }


}