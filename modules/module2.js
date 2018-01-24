module.exports = ({module1,module3})=>(
  class Module2{
    constructor(message){
      console.log("Module2",message)
      new module3("hello from module 2")
    }
  }
)