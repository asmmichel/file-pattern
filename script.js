class FormDinamico {
    constructor(idDoForm, arrayObjsDoForm, arrayObjsDePrefixos) {
        this.meuFormDinamico = document.querySelector(`#${idDoForm}`);
        this.arrayObjsDoForm = arrayObjsDoForm;
        this.arrayObjsDePrefixos = arrayObjsDePrefixos;
        this.objDoForm = {};
        this.objDeOptionDoForm = {};
        this.stringDoValorVazio ='';
        this.stringDoValorNovo = 'NOVO';
        this.stringDeElementAtivo = 'ativo'
        this.botaoClicado = ''
        this.stringDoEmail = 'EM01'
        this.stringDoWhatsApp = 'd1'
        this.prefixoDoWhatsApp = 'MI'
        this.iniciar();
    }



    //PRINCIPAIS METODOS
    iniciar() {
        this.criarEscolhas();
        this.criarBotoes();
        this.criarSaidas();
        console.log('opa');
    }

    criarEscolhas() {
        const divDasEscolhas = this.criarUmElemento('div','escolhas', ['form-row']);
        this.meuFormDinamico.appendChild(divDasEscolhas);
        this.arrayObjsDoForm.forEach(objDoForm => {
            this.objDoForm = objDoForm;
            this.criarEscolha();
            this.criarEscolhaNova();
        });
    }

    criarBotoes() {
        const divDosBotoes = this.criarUmElemento('div','botoes', ['botaoGerador', 'form-row', 'row', 'flex-column']);
        this.meuFormDinamico.appendChild(divDosBotoes);
        this.criarBotoesComEvento('Gerar Campanha', 'botaoGerarCampanha', ['botaoGerador', 'btn', 'btn-primary']);
        this.criarBotoesComEvento('Gerar com Data', 'botaoDeGerarComData', ['botaoGerador', 'btn', 'btn-secondary']);
    }

    criarSaidas() {
        const divDasSaidas = this.criarUmElemento('div','saidas', ['form-group']);
        this.meuFormDinamico.appendChild(divDasSaidas);
        this.arrayObjsDePrefixos.forEach(({textoDaSaida, prefixo}) => {
            const divDaSaida = this.criarUmElemento('div', null, ['div_saida', 'form-row', 'col-12', 'col-md-12']);
            const labelDaSaida = this.criarUmElemento('label', null, ['label_saida', 'col-sm-2', 'col-form-label'], { "for": `prefixo_${prefixo}`}, `${textoDaSaida}`);
            const divDoInputDeSaida = this.criarUmElemento('div', null, ['div_input_saida', 'col-sm-10']);
            const inputDeSaida = this.criarUmElemento('input', `prefixo_${prefixo}`, ['input_saida', 'form-control'], { "name": `prefixo_${prefixo}`, "type": "text", "disabled": "true"});
            divDasSaidas.appendChild(divDaSaida);
            divDaSaida.appendChild(labelDaSaida);
            divDaSaida.appendChild(divDoInputDeSaida);
            divDoInputDeSaida.appendChild(inputDeSaida);
        })
    }



    //CRIADOR DE ELEMENTOS
    criarUmElemento(tipoDoElemento, idDoElemento, classesDoElemento = [], atributosDoElemento = {}, textContentDoElemento) {
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
        if (textContentDoElemento) {
            meuElemento.textContent = textContentDoElemento;
        }
    
        return meuElemento;
    }



    //METODOS DAS ESCOLHAS BASICAS
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

    criarDivDaEscolha() {
        this.formatarOLabelDoSelect();
        const divDaEscolha = this.criarUmElemento('div',`escolha_${this.objDoForm.nameDoSelect}`, ['escolha', 'form-group', 'col-6', 'col-md-3']);
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
        const elementoLabel = this.criarUmElemento('label', null, [], { "for": this.objDoForm.nameDoSelect }, this.objDoForm.textoDoLabel);
        return elementoLabel;
    }
    
    criarSelect() {
        const elementoSelect = this.criarUmElemento('select', this.objDoForm.nameDoSelect, ['form-control', 'only-dropdown'], { "name": this.objDoForm.nameDoSelect });
        return elementoSelect;
    }
    
    criarOption() {
        const elementoOption = this.criarUmElemento('option', null, [], {}, this.objDeOptionDoForm.textoDaOption);
        const valorDaOptionFormatado = this.objDeOptionDoForm.valorDaOption.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/[\s-]/g, '_');
        elementoOption.value = valorDaOptionFormatado;

        if(elementoOption.value === this.stringDoValorNovo) {
            elementoOption.style.fontWeight = 'bold';
        }

        return elementoOption;
    }



    //METODOS DAS ESCOLHAS COM TIPO "NOVO"
    criarEscolhaNova() {
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

            if(!temOpcaoVazio) {
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
        const elementoInputDeTextoNovo = this.criarUmElemento('input', `nova_${this.objDoForm.nameDoSelect}`, ['form-control'], { "name": `nova_${this.objDoForm.nameDoSelect}`, "placeholder": `Escreva o novo termo aqui` });
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
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
        const elementoSpanDeErro = this.criarUmElemento(
            'span',
            `span_erro_campo_vazio_nova_${this.objDoForm.nameDoSelect}`,
            ['span_erro_campo_vazio'],
            {},
            `${textoDoLabelFormatado} não pode estar vazio!`
        );
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
        const textoDoLabelFormatado = this.formatarOTextoDoLabel();
        const elementoSpanDeAviso = this.criarUmElemento(
            'span',
            `span_aviso_informar_termo_nova_${this.objDoForm.nameDoSelect}`,
            ['span_aviso_informar_termo'],
            {},
            `Caso necessário, enviar uma mensagem para pessoa@hotmail.com informando 
            o novo termo de ${textoDoLabelFormatado}, para podermos mensurar nos Dashboards!`
        );
        return elementoSpanDeAviso;
    }

    adicionarEventoNoInputDeTextoNovo() {
        const elementoInputDeTextoNovo = this.meuFormDinamico.querySelector(`#escolha_nova_${this.objDoForm.nameDoSelect}`);
        const elementoSpanDeAviso = this.meuFormDinamico.querySelector(`#span_aviso_informar_termo_nova_${this.objDoForm.nameDoSelect}`);

        elementoInputDeTextoNovo.addEventListener('mouseover', () => {
            elementoSpanDeAviso.classList.add(this.stringDeElementAtivo);
        });

        elementoInputDeTextoNovo.addEventListener('mouseout', () => {
            elementoSpanDeAviso.classList.remove(this.stringDeElementAtivo);
        });
    }



    //METODOS DOS BOTÕES
    criarBotoesComEvento(textoDoBotao, idDoBotao, classeDoBotao) {
        const divDoBotaoGerador = this.criarUmElemento('div', null, ['divDoBotaoGerador', 'col-12', 'text-center', 'mb-6']);
        const botaoGerador = this.criarUmElemento('button', idDoBotao, classeDoBotao, { "type": "button" }, textoDoBotao);
        const divDosBotoes = document.querySelector('#botoes');
        divDoBotaoGerador.appendChild(botaoGerador);
        divDosBotoes.appendChild(divDoBotaoGerador);
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

        this.arrayObjsDePrefixos.forEach(({ prefixo }) => {
            outputFinal = `${prefixo}_${valoresDosSelectsConcatenados}`

            if(prefixo === this.stringDoValorVazio) {
                outputFinal = outputFinal.slice(1);
                outputFinal = this.concertarOrdemDaDataNoOutput(outputFinal, this.stringDoEmail);
            }

            if(prefixo === this.prefixoDoWhatsApp) {
                outputFinal = outputFinal.toLowerCase(); 
                outputFinal = this.concertarOrdemDaDataNoOutput(outputFinal, this.stringDoWhatsApp);
            }

            let elementoInputDeSaida = document.querySelector(`#prefixo_${prefixo}`);
            elementoInputDeSaida.value = outputFinal;
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
        this.arrayObjsDePrefixos.forEach(({prefixo}) => {
            let elementoInputDeSaida = document.querySelector(`#prefixo_${prefixo}`);
            elementoInputDeSaida.value  = '';
        })
    }

    pegarValorDoInputDeTextoNovo(select) { 
        const inputDeTextoNovo = document.querySelector(`input[name="nova_${select.name}"]`);
        const valorDoInputDeTextoNovo = inputDeTextoNovo.value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/[\s-]/g, '_');
        return valorDoInputDeTextoNovo;
    }

}





//INPUTS DO USUARIO
window.onload = () => {
    new FormDinamico(
        'meuFormDinamico', 
        [
            {
                textoDoLabel: "Localização",
                options: [
                    { valorDaOption: "NY", textoDaOption: "Nova Iorque" },
                    { valorDaOption: "LA", textoDaOption: "Los Angeles" },
                    { valorDaOption: "SF", textoDaOption: "São Francisco" },
                    { valorDaOption: "LDN", textoDaOption: "Londres" },
                    { valorDaOption: "PAR", textoDaOption: "Paris" },
                    { valorDaOption: "TKY", textoDaOption: "Tóquio" }
                ]
            },
            {
                textoDoLabel: "Tipo de Projeto",
                options: [
                    { valorDaOption: "WEB", textoDaOption: "Desenvolvimento Web" },
                    { valorDaOption: "APP", textoDaOption: "Desenvolvimento de Aplicativos" },
                    { valorDaOption: "UI", textoDaOption: "Design de Interface" },
                    { valorDaOption: "UX", textoDaOption: "Experiência do Usuário" }
                ]
            },
            {
                textoDoLabel: "Categoria",
                options: [
                    { valorDaOption: "Educação", textoDaOption: "Educação" },
                    { valorDaOption: "Entretenimento", textoDaOption: "Entretenimento" },
                    { valorDaOption: "Saúde", textoDaOption: "Saúde" },
                    { valorDaOption: "Finanças", textoDaOption: "Finanças" },
                    { valorDaOption: "NOVO", textoDaOption: "NOVO" }
                ]
            },
            {
                textoDoLabel: "Subcategoria",
                options: [
                    { valorDaOption: "OnlineCourse", textoDaOption: "Curso Online" },
                    { valorDaOption: "GameApp", textoDaOption: "Jogo para Aplicativo" },
                    { valorDaOption: "FitnessTracker", textoDaOption: "Rastreador de Fitness" },
                    { valorDaOption: "BudgetPlanner", textoDaOption: "Planejador Financeiro" },
                    { valorDaOption: "NOVO", textoDaOption: "NOVO" }
                ]
            },
            {
                textoDoLabel: "Nome do Projeto",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "NOVO", textoDaOption: "NOVO" }
                ]
            },
            {
                textoDoLabel: "Tipo de Conteúdo",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "Artigo", textoDaOption: "Artigo" },
                    { valorDaOption: "Vídeo", textoDaOption: "Vídeo" },
                    { valorDaOption: "Infográfico", textoDaOption: "Infográfico" },
                    { valorDaOption: "Webinar", textoDaOption: "Webinar" }
                ]
            },
            {
                textoDoLabel: "Tom do Email",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "Profissional", textoDaOption: "Profissional" },
                    { valorDaOption: "Amigável", textoDaOption: "Amigável" },
                    { valorDaOption: "Formal", textoDaOption: "Formal" }
                ]
            },
            {
                textoDoLabel: "Etapas",
                options: [
                    { valorDaOption: "", textoDaOption: "" },
                    { valorDaOption: "Consciência", textoDaOption: "Consciência" },
                    { valorDaOption: "Interesse", textoDaOption: "Interesse" },
                    { valorDaOption: "Decisão", textoDaOption: "Decisão" }
                ]
            }
        ],
        [
            { textoDaSaida: "Canal de Comunicação", prefixo: "" },
            { textoDaSaida: "Mensagem Instantânea", prefixo: "MI" },
            { textoDaSaida: "Filtragem", prefixo: "FL" },
            { textoDaSaida: "Automatização de Processos", prefixo: "AP" },
            { textoDaSaida: "Jornada do Usuário", prefixo: "JU" },
            { textoDaSaida: "Importação de Dados", prefixo: "ID" },
            { textoDaSaida: "Extração de Informações", prefixo: "EI" },
            { textoDaSaida: "Transferência de Arquivos", prefixo: "TA" }
        ]
        
    );
};