const { Collection } = require("bitev.io/types")

module.exports= Collection({
       slug:"Medias",
       timestamps:true,
       fields:[
        {
            name:"ref",
            type:'string'
        },
        {
            name:'driver', // ftp , or local
            type:'string'
        },
        {
        name:"filename",
        type:"string",
       }, 
       {
        name:"filedisk",
        type:"string",
       }, 
       {
        name:"asseturl", // Assets url if driver is ftp
        type:"string",
       }, 
       {
        name:"url",
        type:"string",
       }, 
       {
        name:"details", 
        type:"json",
       }, 
       {
        name:"data", // Additional information for user
        type:"json",
       }, 
    ]
})