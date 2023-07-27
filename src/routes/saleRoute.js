module.exports = (app) => {
    const {addSale} = require('../controllers/saleController')
    const auth = require("../middlewere/auth");
    app.route("/sale").post(auth, addSale);
}