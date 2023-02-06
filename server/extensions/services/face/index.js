const tf = require("@tensorflow/tfjs-node");
const fs=require("fs")
const faceapi = require("@vladmandic/face-api");
const canvas = require("canvas");
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image,ImageData });

async function init(bitev) {
 
    
  return new Promise(async (resolve, reject) => {
    try {
        var descriptors = [];
  var model_url = process.cwd() + "/models";
  var img_path = process.cwd() + "/uploads/";
       await Promise.all([
         faceapi.nets.ssdMobilenetv1.loadFromDisk(model_url),
         faceapi.nets.tinyFaceDetector.loadFromDisk(model_url),
         faceapi.nets.faceExpressionNet.loadFromDisk(model_url),
         faceapi.nets.faceLandmark68Net.loadFromDisk(model_url),
         faceapi.nets.faceRecognitionNet.loadFromDisk(model_url),
       ]);
      var personnelles = await bitev
        .findMany("employees")
        .then((e) => e)
          .catch((err) => []);


          console.log('Personnelles is ',personnelles)
        
        

      for await (var personnel of personnelles) {
        if (!personnel.facials.length) personnel.facials = [];
        var saveDescriptors = [];
        for await (var img of personnel?.facials) {
          const imgURL = img_path + "/" + img.filedisk;

          if (fs.existsSync(imgURL)) {
          var imgData = await canvas.loadImage(imgURL).then((e) => e);

          const detections = await faceapi
            .detectSingleFace(
              imgData,
              new faceapi.SsdMobilenetv1Options({
                minConfidence: 0.5,
               // maxResults:200
             })
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (detections) {
            // console.log("All fig", detections);
            saveDescriptors.push(detections.descriptor);
          }
          }
        }

        if (saveDescriptors.length) {
            descriptors.push(
            new faceapi.LabeledFaceDescriptors(
              `${personnel?.first_name} ${personnel?.last_name} |${personnel?.contact}|${personnel?.id}`,
              saveDescriptors
            ),
          );
        }
      }

     // console.log(descriptors)
      return resolve(descriptors);
       
    } catch (err) {
      console.log(err)
      resolve([])
     }

 })
}

module.exports = () => {
  return {
    name: "faceapi", // Optinal
    getDescriptors:init,
  };
};