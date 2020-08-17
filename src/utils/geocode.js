const request=require("request")
const geocode=(adress,callback)=>{
    const url =
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoicmVkczk4IiwiYSI6ImNrY3ZreXU2cDA1OW4yeW13emRueHlmYXQifQ.kD_b2s6iLauom7NvOnQ4ng&limit=1`;
   request({url:url,json:true},(error,{body}={})=>{
       if(error){
           callback("Unable to connect to location services",undefined)

       }
       else if(body.features.length === 0){
        callback("Unable to  find the location.Try another search",undefined)

       }
       else{

           callback(undefined,{
               latitude:body.features[0].center[1],
               longitude : body.features[0].center[0],
               location:body.features[0].place_name
           })

       }

   }) 
}
module.exports=geocode