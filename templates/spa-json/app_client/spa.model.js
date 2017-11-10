class Model extends BaseModel {

    constructor() {
        super()  
        this.APIS = {
            Todo : `//${window.location.hostname}:3001/todo/`
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
    
    saveTodo(evt) {
        
        let form = evt.target.form        
        if (!form.checkValidity()) {
            this.dataBind.saveResultMsg = 'All fields are required'
            return Promise.resolve()
        }
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
   
   updateTodo(evt) {
       let form = evt.target.form        
        if (!form.checkValidity()) {
            this.dataBind.updateResultMsg = 'All fields are required'
            return Promise.resolve()
        }
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
   
   setReviews(){
       // this.clearDataBindModel()
       this.dataBindModel = {reviews: "<strong> testing reviews</strong>"}
       //this.dataBind.reviews2 = ''
       return Promise.resolve()
   }
   
   updateReview(evt){
       this.dataBindModel = {reviews3: this.dataBindModel.reviews, reviews5: 5 }
       return Promise.resolve()
   }
   
   formatHTML(elem) {
       const data = this.dataBindModel[elem.dataset.bindModel] 
       if ( data && data.length )
       elem.innerHTML = `<p data-bind-model="reviews3"></p> ${this.formatDate(data)}`
       return Promise.resolve()
   }
   

}