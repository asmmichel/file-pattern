class FormDinamico {
    constructor(idDoForm, arrayObjsDoForm) {
        this.meuFormDinamico = document.querySelector(`#${idDoForm}`);
        this.arrayObjsDoForm = arrayObjsDoForm;
        this.objDoForm = {};
        this.objDeOption = {};
        this.iniciar();
    }

    iniciar() {
        this.criarInputs();
        this.criarBotao();
        this.criarOutput();
    }

    criarInputs() {
        this.criarDivDosInputs();
        this.arrayObjsDoForm.forEach(cadaObjDeInput => {
            this.objDoForm = cadaObjDeInput;
            this.criarInput();
            this.criarInputTipoNovo();
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

    criarDivDosInputs() {
        const divDosInputs = document.createElement('div');
        divDosInputs.setAttribute('id', 'inputs');
        this.meuFormDinamico.appendChild(divDosInputs);
    }

    criarDivDoInput() {
        const divDoInput = document.createElement('div');
        divDoInput.setAttribute('class', 'input');
        return divDoInput;
    }

    criarInput() {
        const divDoInput = this.criarDivDoInput();
        const elementoLabel = this.criarElementoLabel();
        const elementoSelect = this.criarElementoSelect();
    
        this.objDoForm.options.forEach(cadaObjDeOption => {
            this.objDeOption = cadaObjDeOption;
            const elementoOption = this.criarElementoOption();
            elementoSelect.appendChild(elementoOption);
        });

        divDoInput.appendChild(elementoLabel);
        divDoInput.appendChild(elementoSelect);
        
        const divDosInputs = document.querySelector('#inputs')
        divDosInputs.appendChild(divDoInput);
    }

    criarElementoLabel() {
        const elementoLabel = document.createElement('label');
        elementoLabel.setAttribute("for", this.objDoForm.nameDoSelect);
        elementoLabel.textContent = this.objDoForm.textoDoLabel;
        return elementoLabel;
    }
    
    criarElementoSelect() {
        const elementoSelect = document.createElement('select');
        elementoSelect.setAttribute("id", this.objDoForm.nameDoSelect);
        elementoSelect.setAttribute("name", this.objDoForm.nameDoSelect);
        return elementoSelect;
    }
    
    criarElementoOption() {
        const elementoOption = document.createElement('option');
        elementoOption.value = this.objDeOption.valorDaOption;
        elementoOption.textContent = this.objDeOption.textoDaOption;
        return elementoOption;
    }

    criarInputTipoNovo() {
        const temOpcaoNovo = this.verificarSeInputTipoNovoExiste();

        if(temOpcaoNovo) {
            const divDoInputNovo = this.criarDivDoInputNovo();
            const elementoLabelNovo = this.criarElementoLabelNovo();
            const elementoInputTextoNovo = this.criarElementoInputTextoNovo();

            divDoInputNovo.appendChild(elementoLabelNovo);
            divDoInputNovo.appendChild(elementoInputTextoNovo);

            const divDosInputs = document.querySelector('#inputs')
            divDosInputs.appendChild(divDoInputNovo);
        }
    }

    verificarSeInputTipoNovoExiste() {
        const cadaOpcaoDosObjs = this.objDoForm.options
        const temOpcaoNovo = cadaOpcaoDosObjs.some(opcao => opcao.valorDaOption === "NOVO");
        return temOpcaoNovo;
    }

    criarDivDoInputNovo() {
        const divDoInputTipoNovo = this.criarDivDoInput();
        divDoInputTipoNovo.style.display = 'none';
        divDoInputTipoNovo.classList.add('new');
        return divDoInputTipoNovo;
    }

    criarElementoLabelNovo() {
            const elementoLabelNovo = this.criarElementoLabel({
            textoDoLabel: `NOVO(A) ${this.objDoForm.textoDoLabel}`,
            nameDoSelect: `new_${this.objDoForm.nameDoSelect}`
        });
        return elementoLabelNovo;
    }

    criarElementoInputTextoNovo() {
        const elementoInputTextoNovo = document.createElement('input');
        elementoInputTextoNovo.setAttribute("id", `new_${this.objDoForm.nameDoSelect}`);
        elementoInputTextoNovo.setAttribute("name", `new_${this.objDoForm.nameDoSelect}`);
        return elementoInputTextoNovo;
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
        const valoresDosSelectsConcatenados = this.concatenarValoresDosSelects();
        this.mostrarNomeDaCampanha(valoresDosSelectsConcatenados);
    }

    concatenarValoresDosSelects() {
        let valoresDosSelectsConcatenados = '';
        const todosOsMeusSelects = this.meuFormDinamico.querySelectorAll('select')
    
        todosOsMeusSelects.forEach(cadaSelect => {
            const valorDoSelect = cadaSelect.value
             if (valorDoSelect !== 'VAZIO') {
                valoresDosSelectsConcatenados += `${valorDoSelect}_`;
            }
        })

        if (valoresDosSelectsConcatenados.endsWith('_')) {
            valoresDosSelectsConcatenados = valoresDosSelectsConcatenados.slice(0, -1);
        }
    
        return valoresDosSelectsConcatenados;
    }

    mostrarNomeDaCampanha(valoresDosSelectsConcatenados) {
        let elementoParagrafo = document.querySelector('#output p');    
        elementoParagrafo.textContent = valoresDosSelectsConcatenados;
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