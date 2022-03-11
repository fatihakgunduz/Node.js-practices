const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getHome = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, content]) => {
            res.render('shop/home', {
                prods: rows,
                pageTitle: 'Home',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then( result => {
            res.render('shop/product-list', {
                prods: result[0],
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.productId)
        .then( ([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll().then(([products,fileData]) => {
            const cartProducts = [];
            if(cart.products){
                for(product of products){
                    const cartProduct = cart.products.find(
                        p => p.id == product.id
                    );
                    if(cartProduct) {
                        cartProducts.push({productData: product, qty: cartProduct.qty});
                    }
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Cart',
                products: cartProducts
            });
        })
        .catch(err => console.log(err));
    });
};

exports.postCart = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(([product])=>{
            Cart.addProduct(product[0].id, product[0].price);
            console.log(req.url);
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(([product]) => {
            Cart.deleteProduct(product[0].id, product[0].price);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  };
  
  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  };