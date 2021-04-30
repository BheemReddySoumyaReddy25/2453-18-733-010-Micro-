var express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = 'Fashion_Feet_Inventory';
let db;
MongoClient.connect(url, { useUnifiedTopology: true ,useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName);
    console.log(`Connected Database: ${url}`);
    console.log(`Database : ${dbName}`);
    
});

router.get('/home',(req,res)=>{
    db.collection("stock_details").find().toArray().then(result => res.render('index',{record:result}));
})
/*router.get('/edit/:product_id',(req,res)=>{
    res.render('edit');
})*/
router.get('/edit/:product_id',(req,res)=>{
    var product_id =parseInt(req.params.product_id);
    var query={"product_id":product_id};
    db.collection("stock_details").findOne(query, function(err, result) {
        if (err) throw err;
        //console.log(result.test_id);
        res.render('edit',{record:result});
      });
})

router.post('/edit',(req,res)=>{
    var product_id =parseInt(req.body.product_id);
    console.log(product_id);
    var brand = req.body.brand;
    var category = req.body.category;
    var name = req.body.name;
    var size = parseInt(req.body.size);
    var quantity= parseInt(req.body.quantity);
    var cost_price = parseInt(req.body.cost_price);
    var selling_price = parseInt(req.body.selling_price);
    var query={"product_id":product_id};
    var update_query={$set:{
        "brand": brand,
        "category": category,
        "name": name,
        "size": size,
        "quantity": quantity,
        "cost_price": cost_price,
        "selling_price": selling_price
    }};
    console.log(update_query);
    db.collection("stock_details").updateOne(query,update_query, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
      });
      res.redirect('/home');
})
router.get('/delete_product',(req,res)=>{
    res.render('delete');
})
router.post('/delete_product',(req,res)=>{
    var product_id =parseInt(req.params.product_id);
    var query={"product_id":product_id};
    db.collection("stock_details").deleteOne(query, function(err, result) {
        if (err) throw err;
        console.log(result.product_id);
      });
      res.redirect('/home');
})
router.get('/delete/:product_id',(req,res)=>{
    var product_id =parseInt(req.params.product_id);
    var query={"product_id":product_id};
    db.collection("stock_details").deleteOne(query, function(err, result) {
        if (err) throw err;
        console.log(result.product_id);
      });
      res.redirect('/home');
})
router.get('/add',(req,res)=>{
    res.render('add');
})
router.post('/add',(req,res)=>{
    var product_id =parseInt(req.body.product_id);
    var brand = req.body.brand;
    var category = req.body.category;
    var name = req.body.name;
    var size = parseInt(req.body.size);
    var quantity= parseInt(req.body.quantity);
    var cost_price = parseInt(req.body.cost_price);
    var selling_price = parseInt(req.body.selling_price);
    var query={
        "product_id":product_id,
        "brand": brand,
        "category": category,
        "name": name,
        "size": size,
        "quantity": quantity,
        "cost_price": cost_price,
        "selling_price": selling_price
    };
    console.log(query);
    db.collection("stock_details").insertOne(query, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
      });
      res.redirect('/home');
})

router.get('/sales_details',(req,res)=>{
    db.collection("stock_details").find().toArray().then(result => res.render('sales_details',{record:result}));
})

module.exports = router