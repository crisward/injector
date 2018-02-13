var chai = require("chai");
var expect = chai.expect;
const injector = require("../index")

describe("basic injector",function(){

  it("it should return an empty object",function(){
    let app = injector()
    expect(app).to.eql({})
  })

  it("should resolve a module if it exists",function(){
    let app = injector()
    app.module1 = ()=> "blah"
    expect(app.module1).to.equal("blah")
  })

  it("should resolve a module from a module",function(){
    let app = injector()
    app.module1 = ()=> "blah from one"
    app.module2 = ({module1})=> ()=> module1
    expect(app.module2()).to.equal("blah from one")
  })

  it("should still work if the injection order is reveresed",function(){
    let app = injector()
    app.module2 = ({module1})=> ()=> module1
    app.module1 = ()=> "blah from one"
    expect(app.module2()).to.equal("blah from one")
  })

  it("should work two deep",function(){
    let app = injector()
    app.module1 = ()=> "blah from one"
    app.module2 = ({module1})=> module1
    app.module3 = ({module2})=> ()=> module2
    expect(app.module3()).to.equal("blah from one")
  })

  it("should be able to resolve multiple deps",function(){
    let app = injector()
    app.module1 = ()=> "blah from one"
    app.module2 = ()=> "blah from two"
    app.module3 = ({module2,module1})=> ()=> module1+" "+module2
    expect(app.module3()).to.equal("blah from one blah from two")
  })

  it("should not inject libs, if name starts with _, for node libs etc",function(){
    let app = injector()
    app._lib1 = "blah from one"
    app._lib2 =  "blah from two"
    app.module3 = ({lib1,lib2})=> ()=> lib1+" "+lib2
    expect(app.module3()).to.equal("blah from one blah from two")
  })

  it("should return null for unfound libs",function(){
    let app = injector()
    app.module3 = ({lib})=> ()=> lib
    expect(app.module3()).to.be.null
  })

  it("should be possible to override modules",function(){
    let app = injector()
    app.module3 = ({lib1})=> ()=> lib1
    app.lib1 = ()=> "original"
    expect(app.module3()).to.equal("original")
    app.lib1 = ()=> "replacement"
    expect(app.module3()).to.equal("replacement")
  })

  it.skip("should deal with circular dependencies",function(){
    let app = injector()
    app.module1 = ({module2})=> ()=> "module 1"
    app.module2 = ({module1})=> ()=> "module 2"
    app.module3 = ({module1,module2})=> ()=> module1()
    expect(app.module3()).to.equal("module 1")
  })

})