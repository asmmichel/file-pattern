const objDadosDoMeuFormDinamico = [
    {
        textoDoLabel: "OFFICE",
        nameDoSelect: "office",
        opcoes: [
            { valorDaOpcao: "BR", textoDaOpcao: "Brazil"  },
            { valorDaOpcao: "AM", textoDaOpcao: "Amsterdam" },
            { valorDaOpcao: "ES", textoDaOpcao: "Spain"  }
        ]
    },
    {
        textoDoLabel: "TIPO DE CAMPANHA",
        nameDoSelect: "tipoCampanha",
        opcoes: [
            { valorDaOpcao: "ADH", textoDaOpcao: "ADHOC" },
            { valorDaOpcao: "JOR", textoDaOpcao: "Journey" },
            { valorDaOpcao: "TRAN", textoDaOpcao: "Transactional" }
        ]
    },
    {
        textoDoLabel: "NOME DA CAMPANHA",
        nameDoSelect: "nomeCampanha",
        opcoes: [
            { valorDaOpcao: "SML", textoDaOpcao: "Produtor SML" },
            { valorDaOpcao: "PROD_INI", textoDaOpcao: "Produtor Iniciante" },
            { valorDaOpcao: "AFI_LADEIRINHA", textoDaOpcao: "Afiliado Ladeirinha" },
            { valorDaOpcao: "NOVO", textoDaOpcao: "Novo" }
        ]
    },
    {
        textoDoLabel: "PSICOLOGIA DO EMAIL",
        nameDoSelect: "psicologia",
        opcoes: [
            { valorDaOpcao: "VAZIO", textoDaOpcao: "" },
            { valorDaOpcao: "NEUTRO", textoDaOpcao: "Neutro" },
            { valorDaOpcao: "POSIT", textoDaOpcao: "Positivo" },
            { valorDaOpcao: "NEGAT", textoDaOpcao: "Negativo" },
            { valorDaOpcao: "NOVO", textoDaOpcao: "Novo" }
        ]
    },
    {
        textoDoLabel: "TIPO CONTEUDO",
        nameDoSelect: "tipoConteudo",
        opcoes: [
            { valorDaOpcao: "VAZIO", textoDaOpcao: "" },
            { valorDaOpcao: "EBOOK", textoDaOpcao: "Ebook" },
            { valorDaOpcao: "LP", textoDaOpcao: "Landing Page" },
            { valorDaOpcao: "WEBINAR", textoDaOpcao: "Webinario" }
        ]
    },
];




function gerarTodosOsInputsESuasCaracteristicas() {
    popularOsInputsDeDropdown();
    verificarOsInputsEspeciais();
}



//CRIACAO DOS INPUTS DROPDOWN PADROES

function popularOsInputsDeDropdown() {
    const meuFormDinamico = document.querySelector('#meuFormDinamico');

    objDadosDoMeuFormDinamico.forEach(cadaInputDeDropdown => {
        criarUmInputDeDropdown(meuFormDinamico, cadaInputDeDropdown)
    });
}



function criarUmInputDeDropdown(meuFormDinamico, cadaInputDeDropdown) {
    const elementoLabel = document.createElement('label');
    elementoLabel.setAttribute("for", cadaInputDeDropdown.nameDoSelect);
    elementoLabel.textContent = cadaInputDeDropdown.textoDoLabel;
    
    const elementoSelect = document.createElement('select');
    elementoSelect.setAttribute("id", cadaInputDeDropdown.nameDoSelect);
    elementoSelect.setAttribute("name", cadaInputDeDropdown.nameDoSelect);


    cadaInputDeDropdown.opcoes.forEach(cadaOpcao => {
        criarUmaOpcaoDoMeuInputDeDropdown(elementoSelect, cadaOpcao)
    });
    
    meuFormDinamico.appendChild(elementoLabel);
    meuFormDinamico.appendChild(elementoSelect);
}



function criarUmaOpcaoDoMeuInputDeDropdown(elementoSelect, cadaOpcao) {
    const elementoOption = document.createElement('option');
    elementoOption.value = cadaOpcao.valorDaOpcao;
    elementoOption.textContent = cadaOpcao.textoDaOpcao;
    elementoSelect.appendChild(elementoOption);
}



//ANALISE E CRIACAO DOS INPUTS NOVOS E VAZIOS

function verificarOsInputsEspeciais() {
    objDadosDoMeuFormDinamico.forEach(cadaInputDeDropdown => {
        verificarSeUmInputTemOValueNovo(cadaInputDeDropdown)
    });

}



function verificarSeUmInputTemOValueNovo(cadaInputDeDropdown) {
    cadaInputDeDropdown.opcoes.forEach(cadaOpcao => {
        if(cadaOpcao.valorDaOpcao === 'NOVO') {
            //console.log(`Dentro do input ${cadaInputDeDropdown.textoDoLabel} achei o value ${cadaOpcao.valorDaOpcao}`);
            criarInputDeTextoDoValueNovo(cadaInputDeDropdown);
        }
    });
}



function criarInputDeTextoDoValueNovo(cadaInputDeDropdown) {

    // console.log(cadaInputDeDropdown.nameDoSelect+'Novo');

    const nameDoSelectNovo = `${cadaInputDeDropdown.nameDoSelect}Novo`;
    const textoDoLabelNovo = `NOVO(A) ${cadaInputDeDropdown.textoDoLabel}`;

    const elementoLabel = document.createElement('label');
    elementoLabel.setAttribute("for", nameDoSelectNovo);
    elementoLabel.textContent = textoDoLabelNovo;
    
    const elementoInput = document.createElement('input');
    elementoInput.setAttribute("type", 'text')
    elementoInput.setAttribute("id", nameDoSelectNovo);
    elementoInput.setAttribute("name", nameDoSelectNovo);

    meuFormDinamico.appendChild(elementoLabel);
    meuFormDinamico.appendChild(elementoInput);
}




window.onload = gerarTodosOsInputsESuasCaracteristicas;



//agora temos que criar a logica dos labels de texto ficarem escondidos, e apenas aparecerem quando o usuario escolher a opcao "Novo"
//como fazer o add event listener pra um evento de form?
//como fazer para os 2 especificos? usando a mesma verificacao que fizemos pra achar o 'Novo' na funcao verificarSeUmInputTemOValueNovo

//primeiro passo, esconder os labels
//segundo passo, identificar a escolha do usuario nesse valor especifico 'Novo'