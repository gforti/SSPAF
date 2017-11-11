class Components {
    static reverseSring(str){
        return Promise.resolve(`<p>${str.split('').reverse().join('')}</p>`)
    }

    static todoList(data){
        if ( ! Array.isArray(data) ) return Promise.resolve('')
        return Promise.resolve(`<ol class="list">
                    ${data.map(row=>
                    `<li>
                        <input type="checkbox" id="check-${row.id}" ${row.completed ? 'checked="checked"' : ''}">
                        <label for="check-${row.id}">${row.title}</label>
                    </li>`
                ).join('')}
                </ol>`)
    }
}