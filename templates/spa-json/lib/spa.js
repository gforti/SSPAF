class SPA {

    constructor(route) {
        this.content = document.querySelector('div.spa-content')
        this.loading = document.querySelector('div.spa-loading').classList
        this.Model = new Model()
        this.view = new View()
        this.controller = new Controller(this.Model)
        
        

        window.addEventListener('hashchange', () => {
            this.loadingStart()
            this.Model.dataBind = {}
            let page = `${window.location.hash.slice(1).split('?')[0]}`
            document.body.id = page
            this.controller[page]()
                    .then(() => {
                        return this.renderContent(this.view[page])
                    })
                    .then(() => {
                      this.bindModelText().parseEvents().twoWayFormBind().cleanNavLinks().loadingEnd()  
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
        window.dispatchEvent(new CustomEvent('sparouteload'))
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
            this.bindModelText().parseEvents().twoWayFormBind()
        })
    }

    cleanNavLinks() {
        let links = document.querySelector('nav').querySelectorAll('a')
        links.forEach(link => {
            link.setAttribute('href', `${window.location.origin}${link.hash}`)
        })
        return this
    }

    parseEvents() {
        let contents = this.content.querySelectorAll('*[data-event]')
        contents.forEach(domElem => {
            const [evtName, funcName] = domElem.dataset.event.split(':')
            domElem.addEventListener(evtName, evt => {
                return this.update(evt, funcName)
            })
            delete domElem.dataset.event
        })
        return this
    }

    twoWayFormBind() {
        let form = this.content.querySelector('form[data-bindall]')
        if (form) {
            form.addEventListener('input', (event) => {
                const target = event.target
                const property = target.name
                if (property && target.matches('input, select, textarea')) {
                    this.Model.dataBind[property] = target.value
                }
            })
            delete form.dataset.bindall
        }
        return this
    }

    bindModelText() {
        let contents = this.content.querySelectorAll('*[data-bindtext], input[name], select[name], textarea[name]')
        const obj = this.Model.dataBind
        if (contents) {
            contents.forEach(domElem => {
                const property = domElem.name || domElem.dataset.bindtext
                const selector = `*[data-bindText="${property}"], input[name="${property}"], select[name="${property}"], textarea[name="${property}"]`
                let val, safeVal
                const useSafeHTML = domElem.hasAttribute('data-safe')
                if (obj.hasOwnProperty(property) && obj[property] !== undefined) {
                    val = obj[property]
                    safeVal = this.Model.escapeHTML(val)
                    if ('value' in domElem) domElem.value = useSafeHTML ? safeVal : val
                    else if ('innerHTML' in domElem) domElem.innerHTML = useSafeHTML ? safeVal : val
                }
                if (!domElem.matches('input, select, textarea') && domElem.dataset.bindtext)
                    if (!domElem.innerHTML.length) domElem.dataset.spadisplay = 'hidden'
                    else domElem.dataset.spadisplay = 'visible'
                Object.defineProperty(obj, property, {
                    get: () => { return val },
                    set: (newValue) => {
                        let elems = document.querySelectorAll(selector)
                        val = newValue
                        safeVal = this.Model.escapeHTML(val)
                        if (elems) {
                            elems.forEach(elem => {
                                if ('value' in elem) elem.value = useSafeHTML ? safeVal : val
                                else if ('innerHTML' in elem) elem.innerHTML = useSafeHTML ? safeVal : val
                                if (!elem.matches('input, select, textarea') && elem.dataset.bindtext)
                                    if (!elem.innerHTML.length) elem.dataset.spadisplay = 'hidden'
                                    else elem.dataset.spadisplay = 'visible' 
                            })
                        }
                    },
                    configurable: true
                })
            })
        }
        return this
    }

}