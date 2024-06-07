const express = require('express');
const router = express.Router();

const articles = [
  {
    id: 1,
    name: 'Article1',
    imageUrl: 'assets/images/article1.jpg',
    price: 19.95,
    isOnSale: false,
    quantityInCart: 0
  },
  {
    id: 2,
    name: 'Article2',
    imageUrl: '',
    price: 6.15,
    isOnSale: true,
    quantityInCart: 0
  },
  {
    id: 3,
    name: 'Article3',
    imageUrl: 'assets/images/article3.jpg',
    price: 31.9,
    isOnSale: false,
    quantityInCart: 0
  }
];

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundArticles = articles.filter(
      ({ name }) => name.toLowerCase().indexOf(query) !== -1
    );
    return res.status(200).json(foundArticles);
  }
  return res.status(200).json(articles);
});

router.post('/', (req, res) => {
  let article= req.body;
  if (article.id) {
  
    return res
      .status(400)
      .json({ msg: 'Article Id seems to already have an id assigned' });
  }

  article.id = articles.length + 1;
  article.quantityInCart = 0;
  articles.push(article);
  return res.status(200).json(article);
});

router.patch('/:id', (req, res) => {
  const articleId = req.params.id;
  const foundArticle = articles.find(({ id }) => id == articleId);
  if (foundArticle) {
    const changeInQuantity = req.body.changeInQuantity;
    foundArticle.quantityInCart += changeInQuantity;
    return res.status(200).json({ msg: 'Successfully updated cart' });
  }
  return res
    .status(400)
    .json({ msg: 'Article with id ' + articleId + ' not found.' });
});

module.exports = router;
