const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  const q = req.query.q;
  console.log(q);
  const allProduct = await Product.find();
  if (q.length >= 1) {
    const Filter = await Product.find({ name: { $regex: q } });
    return res
      .status(200)
      .json({ message: "Fetched  product with filter", products: Filter });
  } else {
    return res
      .status(200)
      .json({ message: "Fetched all product", products: allProduct });
  }
};

exports.getProductById = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  return res.status(200).json({ product: product });
};

exports.ProductPagination = async (req, res, next) => {
  const category = req.query.category;
  const count = req.query.count;
  const page = req.query.page || 1;
  try {
    if (category === "all") {
      const products = await Product.find()
        .skip((page - 1) * count)
        .limit(count);
      res.status(200).json(products);
    } else {
      const productsCategory = await Product.find({ category: category })
        .skip((page - 1) * count)
        .limit(count);
      res.status(200).json(productsCategory);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addproduct = async (req, res, next) => {
  console.log(req.files);
  if (!req.files) {
    res.status(422).json({ message: "No image provided." });
    // const error = new Error('No image provided.');
    // error.statusCode = 422;
    // throw error
  }
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const shortDesc = req.body.shortDesc;
  const longDesc = req.body.longDesc;
  let images = [];
  req.files.forEach((file) => {
    return images.push(file.path.replace("\\", "/"));
  });
  try {
    const product = new Product({
      name: name,
      category: category,
      price: price,
      short_desc: shortDesc,
      long_desc: longDesc,
      img1: "https://e-com-server.onrender.com/" + images[0],
      img2: "https://e-com-server.onrender.com/" + images[1],
      img3: "https://e-com-server.onrender.com/" + images[2],
      img4: "https://e-com-server.onrender.com/" + images[3],
    });
    const saved = await product.save();
    res.status(201).json({
      message: "Product created!",
      product: saved,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const updateProduct = req.body;
  console.log(updateProduct);
  try {
    await Product.findByIdAndUpdate(updateProduct._id, {
      name: updateProduct.name,
      category: updateProduct.category,
      price: updateProduct.price,
      short_desc: updateProduct.shortDesc,
      long_desc: updateProduct.longDesc,
    });
    res.status(201).json({ message: "Product updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
