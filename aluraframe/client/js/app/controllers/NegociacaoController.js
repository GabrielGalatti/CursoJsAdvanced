class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');
        //  = new ListaNegociacoes(model => this._negociacoesView.update(model));
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        
        this._mensagem = new Proxy(new Mensagem(), {
            get(target, prop, receiver){
                return console.log(`Interceptando ${target[prop]}`)
                
                
            }
            
        })

        this._mensagemView = new MensagemView($("#messageView"));

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver){
                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(self._listaNegociacoes)
                    }
                }
                return Reflect.get(target, prop, receiver)
            }
        })
        this._negociacoesView.update(this._listaNegociacoes);
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso!";
        
        this._limpaForm();
        
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas"
        this._mensagemView.update(this._mensagem)
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaForm(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    
    }


}