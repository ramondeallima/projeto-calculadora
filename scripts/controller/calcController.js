class CalcController{
    
    constructor(){

        this._operation = []
        this.locale = 'pt-BR'
        this._timeEL = document.querySelector("#hora")
        this._dateEL = document.querySelector("#data")
        this._displayCalcEL = document.querySelector("#display")

        this.currentDate
        this.initialize()
        this.initButtonsEvents()
    }

    initialize(){

        this.setDisplayDateTime()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)

    }

    // Método que de fato insere cada evento passado
    // ao elemento através de um forEach que reconhece
    // cada evento que fora passado como string mas transformado
    // em Array pelo split.
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
            
            element.addEventListener(event, fn, false)

        })

    }

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        this._operation.pop()
    }
    
    getLastOperation(){
        
        return this._operation[this._operation.length - 1]

    }
    
    setLastOperation(value){
        this._operation[this._operation.length - 1] = value
    }

    isOperator(value){
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)
    }

    pushOperation(value){

        this._operation.push(value)
        
        if (this._operation.length > 3) {
            
            let last = this._operation.pop()
            
            console.log(this._operation)

        }
    }

    addOperation(value){

        if (isNaN(this.getLastOperation())) {
            
            if (this.isOperator(value)) {

                if (this.isOperator(this.getLastOperation())) {

                    this.setLastOperation(value)
                
                }else{

                    this._operation.push(value)
                
                }
                
            
            }else if (isNaN(value)){

                console.log('Outra coisa', value)

            }else{

                this.pushOperation(value)

            }

        }else if (this.isOperator(value)){

            this.pushOperation(value)
            
        }else{

            let newValue = this.getLastOperation().toString() + value
            this.setLastOperation(parseInt(newValue))
        
        }

    }

    setError(){
        this.displayCalc = 'Error';
    }

    
    execBtn(value){
        switch (value) {
            case 'ac':
                this.clearAll()
                break;
            case 'ce':
                this.cancelEntry()  
                break;
            case 'soma':
                this.addOperation('+')
                break;
            case 'subtracao':
                this.addOperation('-')
                break;
            case 'divisao':
                this.addOperation('/')
                break;
            case 'multiplicacao':
                this.addOperation('*')
                break;
            case 'porcento':
                this.addOperation('%')
                break;
            case 'igual':
                break;
            case 'ponto':
                this.addOperation('.')
                    break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break
            default:
                this.setError()
                break;
        }
    }


    // Método responsável por detectar todos os botões e texts
    // com a tag "g" e também por acionar o método "addEventListenerAll"
    // para inserir todos os eventos passados como parâmetro ao elemento.
    initButtonsEvents(){

        let buttons = document.querySelectorAll('#buttons > g , #parts > g')

        buttons.forEach((btn, index) =>{

            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace("btn-", "")
                
                this.execBtn(textBtn)
            
            })
            
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                
                btn.style.cursor = 'pointer'
                
            })
        })
        
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this.locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale)
    }

    get displayCalc(){
        return this._displayCalcEL.innerHTML
    }
    set displayCalc(value){
        this._displayCalcEL.innerHTML = value 
    }

    get displayTime(){
        return this._timeEL.innerHTML
    }
    set displayTime(value){
        return this._timeEL.innerHTML = value
    }

    get displayDate(){
        return this._dateEL.innerHTML
    }
    set displayDate(value){
        return this._dateEL.innerHTML = value
    }

    get currentDate(){
        return new Date
    }
    set currentDate(value){
        this._dateEL.innerHTML = value 
    }

}