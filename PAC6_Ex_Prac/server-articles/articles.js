const express = require('express');
const router = express.Router();

const articles = [
  {
    id: 1,
    name: 'Aerosmith: Permanent Vacation',
    imageUrl: 'assets/records/permanent-vacation.webp',
    price: 31.99,
    isOnSale: true,
    quantityInCart: 0
  },
  {
    id: 2,
    name: 'The Beatles: Sgt. Pepper`s Lonely Hearts Club Band',
    imageUrl: '',
    price: 36.99,
    isOnSale: false,
    quantityInCart: 0
  },
  {
    id: 3,
    name: 'Pulp Fiction',
    imageUrl: 'assets/records/pulp-fiction.webp',
    price: 25.99,
    isOnSale: true,
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
