class CalcController{
    
    constructor(){
        this._displayCalc;
        this._currentDate;
        this.initialize();
    }

    initialize(){

        let timeEL = document.querySelector("#hora");
        let dateEL = document.querySelector("#data");
        let displayCalcEL = document.querySelector("#display");

        timeEL.innerHTML = "00:00";
        dateEL.innerHTML = "01/05/2020";
        displayCalcEL.innerHTML = "0000";
    }

    get displayCalc(){
        return this._displayCalc;
    }
    set displayCalc(valor){
        this._displayCalc = valor; 
    }

    get currentDate(){
        return this._currentDate;
    }
    set currentDate(valor){
        this._currentDate = valor; 
    }

}