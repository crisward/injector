module.exports = (libs={})=>{
  
  let modules = libs // create container based on passed in libs or empty object
  // use proxy object to intercept access
  let app = new Proxy(modules,{
    get: (target, name)=>{
      if(typeof name === "string"){
        let libname = "_"+name
        if(modules[libname]){ 
          return modules[libname] // if it's lib, just return
        }
        if(!modules[name]){
          console.warn("could not find",name) // warn if it doesn't exist and return null
          return null
        }
        return modules[name](app) // otherwise pass in proxy so it can resolve its own deps and return
      }
    },
    set: (target, name, value)=>{
      modules[name]=value
    }
  })
  return app
}