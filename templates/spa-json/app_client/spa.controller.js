class Controller {

    constructor(model) {
        this.Model = model
    }

    home() {
        return this.Model.getTodoList()
    }
    
    add() {      
        this.Model.clearDataBindModel()
        return Promise.resolve()
    }
    
    update() {        
        return this.Model.updatePageLoad()
    }
    
    test() { 
        this.Model.setReviews()
        return Promise.resolve()
    }

}