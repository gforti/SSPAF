class Components {
    
   static todoTable(data){
        if ( ! Array.isArray(data) ) return ''
        return `${data.map(row=>                                         
                    `<tr>
                        <td>${row.id}</td>
                        <td>${row.title}</td>
                        <td>${row.completed}</td>
                        <td><button data-id="${row.id}" data-event="click:deleteTodo" class="button is-danger">Delete</button></td>
                        <td><button data-id="${row.id}" data-event="click:goToUpdatePage" class="button is-link">Update</button></td>
                    </tr>`
                ).join('')}`
    }
    
    
}