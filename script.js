class FormDinamico {
    constructor(idDoForm, arrayObjsDoForm) {
        this.meuFormDinamico = document.querySelector(`#${idDoForm}`);
        this.arrayObjsDoForm = arrayObjsDoForm;
        this.objDoForm = {};
        this.objDeOption = {};
        this.iniciar();
    }

    //principais metodos
    iniciar() {
        this.criarInputs();
        this.criarBotao();
        this.criarOutput();
    }

    criarInputs() {
        this.criarDivDosInputs();
        this.arrayObjsDoForm.forEach(objDoForm => {
            this.objDoForm = objDoForm;
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




    //metodos dos inputs basicos
    criarDivDosInputs() {
        const divDosInputs = document.createElement('div');
        divDosInputs.setAttribute('id', 'inputs');
        this.meuFormDinamico.appendChild(divDosInputs);
    }

    criarDivDoInput() {
        const divDoInput = document.createElement('div');
        divDoInput.setAttribute('class', 'input');
        divDoInput.setAttribute("id", `input_${this.objDoForm.nameDoSelect}`);
        return divDoInput;
    }

    criarInput() {
        const divDoInput = this.criarDivDoInput();
        const elementoLabel = this.criarElementoLabel();
        const elementoSelect = this.criarElementoSelect();
    
        this.objDoForm.options.forEach(objDeOption => {
            this.objDeOption = objDeOption;
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


    //metodos dos inputs com tipo "Novo"
    criarInputTipoNovo() {
        const temOpcaoNovo = this.verificarSeOpcaoNovoExiste();
        const temOpcaoVazio = this.verificarSeOpcaoVazioExiste();

        if(temOpcaoNovo) {
            const divDoInputNovo = this.criarDivDoInputNovo();
            const elementoLabelNovo = this.criarElementoLabelNovo();
            const elementoInputTextoNovo = this.criarElementoInputTextoNovo();

            divDoInputNovo.appendChild(elementoLabelNovo);
            divDoInputNovo.appendChild(elementoInputTextoNovo);
            
            const divDosInputs = document.querySelector('#inputs')
            divDosInputs.appendChild(divDoInputNovo);
            this.adicionarEventoNoSelectComNovo();

            const elementoSpanDeAviso = this.criarElementoSpanDeAviso();
            divDoInputNovo.appendChild(elementoSpanDeAviso);
            this.adicionarEventoNoElementoInputTextoNovo();

            if(temOpcaoNovo && !temOpcaoVazio) {
                const elementoSpanDeErro = this.criarElementoSpanDeErro();
                divDoInputNovo.appendChild(elementoSpanDeErro);
            }
        }
    }

    verificarSeOpcaoNovoExiste() {
        const opcaoDoObj = this.objDoForm.options
        const temOpcaoNovo = opcaoDoObj.some(opcao => opcao.valorDaOption === "NOVO");
        return temOpcaoNovo;
    }

    verificarSeOpcaoVazioExiste() {
        const opcaoDoObj = this.objDoForm.options
        const temOpcaoVazio = opcaoDoObj.some(opcao => opcao.valorDaOption === "");
        return temOpcaoVazio;
    }

    criarDivDoInputNovo() {
        const divDoInputNovo = this.criarDivDoInput();
        divDoInputNovo.classList.add('new');
        divDoInputNovo.setAttribute("id", `input_new_${this.objDoForm.nameDoSelect}`);
        return divDoInputNovo;
    }
 
    criarElementoLabelNovo() {
        const elementoLabelNovo = this.criarElementoLabel();
        elementoLabelNovo.setAttribute("for", `new_${this.objDoForm.nameDoSelect}`);
        elementoLabelNovo.textContent = `NOVO(A) ${this.objDoForm.textoDoLabel}`;
        return elementoLabelNovo;
    }

    criarElementoInputTextoNovo() {
        const elementoInputTextoNovo = document.createElement('input');
        elementoInputTextoNovo.setAttribute("id", `new_${this.objDoForm.nameDoSelect}`);
        elementoInputTextoNovo.setAttribute("name", `new_${this.objDoForm.nameDoSelect}`);
        
        return elementoInputTextoNovo;
    }

    adicionarEventoNoSelectComNovo() {
        const elementoSelect = document.querySelector(`select[name="${this.objDoForm.nameDoSelect}"]`);
        const divDoInputNovo = document.querySelector(`#input_new_${this.objDoForm.nameDoSelect}`);

        elementoSelect.addEventListener('change', () => {
            if (elementoSelect.value === 'NOVO') {
                divDoInputNovo.classList.add('ativo');
            } else {
                divDoInputNovo.classList.remove('ativo');
            }
        });
    }

    criarElementoSpanDeErro() {
        const elementoSpanDeErro = document.createElement('span');
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
        elementoSpanDeErro.setAttribute("id", `span_erro_campo_vazio_new_${this.objDoForm.nameDoSelect}`);
        elementoSpanDeErro.setAttribute("class", `span_erro_campo_vazio`);
        elementoSpanDeErro.textContent = `${textoDoLabelFormatado} não pode estar vazio!`;
        return elementoSpanDeErro;
    } 

    formatarOTextoDoLabel() {
        const textoDoLabelEmMinusculo = this.objDoForm.textoDoLabel.toLowerCase();
        const palavrasDoTextoDoLabel = textoDoLabelEmMinusculo.split(' ');

        palavrasDoTextoDoLabel.forEach((palavra, index) => {
            const temMaisQueTresLetras = palavra.length > 3;
            if(temMaisQueTresLetras) {
                const primeiraLetraMaiuscula = palavra.charAt(0).toUpperCase();
                const restoDaPalavra = palavra.slice(1);
                palavrasDoTextoDoLabel[index] = `${primeiraLetraMaiuscula}${restoDaPalavra}`;
            }
        })
        const textoDoLabelFormatado = palavrasDoTextoDoLabel.join(' ');
        return textoDoLabelFormatado;
    }

    criarElementoSpanDeAviso() {
        const elementoSpanDeAviso = document.createElement('span');
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
        elementoSpanDeAviso.setAttribute("id", `span_aviso_informar_novo_termo_new_${this.objDoForm.nameDoSelect}`);
        elementoSpanDeAviso.setAttribute("class", `span_aviso_informar_novo_termo`);
        elementoSpanDeAviso.textContent = `Atenção! Caso necessário, enviar uma mensagem para alfredo.jorge@hotmart.com
                                            informando o novo termo de ${textoDoLabelFormatado}, para podermos mensurar nos Dashboards!`;
        return elementoSpanDeAviso;
    }

    adicionarEventoNoElementoInputTextoNovo() {
        const elementoInputTextoNovo = this.meuFormDinamico.querySelector(`input#new_${this.objDoForm.nameDoSelect}`);
        const elementoSpanDeAviso = this.meuFormDinamico.querySelector(`#span_aviso_informar_novo_termo_new_${this.objDoForm.nameDoSelect}`);

        elementoInputTextoNovo.addEventListener('mouseover', () => {
            elementoSpanDeAviso.classList.add('ativo');
        });

        elementoInputTextoNovo.addEventListener('mouseout', () => {
            elementoSpanDeAviso.classList.remove('ativo');
        });
    }





    //metodos do botao
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
        const valoresObrigatoriosEstaoPreenchidos = this.verificarSeValoresObrigatoriosEstaoPreenchidos();
        const todosOsValoresObrigatoriosEstaoPreenchidos = valoresObrigatoriosEstaoPreenchidos.every(valor => valor === true);

        if(todosOsValoresObrigatoriosEstaoPreenchidos) {
            this.mostrarNomeDaCampanha();
        } else {
            this.limparStringConcatenadaDoOuput();
        }
    }

    verificarSeValoresObrigatoriosEstaoPreenchidos() {
        const todosOsMeusSelects = this.meuFormDinamico.querySelectorAll('select');
        let valoresObrigatoriosEstaoPreenchidos = [];
        
        todosOsMeusSelects.forEach(select => {
            const elementoSpanDeErro = this.meuFormDinamico.querySelector(`#span_erro_campo_vazio_new_${select.name}`)

            if(elementoSpanDeErro) {
                elementoSpanDeErro.classList.remove('ativo');
                valoresObrigatoriosEstaoPreenchidos.push(true);
            }

            if (select.value === 'NOVO') {
                const valorDoInputDeTextoNovo = this.pegarValorDoInputDeTextoNovo(select);
                if(valorDoInputDeTextoNovo === '' && elementoSpanDeErro) {
                    elementoSpanDeErro.classList.add('ativo');
                    valoresObrigatoriosEstaoPreenchidos.push(false);
                } 
            }
        })

        return valoresObrigatoriosEstaoPreenchidos;
    }

    mostrarNomeDaCampanha() {
        const valoresDosSelectsConcatenados = this.concatenarValoresDosSelects();
        let elementoParagrafo = document.querySelector('#output p');    
        elementoParagrafo.textContent = valoresDosSelectsConcatenados;
    }

    concatenarValoresDosSelects() {
        let valoresDosSelectsConcatenados = '';
        const todosOsMeusSelects = this.meuFormDinamico.querySelectorAll('select')
    
        todosOsMeusSelects.forEach(select => {
            let valorInicialDoSelect = select.value;
            if (valorInicialDoSelect === 'NOVO') {
                const valorDoInputDeTextoNovo = this.pegarValorDoInputDeTextoNovo(select);
                valorInicialDoSelect = valorDoInputDeTextoNovo;
            }
            if (valorInicialDoSelect !== '') {
                valoresDosSelectsConcatenados += `${valorInicialDoSelect}_`;
            }
        })

        if (valoresDosSelectsConcatenados.endsWith('_')) {
            valoresDosSelectsConcatenados = valoresDosSelectsConcatenados.slice(0, -1);
        }

        return valoresDosSelectsConcatenados;
    }

    limparStringConcatenadaDoOuput() {
        let paragrafoDoOutput = document.querySelector('#output p');
        paragrafoDoOutput.textContent = '';
    }

    pegarValorDoInputDeTextoNovo(select) { 
        const inputDeTextoNovo = document.querySelector(`input[name="new_${select.name}"]`);
        const valorDoInputDeTextoNovo = inputDeTextoNovo.value.toUpperCase();
        return valorDoInputDeTextoNovo;
    }




    //metodos do output
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





//chamada da classe e objeto principal
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
                textoDoLabel: "CAMPO TESTE",
                nameDoSelect: "campoTeste",
                options: [
                    { valorDaOption: "TESTE", textoDaOption: "Teste Qualquer" },
                    { valorDaOption: "NOVO", textoDaOption: "Novo" }
                ]
            },
            {
                textoDoLabel: "PSICOLOGIA DO EMAIL",
                nameDoSelect: "psicologia",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
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
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "EBOOK", textoDaOption: "Ebook" },
                    { valorDaOption: "LP", textoDaOption: "Landing Page" },
                    { valorDaOption: "WEBINAR", textoDaOption: "Webinario" }
                ]
            },
        ]
    );
};