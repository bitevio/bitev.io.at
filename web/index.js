const {apps,start} =require('bitev.io.app')
require('dotenv').config()

console.log(

    `
    Is running with : \n
    API URL : ${process.env.API_URL}\n
    API KEY : ${process.env.API_KEY}
    
    `
)

start({
    app:apps.at,
    port:8087,
    env:{
        api:process.env.API_URL,
        key:process.env.API_KEY
    }
})