class View {

    get home() {
        return Promise.resolve(`<section class="hero is-info is-small spacer">
                    <div class="hero-body">
                        <h1 class="title">Todo Crud Sample</h1>
                    </div>
                </section>
                <p data-bindtext="deleteResultMsg" data-safe data-bindcss="{fail: 'classname', pass: 'classname'}" class="notification is-warning is-spaced"></p>              
                <table class="table is-spaced is-bordered is-hoverable is-fullwidth is-small">
                  <thead>
                    <tr class="is-selected">
                        <th>ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th></th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody data-bindtext="todoTable"></tbody>
              </table>`)
    }
    
     get add() {
        return Promise.resolve(`<section class="hero is-info is-small spacer">
                    <div class="hero-body">
                        <h1 class="title">Add New Todo</h1>
                    </div>
                </section>
                <form data-bindall>
                    <div class="field">
                        <label class="label">Title</label>
                        <input type="text" name="title" class="input" required />
                    </div>
                    <div class="field">
                        <label class="label">Completed</label>
                        <select name="completed" class="select" required>
                            <option value=""></option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div class="field"> 
                        <input type="reset" value="reset" />
                        <input type="button" value="submit" class="button is-link" data-event="click:saveTodo" /> 
                    </div>
                    <p data-bindtext="saveResultMsg" data-safe class="notification is-warning"></p>
                </form>`)
    }

    get update() {
        return Promise.resolve(`<section class="hero is-info is-small spacer">
                    <div class="hero-body">
                        <h1 class="title">Update Todo ID <span data-bindtext="id" class="has-text-warning"></span></h1>
                    </div>
                </section>
                <form data-bindall>
                    <div class="field">
                        <label class="label">Title</label>
                        <input type="text" name="title" class="input" required />
                    </div>
                    <div class="field">
                        <label class="label">Completed</label>
                        <select name="completed" class="select" required>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div class="field">
                        <input type="button" value="submit" data-event="click:updateTodo" class="button is-link" />
                    </div>
                    <p data-bindtext="updateResultMsg" data-safe class="notification is-warning is-spaced"></p>
                </form>`)
    }
    
     get test() {
        return this.fetchHTML('public/templates/test2.html')
    } 
    /*
    get test() {
        return Promise.resolve(`
        <h1>Test</h1>
        <form data-bindAll>
           <p data-bindText="reviews"></p>
           <input type="text" name="reviews"/>
        
             <p data-bindText="completed"></p>
            <select name="completed" class="select">
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
        
        <p data-bindText="reviews2"></p>
           <textarea name="reviews2"></textarea>
        
           <button data-event="click:updateReview">Test</button>
        </form>`)
    }*/
    
}