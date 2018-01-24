# Injector


## What is it?

Quick mess creating a very simple dependency injection system using proxy objects and object destructuring. See the `loader.js` file for the very simple concept. 

## What does it do?

Basically give a list of names and paths, then all your modules will get loaded. 

If you don't want to wrap the function in an injector, perhaps when loading npm modules just add `lib:true`

ie.
```javascript
let app = loader({
  Module1:{path:"./modules/module1"},
  module2:{path:"./modules/module2"},
  module3:{path:"./modules/module3"},
  moment:{path:"moment",lib:true},
})

new app.Module1()
```

Your modules look like this

```javascript

module.exports = ({Module2,moment})=>(
  class Module1{
    constructor(){
      console.log("Module1")
      module2()
    }
  }
)

or 

module.exports = ({Module1})=>(
  function module2(){
    console.log("Module2")
  }
)

```

## Why?

Using require or import in all the files in your project has a few issues.

* The dependencies are tightly coupled with each other, so testing / stubbing can be difficult without patching require.
* Moving files within a project becomes difficult, without finding and updating each require statements path.

## Usage

Just copy the loader.js file into your project. I'd add this to npm, but for so little code it's hardly worth it.