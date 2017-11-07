# SSPAF 

## Simple Single Page Application Framework

The idea here is to create a single page app with modern JavaScript.  This is not a full featured framework but is a front end framework.  There is no security and is intended for school, sample projects or quick prototypes.

> Note this framework will only work on modern browsers

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

The command `$ sspaf <file_name>` will generate the basic files needed to get started.

Use these commands for more template options

```sh
$ sspaf --help
```

|Option|Short Command| Full Command |
| Base Template | -b | --base |
| Crud Template | -c | --crud |
| Full Demo Template | -d | --demo |

> The base template is the default option

To use a command like so

```sh
$ sspaf -d foo
```

### Project Start Guide

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
- Event Listener binding
- Loading Screen
- Promise based
- Modern use of JavaScript (es6+)


## spa.views.js

The views are your page templates.  When a hash triggers a page the view will be loaded.

The hash name must match the view name.

> location `#test` must have `test() { return html }`


### Adding Links

Be sure to update the nav links on `index.html` for global navigation

### Bind HTML

You can add the `data-bindText` attribute to a tag to inject html from the model.

The value of the custom attribute will be tied to the `model.bindData` object

```html
<p data-bindText="reviews"></p>
```

Inside of `spa.model.js`

```js
this.bindData.reviews = `<strong>Hello World</strong>`
```

If you would like to do a safe bind just include the attribute `data-safe` along with the `data-bindText` attribute 

```html
<p data-bindText="reviews" data-safe></p>
```

### DOM Events

Events can also be binded to html tags with the custom attribute `data-event` like so

```html
<input type="text" name="author" data-event="keyup:updateAuthor" />
```
or 
```html
<input type="button" value="submit" data-event="click:saveReviews" />
```

The first value is the event followed by the function to be called from the `Model class`

> data-event="`event`:`function`"

Must be a supported event in JavaScript. The function cannot pass any custom paramters but does pass the event object.

You can access the event object to get the target DOM Element.

```html
<button data-id="${row._id}" data-event="click:updatePage">Update</button>
```

In the `spa.model.js` file you can write the event like so

```js
updatePage(evt){       
    const params = this.generateUrlParams({id: evt.target.dataset.id})
    window.location.href = `${params}#update` 
    return Promise.resolve()
}
```

### Auto Bind Form Data on change

To bind all form fields just add the `data-bindall` attribute to the form tag

All fields with a `name` attribute will auto bind the name as the key with the changed value to the `model.bindData` object

Currently only `input`, `select` and `textarea` fields are supported

> Other fields can easily be supported by updating the `lib/spa.js` file; function `bindModelText()` selectors and update `twoWayFormBind()` target.matches

```html
<form data-bindall>
    <input type="text" name="reviewText" />
</form>
```

```js
model.bindData.reviewText // this value is available by the data-bindall attribute
```


## spa.components.js

This file is to place component views that are injected after the page is loaded.

> All functions should be `static`

Data can be passed and processed to return the html for the view.  To be properly injected you must update the `bindData` from the `Model class`
and also bind the text into the html view.

**spa.views.js**
```html
<tbody data-bindtext="reviewTable"></tbody>
```

**spa.components.js**
```js
static resultsData(data){
    if ( ! Array.isArray(data) ) return ''
    return `${data.map(row=>                                         
                `<tr>
                    <td>${row.author}</td>
                    <td>${row.rating}</td>
                    <td>${row.reviewText}</td>
                    <td><button data-id="${row._id}" data-event="click:deleteReview">Delete</button></td>
                    <td><button data-id="${row._id}" data-event="click:updatePage">Update</button></td>
                </tr>`
            ).join('')}`
}
```

**spa.model.js**
```js
getReviews() {
    return this.http.get(this.APIS.Reviews)
           .then( data => {
                return this.dataBind.reviewTable = Components.resultsData(data) 
            })                       
}
```


## spa.model.js

The Model is where all your business logic should be. Functions that will be executed from `data-event`s or values that will be binded 
with `this.bindData` are to be handled within the `Model class`.

> Note the `this.bindData` object resets after a new page is loaded

The Base Model comes with code to store API endpoints, the bindData object, http calls with fetch, and support for url query/search params

### Fetch calls

All Fetch calls return the data as a JSON object.  The data passed in must be a json object.  It will be converted to a payload
for a backend service.

**Payload Data**
```js
const data = {
    author : this.dataBind.author,
    rating : this.dataBind.rating,
    reviewText : this.dataBind.reviewText
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


### Here are some samples on how to create functions.

> You can chain your promise functions by returning a value. 

> Add a `.then()` after a catch to act as a `try, catch, finally`

```js
deleteReview(evt) {
    const url = `${this.APIS.Reviews}${evt.target.dataset.id}`
    return this.http.delete(url)
           .then( ()=>{
               return this.dataBind.deleteResultMsg = 'Review Deleted'                                
           }).catch( err => {
                return this.dataBind.deleteResultMsg = 'Review NOT Deleted'                                 
           }).then( () => {
               return this.getReviews()
           })
}
```

**Crud**

```js
    getReviews() {
       return this.http.get(this.APIS.Reviews)
              .then( data => {
                   return this.dataBind.reviewTable = Components.resultsData(data) 
               })                       
   }

   saveReviews() {
       const data = {
           author : this.dataBind.author,
           rating : this.dataBind.rating,
           reviewText : this.dataBind.reviewText
       }                    
       return this.http.post(this.APIS.Reviews, data)
               .then( data => {
                   this.dataBind.saveResultMsg = 'Review Saved'
                   return data
               }).catch( err => {
                   this.dataBind.saveResultMsg = 'Review NOT Saved'   
                   return err
               })                   
   }

   deleteReview(evt) {
       const url = `${this.APIS.Reviews}${evt.target.dataset.id}`
       return this.http.delete(url)
               .then( ()=>{
                   return this.dataBind.deleteResultMsg = 'Review Deleted'                                
               }).catch( err => {
                    return this.dataBind.deleteResultMsg = 'Review NOT Deleted'                                 
               }).then( () => {
                   return this.getReviews()
               })
   }

   updateAuthor(evt){
       this.dataBind.author = evt.target.value
       return Promise.resolve()
   }
   
   updatePage(evt){       
       const params = this.generateUrlParams({id: evt.target.dataset.id})
       window.location.href = `${params}#update`  
       return Promise.resolve()
   }
   
   updatePageLoad(){
       const url = `${this.APIS.Reviews}${this.urlParams().get('id')}`
       return this.http.get(url).then( data => {           
           this.dataBind.author = data.author
           this.dataBind.rating = data.rating
           this.dataBind.reviewText = data.reviewText
           this.dataBind._id = data._id
           return data
       })       
   }
   
   updateReviews(){
       const data = {
           author : this.dataBind.author,
           rating : this.dataBind.rating,
           reviewText : this.dataBind.reviewText
       }  
       const url = `${this.APIS.Reviews}${this.dataBind._id}`
       return this.http.put(url, data)
               .then( data => {
                   this.dataBind.updateResultMsg = 'Review updated'
                   return data
               }).catch( err => {
                   this.dataBind.updateResultMsg = 'Review NOT updated'   
                   return err
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