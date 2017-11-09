window.addEventListener('spaRouteReady', ()=>{   
    document.querySelectorAll('form').forEach( form => {
        form.addEventListener('submit', event => event.preventDefault())
    })    
})