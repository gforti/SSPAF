class View {
                       
    get home() {                    
        const html = `<h1>Home page</h1>
                      <div data-bindText="msg"></div>
                      <div data-bindText="msgReverse"></div>`                                
        return html
    }  
    
    get todo() { 
        return `<h1>Todo Fetch List</h1>
                <div data-bindText="todoList"></div>`
    }
    
    get test() { 
        return `test`
    }
  
}