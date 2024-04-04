const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const SpecialPrice = require("./SpecialPrice");
const User = require("./User");


Category.hasMany(Product);
Product.belongsTo(Category)

Product.hasMany(Image);
Image.belongsTo(Product)

User.hasMany(Product);
Product.belongsTo(User)

Product.hasMany(SpecialPrice);
SpecialPrice.belongsTo(Product)



