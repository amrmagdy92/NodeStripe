const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
    payment: async (product) => {
        if (!product) {
            return result = {
                status: 'error',
                code: 400,
                reason: 'invalid_product',
                message: 'Please check your products'
            };
        };

        return session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: product.amount * 100
                },
                quantity: product.quantity
            }],
            mode: 'payment',
            success_url: `${process.env.DOMAIN_NAME}/success.html`,
            cancel_url: `${process.env.DOMAIN_NAME}/cancel.html`
        });
    }
}