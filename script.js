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
        this.stringDoWhatsApp = 'd1'
        this.prefixoDoWhatsApp = 'WA'
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





    criarUmElemento(tipoDoElemento, idDoElemento, classesDoElemento = [], atributosDoElemento = {}) {
        const meuElemento = document.createElement(tipoDoElemento);
        
        if (idDoElemento) {
            meuElemento.setAttribute('id', idDoElemento);
        }
        if (classesDoElemento.length > 0) {
            meuElemento.classList.add(...classesDoElemento);
        }
        for (let atributo in atributosDoElemento) {
            meuElemento.setAttribute(atributo, atributosDoElemento[atributo]);
        }
    
        return meuElemento;
    }

    




    //metodos das escolhas basicos
    criarDivDeTodasAsEscolhas() { //FOI
        const divDasEscolhas = this.criarUmElemento('div','escolhas');
        //const divDasEscolhas = document.createElement('div');
        //divDasEscolhas.setAttribute('id', 'escolhas');
        this.meuFormDinamico.appendChild(divDasEscolhas);
    }

    formatarOLabelDoSelect() {
        let textoDoLabelFormatado = this.objDoForm.textoDoLabel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c');
        let arraytextoDoLabelFormatado = textoDoLabelFormatado.split(' ');
        let nameDoSelect = '';

        if(arraytextoDoLabelFormatado.length > 1) {
            arraytextoDoLabelFormatado.forEach((palavra, i) => {
                if (i > 0) {
                    palavra = palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
                } else {
                    palavra = palavra.toLowerCase();
                }
                nameDoSelect += palavra;
            });
        } else {
            nameDoSelect = arraytextoDoLabelFormatado[0];
        }

        this.objDoForm.nameDoSelect = nameDoSelect;
    }

    criarDivDaEscolha() { //FOI
        this.formatarOLabelDoSelect();
        const divDaEscolha = this.criarUmElemento('div',`escolha_${this.objDoForm.nameDoSelect}`, ['escolha']);
        //const divDaEscolha = document.createElement('div');
        //divDaEscolha.setAttribute("id", `escolha_${this.objDoForm.nameDoSelect}`);
        //divDaEscolha.setAttribute('class', 'escolha');
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

    criarLabel() { //FOI, mas pode mudar mais
        const elementoLabel = this.criarUmElemento('label', null, [], { "for": this.objDoForm.nameDoSelect });
        //const elementoLabel = document.createElement('label');
        //elementoLabel.setAttribute("for", this.objDoForm.nameDoSelect);
        elementoLabel.textContent = this.objDoForm.textoDoLabel;
        return elementoLabel;
    }
    
    criarSelect() { //FOI
        const elementoSelect = this.criarUmElemento('select', this.objDoForm.nameDoSelect, [], { "name": this.objDoForm.nameDoSelect });
        //const elementoSelect = document.createElement('select');
        //elementoSelect.setAttribute("id", this.objDoForm.nameDoSelect);
        //elementoSelect.setAttribute("name", this.objDoForm.nameDoSelect);
        return elementoSelect;
    }
    
    criarOption() { //Foi, mas pode mudar mais?
        const elementoOption = this.criarUmElemento('option');
        //const elementoOption = document.createElement('option');
        const valorDaOptionFormatado = this.objDeOptionDoForm.valorDaOption.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/[\s-]/g, '_');
        elementoOption.value = valorDaOptionFormatado;
        elementoOption.textContent = this.objDeOptionDoForm.textoDaOption;

        if(elementoOption.value === this.stringDoValorNovo) {
            elementoOption.style.fontWeight = 'bold';
        }

        return elementoOption;
    }

    //metodos das escolhas com tipo "Novo"
    criarEscolhaNova() { //entender como vai funcionar aqui a criacao de elementos dinamico
        const temOpcaoNovo = this.verificarSeOpcaoExiste(this.stringDoValorNovo);
        const temOpcaoVazio = this.verificarSeOpcaoExiste(this.stringDoValorVazio);

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

    verificarSeOpcaoExiste(valor) {
        const opcaoDoObj = this.objDoForm.options;
        const temOpcao = opcaoDoObj.some(opcao => opcao.valorDaOption === valor);
        return temOpcao;
    }

    criarDivDaEscolhaNova() {
        
        const divDaEscolhaNova = this.criarDivDaEscolha(); //e ai, mudamos?
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

    criarInputDeTextoNovo() { //FOI
        const elementoInputDeTextoNovo = this.criarUmElemento('input', `nova_${this.objDoForm.nameDoSelect}`, [], { "name": `nova_${this.objDoForm.nameDoSelect}` });
        //const elementoInputDeTextoNovo = document.createElement('input');
        //elementoInputDeTextoNovo.setAttribute("id", `nova_${this.objDoForm.nameDoSelect}`);
        //elementoInputDeTextoNovo.setAttribute("name", `nova_${this.objDoForm.nameDoSelect}`);
        
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

    criarSpanDeErro() { //FOI (estamos formatando o label, sera que da pra incluir?)
        const elementoSpanDeErro = this.criarUmElemento('span', `span_erro_campo_vazio_nova_${this.objDoForm.nameDoSelect}`, ['span_erro_campo_vazio']);
        //const elementoSpanDeErro = document.createElement('span');
        //elementoSpanDeErro.setAttribute("id", `span_erro_campo_vazio_nova_${this.objDoForm.nameDoSelect}`);
        //elementoSpanDeErro.setAttribute("class", `span_erro_campo_vazio`);
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
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

    criarSpanDeAviso() { //FOI (mesmo problema do text content aqui)
        const elementoSpanDeAviso = this.criarUmElemento('span', `span_aviso_informar_termo_nova_${this.objDoForm.nameDoSelect}`, ['span_aviso_informar_termo']);
        //const elementoSpanDeAviso = document.createElement('span');
        //elementoSpanDeAviso.setAttribute("id", `span_aviso_informar_termo_nova_${this.objDoForm.nameDoSelect}`);
        //elementoSpanDeAviso.setAttribute("class", `span_aviso_informar_termo`);
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
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
    criarDivDeTodosOsBotoes() { //FOI
        const divDoBotao = this.criarUmElemento('div','botao');
        //const divDoBotao= document.createElement('div');
        //divDoBotao.setAttribute('id', 'botao');
        this.meuFormDinamico.appendChild(divDoBotao);
    }

    criarBotoesComEvento(textoDoBotao, idDoBotao) { //FOI (podemos fazer mais?)
        const botaoGerador = this.criarUmElemento('button', idDoBotao, ['botaoGerador'], { "type": "button" });
        //const botaoGerador = document.createElement('button');
        //botaoGerador.setAttribute('id', idDoBotao);
        //botaoGerador.setAttribute('class', 'botaoGerador');
        //botaoGerador.setAttribute('type', 'button');
        botaoGerador.textContent = textoDoBotao;
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
                outputFinal = this.concertarOrdemDaDataNoOutput(outputFinal, this.stringDoEmail);
            }

            if(prefixo === this.prefixoDoWhatsApp) {
                outputFinal = outputFinal.toLowerCase(); 
                outputFinal = this.concertarOrdemDaDataNoOutput(outputFinal, this.stringDoWhatsApp);
            }

            let elementoParagrafo = document.querySelector(`#prefixo_${prefixo}`);
            elementoParagrafo.textContent = outputFinal;
        })
    }

    concertarOrdemDaDataNoOutput(outputFinal, string) {
        if(this.botaoClicado === 'botaoDeGerarComData') {
            const outputPartes = outputFinal.split('_');
            const data = outputPartes.pop();
            outputFinal = `${outputPartes.join('_')}_${string}_${data}`;
        } else {
            outputFinal = `${outputFinal}_${string}`;
        }
        return outputFinal;
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
    criarDivDeTodasAsSaidas() { //FOI
        const divDoOutput = this.criarUmElemento('div','saidas');
        //const divDoOutput = document.createElement('div');
        //divDoOutput.setAttribute('id', 'saidas');
        this.meuFormDinamico.appendChild(divDoOutput);
    }

    criarParagrafos() { //FOI
        this.arrayDePrefixos.forEach((prefixo) => {
            const elementoParagrafo = this.criarUmElemento('p', `prefixo_${prefixo}`, ['saida']);
            //const elementoParagrafo = document.createElement('p');
            //elementoParagrafo.setAttribute("id", `prefixo_${prefixo}`);
            //elementoParagrafo.setAttribute('class', 'saida');
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
                options: [
                    { valorDaOption: "ADH", textoDaOption: "Adhoc" },
                    { valorDaOption: "JOR", textoDaOption: "Jornada" }
                ]
            },
            {
                textoDoLabel: "CATEGORIA",
                options: [
                    { valorDaOption: "Pós", textoDaOption: "Pós" },
                    { valorDaOption: "Pré", textoDaOption: "Pré" },
                    { valorDaOption: "Education", textoDaOption: "Education" },
                    { valorDaOption: "Transacional", textoDaOption: "Transacional" },
                    { valorDaOption: "Institucional", textoDaOption: "Institucional" },
                    { valorDaOption: "MPD", textoDaOption: "Marketing produto" },
                    { valorDaOption: "Evento", textoDaOption: "Evento" },
                    { valorDaOption: "News", textoDaOption: "News" },
                    { valorDaOption: "CS", textoDaOption: "CS" },
                    { valorDaOption: "Webinar", textoDaOption: "Webinar" },
                    { valorDaOption: "ESG", textoDaOption: "ESG" },
                    { valorDaOption: "MPD_Core", textoDaOption: "MPD_Core" },
                    { valorDaOption: "MPD_FSBU", textoDaOption: "MPD_FSBU" },
                    { valorDaOption: "NOVO", textoDaOption: "NOVO" }
                ]
            },
            {
                textoDoLabel: "SUBCATEGORIA",
                options: [
                    { valorDaOption: "CorEx-Lead Solutions", textoDaOption: "CorEx-Lead Solutions" },
                    { valorDaOption: "CorEx-Produtos fisicos", textoDaOption: "CorEx-Produtos fisicos" },
                    { valorDaOption: "CorEx-Hotmart Pro", textoDaOption: "CorEx-Hotmart Pro" },
                    { valorDaOption: "CorEx-Player", textoDaOption: "CorEx-Player" },
                    { valorDaOption: "CorEx-Cloud", textoDaOption: "CorEx-Cloud" },
                    { valorDaOption: "Core-Club", textoDaOption: "Core-Club" },
                    { valorDaOption: "Core-CreatorCockpit", textoDaOption: "Core-CreatorCockpit" },
                    { valorDaOption: "FSBU-CommercialAgent", textoDaOption: "FSBU-CommercialAgent" },
                    { valorDaOption: "FSBU-BNPL", textoDaOption: "FSBU-BNPL" },
                    { valorDaOption: "FSBU-Orderbump", textoDaOption: "FSBU-Orderbump" },
                    { valorDaOption: "FSBU-SmartRecovery", textoDaOption: "FSBU-SmartRecovery" },
                    { valorDaOption: "FSBU-Cartão", textoDaOption: "FSBU-Cartão" },
                    { valorDaOption: "FSBU-Antecipação", textoDaOption: "FSBU-Antecipação" },
                    { valorDaOption: "FSBU-Checkout", textoDaOption: "FSBU-Checkout" },
                    { valorDaOption: "Cross", textoDaOption: "Cross" },
                    { valorDaOption: "NOVO", textoDaOption: "NOVO" }
                ]
            },
            {
                textoDoLabel: "NOME DISPARO",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "NOVO", textoDaOption: "NOVO" }
                ]
            },
            {
                textoDoLabel: "TIPO CONTEÚDO",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "Ebook", textoDaOption: "E-book" },
                    { valorDaOption: "LP", textoDaOption: "LP" },
                    { valorDaOption: "Video", textoDaOption: "Video" },
                    { valorDaOption: "Infográfico", textoDaOption: "Infográfico" },
                    { valorDaOption: "One page review", textoDaOption: "One page review" },
                    { valorDaOption: "Aula club", textoDaOption: "Aula no club" },
                    { valorDaOption: "Webinário", textoDaOption: "Webinário" },
                    { valorDaOption: "Blogpost", textoDaOption: "Blogpost" },
                    { valorDaOption: "NOVO", textoDaOption: "NOVO" }
                ]
            },
            {
                textoDoLabel: "PSICOLOGIA EMAIL",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "Neutro", textoDaOption: "Neutro" },
                    { valorDaOption: "Positivo", textoDaOption: "Positivo" },
                    { valorDaOption: "Negativo", textoDaOption: "Negativo" }
                ]
            },
            {
                textoDoLabel: "FUNIL",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "ToFu", textoDaOption: "ToFu" },
                    { valorDaOption: "MoFu", textoDaOption: "MoFu" },
                    { valorDaOption: "BoFu", textoDaOption: "BoFu" }
                ]
            }
        ],        
        ['', 'WA','DE', 'FIL', 'AUT', 'JB', 'IMP', 'EXT', 'FT']
    );
};