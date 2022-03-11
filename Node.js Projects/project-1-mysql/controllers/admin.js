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
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save()
        .then(() =>{
            res.redirect('/');
        })
        .catch(err => console.log(err));
    
};

exports.getProducts = (req, res , next) => {
    Product.fetchAll()
        .then( result => {
            res.render('admin/products',{
                prods: result[0],
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
            .then( ([product]) => {
                console.log(product[0]);
                res.render('admin/edit-product',{
                    product: product[0],
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
        req.body.productId,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );

    product.save()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId);
    res.redirect('products');
};