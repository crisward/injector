module.exports = ()=>{
  // create empty container
  let modules = {};
  let resolved = {}
  // use proxy object to intercept access then recreate
  // called object with all deps
  let app = new Proxy(modules,{
    get: (target, name)=>{
      // if it's lib, just return
      if(typeof name === "string"){
        let libname = "_"+name
        if(modules[libname]){ 
          return modules[libname]
        }
        if(!modules[name]){
          console.warn("could not find",name)
          return null
        }
        return modules[name](app)
      }
    },
    set: (target, name, value)=>{
      modules[name]=value
    }
  })
  return app
}