class Model extends BaseModel {

    constructor() {
        super()
        this.APIS = {
            Todo : 'public/todo.json'
        }
    }

    getHomeMessage() {
       const msg = 'Hello Home Page'
       this.dataBindModel.msg = msg
        return Components.reverseSring(msg).then(html => {
           return this.dataBindModel.msgReverse = html
        })
    }

    getTodo() {
        return this.http.get(this.APIS.Todo)
                .then( data => {
                   return Components.todoList(data).then(html => {
                       return this.dataBindModel.todoList = html
                   })
                })
    }

    setTest() {
        this.dataBindModel.test = this.urlParams().get('id')
        return Promise.resolve()
    }
    
    
    setReviews(){
       // this.clearDataBindModel()
       this.dataBindModel.reviews = '<strong> testing reviews</strong>'
       //this.dataBindModel.reviews2 = ''
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
   
   
   get condition() {
       return this.dataBindModel.terms
   }

}