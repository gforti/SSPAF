window.addEventListener('sparouteload', ()=>{   
    document.querySelectorAll('form').forEach( form => {
        form.addEventListener('submit', event => event.preventDefault())
    })    
})