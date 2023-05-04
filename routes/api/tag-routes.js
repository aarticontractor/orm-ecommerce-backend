const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // SELECT * FROM Tag INNER JOIN product ON Tag_id=Product_id
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id', 'category_name'],
        through: { attributes: [] }, // exclude the intermediate table
      },
    ],
  }).then(tags => {
    console.log(tags);
    res.send(tags);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error fetching tags');
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id', 'category_name'],
        through: { attributes: [] }, // exclude the intermediate table
      },
    ],
  }).then(tags => {
    console.log(tags);
    res.send(tags);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error fetching tags');
  });
  // SELECT tag_name from Tag WHERE id = req.id 
});

router.post('/', (req, res) => {
  // create a new tag
  //INSERT INTO tag (tag_name) VALUES ('grocery'),
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
//Update tag SET tag_name=junk WHERE id=req.id



});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
//DELETE FROM tag WHERE id=req.id

});

module.exports = router;
