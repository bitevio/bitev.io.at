import { boot } from 'quasar/wrappers'

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router ,store}) => {
  // something to do


  

  router.beforeEach((to, from, next) => {
    var depthTo = to.path.split("/").length;
    var depthFrom = from.path.split("/").length;
    var div = document.getElementsByClassName("stop-on-close-route");
    var divLength = div?.length || 0;
  
    if (div[0]) {
      var parent = div[0].parentElement;
      var dialogElement = div[0];
  
      dialogElement.click();
    }
  
    console.log(depthFrom < depthTo);
  
    if (depthFrom >= depthTo && divLength) return next(false);
    if (depthFrom <= depthTo) return next();
    next();
  });
 
})
