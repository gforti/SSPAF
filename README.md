# SSPAF 

## Simple Single Page Application Framework

The idea here is to create a single page app with modern JavaScript.  This is not a full featured framework but is a front end framework.  There is no security and is intended for school, sample projects or quick prototypes.

> Note this framework will only work on modern browsers

SSPAF is a CLI that will generate the files needed for a node based dev environment.


## Installation

```sh
$ npm install -g sspaf
```

## Quick Start

Generate the app by running `sspaf` followed by the folder name of your choice:

```bash
$ sspaf foo
```

> Do not forget to enter the folder that was just created

```bash
$ cd foo
```

### Quick Start Options

The command `$ sspaf <file_name>` will generate the base files needed to get started.

> If no file name is entered it will just generate the files in the current folder

Use this command for more template options

```sh
$ sspaf --help
```

| Option | Short Command | Full Command | Uses |
| ------ | ------ | ------ | ------ |
| Base Template | -b | --base | Base code no implementation |
| Crud Template | -c | --crud | Crud base code with no endpoint |
| Crud with json server Template | -j | --json | Crud base code with json server module(Working endpoint) |
| Full Demo Template | -d | --demo | Code with highlighted features and examples |

> The base template is the default option

To use a command just enter 

```sh
$ sspaf -d foo
```

### Project Start Guide

Once generated you can quickly begin development with the steps below.

> Make sure to run the command that will install the dependencies

```bash
$ npm install
```

Now we can start the server with the following command to begin development

```bash
$ npm start
```

All changes made in `app_client` will picked up and update to the `spa.min.js` file.

> `index.html` will run on `http://localhost:3000/`


# Documentation

## spa.js

This file is the core of the SPA.  It's the director and manages the page.  Nothing needs to be updated or added unless you would like to add or fix the functionality.

`SSPAF` supports

- Simple hash navigation
- Query Param handling
- Two way binding
- Auto Form two way binding when changes are made
- Http calls
- Http template calls **NEW**
- Event Listener binding
- Loading Screen
- Promise based
- Modern use of JavaScript (es6+)
- CSS class binding **NEW**

> After each page is finished loading the `spaRouteReady` Event is dispatched



## spa.views.js

The views are your page templates.  When a hash triggers a page the view will be loaded.

The hash name must match the view name.

> location `#test` must have 

```js
get home() {
    return Promise.resolve(html)
}
```

with the mixin extention **fetch-html.js** there is a feature to call in template HTML files

just the location of the html file

```js
get form() {
    return this.fetchHTML('public/templates/form.html')
} 
```


### Adding Links

Be sure to update the nav links on `index.html` for global navigation


### Bind Info

Adding a `data-bind-*` attribute to html tags allows the simple framework to maintain the state of your page elements

Here is a list of bind attributes you can add

| Attribute | Use |
| ------ | ------ |
| data-bind-model | Model key name |
| data-bind-callback | Model function called after bind-model update |
| data-bind-safe | Escape HTML before bind-model |
| data-bind-input="false" | Ignore two way binding for form fields |
| data-bind-event | Attach an event listener |
| data-bind-class | Add or remove class names based on a condition |

These are reserved by the framework

| Attribute | Use |
| ------ | ------ |
| data-bind-ready | framework has setup watch for element |
| data-bind-display | Element bind-model value is empty or not empty (visible or hidden)  |



### Bind HTML (data-bind-model)

You can add the `data-bind-model` attribute to a tag to inject html from the model.

The value of the custom attribute will be tied to the `model.dataBindModel` object

```html
<p data-bind-model="reviews"></p>
```

Inside of `spa.model.js`

```js
this.dataBindModel.reviews = `<strong>Hello World</strong>`
```

If you would like to do a safe bind just include the attribute `data-safe` along with the `data-bind-model` attribute 

```html
<p data-bind-model="reviews" data-bind-safe></p>
```

### Display State (data-bind-display)

when you bind HTML to a DOM element it will manage a custom attribute called `data-bind-display`.
This gives you the flexibility to decide how empty DOM elements waiting for a value should be displayed

This attribute can be managed by `CSS` to either always display or use the `visibility: hidden` | `display: none` properties.

The default CSS used in `public/style.css`

```css
*[data-bind-display=hidden]:not(input):not(select):not(textarea) {    
    opacity: 0;
    transition: opacity 0.3s, visibility 0.3s;
    visibility: hidden;
}
*[data-bind-display=visible]:not(input):not(select):not(textarea) {    
    opacity: 1;
    transition: opacity 0.3s, visibility 0.3s;
    visibility: visible;
}
```

### DOM Events (data-bind-event)

Events can also be binded to html tags with the custom attribute `data-bind-event` like so

```html
<input type="text" name="author" data-bind-event="keyup:updateAuthor" />
```
or 
```html
<input type="button" value="submit" data-bind-event="click:saveReviews" />
```

The first value is the event followed by the function to be called from the `Model class`

> data-bind-event="`event`:`function`"

Must be a supported event in JavaScript. The function cannot pass any custom paramters but does pass the event object.

You can access the event object to get the target DOM Element.

```html
<button data-id="${row._id}" data-bind-event="click:updatePage">Update</button>
```

In the `spa.model.js` file you can write the event like so

```js
updatePage(evt){       
    const params = this.generateUrlParams({id: evt.target.dataset.id})
    window.location.href = `${params}#update` 
    return Promise.resolve()
}
```

### Auto Bind for Input fields on change

All fields with a `name` attribute will auto bind the name as the key with the changed value to the `model.dataBindModel` object

Currently only `input`, `select` and `textarea` fields are supported

> Other fields can easily be supported by updating the `lib/spa.js` file; function `bindModelText()` selectors and update `twoWayFormBind()` target.matches

```html
<input type="text" name="reviewText" />
```

```js
model.dataBindModel.reviewText // this value is available by the input[name] attribute
```

If you wish to ignore this bind either remove the name attribute or the data-bind-model. 
If it must have a name attribute you may add the following attribute

```html
<input type="text" name="reviewText" data-bind-input="false" />
```


### data-bind-callback

A callback can be used after element bind model has been updated.

The function must be in the `Model` class.  It passes the element as the first parameter

```html
<p data-bind-model="date" data-bind-callback="formatHTML"></p>
```

> Not that the `formatDate` function is a mixin addon

```js
formatHTML(elem) {
    const data = this.dataBindModel[elem.dataset.bindModel] 
    if ( data && data.length )
    elem.innerHTML = `<p data-bind-model="reviews3"></p> ${this.formatDate(data)}`
    return Promise.resolve()
}
```


### data-bind-class

This allows you to add or remove a class based on a condition.  All keys and values must have a single qoute(').

```html
data-bind-class="{'class name' : 'condition'}"
```

The condition also allows for false states too by adding **!** to the condition

```html
data-bind-class="{'class name' : '!condition'}"
```

```html
<p data-bind-class="{'is-info':'condition', 'is-warning':'!condition'}">Testing</p>
```

Full example

```html
<p>  <input id="field_terms" type="checkbox" required name="terms">
    <label for="field_terms">I accept the <u>Terms and Conditions</u></label>
</p>

<p data-bind-class="{'is-info':'condition', 'is-warning':'!condition'}" class="is-spaced">Class change when the checkbox is checked</p>
```

The function in the Model class must return a boolean and must be a get variable not a function

```js
get condition() {
    return this.dataBindModel.terms
}
```


## spa.components.js

This file is to place component views that are injected after the page is loaded.

> All functions should be `static and must return a Promise`

Data can be passed and processed to return the html for the view.  To be properly injected you must update the `dataBindModel` from the `Model class`
and also bind the text into the html view.

**spa.views.js**
```html
<tbody data-bind-model="reviewTable"></tbody>
```

**spa.components.js**
```js
static resultsData(data){
    if ( ! Array.isArray(data) ) return Promise.resolve('')
    return Promise.resolve(`${data.map(row=>                                         
                `<tr>
                    <td>${row.author}</td>
                    <td>${row.rating}</td>
                    <td>${row.reviewText}</td>
                    <td><button data-id="${row._id}" data-event="click:deleteReview">Delete</button></td>
                    <td><button data-id="${row._id}" data-event="click:updatePage">Update</button></td>
                </tr>`
            ).join('')}`)
}
```

**spa.model.js**
```js
getTodoList() {
        return this.http.get(this.APIS.Todo)
                .then( data => {
                   return Components.todoTable(data).then(html => { return this.dataBindModel.todoTable = html })
                })
    }
```


## spa.model.js

The Model is where all your business logic should be. Functions that will be executed from `data-event`s or values that will be binded 
with `this.dataBindModel` are to be handled within the `Model class`.

> Note the `this.dataBindModel` object resets after a new page is loaded

The Base Model comes with code to store API endpoints, the dataBindModel object, http calls with fetch, and support for url query/search params

### Fetch calls

All Fetch calls return the data as a JSON object.  The data passed in must be a json object.  It will be converted to a payload
for a backend service.

**Payload Data**
```js
const data = {
    author : this.dataBindModel.author,
    rating : this.dataBindModel.rating,
    reviewText : this.dataBindModel.reviewText
}
```
**Functions available**
- this.http.get(url)
- this.http.post(url, data)
- this.http.put(url, data)
- this.http.delete(url)

### Endpoints

You can add a list of endpoints or json files to the variable `this.APIS`.  Since the endpints are normally static
they can be added in the constructor function of `spa.model.js`

```js
constructor() {
    super()
    this.APIS = {
        Reviews : 'http://localhost:3001/api/v1/reviews/',
        Todo : 'public/todo.json'
    }
}
```

I recommend if you want to resolve a url with different ports on localhost to use this method instead.

```js
this.APIS = {
    Reviews : `//${window.location.hostname}:3001/api/v1/reviews/`
}
```

> Don't forget to use the back-tick instead of the single quote

### URL Query(Search) Params


Search params are known to be ?id=123 that is added to the url. 
Use the function `this.urlParams` to get a JS standard `new URLSearchParams()` object

```js
this.urlParams().get('id')
```
For more info: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams


To build query/search params use the function `this.generateUrlParams(params = {})`.  
The function takes in a json object of key value pairs.

```js
const params = this.generateUrlParams({id: '123'})
```

> Note that the nav links that are on the `index.html` page have the query/search params removed on each view update.


### Working with dataBindModel

The data model is maintained by each page.  So the #home page and the #form page has its own data. 

You can set a key with a value like so

```js
this.dataBindModel.author = 'Gabriel'
```

You can also set multipule values too

```js
this.dataBindModel = {author: 'Gabriel', review: 'Cool Guy'}
```

if you want to clear all the keys for a page you use the `clearDataBindModel()` function

> The function will know what page you are on and only clear the bind model data on the current page only

```js
add() { 
    this.Model.clearDataBindModel()
    return window.Promise.resolve()
}
```



### Here are some samples on how to create functions.

> You can chain your promise functions by returning a value. 

> Add a `.then()` after a catch to act as a `try, catch, finally`

```js
deleteReview(evt) {
    const url = `${this.APIS.Reviews}${evt.target.dataset.id}`
    return this.http.delete(url)
           .then( ()=>{
               return this.dataBindModel.deleteResultMsg = 'Review Deleted'                                
           }).catch( err => {
                return this.dataBindModel.deleteResultMsg = 'Review NOT Deleted'                                 
           }).then( () => {
               return this.getReviews()
           })
}
```

## spa.controller.js

Like the view, each controller function must match the hash name used to generate the page.

> location `#test` must have `test() { return Promise }`

```js
home() {
    return this.model.getReviews()
}
```

If the page does not need to process any data from the model before the view is rendered you can simply just do

```js
add() {                   
    return Promise.resolve()
}
``` 

> A `promise` must be returned

## Mixins

You can extend the functionality of this framework. 

 To add a function to the framework prototype you can simply do the following:

```js
Object.assign(BaseModel.prototype, {
    redirect(route = window.location.hash.slice(1).split('?')[0], params = {}) {
        const query = this.generateUrlParams(params)
        window.location.assign(`${query}#${route}`)
    }
})
```

Any files added to the `mixins` folder of the project will be packed within `spa.min.js`
This should allow for drop n use functionality.  With the above example we are extending the Model class.
The redirect function will be available within the Model class

> Mixins may become a point of conflict if they overwrite native class methods

```js
this.redirect('home')
```

so this updatePage function:

```js
updatePage(evt){
    const params = this.generateUrlParams({id: evt.target.dataset.id})
    window.location.href = `${params}#update`
    return Promise.resolve()
}
```

can be rewritten like so
```js
updatePage(evt){
    this.redirect('update',{id: evt.target.dataset.id})
    return Promise.resolve()
}
```

> If you want to skip a default paramater in JS just pass `undefined` in its place

```js
this.redirect(undefined,{id: evt.target.dataset.id})
``` 

## More JavaScript Guides

https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation
