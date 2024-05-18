class FormDinamico {
    constructor(idDoForm, arrayObjsDoForm, arrayDePrefixos) {
        this.meuFormDinamico = document.querySelector(`#${idDoForm}`);
        this.arrayObjsDoForm = arrayObjsDoForm;
        this.arrayDePrefixos = arrayDePrefixos;
        this.objDoForm = {};
        this.objDeOptionDoForm = {};
        this.stringDoValorVazio ='';
        this.stringDoValorNovo = 'NOVO';
        this.stringDeElementAtivo = 'ativo'
        this.botaoClicado = ''
        this.stringDoEmail = 'EM01'
        this.iniciar();
    }

    //principais metodos
    iniciar() {
        this.criarEscolhas();
        this.criarBotoes();
        this.criarSaidas();
    }

    criarEscolhas() {
        this.criarDivDeTodasAsEscolhas();
        this.arrayObjsDoForm.forEach(objDoForm => {
            this.objDoForm = objDoForm;
            this.criarEscolha();
            this.criarEscolhaNova();
        });
    }

    criarBotoes() {
        this.criarDivDeTodosOsBotoes();
        this.criarBotoesComEvento('Gerar Campanha', 'botaoGerarCampanha');
        this.criarBotoesComEvento('Gerar com Data', 'botaoDeGerarComData');
    }

    criarSaidas() {
        this.criarDivDeTodasAsSaidas();
        this.criarParagrafos();
    }




    //metodos das escolhas basicos
    criarDivDeTodasAsEscolhas() {
        const divDasEscolhas = document.createElement('div');
        divDasEscolhas.setAttribute('id', 'escolhas');
        this.meuFormDinamico.appendChild(divDasEscolhas);
    }

    criarDivDaEscolha() {
        const divDaEscolha = document.createElement('div');
        divDaEscolha.setAttribute('class', 'escolha');
        divDaEscolha.setAttribute("id", `escolha_${this.objDoForm.nameDoSelect}`);
        return divDaEscolha;
    }

    criarEscolha() {
        const divDaEscolha = this.criarDivDaEscolha();
        const divDasEscolhas = document.querySelector('#escolhas')
        const elementoLabel = this.criarLabel();
        const elementoSelect = this.criarSelect();
    
        this.objDoForm.options.forEach(objDeOptionDoForm => {
            this.objDeOptionDoForm = objDeOptionDoForm;
            const elementoOption = this.criarOption();
            elementoSelect.appendChild(elementoOption);
        });

        divDaEscolha.appendChild(elementoLabel);
        divDaEscolha.appendChild(elementoSelect);
        divDasEscolhas.appendChild(divDaEscolha);
    }

    criarLabel() {
        const elementoLabel = document.createElement('label');
        elementoLabel.setAttribute("for", this.objDoForm.nameDoSelect);
        elementoLabel.textContent = this.objDoForm.textoDoLabel;
        return elementoLabel;
    }
    
    criarSelect() {
        const elementoSelect = document.createElement('select');
        elementoSelect.setAttribute("id", this.objDoForm.nameDoSelect);
        elementoSelect.setAttribute("name", this.objDoForm.nameDoSelect);
        return elementoSelect;
    }
    
    criarOption() {
        const elementoOption = document.createElement('option');
        elementoOption.value = this.objDeOptionDoForm.valorDaOption;
        elementoOption.textContent = this.objDeOptionDoForm.textoDaOption;
        return elementoOption;
    }


    //metodos das escolhas com tipo "Novo"
    criarEscolhaNova() {
        const temOpcaoNovo = this.verificarSeOpcaoNovoExiste();
        const temOpcaoVazio = this.verificarSeOpcaoVazioExiste();

        if(temOpcaoNovo) {
            const divDaEscolhaNova = this.criarDivDaEscolhaNova();
            const elementoLabelNovo = this.criarLabelNovo();
            const elementoInputDeTextoNovo = this.criarInputDeTextoNovo();

            divDaEscolhaNova.appendChild(elementoLabelNovo);
            divDaEscolhaNova.appendChild(elementoInputDeTextoNovo);
            
            const divDasEscolhas = document.querySelector('#escolhas')
            divDasEscolhas.appendChild(divDaEscolhaNova);
            this.adicionarEventoNaOpcaoNovoDoSelect();

            const elementoSpanDeAviso = this.criarSpanDeAviso();
            divDaEscolhaNova.appendChild(elementoSpanDeAviso);
            this.adicionarEventoNoInputDeTextoNovo();

            if(temOpcaoNovo && !temOpcaoVazio) {
                const elementoSpanDeErro = this.criarSpanDeErro();
                divDaEscolhaNova.appendChild(elementoSpanDeErro);
            }
        }
    }

    verificarSeOpcaoNovoExiste() {
        const opcaoDoObj = this.objDoForm.options
        const temOpcaoNovo = opcaoDoObj.some(opcao => opcao.valorDaOption === this.stringDoValorNovo);
        return temOpcaoNovo;
    }

    verificarSeOpcaoVazioExiste() {
        const opcaoDoObj = this.objDoForm.options
        const temOpcaoVazio = opcaoDoObj.some(opcao => opcao.valorDaOption === this.stringDoValorVazio);
        return temOpcaoVazio;
    }

    criarDivDaEscolhaNova() {
        const divDaEscolhaNova = this.criarDivDaEscolha();
        divDaEscolhaNova.classList.add('nova');
        divDaEscolhaNova.setAttribute("id", `escolha_nova_${this.objDoForm.nameDoSelect}`);
        return divDaEscolhaNova;
    }
 
    criarLabelNovo() {
        const elementoLabelNovo = this.criarLabel();
        elementoLabelNovo.setAttribute("for", `nova_${this.objDoForm.nameDoSelect}`);
        elementoLabelNovo.textContent = `NOVO(A) ${this.objDoForm.textoDoLabel}`;
        return elementoLabelNovo;
    }

    criarInputDeTextoNovo() {
        const elementoInputDeTextoNovo = document.createElement('input');
        elementoInputDeTextoNovo.setAttribute("id", `nova_${this.objDoForm.nameDoSelect}`);
        elementoInputDeTextoNovo.setAttribute("name", `nova_${this.objDoForm.nameDoSelect}`);
        
        return elementoInputDeTextoNovo;
    }

    adicionarEventoNaOpcaoNovoDoSelect() {
        const elementoSelect = document.querySelector(`select[name="${this.objDoForm.nameDoSelect}"]`);
        const divDaEscolhaNova = document.querySelector(`#escolha_nova_${this.objDoForm.nameDoSelect}`);

        elementoSelect.addEventListener('change', () => {
            if (elementoSelect.value === this.stringDoValorNovo) {
                divDaEscolhaNova.classList.add(this.stringDeElementAtivo);
            } else {
                divDaEscolhaNova.classList.remove(this.stringDeElementAtivo);
            }
        });
    }

    criarSpanDeErro() {
        const elementoSpanDeErro = document.createElement('span');
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
        elementoSpanDeErro.setAttribute("id", `span_erro_campo_vazio_nova_${this.objDoForm.nameDoSelect}`);
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

    criarSpanDeAviso() {
        const elementoSpanDeAviso = document.createElement('span');
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
        elementoSpanDeAviso.setAttribute("id", `span_aviso_informar_termo_nova_${this.objDoForm.nameDoSelect}`);
        elementoSpanDeAviso.setAttribute("class", `span_aviso_informar_termo`);
        elementoSpanDeAviso.textContent = `Atenção! Caso necessário, enviar uma mensagem para alfredo.jorge@hotmart.com
                                            informando o novo termo de ${textoDoLabelFormatado}, para podermos mensurar nos Dashboards!`;
        return elementoSpanDeAviso;
    }

    adicionarEventoNoInputDeTextoNovo() {
        const elementoInputDeTextoNovo = this.meuFormDinamico.querySelector(`input#nova_${this.objDoForm.nameDoSelect}`);
        const elementoSpanDeAviso = this.meuFormDinamico.querySelector(`#span_aviso_informar_termo_nova_${this.objDoForm.nameDoSelect}`);

        elementoInputDeTextoNovo.addEventListener('mouseover', () => {
            elementoSpanDeAviso.classList.add(this.stringDeElementAtivo);
        });

        elementoInputDeTextoNovo.addEventListener('mouseout', () => {
            elementoSpanDeAviso.classList.remove(this.stringDeElementAtivo);
        });
    }





    //metodos do botao
    criarDivDeTodosOsBotoes() {
        const divDoBotao= document.createElement('div');
        divDoBotao.setAttribute('id', 'botao');
        this.meuFormDinamico.appendChild(divDoBotao);
    }

    criarBotoesComEvento(textoDoBotao, idDoBotao) {
        const botaoGerador = document.createElement('button');
        botaoGerador.textContent = textoDoBotao;
        botaoGerador.setAttribute('id', idDoBotao);
        botaoGerador.setAttribute('class', 'botaoGerador');
        botaoGerador.setAttribute('type', 'button');
        const divDoBotao = document.querySelector('#botao');
        divDoBotao.appendChild(botaoGerador);
        botaoGerador.addEventListener('click', this.gerarCampanha.bind(this));
    }

    gerarCampanha(event) {
        this.botaoClicado = event.target.id;
        const valoresObrigatoriosEstaoPreenchidos = this.verificarSeValoresObrigatoriosEstaoPreenchidos();
        const todosOsValoresObrigatoriosEstaoPreenchidos = valoresObrigatoriosEstaoPreenchidos.every(valor => valor === true);

        if(todosOsValoresObrigatoriosEstaoPreenchidos) {
            this.mostrarNomeDaCampanha();
        } else {
            this.limparStringConcatenadaDaSaida();
        }
    }

    verificarSeValoresObrigatoriosEstaoPreenchidos() {
        const todosOsMeusSelects = this.meuFormDinamico.querySelectorAll('select');
        let valoresObrigatoriosEstaoPreenchidos = [];
        
        todosOsMeusSelects.forEach(select => {
            const elementoSpanDeErro = this.meuFormDinamico.querySelector(`#span_erro_campo_vazio_nova_${select.name}`)

            if(elementoSpanDeErro) {
                elementoSpanDeErro.classList.remove(this.stringDeElementAtivo);
                valoresObrigatoriosEstaoPreenchidos.push(true);
            }

            if (select.value === this.stringDoValorNovo) {
                const valorDoInputDeTextoNovo = this.pegarValorDoInputDeTextoNovo(select);
                if(valorDoInputDeTextoNovo === this.stringDoValorVazio && elementoSpanDeErro) {
                    elementoSpanDeErro.classList.add(this.stringDeElementAtivo);
                    valoresObrigatoriosEstaoPreenchidos.push(false);
                } 
            }
        })

        return valoresObrigatoriosEstaoPreenchidos;
    }

    mostrarNomeDaCampanha() {
        const valoresDosSelectsConcatenados = this.concatenarValoresDosSelects();
        let outputFinal = ''
        this.arrayDePrefixos.forEach((prefixo) => {
            outputFinal = `${prefixo}_${valoresDosSelectsConcatenados}`
            if(prefixo === this.stringDoValorVazio) {
                outputFinal = outputFinal.slice(1);
                if(this.botaoClicado === 'botaoDeGerarComData') {
                    const outputPartes = outputFinal.split('_');
                    const data = outputPartes.pop();
                    outputFinal = `${outputPartes.join('_')}_${this.stringDoEmail}_${data}`;
                } else {
                    outputFinal = `${outputFinal}_${this.stringDoEmail}`;
                }
            }
            let elementoParagrafo = document.querySelector(`#prefixo_${prefixo}`);
            elementoParagrafo.textContent = outputFinal;
        })
    }

    concatenarValoresDosSelects() {
        let valoresDosSelectsConcatenados = '';
        const todosOsMeusSelects = this.meuFormDinamico.querySelectorAll('select')
    
        todosOsMeusSelects.forEach(select => {
            let valorInicialDoSelect = select.value;
            if (valorInicialDoSelect === this.stringDoValorNovo) {
                const valorDoInputDeTextoNovo = this.pegarValorDoInputDeTextoNovo(select);
                valorInicialDoSelect = valorDoInputDeTextoNovo;
            }
            if (valorInicialDoSelect !== this.stringDoValorVazio) {
                valoresDosSelectsConcatenados += `${valorInicialDoSelect}_`;
            }
        })

        if (valoresDosSelectsConcatenados.endsWith('_')) {
            valoresDosSelectsConcatenados = valoresDosSelectsConcatenados.slice(0, -1);
        }

        if(this.botaoClicado === 'botaoDeGerarComData') {
            const dataAtual = this.pegarDataAtualInvertida();
            valoresDosSelectsConcatenados = `${valoresDosSelectsConcatenados}_${dataAtual}`;
        }

        return valoresDosSelectsConcatenados;
    }

    pegarDataAtualInvertida() {
        let dataAtual = new Date();
        let dia = dataAtual.getDate();
        let mes = dataAtual.getMonth() + 1;
        let ano = dataAtual.getFullYear();

        dia = dia < 10 ? `0${dia}` : dia;
        mes = mes < 10 ? `0${mes}` : mes;
        ano = ano.toString().slice(-2);

        dataAtual = `${ano}${mes}${dia}`;

        return dataAtual;
    }

    limparStringConcatenadaDaSaida() {
        this.arrayDePrefixos.forEach((prefixo) => {
            let elementoParagrafo = document.querySelector(`#prefixo_${prefixo}`);
            elementoParagrafo.textContent = '';
        })
    }

    pegarValorDoInputDeTextoNovo(select) { 
        const inputDeTextoNovo = document.querySelector(`input[name="nova_${select.name}"]`);
        const valorDoInputDeTextoNovo = inputDeTextoNovo.value.toUpperCase();
        return valorDoInputDeTextoNovo;
    }


    //metodos das saidas
    criarDivDeTodasAsSaidas() {
        const divDoOutput = document.createElement('div');
        divDoOutput.setAttribute('id', 'saidas');
        this.meuFormDinamico.appendChild(divDoOutput);
    }

    criarParagrafos() {
        this.arrayDePrefixos.forEach((prefixo) => {
            const elementoParagrafo = document.createElement('p');
            elementoParagrafo.setAttribute('class', 'saida');
            elementoParagrafo.setAttribute("id", `prefixo_${prefixo}`);
            const divDoOutput = document.querySelector('#saidas');
            divDoOutput.appendChild(elementoParagrafo);
        })
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
                    { valorDaOption: "BR", textoDaOption: "Brazil" },
                    { valorDaOption: "CO", textoDaOption: "Colombia" },
                    { valorDaOption: "MX", textoDaOption: "Mexico" },
                    { valorDaOption: "LAT", textoDaOption: "Latin America" },
                    { valorDaOption: "ES", textoDaOption: "Spain" },
                    { valorDaOption: "US", textoDaOption: "United States" }
                ]
            },
            {
                textoDoLabel: "TIPO",
                nameDoSelect: "tipo",
                options: [
                    { valorDaOption: "ADH", textoDaOption: "Adhoc" },
                    { valorDaOption: "JOR", textoDaOption: "Jornada" }
                ]
            },
            {
                textoDoLabel: "CATEGORIA",
                nameDoSelect: "categoria",
                options: [
                    { valorDaOption: "POS", textoDaOption: "Pós" },
                    { valorDaOption: "PRE", textoDaOption: "Pré" },
                    { valorDaOption: "EDUCATION", textoDaOption: "Education" },
                    { valorDaOption: "TRANSACIONAL", textoDaOption: "Transacional" },
                    { valorDaOption: "INSTITUCIONAL", textoDaOption: "Institucional" },
                    { valorDaOption: "MPD", textoDaOption: "Marketing produto" },
                    { valorDaOption: "EVENTO", textoDaOption: "Evento" },
                    { valorDaOption: "NEWS", textoDaOption: "News" },
                    { valorDaOption: "CS", textoDaOption: "CS" },
                    { valorDaOption: "WEBINAR", textoDaOption: "Webinar" },
                    { valorDaOption: "ESG", textoDaOption: "ESG" },
                    { valorDaOption: "MPD_CORE", textoDaOption: "MPD_Core" },
                    { valorDaOption: "MPD_FSBU", textoDaOption: "MPD_FSBU" },
                    { valorDaOption: "NOVO", textoDaOption: "Novo" }
                ]
            },
            {
                textoDoLabel: "SUBCATEGORIA",
                nameDoSelect: "subcategoria",
                options: [
                    { valorDaOption: "COREX_LEAD_SOLUTIONS", textoDaOption: "CorEx-Lead Solutions" },
                    { valorDaOption: "COREX_PRODUTOS_FISICOS", textoDaOption: "CorEx-Produtos fisicos" },
                    { valorDaOption: "COREX_HOTMART_PRO", textoDaOption: "CorEx-Hotmart Pro" },
                    { valorDaOption: "COREX_PLAYER", textoDaOption: "CorEx-Player" },
                    { valorDaOption: "COREX_CLOUD", textoDaOption: "CorEx-Cloud" },
                    { valorDaOption: "CORE_CLUB", textoDaOption: "Core-Club" },
                    { valorDaOption: "CORE_CREATORCOCKPIT", textoDaOption: "Core-CreatorCockpit" },
                    { valorDaOption: "FSBU_COMMERCIALAGENT", textoDaOption: "FSBU-CommercialAgent" },
                    { valorDaOption: "FSBU_BNPL", textoDaOption: "FSBU-BNPL" },
                    { valorDaOption: "FSBU_ORDERBUMP", textoDaOption: "FSBU-Orderbump" },
                    { valorDaOption: "FSBU_SMARTRECOVERY", textoDaOption: "FSBU-SmartRecovery" },
                    { valorDaOption: "FSBU_CARTÃO", textoDaOption: "FSBU-Cartão" },
                    { valorDaOption: "FSBU_ANTECIPAÇÃO", textoDaOption: "FSBU-Antecipação" },
                    { valorDaOption: "FSBU_CHECKOUT", textoDaOption: "FSBU-Checkout" },
                    { valorDaOption: "CROSS", textoDaOption: "Cross" },
                    { valorDaOption: "NOVO", textoDaOption: "Novo" }
                ]
            },
            {
                textoDoLabel: "NOME DISPARO",
                nameDoSelect: "nomeDisparo",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "NOVO", textoDaOption: "Novo" }
                ]
            },
            {
                textoDoLabel: "TIPO CONTEÚDO",
                nameDoSelect: "tipoConteudo",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "E_BOOK", textoDaOption: "E-book" },
                    { valorDaOption: "LP", textoDaOption: "LP" },
                    { valorDaOption: "VIDEO", textoDaOption: "Video" },
                    { valorDaOption: "INFOGRÁFICO", textoDaOption: "Infográfico" },
                    { valorDaOption: "ONE_PAGE_REVIEW", textoDaOption: "One page review" },
                    { valorDaOption: "AULA_NO_CLUB", textoDaOption: "Aula no club" },
                    { valorDaOption: "WEBINÁRIO", textoDaOption: "Webinário" },
                    { valorDaOption: "BLOGPOST", textoDaOption: "Blogpost" },
                    { valorDaOption: "NOVO", textoDaOption: "Novo" }
                ]
            },
            {
                textoDoLabel: "PSICOLOGIA EMAIL",
                nameDoSelect: "psicologiaEmail",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "NEUTRO", textoDaOption: "Neutro" },
                    { valorDaOption: "POSITIVO", textoDaOption: "Positivo" },
                    { valorDaOption: "NEGATIVO", textoDaOption: "Negativo" }
                ]
            },
            {
                textoDoLabel: "FUNIL",
                nameDoSelect: "funil",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "TOFU", textoDaOption: "ToFu" },
                    { valorDaOption: "MOFU", textoDaOption: "MoFu" },
                    { valorDaOption: "BOFU", textoDaOption: "BoFu" }
                ]
            }
        ],        
        ['', 'WA','DE', 'FIL', 'AUT', 'JB', 'IMP', 'EXT', 'FT']
    );
};