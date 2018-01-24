const loader = require("./loader")
let app = loader({
  module1:{path:"./modules/module1"},
  module2:{path:"./modules/module2"},
  module3:{path:"./modules/module3"},
})

new app.module1()