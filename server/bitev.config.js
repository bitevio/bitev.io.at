const Bitev = require("bitev.io");
const bitev = new Bitev();




//

bitev.init({
  port:process.env.PORT,
  debug: true,
  express: {
    
  
  },
 
});

