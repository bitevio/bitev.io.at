const {apps,start} =require('bitev.io.app')
start({
    app:apps.at,
    port:8087,
    env:{
        api:'http://localhost:5009',
        key:'ATSSD'
    }
})