class View {

    get home() {
        return `<section class="hero is-info is-small">
                    <div class="hero-body">
                        <h1 class="title">Todo Crud Sample</h1>
                    </div>
                </section>
                <p data-bindtext="deleteResultMsg"></p>
                <table class="table is-bordered">
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th></th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody data-bindtext="todoTable"></tbody>
              </table>`
    }
    
     get add() {                    
        return `<section class="hero is-info is-small">
                    <div class="hero-body">
                        <h1 class="title">Add New Todo</h1>
                    </div>
                </section>
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
        return `<section class="hero is-info is-small">
                    <div class="hero-body">
                        <h1 class="title">Update Todo ID <span data-bindtext="id" class="has-text-warning"></span></h1>
                    </div>
                </section>
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