module.exports = (modules=[])=>{
  // create empty container
  let ioc = {};

  // use proxy object to intercept access then recreate
  // called object with all deps
  let app = new Proxy(ioc,{
    get: (target, name)=>{
      //if(ioc[name]) return ioc[name]
      if(!modules[name]) return {}
      return modules[name].lib ? require(modules[name].path) : require(modules[name].path)(target)
    },
    set: (target, name, value)=>{
      modules[name] = value
      injectAll()
    }
  })

  // inject all modules, without dependencies
  let injectAll = ()=>{
    Object.keys(modules).forEach((name)=>{
      ioc[name] = modules[name].lib ? require(modules[name].path) : require(modules[name].path)(app)
    })
  }
  injectAll()
  return app
}