const {apps,start} =require('bitev.io.app')
require('dotenv').config()


start({
    app:apps.at,
    port:8087,
    env:{
        api:process.env.API_URL,
        key:process.env.API_KEY
    }
})