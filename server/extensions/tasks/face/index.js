const chokidar = require('chokidar');

module.exports = async ({ api, task, services, state }) => {
     const path = process.cwd() + '/uploads/*'
     chokidar.watch(path, {
          ignoreInitial:true
     }).on("all", (event, path) => {
          
          if (path.match(/(jpeg|jpg)/)) {
               sync()
          }
     })
     sync()
  
     async function sync() {

     var descriptors = await services.faceapi.getDescriptors(api).then(e => e).catch(err => {
          return []
     })
          state.descriptors = descriptors
          console.log('Update all faces descriptors ')
    }
};