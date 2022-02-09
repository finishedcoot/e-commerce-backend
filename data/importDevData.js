const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/productModel");

dotenv.config("../.");

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongoose.connect(process.env.DB_UR).then(() => {
  console.log("db connection successful");
});

//Read
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);
//

//import data to db
const importData = async () => {
  try {
    await Product.create(products);
    console.log("did good");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log("all deleted");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
