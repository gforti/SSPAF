window.addEventListener('spaRouteReady', ()=>{ 
    [].slice.call(document.querySelectorAll('*[data-no-submit]')).forEach( form => {
        form.addEventListener('submit', event => event.preventDefault())
    })    
})