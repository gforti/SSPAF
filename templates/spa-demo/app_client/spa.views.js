class View {

    get home() {
        const html = `<h1>Home page</h1>
                      <div data-bindText="msg"></div>
                      <div data-bindText="msgReverse"></div>`
        return html
    }

    get form() {
       return `<h1>Form page</h1>
                <form data-bindall>
                    <p>Blur out of the field to see the bind data update</p>
                    <p>
                        <label>Author</label>
                        <input type="text" name="author" />
                        <p data-bindtext="author"></p>
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
                        <p data-bindtext="rating"></p>
                    </p>
                </form>`
    }

    get todo() {
        return `<h1>Todo Fetch List</h1>
                <div data-bindText="todoList"></div>`
    }

    get test() {
        return `test`
    }

    get safe() {
        return `<h1>Safe HTML Test</h1>
                <p>Most modern browsers have support to protect from xss attacks</p>
                <p><a href="?id=<strong>Is safe HTML?</strong>#safe">Click to Reload with unsafe URL Params</a></p>
                <p> Safe Text: <span data-bindtext="test" data-safe></span></p>
                <p> NOT Safe Text: <span data-bindtext="test"></span></p>
                <p> Safe HTML Input: <br /> <textarea data-bindText="test" data-safe></textarea></p>
                <p> Not Safe HTML Input: <br /> <textarea data-bindText="test"></textarea></p>
                `
    }

}