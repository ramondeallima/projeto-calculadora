class CalcController{
    
    constructor(){

        this._lastNumber = ''
        this._lastOperator = ''
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

        // Intervalo de atualização para 
        // data e hora.
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)

        this.setLastNumberToDisplay()

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
        this.setLastNumberToDisplay()

    }

    clearEntry(){

        this._operation.pop()
        this.setLastNumberToDisplay()
    
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

            this.calc()
        }
    }
    
    getResult(){
        return eval(this._operation.join(''))
    }

    calc(){

        let last = '';
        this._lastOperator = this.getLastItem()

        if(this._operation.length < 3){

            let firstItem = this._operation[0]
            this._operation = [firstItem, this._lastOperator, this._lastNumber]

        if (this._operation.length > 3){

            last = this._operation.pop()
            this._lastNumber = this.getResult()
        
        }else if(this._operation.length == 3){

            this.lastNumber = this.getLastItem(false)

        }

        let result = this.getResult()

        if (last == '%') {
            
            result /= 100
            this._operation = [result]

        }else{

            this._operation = [result]

            if (last ) {
                this._operation.push(last)
            }
        }

        this.setLastNumberToDisplay()
    }

    getLastItem(isOperator = true){

        let lastItem;

        for (let i = this._operation.length-1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i]
                break
            }
            
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this.lastNumber
        }

    }

    setLastNumberToDisplay(){
        
        let lastNumber = this.getLastItem(false)

        if (!lastNumber) {
            lastNumber = 0
        }

        this.displayCalc = lastNumber
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
                this.setLastNumberToDisplay()

            }

        }else if (this.isOperator(value)){

            this.pushOperation(value)
            
        }else{

            let newValue = this.getLastOperation().toString() + value
            this.setLastOperation(parseInt(newValue))

            this.setLastNumberToDisplay()
        
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
                this.clearEntry()  
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
                this.calc()
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