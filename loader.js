module.exports = (modules=[])=>{
  // create empty container
  let ioc = {};

  // inject all modules, without dependencies
  Object.keys(modules).forEach((key)=>{
    ioc[key] = modules[key].lib ? require(modules[key].path) : require(modules[key].path)({})
  })

  // use proxy object to intercept access then recreate
  // called object with all deps
  return new Proxy(ioc,{
    get: (target, name)=>(
      modules[name].lib ? require(modules[name].path) : require(modules[name].path)(target)
    )
  })
}