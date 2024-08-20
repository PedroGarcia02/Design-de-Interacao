async function BuscaEstadoPorCpf() {
    var cep = document.getElementById("cep").value
    var url = "https://brasilapi.com.br/api/cep/v1/{"+cep+"}";

    var painel = document.getElementById("cep-estado");

    try {
        let dados = await fetch(url);
        let estado = await dados.json();
        if(dados.status == 200) {
            painel.innerHTML = estado.state;  
        } else {
            painel.innerHTML = estado.message; 
        }
    } catch (err) {
        painel.innerHTML = "ocorreu um erro"; 
    }
}

async function BuscaEmpresaPorCnpj() {
    var cnpj = document.getElementById("cnpj").value
    var url = "https://brasilapi.com.br/api/cnpj/v1/{"+cnpj+"}";

    var painel = document.getElementById("cnpj-Empresa");

    try {
        let dados = await fetch(url);
        let nome = await dados.json();
        if(dados.status == 200) {
            painel.innerHTML = nome.razao_social;  
        } else {
            painel.innerHTML = nome.message; 
        }
    } catch (err) {
        painel.innerHTML = "ocorreu um erro"; 
    }
}

async function BuscaCorretora() {
    var url = "https://brasilapi.com.br/api/cvm/corretoras/v1";

    var painelCep = document.getElementById("corretora-cep");
    var painelCnpj = document.getElementById("corretora-cnpj");
    var cnpj = document.getElementById("cnpj")
    var cep = document.getElementById("cep")
    var corretoraNum = parseInt(Math.random() * 100) + 1;

    try {
        let dados = await fetch(url);
        let corretora = await dados.json();
        if(dados.status == 200) {
            painelCep.innerHTML = "Cep aleatorio de corretora "+corretora[corretoraNum].cep;
            painelCnpj.innerHTML = "Cnpj aleatorio de corretora "+corretora[corretoraNum].cnpj
            cnpj.value = corretora[corretoraNum].cnpj;
            cep.value = corretora[corretoraNum].cep;
        } else {
            painelCep.innerHTML = corretora.message; 
        }
    } catch (err) {
        painelCep.innerHTML = "ocorreu um erro"; 
    }
}

BuscaCorretora()

async function Api1() {
    url = "https://brasilapi.com.br/api/banks/v1";

    let dados = await fetch(url);
    let json = await dados.json();

    return [json, 1];
}

async function Api2() {
    url = "https://brasilapi.com.br/api/cvm/corretoras/v1";

    let dados = await fetch(url);
    let json = await dados.json();

    return [json, 2];
}

async function Api3() {
    url = "https://brasilapi.com.br/api/cptec/v1/cidade";

    let dados = await fetch(url);
    let json = await dados.json();

    return [json, 3];
}

function Apirace() {
    var painel = document.getElementById("api-race");
Promise.race([Api1(), Api2(), Api3()]).then(function (value) {
    painel.innerHTML = "A api mais rapida é a numero "+value[1];
  });
}

Apirace();

function ApiAll() {
    var painel = document.getElementById("api-all");
Promise.all([Api1(), Api2(), Api3()]).then((values) => {
    var random = parseInt(Math.random() * 50) + 1;
    painel.innerHTML = "Resultados Aleatorios "+values[0][0][random].name+", "+values[1][0][random].cep+", "+values[2][0][random].nome;
  });
}

ApiAll();