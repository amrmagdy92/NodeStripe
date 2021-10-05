const router = require('express').Router();
const stripeController = require('../controllers/stripe');

router.post('/payment', (req, res) => {
    var paymentSession = stripeController.payment(req.body);
    res.json({id: paymentSession.id});
});

module.exports = router;