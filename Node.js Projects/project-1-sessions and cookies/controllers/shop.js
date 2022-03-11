const Order = require('../models/order');
const Product = require('../models/product');

exports.getHome = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render('shop/home', {
                prods: products,
                pageTitle: 'Home',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
        .then( products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.productId)
        .then( (product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products = user.cart.items;
            console.log(products);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Cart',
                products: products
            });
        })
        .catch(err=>console.log(err));
};

exports.postCart = (req, res, next) => {
    Product.findById(req.body.productId)
        .then( product=> {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    req.user.removeFromCart(req.body.productId)
        .then(result => {
            res.redirect('cart');
        })
        .catch(err=> console.log(err));
};

exports.postOrder = (req, res, next) => {

    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });

            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });

            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err)); 
};
