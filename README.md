# Injector
[![Build Status](https://travis-ci.org/crisward/riot-grid.svg)](https://travis-ci.org/crisward/injector)

## What is it?

Creating a very simple dependency injection system using proxy objects and object destructuring. 

## What does it do?

Basically assign all of your dependencies to an object.
eg.
```javascript
const app = require("../index")()
app.module1 = ()=> "my module"
app.module2 = ()=> "my other module"
```

Each dependency needs to be wrapped in a function when contains one destructuring object.
eg.
```javascript
app.module3 = ({module1,module2})=> ()=> console.log(module1,module2)
app.module3()
// outputs "my module my other module"
```

If you don't want to wrap the function in an injector, perhaps when loading npm modules just prefix the key with an underscore.

ie.
```javascript
app._moment = require("moment")
app.module = ({moment})=> ()=> moment().format("ddd, hA"); 
app.module()
// returns eg "Sun, 3PM"
```

## Connecting all NPM Dependencies

When you setup your app, you could pass in all your  node libraries at the begining. 
eg.

```javascript
const injector = require("../index")
let app = injector({
  moment:requre("moment"),
  sequelize:requre("sequelize")
})

app.mything = ({moment,sequelize})=>(
 ()=>{
   // your code here...
 }
)
```


## Why?

Using require or import in all the files in your project has a few issues.

* The dependencies are tightly coupled with each other, so testing / stubbing can be difficult without patching require.
* Moving files within a project becomes difficult, without finding and updating each require statements path.

## Usage

Just copy the index.js file into your project. I'd add this to npm, but for so little code it's hardly worth it.

## Issues

This doesn't currently detect or handle circuluar dependencies.