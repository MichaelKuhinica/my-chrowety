if(window.localStorage){
  //console.log("LocalStorage iniciado.");

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
  //console.log("Sem suporte ao LocalStorage.");
}
