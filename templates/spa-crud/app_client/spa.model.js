class Model extends BaseModel {

    constructor() {
        super()  
        this.APIS = {
            Todo : 'public/todo.json'
        }
    }
    
    getTodoList() {
        return this.http.get(this.APIS.Todo)
                .then( data => {
                   return this.dataBind.todoTable = Components.todoTable(data)
                })
    }
    
    deleteTodo(evt) {
       const url = `${this.APIS.Todo}${evt.target.dataset.id}`
       return this.http.delete(url)
                .then( ()=>{
                   return this.dataBind.deleteResultMsg = 'Todo Deleted'                                
                }).catch( err => {
                    return this.dataBind.deleteResultMsg = 'Todo was NOT Deleted'                                 
                }).then( () => {
                   return this.getTodoList()
                })
    
    }
    
    saveTodo() {
        const data = {
           title : this.dataBind.title,
           completed : this.dataBind.completed
       }                    
       return this.http.post(this.APIS.Todo, data)
                .then( data => {
                   this.dataBind.saveResultMsg = 'Todo Saved'
                   return data
                }).catch( err => {
                   this.dataBind.saveResultMsg = 'Todo was NOT Saved'   
                   return err
                })     
    }
    
    goToUpdatePage(evt) {
        this.redirect('update',{id: evt.target.dataset.id})
        return Promise.resolve()
    }
        
    updatePageLoad() {
        const url = `${this.APIS.Todo}${this.urlParams().get('id')}`
        return this.http.get(url).then( data => {           
            this.dataBind.title = data.title
            this.dataBind.completed = data.completed
            this.dataBind.id = data.id
            return data
        })       
   }
   
   updateTodo() {
       const data = {
           title : this.dataBind.title,
           completed : this.dataBind.completed
       }
        const url = `${this.APIS.Todo}${this.dataBind.id}`
        return this.http.put(url, data)
                .then( data => {
                    this.dataBind.updateResultMsg = 'Todo updated'
                    return data
                }).catch( err => {
                    this.dataBind.updateResultMsg = 'Todo was NOT updated'   
                    return err
                })  
   }

}