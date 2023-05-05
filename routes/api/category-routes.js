const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // Select * from category table and make sure to join product table to also get its products
  Category.findAll({
    include: Product,
  }).then(categories => {
    console.log(categories);
    res.send(categories);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error fetching categories');
  });
});



router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // // SELECT category_name FROM category WHERE id = req.id 

  Category.findOne({
    where: {
      id: req.params.id
    },
    include: Product,
  }).then(categories => {
    console.log(categories);
    res.send(categories);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error fetching categories');
  });
});

router.post('/', (req, res) => {
  // create a new category
  //INSERT INTO category (category_name) VALUES ('Junk')
  Category.create({
      category_name: req.body.category_name
    })

    .then(category => {
      res.status(201).json(category);
    })

    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).send('Invalid ID parameter');
  }


  Category.update({

      category_name: req.body.category_name
    }, {
      where: {
        id: id
      }
    })

    .then(rowsUpdated => {
      if (rowsUpdated[0] === 0) {
        return res.status(404).send('Category not found or not provided');
      }
      Category.findByPk(id).then(category => {
        res.send({
          id: category.id,
          category_name: category.category_name
        });
      });
    })

    .catch(err => {
      console.error(err);
      res.status(500).send('Error updating category');
    });


});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedCategory => {
      console.log(deletedCategory);
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error deleting Category');
    });
});

module.exports = router;