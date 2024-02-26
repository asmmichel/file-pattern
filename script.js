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
    criarEpopularOsInputsDeDropdown();
    
    //verificarECriarOsInputsNovos();
}



function criarEpopularOsInputsDeDropdown() {
    const meuFormDinamico = document.querySelector('#meuFormDinamico');

    objDadosDoMeuFormDinamico.forEach(cadaInputDeDropdown => {
		const elementoLabel = document.createElement('label');
		elementoLabel.setAttribute("for", cadaInputDeDropdown.nameDoSelect);
		elementoLabel.textContent = cadaInputDeDropdown.textoDoLabel;
		
		const elementoSelect = document.createElement('select');
		elementoSelect.setAttribute("id", cadaInputDeDropdown.nameDoSelect);
		elementoSelect.setAttribute("name", cadaInputDeDropdown.nameDoSelect);
	
		meuFormDinamico.appendChild(elementoLabel);
		meuFormDinamico.appendChild(elementoSelect);
	
		cadaInputDeDropdown.opcoes.forEach(cadaOpcao => {
			const elementoOption = document.createElement('option');
			elementoOption.value = cadaOpcao.valorDaOpcao;
			elementoOption.textContent = cadaOpcao.textoDaOpcao;
			elementoSelect.appendChild(elementoOption);
		});
    });
}



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













window.onload = gerarTodosOsInputsESuasCaracteristicas;
