const request=require("request")
const forecast=(latitude,longitude,callback)=>{
    const url =
    `http://api.weatherstack.com/current?access_key=83968cabf2717a43db10b16b50e11c71&query=${latitude},${longitude}&units=f`;
       request({url:url,json:true},(error,{body}={})=>{
       if(error){
           callback("Unable to connect to weather services",undefined)

       }
       else if(body.error){
        callback("Unable to  find the weather for that location",undefined)

       }
       else{
            response=`${body.current.weather_descriptions[0]}. The current temparature is ${body.current.temperature} degress out.It feels like ${body.current.feelslike} `
           callback(undefined,response)

       }

   }) 
}
module.exports=forecast