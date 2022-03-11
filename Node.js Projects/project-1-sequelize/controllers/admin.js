const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',{
        pageTitle: 'Add Poduct',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res , next) => {
    const product = new Product(
        null,
        
    );

    req.user.createProduct({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    })
    .then(result => {
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });

};

exports.getProducts = (req, res , next) => {

    req.user.getProducts()
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

        req.user.getProducts({ 
            where: { id: req.params.productId } })
            .then(products => {
                res.render('admin/edit-product',{
                    product: products[0],
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: edit
                });
            })
            .catch( err => console.log(err));

            
    }
};

exports.postEditProduct = (req, res , next) => {
    Product.findByPk(req.body.productId)
        .then(product => {
            product.title = req.body.title;
            product.price = req.body.price;
            product.description = req.body.description;
            product.imageUrl = req.body.imageUrl;
           
            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    Product.findByPk(req.body.productId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
};