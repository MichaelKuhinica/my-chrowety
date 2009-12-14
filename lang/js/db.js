if(window.localStorage){
  console.log("db Local Storage started sucessfully.");
  console.log("db Local Storage iniciado com êxito.");

  var db = {
      salva:function(nome,valor){
          localStorage.setItem(nome,valor);
      },
      deleta:function(nome){
          localStorage.removeItem(nome);
      },
      pega:function(nome){
          return localStorage.getItem(nome);
      },
      limpa:function(){
          localStorage.clear();
      }
  };
}else{
  console.log("No suport for Local Storage.");
  console.log("Sem suporte ao Local Storage.");
}
