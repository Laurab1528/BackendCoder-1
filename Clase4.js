const fs = require("fs")

class contenedor {
    
     constructor(file,){
        this.file=file
     }

     

     save= async (object)=>{
        try {
            let data = await fs.promises.readFile(this.file,"utf-8")
            let parsedData

            try {
                parsedData = await JSON.parse(data)
            } catch (error) {
                parsedData = []
            }
            if(parsedData.length > 0){
                object.id = parsedData[parsedData.length-1].id + 1;
                parsedData.push(object)
                await fs.promises.writeFile(this.file, JSON.stringify(parsedData, null, 2))
                console.log(object.id) 
                console.log(parsedData)
            } else{
                parsedData = []
                object.id = 1
                parsedData.push(object)
                await fs.promises.writeFile(this.file, JSON.stringify(parsedData, null, 2))
                console.log(object.id)
                console.log(parsedData)
            }

        } catch (error) {
            console.log(error)
        }

     }

     getById= async (id)=>{
         try {
             let data = await fs.promises.readFile(this.file,"utf-8");
             let parsedData = await JSON.parse(data)
             if(parsedData.find(e=>e.id === id)) {
                console.log( parsedData.find(e=>e.id === id))
             } else {
                console.log('el elemento no existe')
             }
             
         } catch (error) {
             console.error(error)
             
         }

     }

     getData= async()=>{
         try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parsedData = await JSON.parse(data)
           return parsedData
         } catch (error) {
             if (error.code== "ENOENT"){
                fs.writeFile(this.file, "[]",(error) =>{
                    if (error){
                        console.log("el arhivo no pudo ser creado")
                    }

                })
             }
         }

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

    

     deleteById= async (id)=>{
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parseData = await JSON.parse(data)
            if (parseData.some(e=>e.id === id)) {
                let obj = parseData.find(e=>e.id===id)
                let objPosition = parseData.indexOf(obj)
                parseData.splice(objPosition,1)
                fs.promises.writeFile(this.file, JSON.stringify(parseData, null, 2))
                console.log('el objeto fue eliminado')
            }
            
        } catch (error) {
            console.error(error)
        }
            
        
     }
     deleteAll= async()=>{
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([]))
            console.log('el contenedor esta vacio')
            
        } catch (error) {
            console.error(error)
        }
     }


}

module.exports = contenedor

const samsung = {
    name: "Samsung TV",
    price: 500,
    thumbnail: "https://img.global.news.samsung.com/ar/wp-content/uploads/2018/03/2018-QLED-TV_1-e1520441207520.jpg"
}
const LG = {
    name: "LG",
    price: 1000,
    thumbnail: "https://www.lg.com/es/images/television/md07528986/gallery/1-1100.jpg"
}
const Sony = {
    name: "Sony",
    price: 2500,
    thumbnail: "https://cosonyb2c.vtexassets.com/arquivos/ids/350956-1600-1600?v=637550243914100000&width=1600&height=1600&aspect=true"
}

const archivo = new contenedor ("archivo.json");

archivo.save(samsung);
archivo.save(LG);
archivo.save(Sony);
archivo.deleteAll();
archivo.AllData();
archivo.deleteById(3);
archivo.getById(1);