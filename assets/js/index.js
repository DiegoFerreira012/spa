var total = 0
var totalContainer = document.getElementById('soma')

var registros = JSON.parse(localStorage.getItem('registros'))
if(!registros){
  registros = []
}
registros.forEach(element => {
  inserirRegistro(element.type, element.nome, element.preco)
});
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
  var type = compra.value 
  inserirRegistro(type, form.mercadoria.value, valor.value)
  salvarLocalStorage(type, form.mercadoria.value, valor.value)
}
function salvarLocalStorage(type, nome, preco){
  var registro = {
    type: type,
    nome: nome,
    preco: preco,
  }
  registros.push(registro)
  localStorage.setItem('registros', JSON.stringify(registros) )
}

function inserirRegistro(type, nome, preco){
  var list = document.getElementById('list')
  var registro = document.createElement('div')
  registro.classList.add('line')
  registro.innerHTML =  `
  <div class="descricao"> <span>${type}</span> <p>${nome}</p></div>
  <div class="preco">${preco} </div>
  `
  list.appendChild(registro)

  atualizarTotal(preco, type)
}

function atualizarTotal(valor, type){
  var z = valor.replace(/[^\d]+/gi,'')
  console.log(valor, z)
  if (type === '-'){
    total = total - z
  }
  if (type === '+'){
    total = (total + parseInt(z))
  }
  totalContainer.innerHTML = formatarMoeda(total)

  
  var lucro = document.getElementById("lucro");
  var prejuizo = document.getElementById("prejuizo");
    
    if (total > 0){
      lucro.classList.toggle("lucroPrejuizo");
      console.log('lucro')
    }

    if (total < 0){
      prejuizo.classList.toggle("lucroPrejuizo");
      console.log('prejuizo')
    }
    
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
    localStorage.clear()
    total = 0
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
