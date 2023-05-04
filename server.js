const express = require('express');
const routes = require('./routes');
// const sequelize = require('sequelize');
const sequelize = require('./config/connection');
// import sequelize connection
const seedCategories = require('./seeds/category-seeds');
const seedProducts = require('./seeds/product-seeds');
const seedTags = require('./seeds/tag-seeds');
const seedProductTags = require('./seeds/product-tag-seeds');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(routes);

const syncDb = async () => {
  await sequelize.sync({
    force: true
  });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');


};

syncDb();

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
