const Product = require('../models/productModels');
const cloudinary = require('../configs/cloudinaryDBconfig')


const User = require('../models/userModels');
const sendEmail = require("../middleware/emailSender");


exports.createProductwithEmails = async (req, res) => {
  try {

    const { name, price, imageUrl, quantity } = req.body;

    const newProduct = new Product({ name, price, imageUrl, quantity});
    await newProduct.save ();

    // get all admins
    const admins = await User.find({ role: "admin"});
    const adminEmails = admins.map(a => a.email);

    const subject = "New Product Created";
    const message = `
    <h3> New Product Alert</h3>
    <p>A new Product has been created:</p>
    <ul>
    <li><strong>Name:</strong> ${product.name}</li>
    <li><strong>Price:</strong> ${product.price}</li> 
    </ul>
    `;

    if (adminEmails.length > 0) {
      await sendEmail(adminEmails, subject, message);
    }

    return res.status(500).json({ message: "Product created and admin notified", product});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message});
  }
};






exports.updateProductImage = async (req, res) => {
  try {
    const productId = req.param.id;
    
    const product = await Product.findById(productId);
     if (!product) {
      return res.status(400).json({ message: "Product not found"});
     }
     
     if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`product/${publicId}`);
     }

    product.imageUrl = req.file.path;

  await product.save();

  res.status(200).json({
    message: "image updated successfully",
    product,
  });

    } catch (error) {
      res.status(500).json({message: error.message});
    }

  

};





 

// ➕ Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📥 Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);

    if (!singleProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(singleProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};