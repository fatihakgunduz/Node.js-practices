const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    console.log('vnkeve');
    res.render('admin/edit-product',{
        pageTitle: 'Add Poduct',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res , next) => {
    const product = new Product(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.imageUrl,
        null,
        req.user._id
    );

    product.save()    
        .then(result => {
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getProducts = (req, res , next) => {

    Product.fetchAll()
        .then(products => {
            res.render('admin/products',{
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res , next) => {
    const edit = req.query.edit;

    if(!edit){
        return res.redirect('/');
    }

    else{

        Product.findById(req.params.productId)
            .then(product => {
                res.render('admin/edit-product',{
                    product: product,
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: edit
                });
            })
            .catch( err => console.log(err));      
    }
};

exports.postEditProduct = (req, res , next) => {
    const product = new Product(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.imageUrl,
        req.body.productId
    );
    product.save()  
        .then(result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};