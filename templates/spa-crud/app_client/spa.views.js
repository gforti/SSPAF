class View {

    get home() {
        return `<h1>Todo Crud Sample</h1>
                <p data-bindtext="deleteResultMsg"></p>
                <table>
                  <thead>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Completed</th>
                      <th></th>
                      <th></th>
                  </thead>
                  <tbody data-bindtext="todoTable"></tbody>
              </table>`
    }
    
     get add() {                    
        return `<h1> Add New Todo </h1>
                <form data-bindall>
                    <p>
                        <label>Title</label>
                        <input type="text" name="title" />
                    </p>
                    <p>
                        <label>Completed</label>
                        <select name="completed">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </p>
                    <p data-bindtext="saveResultMsg"></p>
                    <p> <input type="button" value="submit" data-event="click:saveTodo" /> </p>
                </form>`
    }
    
    get update() { 
        return `<h1> Update </h1>
                <form data-bindall>                    
                    <p>
                        <label>Title</label>
                        <input type="text" name="title" />
                    </p>
                    <p>
                        <label>Completed</label>
                        <select name="completed">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </p>
                    <p data-bindtext="updateResultMsg" data-safe></p>
                    <p> <input type="button" value="submit" data-event="click:updateTodo" /> </p>
                </form>`
    }
    
}