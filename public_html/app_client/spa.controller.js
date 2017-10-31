class Controller {
                
    constructor(model) {
        this.Model = model                   
    }

    home() {
        return this.Model.getHomeMessage()
    }
    
    test() {
        return Promise.resolve()
    }
    
}