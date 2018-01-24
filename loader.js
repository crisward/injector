module.exports = (modules=[])=>{
  // create empty container
  let ioc = {};

  // use proxy object to intercept access then recreate
  // called object with all deps
  let app = new Proxy(ioc,{
    get: (target, name)=>{
      return modules[name].lib ? require(modules[name].path) : require(modules[name].path)(target)
    }
  })

  // inject all modules, without dependencies
  Object.keys(modules).forEach((key)=>{
    ioc[key] = modules[key].lib ? require(modules[key].path) : require(modules[key].path)(app)
  })

  return app
}