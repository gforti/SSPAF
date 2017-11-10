class SPA {

    constructor(route) {
        this.content = document.querySelector('div.spa-content')
        this.loading = document.querySelector('div.spa-loading').classList
        this.Model = new Model()
        this.View = new View()
        this.controller = new Controller(this.Model)

        window.addEventListener('hashchange', () => {
            this.loadingStart()
            this.Model.dataBind = {}
            let page = this.Model.page
            document.body.id = page
            this.controller[page]()
                    .then(() => {
                        return this.renderContent(this.View[page])
                    })
                    .then(() => {
                      this.bindModelText().parseEvents().twoWayInputBind().cleanNavLinks().loadingEnd()  
                    })
                    .catch(err => {
                        console.error(err)
                        this.renderContent(this.Model.escapeHTML(err)).cleanNavLinks().loadingEnd()
                    })
        })

        if (!window.location.hash && typeof route === 'string') {
            window.location.hash = route
        }
        window.dispatchEvent(new HashChangeEvent('hashchange'))
    }

    loadingStart() {
        this.loading.add('visible')
        return this
    }

    loadingEnd() {
        this.loading.remove('visible')
        window.dispatchEvent(new CustomEvent('spaRouteReady'))
        return this
    }

    renderContent(page) {
        return page.then( html => {
            this.content.innerHTML = html
            return this
        })        
    }

    update(evt, funcName) {
        this.Model[funcName](evt).then(() => {
            this.bindModelText().parseEvents().twoWayInputBind()
        })
    }

    cleanNavLinks() {
        let links = [].slice.call(document.querySelector('nav').querySelectorAll('a'))
        links.forEach(link => {
            link.setAttribute('href', `${window.location.origin}${link.hash}`)
        })
        return this
    }

    parseEvents() {
        let contents = [].slice.call(this.content.querySelectorAll('*[data-event]'))
        contents.forEach(domElem => {
            const [evtName, funcName] = domElem.dataset.event.split(':')
            domElem.addEventListener(evtName, evt => {
                return this.update(evt, funcName)
            })
            delete domElem.dataset.event
        })
        return this
    }

    twoWayInputBind() {
        let inputs = [].slice.call(this.content.querySelectorAll('input, select, textarea'))
        if (inputs)
            inputs
                .filter( field => (!field.dataset.hasOwnProperty('bindInput'))
                                    && (field.name || field.dataset.hasOwnProperty('bindModel')) )
                .forEach(domElem => {            
                    domElem.dataset.bindInput = 'true'
                    domElem.addEventListener('input', (evt) => {
                        const target = evt.target
                        const property = target.name || target.dataset.bindModel
                        this.Model.dataBindModel = {[property]: target.value}                 
                    })            
                })
        return this
    }

    bindModelText() {
        let contents = [].slice.call(this.content.querySelectorAll('*[data-bind-model], input, select, textarea'))
        const obj = this.Model.dataBindModel
        
        contents.forEach(domElem => {
            const property = domElem.name || domElem.dataset.bindModel
            if ( !domElem.dataset.hasOwnProperty('bindModel'))
                domElem.dataset.bindModel = property
            const selector = `*[data-bind-model="${property}"]`
            let val, safeVal
            const useSafeHTML = domElem.hasAttribute('data-safe')
            console.log(property)
            if (obj.hasOwnProperty(property) && obj[property] !== undefined) {
                val = obj[property]
                safeVal = this.Model.escapeHTML(val)
                if ('value' in domElem) domElem.value = useSafeHTML ? safeVal : val
                else if ('innerHTML' in domElem) domElem.innerHTML = useSafeHTML ? safeVal : val
            }
            if (!domElem.matches('input, select, textarea') && domElem.dataset.hasOwnProperty('bindModel'))
                if (!domElem.innerHTML.length) domElem.dataset.bindDisplay = 'hidden'
                else domElem.dataset.bindDisplay = 'visible'
            Object.defineProperty(obj, property, {
                get: () => { return val },
                set: (newValue) => {
                    let elems = [].slice.call(this.content.querySelectorAll(selector))
                    val = newValue
                    safeVal = this.Model.escapeHTML(val)
                    console.log('setter')
                    console.log(elems)
                    if (elems) {
                        elems.forEach(elem => {
                            if ('value' in elem) elem.value = useSafeHTML ? safeVal : val
                            else if ('innerHTML' in elem) elem.innerHTML = useSafeHTML ? safeVal : val
                            if (!elem.matches('input, select, textarea') && elem.dataset.hasOwnProperty('bindModel'))
                                if (!elem.innerHTML.length) elem.dataset.bindDisplay = 'hidden'
                                else elem.dataset.bindDisplay = 'visible' 
                        })
                    }
                },
                configurable: true
            })
        })
        
        return this
    }

}