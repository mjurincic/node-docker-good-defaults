const Product = require('../product.js');

const sampleProduct = () => {
  Product.find({}, (err, products) => {
    if (products.length === 0) {
	  const instructionalPDF = new Product({
		name: 'How To Buy A Throwing Knife',
		description: 'A Step-By-Step Guide for picking out the perfect throwing knife!',
		downloadURL: 'https://awesomeknifethrowing.com/downloads/HowToBuyAKnife.pdf',
		amount: 2000,
		currency: 'USD',
	  });
	  instructionalPDF.save((err, product) => {
		if (err) { return console.log(err); }
	    console.log('Instructional Knife PDF Added to Products!');
	  });
	}
	else {
	  console.log(`${products.length} products found! Sample product not added`);
	}
  });
};

module.exports = sampleProduct;
