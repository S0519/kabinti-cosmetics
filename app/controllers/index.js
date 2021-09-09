const userCont = require('./user.controller');
const productCont  = require('./product.controller');
const cartCont = require('./cart.controller');
const commonCont = require('./common.controller');
const checkoutCont = require('./checkout.controller');
const adminCont = require('./admin.controller');
module.exports = {
    userCont,
    productCont,
    cartCont,
    commonCont,
    checkoutCont,
    adminCont
};