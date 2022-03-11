const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {
        fs.readFile(p, (err, filecontent) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err){
                cart = JSON.parse(filecontent);
            }
            if (cart.products){
                const existingProductIndex = cart.products.findIndex(
                    prod => prod.id == id
                );

                const existingProduct = cart.products[existingProductIndex];

                if(existingProduct){
                    existingProduct.qty = existingProduct.qty + 1;
                    cart.products[existingProductIndex] = existingProduct;
                }
                else{
                    cart.products.push({ id: id, qty: 1});
                }
                cart.totalPrice = cart.totalPrice + +productPrice;
                }
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });

        }); 
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
              return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
              prod => prod.id !== id
            );
            updatedCart.totalPrice =
              updatedCart.totalPrice - productPrice * productQty;
      
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
              console.log(err);
            });
        });
    }
    
    static getCart(cb) {
        fs.readFile(p,(err, filecontent) => {
            if (err) {
                cb(null);
            }
            else {
                cb(JSON.parse(filecontent));
            }
        });
    }

};