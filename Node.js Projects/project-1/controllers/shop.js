const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getHome = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/home', {
            prods: products,
            pageTitle: 'Home',
            path: '/'
        });

    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'All Products',
          path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.productId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
          });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
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
        });
    });
};

exports.postCart = (req, res, next) => {
    Product.findById(req.body.productId)
        .then( ([product]) => {
            Cart.addProduct(product[0].id, product[0].price);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    
};

exports.postCartDeleteProduct = (req, res, next) => {
    Product.findById(req.body.productId)
        .then( ([product]) => {
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