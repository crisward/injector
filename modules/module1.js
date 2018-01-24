module.exports = ({module2,module3})=>(
  class Module1{
    constructor(){
      console.log("Module1")
      new module2("hello from module 1")
    }
  }
)