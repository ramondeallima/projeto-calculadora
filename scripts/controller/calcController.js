class CalcController{
    
    constructor(){
        this.locale = 'pt-BR';
        this._timeEL = document.querySelector("#hora");
        this._dateEL = document.querySelector("#data");
        this._displayCalcEL = document.querySelector("#display");

        this.currentDate;
        this.initialize();
    }

    initialize(){

        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this.locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
    }

    get displayCalc(){
        return this._displayCalcEL.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEL.innerHTML = value; 
    }

    get displayTime(){
        return this._timeEL.innerHTML;
    }
    set displayTime(value){
        return this._timeEL.innerHTML = value;
    }

    get displayDate(){
        return this._dateEL.innerHTML;
    }
    set displayDate(value){
        return this._dateEL.innerHTML = value;
    }

    get currentDate(){
        return new Date;
    }
    set currentDate(value){
        this._dateEL.innerHTML = value; 
    }

}