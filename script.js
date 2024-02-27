class FormDinamico {
    constructor(idDoFormDinamico, arrayObjsDoMeuFormDinamico) {
        this.meuFormDinamico = document.querySelector(`#${idDoFormDinamico}`);
        this.arrayObjsDoMeuFormDinamico = arrayObjsDoMeuFormDinamico;
        this.iniciar();
    }

    iniciar() {
        this.criarInputs();
        this.criarBotao();
        this.criarOutput();
    }

    criarInputs() {
        this.criarDivDoInput();
        this.arrayObjsDoMeuFormDinamico.forEach(cadaObjDeInput => {
            this.criarInput(cadaObjDeInput);
        });
    }

    criarBotao() {
        this.criarDivDoBotao();
        this.criarElementoButton();
        this.adicionarEventoNoButton();
    }

    criarOutput() {
        this.criarDivDoOutput();
        this.criarElementoParagrafo();
    }

    criarDivDoInput() {
        const divDosInputs = document.createElement('div');
        divDosInputs.setAttribute('id', 'input');
        this.meuFormDinamico.appendChild(divDosInputs);
    }

    criarInput(cadaObjDeInput) {
        const elementoLabel = this.criarElementoLabel(cadaObjDeInput);
        const elementoSelect = this.criarElementoSelect(cadaObjDeInput);
    
        cadaObjDeInput.options.forEach(cadaObjDeOption => {
            const elementoOption = this.criarElementoOption(cadaObjDeOption);
            elementoSelect.appendChild(elementoOption);
        });
        
        const divDosInputs = document.querySelector('#input')

        divDosInputs.appendChild(elementoLabel);
        divDosInputs.appendChild(elementoSelect);
    }

    criarElementoLabel(cadaObjDeInput) {
        const elementoLabel = document.createElement('label');
        elementoLabel.setAttribute("for", cadaObjDeInput.nameDoSelect);
        elementoLabel.textContent = cadaObjDeInput.textoDoLabel;
        return elementoLabel;
    }
    
    criarElementoSelect(cadaObjDeInput) {
        const elementoSelect = document.createElement('select');
        elementoSelect.setAttribute("id", cadaObjDeInput.nameDoSelect);
        elementoSelect.setAttribute("name", cadaObjDeInput.nameDoSelect);
        return elementoSelect;
    }
    
    criarElementoOption(cadaObjDeOption) {
        const elementoOption = document.createElement('option');
        elementoOption.value = cadaObjDeOption.valorDaOption;
        elementoOption.textContent = cadaObjDeOption.textoDaOption;
        return elementoOption;
    }

    criarDivDoBotao() {
        const divDoBotao= document.createElement('div');
        divDoBotao.setAttribute('id', 'botao');
        this.meuFormDinamico.appendChild(divDoBotao);
    }

    criarElementoButton() {
        const botaoGerarCampanha = document.createElement('button');
        botaoGerarCampanha.textContent = 'Gerar Campanha';
        botaoGerarCampanha.setAttribute('id', 'botaoGerarCampanha');
        botaoGerarCampanha.setAttribute('type', 'button');
        const divDoBotao = document.querySelector('#botao')
        divDoBotao.appendChild(botaoGerarCampanha);
    }

    adicionarEventoNoButton() {
        const botaoGerarCampanha = document.querySelector('#botaoGerarCampanha')
        botaoGerarCampanha.addEventListener('click', this.gerarCampanha.bind(this));
    }

    gerarCampanha() {
        const valoresDeSelectsJuntos = this.concatenarValoresDoInput();
        this.mostrarNomeDaCampanha(valoresDeSelectsJuntos);
    }

    concatenarValoresDoInput() {
        let valoresDeSelectsJuntos = ''; 
        const todosOsMeusSelects = this.meuFormDinamico.querySelectorAll('select')
    
        todosOsMeusSelects.forEach(cadaSelect => {
            //funcao que verifica se o valor é novo pra mudar o dado
            //funcao que verifica se o valor é vazio pra mudar o dado
             const valorDoSelect = cadaSelect.value
             valoresDeSelectsJuntos += `${valorDoSelect}_`
        })
    
        return valoresDeSelectsJuntos.slice(0, -1);
    }

    mostrarNomeDaCampanha(valoresDeSelectsJuntos) {
        let elementoParagrafo = document.querySelector('#output p');    
        elementoParagrafo.textContent = valoresDeSelectsJuntos;
    }

    criarDivDoOutput() {
        const divDoOutput = document.createElement('div');
        divDoOutput.setAttribute('id', 'output');
        this.meuFormDinamico.appendChild(divDoOutput);
    }

    criarElementoParagrafo() {
        const elementoParagrafo = document.createElement('p');
        const divDoOutput = document.querySelector('#output');
        divDoOutput.appendChild(elementoParagrafo);
    }
}






window.onload = () => {
    new FormDinamico(
        'meuFormDinamico', 
        [
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
        ]
    );
};