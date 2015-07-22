var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Giftcard = mongoose.model('Giftcard')
    Session = mongoose.model('Session');

/* Create a giftcard */
router.post('/', function(req, res, next) {

    //Find a user with the username requested. Select salt and password
    var accountId;
    Session.findOne({ token : req.body.sessionToken })
    .select('accountId')
    .exec(function(err, session) {
        if(err){
          return res.json({msg: "Couldn't search the database for session!",
                  errorid: "779"});
        } else if(!session){
          return res.json({msg: "Session is not valid!",
                  errorid: "34"});
        } else {
            accountId = session.accountId;
        }
    });

    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeCardToken = request.body.stripeCardToken;

    var charge = stripe.charges.create({
    amount: req.body.amount, // amount in cents, again
    currency: "usd",
    source: stripeCardToken,
    description: req.body.message
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            return res.json({msg: "Card was declined!",
                    errorid: "12122"});
        }
    });



});

/* Get a giftcard */
router.get('/', function(req, res, next) {
  //Logic goes here
});

/* Update a giftcard */
router.put('/:id', function(req, res, next) {
  //Logic goes here
});

module.exports = router;
