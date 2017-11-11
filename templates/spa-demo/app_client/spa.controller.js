class Controller {

    constructor(model) {
        this.Model = model
    }

    home() {
        return this.Model.getHomeMessage()
    }

    form() {
        return Promise.resolve()
    }

    test() {
        return Promise.resolve()
    }

    todo() {
        return this.Model.getTodo()
    }

    safe() {
        return this.Model.setTest()
    }
    
    form2() {
        this.Model.setReviews()
        return Promise.resolve()
    }

}