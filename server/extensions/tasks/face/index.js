const chokidar = require('chokidar');

module.exports = async ({ api, task, services, state }) => {
     const path = process.cwd() + '/uploads/*'
     chokidar.watch(path, {
          ignoreInitial:true
     }).on("all", (event, path) => {
          
          if (path.match(/(jpeg|jpg|png)/)) {
               sync()
          }
     })
     sync()
  
     function sync() {
     services.faceapi.getDescriptors(api).then(e => {
          state.descriptors = descriptors
          console.log('Update all faces descriptors ')
     }).catch(err => {
          return []
     })
          
    }
};