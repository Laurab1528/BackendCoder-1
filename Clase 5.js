

const fs = require("fs")

class contenedor {
    
     constructor(file,){
        this.file=file
     }

     
     AllData= async()=>{
        try {
           let data = await fs.promises.readFile(this.file, "utf-8")
           let parsedData = await JSON.parse(data)
          return parsedData
        } catch (error) {

            console.log(error)
            

               }
            
     }  

     RandomData = async()=>{
      try {
         let data = await fs.promises.readFile(this.file, "utf-8")
         let parseData = await JSON.parse(data)
         let RandomIndex= Math.floor(Math.random()* parseData.length)
         let RandomProduct = parseData[RandomIndex]
         return RandomProduct
      } catch (error) {
          console.error(error)
      }
  }

    

}

module.exports = contenedor



const archivo = new contenedor ("archivo.json");




const express = require("express");
const app = express();


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))


app.get('/AllData', (req, res) => {
    res.send(archivo.AllData())
 })

 app.get('/RandomData', (req, res) => {
    res.send(archivo.RandomData())
 })


 