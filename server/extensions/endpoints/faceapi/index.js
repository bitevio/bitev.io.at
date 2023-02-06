module.exports = (context) => {
    const { router ,services,api ,state } = context;
    router.get("/private/faceapi/descriptors", async (req, res) => {
    
  
        res.send(state.descriptors||[])
        
        
    });
  };