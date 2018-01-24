module.exports = ({module2,module3})=>(
  class Module1{
    constructor(){
      console.log("Module1")
      new module2()
      new module3()
    }
  }
)