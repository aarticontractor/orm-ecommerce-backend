const router = require('express').Router();
const {
  Tag,
  Product,
  ProductTag
} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // SELECT * FROM Tag INNER JOIN product ON Tag_id=Product_id
  Tag.findAll({
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: {
        attributes: []
      }, // exclude the intermediate table
    }, ],
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
  // SELECT tag_name from Tag WHERE id = req.id 
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: {
        attributes: []
      }, // exclude the intermediate table
    }, ],
  }).then(tags => {
    console.log(tags);
    res.send(tags);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error fetching tags');
  });

});

router.post('/', (req, res) => {
  // create a new tag
  //INSERT INTO tag (tag_name) VALUES ('new tag'),

  if (!req.body.tag_name) {
    res.status(400).send('Tag name is required');
    return;
  }

  Tag.create({
      tag_name: req.body.tag_name
    })

    .then(newTag => {
      console.log(newTag);
      res.send({
        id: newTag.id,
        tag_name: newTag.tag_name // add tag_name to the response body
      });
    })

    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating tag');
    });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  //UPDATE tag SET tag_name=req.tag_name WHERE id=req.id
  const id = req.params.id;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).send('Invalid ID parameter');
  }


  Tag.update({

      tag_name: req.body.tag_name
    }, {
      where: {
        id: id
      }
    })

    .then(rowsUpdated => {
      if (rowsUpdated[0] === 0) {
        return res.status(404).send('Tag not found or not provided');
      }
      Tag.findByPk(id).then(tag => {
        res.send({
          id: tag.id,
          tag_name: tag.tag_name
        });
      });
    })

    .catch(err => {
      console.error(err);
      res.status(500).send('Error updating tag');
    });


});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  // DELETE FROM tag WHERE id=req.id
  Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedTag => {
      console.log(deletedTag);
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error deleting tag');
    });
});


module.exports = router;