class Model extends BaseModel {

    constructor() {
        super()
        this.APIS = {
            Todo : 'public/todo.json'
        }
    }

    getHomeMessage() {
       const msg = 'Hello Home Page'
       this.dataBind.msg = msg
       this.dataBind.msgReverse = Components.reverseSring(msg)
       return Promise.resolve()
    }

    getTodo() {
        return this.http.get(this.APIS.Todo)
                .then( data => {
                   return this.dataBind.todoList = Components.todoList(data)
                })
    }

    setTest() {
        this.dataBind.test = this.urlParams().get('id')
        return Promise.resolve()
    }

}