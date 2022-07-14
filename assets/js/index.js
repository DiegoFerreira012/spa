var total = 0
var totalContainer = document.getElementById('soma')

function adicionarTransacao(event){
  event.preventDefault()
  if(isValid()){
    adicionar()
  }
}

function isValid(values){
  var erroContainers = document.getElementsByClassName('erro')
  for(let container of erroContainers){
    container.innerHTML = ''
  }

  if(!form.compra.value){
    var erroContainer = document.getElementById('compra-erro')
    erroContainer.innerHTML = '<label for="compra">Preencha este campo</label>'
    return false
  }

  if(!form.mercadoria.value){
    var erroContainer = document.getElementById('mercadoria-erro')
    erroContainer.innerHTML = '<label for="mercadoria">Preencha este campo</label>'
    return false
  }

  if(!form.valor.value){
    var erroContainer = document.getElementById('valor-erro')
    erroContainer.innerHTML = '<label for="valor">Preencha este campo</label>'
    return false
  }
  return true
}

function adicionar(){
  var compra = document.getElementById('compra')
  var valor = document.getElementById('valor')
  var list = document.getElementById('list')
  var type = compra.value 
  var registro = document.createElement('div')
  registro.classList.add('line')
  registro.innerHTML =  `
  <div class="descricao"> <span>${type}</span> <p>${form.mercadoria.value}</p></div>
  <div class="preco">${form.valor.value} </div>
  `
  var z = valor.value.replace(/[^\d]+/gi,'')
  if (type === '-'){
    total = total - z
  }
  if (type === '+'){
    total = (total + parseInt(z))
  }
  totalContainer.innerHTML = formatarMoeda(total)
  list.appendChild(registro)

}

String.prototype.reverse = function(){
  return this.split('').reverse().join(''); 
};

function mascaraMoeda(){
  var campo = document.getElementById('valor');
  var valor  = campo.value.replace(/[^\d]+/gi,'').reverse();
  var resultado  = "";
  var mascara = "##.###.###,##".reverse();
  for (var x=0, y=0; x<mascara.length && y<valor.length;) {
    if (mascara.charAt(x) != '#') {
      resultado += mascara.charAt(x);
      x++;
    } else {
      resultado += valor.charAt(y);
      y++;
      x++;
    }
  }
  campo.value =`R$ ${resultado.reverse()}`;
}

function abrirFechar(){

    var menu = document.getElementById("menu-mobile");

    menu.classList.toggle("mostrar");
};

function limparDados(){
  console.log('teste')
  var r = confirm("Tem certeza que deseja remover todas as transações");
  if (r==true){
    document.getElementById('list').innerHTML = ''
    totalContainer.innerHTML = 'R$ 0,00'
  }
}

function formatarMoeda(value){
  const inserirPonto = (a) =>{
    a = a.toString(); 
    var beforeDot = a.substring(0, a.length-2); 
    var afterDot = a.substring(a.length-2, a.length); 
    return parseFloat(beforeDot + "." + afterDot);
  }
  var formatado = inserirPonto(value)
  formatado = formatado.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
  if(value<0){
    formatado = formatado.substring(1)
    formatado = formatado.substring(0,3)+' -'+formatado.substring(3)
  }
  return formatado
}

