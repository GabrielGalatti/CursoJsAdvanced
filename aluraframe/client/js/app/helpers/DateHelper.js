class DateHelper{

    constructor(){
        throw new Error('DateHelper não pode ser instanciado! Métodos estáticos')
    }
    
    static dataParaTexto(data){
        return `${data.getDay()}/${data.getMonth() + 1}/${data.getFullYear()}`
        
        // data.getDay() + '/' + (data.getMonth() - 1) + '/' + data.getFullYear();
    }

    static textoParaData(texto){
        if(!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('Deve estar no formato aaaa-mm-dd')
        return new Date (...texto.split('-').map((item, indice) => item - indice % 2))
    }

}