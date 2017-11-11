class View {

    get home() {
        const html = `<h1>Home page</h1>
                      <div data-bind-model="msg"></div>
                      <div data-bind-model="msgReverse"></div>`
        return Promise.resolve(html)
    }

    get form() {
       return Promise.resolve(`<h1>Form page</h1>
                <form data-custom-no-submit>
                    <p>Blur out of the field to see the bind data update</p>
                    <p>
                        <label>Author</label>
                        <input type="text" name="author" />
                        <p data-bind-model="author"></p>
                    </p>
                    <p>
                        <label>Rating</label>
                        <select name="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <p data-bind-model="rating"></p>
                    </p>
                </form>`)
    }

    get todo() {
        return Promise.resolve(`<h1>Todo Fetch List</h1>
                <div data-bind-model="todoList"></div>`)
    }

    get test() {
        return Promise.resolve(`test`)
    }

    get safe() {
        return Promise.resolve(`<h1>Safe HTML Test</h1>
                <p>Most modern browsers have support to protect from xss attacks</p>
                <p><a href="?id=<strong>Is safe HTML?</strong>#safe">Click to Reload with unsafe URL Params</a></p>
                <p> Safe Text: <span data-bind-model="test" data-bind-safe></span></p>
                <p> NOT Safe Text: <span data-bind-model="test"></span></p>
                <p> Safe HTML Input: <br /> <textarea data-bind-model="test" data-bind-safe data-bind-input="false"></textarea></p>
                <p> Not Safe HTML Input: <br /> <textarea data-bind-model="test" data-bind-input="false"></textarea></p>
                `)
    }
    
    get form2() {
        return this.fetchHTML('public/templates/test2.html')
    } 

}