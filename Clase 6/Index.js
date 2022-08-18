const express = require("express");
const {Router} =express ;

const app = express();
const router =Router ();
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })

server.on("error", error => console.log(`Error en servidor ${error}`))

app.use (express.json());
app.use (express.urlencoded({ extended:true}));
app.use('/public', express.static(__dirname + '/public'));

app.use ('/api/products',router);

//DEV

let productsHC=[
    {name: "Sony", price: 2500, id: 1, thumbnail: "https://cosonyb2c.vtexassets.com/arquivos/ids/350956-1600-1600?v=637550243914100000&width=1600&height=1600&aspect=true"},
    {name: "LG", price: 1000, id: 2, thumbnail: "https://www.lg.com/es/images/television/md07528986/gallery/1-1100.jpg"},
    {name: "Sony", price: 2500,id: 3,thumbnail: "https://cosonyb2c.vtexassets.com/arquivos/ids/350956-1600-1600?v=637550243914100000&width=1600&height=1600&aspect=true"},
];

class Products {
    constructor(products) {
        this.products = [...products];
        //this.products = products;

    }
    getAll() {
      return this.products
            
     }  

     findOne (id){
        return this.products.find((item) => item.id ==id);
     }

     AddOne (product){
        const lastItem = this.products[this.products.length -1];
        let lastID=1;;
        if (lastItem) {
            lastID=lastItem.id +1;

        }

        product.id =last.id;
        this.products.push (product);
        return this.products[this.products.length-1];

     }

    UpdateOne(id,product){
        const productToinsert = {...product,id};
        for (let i=0;i<this.products.length;i++){
            if (this.products[i].id == id){
                this.products[i]=productToinsert;
                return productToinsert;
            }
        }
        return undefined;
     }
   deleteOne(id){
    const foundProduct=this.findOne(id);
    if (foundProduct){
        this.products=this.products.filter((item) => item.id !=id);
        return id;
    }
    return undefined;
   }
}

       

    router.get('/', (req,res) =>{
        const products =new Products(productsHC);
        res.json(products.getAll());
    });
    router.get('/:id', (req,res) =>{
        const products =new Products(productsHC);

        id =parseInt(id);
        const found =products.findOne(id);
        if (found) {
            res.json(found);
            
        }else{
            res.json ({error:'producto no encontrado'});
        }

        
    });

    router.get('/form', (req,res) => {
        res.sendFile(__dirname+ '/index.html');
    });

    router.post ('/', (req,res) =>{
        console.log('esta posteado')
        const {body} =req;
        body.price =parseFloat (body.price);
        const products = new Products(productsHC);
        const productoGenerado =products.addOne(body);
        res.json({success:"ok", new:productoGenerado});
    });
    router.delete ('/:id',(req,res) =>{ 
        let {id} =req.params;
        const products =new Products (productsHC);
        id = parseInt(id);
        const deletedProduct = products.deleteOne(id);
        console.log (products.getAll());

    if (deletedProduct !=undefined){
        res.json({success:'ok',id});
    } else{
        res.json({ error: 'producto no encontrado'});
    }
    });
    router.put('/:id', (req,res) => {
        let { id } =req.params;
        const { body } =req;
        id = parseInt (id );
        

        const products = new Products(productsHC);
        const changeProduct =products.updateOne(id,body);
    
        if (changeProduct){ 
            res.json({success:'ok', new: changeProduct});
        } else{
            res.json( {error: 'no encontro producto'});
        }
    });

