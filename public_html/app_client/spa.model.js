class Model extends BaseModel {
                
    constructor() {
       super()
       this.APIS = {
           Reviews : 'http://localhost:3001/api/v1/reviews/'
       }       
   }

   getHomeMessage() {
       const msg = 'Hello Home Page'
       this.dataBind.msg = msg
       this.dataBind.msgReverse = Components.reverseSring(msg)
       return Promise.resolve()
   }

  
}