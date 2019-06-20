class CalcController{
    
    constructor(){
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

    // Método responsável por detectar todos os botões e texts
    // com a tag "g" e também por acionar o método "addEventListenerAll"
    // para inserir todos os eventos passados como parâmetro ao elemento.
    initButtonsEvents(){

        let buttons = document.querySelectorAll('#buttons > g , #parts > g')

        buttons.forEach((btn, index) =>{

            this.addEventListenerAll(btn, 'click drag', e => {

                console.log(btn.className.baseVal.replace("btn-", ""))
            
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