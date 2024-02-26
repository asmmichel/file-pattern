const arrayObjsDoMeuFormDinamico = [
    {
        textoDoLabel: "OFFICE",
        nameDoSelect: "office",
        options: [
            { valorDaOption: "BR", textoDaOption: "Brazil"  },
            { valorDaOption: "AM", textoDaOption: "Amsterdam" },
            { valorDaOption: "ES", textoDaOption: "Spain"  }
        ]
    },
    {
        textoDoLabel: "TIPO DE CAMPANHA",
        nameDoSelect: "tipoCampanha",
        options: [
            { valorDaOption: "ADH", textoDaOption: "ADHOC" },
            { valorDaOption: "JOR", textoDaOption: "Journey" },
            { valorDaOption: "TRAN", textoDaOption: "Transactional" }
        ]
    },
    {
        textoDoLabel: "NOME DA CAMPANHA",
        nameDoSelect: "nomeCampanha",
        options: [
            { valorDaOption: "SML", textoDaOption: "Produtor SML" },
            { valorDaOption: "PROD_INI", textoDaOption: "Produtor Iniciante" },
            { valorDaOption: "AFI_LADEIRINHA", textoDaOption: "Afiliado Ladeirinha" },
            { valorDaOption: "NOVO", textoDaOption: "Novo" }
        ]
    },
    {
        textoDoLabel: "PSICOLOGIA DO EMAIL",
        nameDoSelect: "psicologia",
        options: [
            { valorDaOption: "VAZIO", textoDaOption: "" },
            { valorDaOption: "NEUTRO", textoDaOption: "Neutro" },
            { valorDaOption: "POSIT", textoDaOption: "Positivo" },
            { valorDaOption: "NEGAT", textoDaOption: "Negativo" },
            { valorDaOption: "NOVO", textoDaOption: "Novo" }
        ]
    },
    {
        textoDoLabel: "TIPO CONTEUDO",
        nameDoSelect: "tipoConteudo",
        options: [
            { valorDaOption: "VAZIO", textoDaOption: "" },
            { valorDaOption: "EBOOK", textoDaOption: "Ebook" },
            { valorDaOption: "LP", textoDaOption: "Landing Page" },
            { valorDaOption: "WEBINAR", textoDaOption: "Webinario" }
        ]
    },
];



function criarInputsEOutputs() {
    criarInputs();
}

function criarInputs() {
    const meuFormDinamico = document.querySelector('#meuFormDinamico');

    arrayObjsDoMeuFormDinamico.forEach(cadaObjDeInput => {
        criarInput(cadaObjDeInput, meuFormDinamico);
    });
}

function criarInput(cadaObjDeInput, meuFormDinamico) {
    const elementoLabel = criarElementoLabel(cadaObjDeInput);
    const elementoSelect = criarElementoSelect(cadaObjDeInput);

    cadaObjDeInput.options.forEach(cadaObjDeOption => {
        const elementoOption = criarElementoOption(cadaObjDeOption);
        elementoSelect.appendChild(elementoOption);
    });

    meuFormDinamico.appendChild(elementoLabel);
    meuFormDinamico.appendChild(elementoSelect);
}

function criarElementoLabel(cadaObjDeInput) {
    const elementoLabel = document.createElement('label');
    elementoLabel.setAttribute("for", cadaObjDeInput.nameDoSelect);
    elementoLabel.textContent = cadaObjDeInput.textoDoLabel;
    return elementoLabel;
}

function criarElementoSelect(cadaObjDeInput) {
    const elementoSelect = document.createElement('select');
    elementoSelect.setAttribute("id", cadaObjDeInput.nameDoSelect);
    elementoSelect.setAttribute("name", cadaObjDeInput.nameDoSelect);
    return elementoSelect;
}

function criarElementoOption(cadaObjDeOption) {
    const elementoOption = document.createElement('option');
    elementoOption.value = cadaObjDeOption.valorDaOption;
    elementoOption.textContent = cadaObjDeOption.textoDaOption;
    return elementoOption;
}



window.onload = criarInputsEOutputs;








// function verificarECriarOsInputsNovos() {
//     objDadosDoMeuFormDinamico.forEach(cadaInputDeDropdown => {
// 		cadaInputDeDropdown.opcoes.forEach(cadaOpcao => {
// 			if(cadaOpcao.valorDaOpcao === 'NOVO') {
// 				const nameDoSelectNovo = `${cadaInputDeDropdown.nameDoSelect}Novo`;
// 				const textoDoLabelNovo = `NOVO(A) ${cadaInputDeDropdown.textoDoLabel}`;
			
// 				const elementoLabel = document.createElement('label');
// 				elementoLabel.setAttribute("for", nameDoSelectNovo);
// 				elementoLabel.textContent = textoDoLabelNovo;
// 				elementoLabel.setAttribute("class", 'novo'); 
				
// 				const elementoInput = document.createElement('input');
// 				elementoInput.setAttribute("type", 'text')
// 				elementoInput.setAttribute("id", nameDoSelectNovo);
// 				elementoInput.setAttribute("name", nameDoSelectNovo);
// 				elementoInput.setAttribute("class", 'novo'); 
			
// 				meuFormDinamico.appendChild(elementoLabel);
// 				meuFormDinamico.appendChild(elementoInput);

//                 const selectComNovo = document.querySelector(`#${cadaInputDeDropdown.nameDoSelect}`);

//                 selectComNovo.addEventListener('change', () => {
//                     const todasAsOpcoesDoSelectComNovo = selectComNovo.options;
//                     const indexDaOpcaoEscolhida = selectComNovo.selectedIndex
//                     const opcaoSelecionada = todasAsOpcoesDoSelectComNovo[indexDaOpcaoEscolhida];
//                     const valorDaOpcaoSelecionada = opcaoSelecionada.value
            
//                     if(valorDaOpcaoSelecionada === 'NOVO') {
//                         elementoLabel.classList.add('ativo')
//                         elementoInput.classList.add('ativo')
//                     } else if(valorDaOpcaoSelecionada != 'NOVO') {
//                         elementoLabel.classList.remove('ativo')
//                         elementoInput.classList.remove('ativo')
//                     }
//                 })
// 			}
// 		});
//     });

// }