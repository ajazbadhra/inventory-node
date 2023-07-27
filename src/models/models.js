const mongoose = require("mongoose");
const schema = require("./modelsSchema")

const Customer = mongoose.model("Customer", schema.customerSchema);
const CustomerPayment = mongoose.model(
  "CustomerPayment",
  schema.customerPaymentSchema
);
const Expense = mongoose.model("Expense", schema.expenseSchema);
const Income = mongoose.model("Income", schema.incomeSchema);
const ProductGST = mongoose.model("ProductGST", schema.productSchemaGST);
const ProductEstimate = mongoose.model("ProductEstimate", schema.productSchemaEstimate)
const PurchaseGST = mongoose.model("PurchaseGST", schema.purchaseSchemaGST);
const PurchaseEstimate = mongoose.model("PurchaseEstimate", schema.purchaseSchemaEstimate);
const Sale = mongoose.model("Sale", schema.saleSchema);
const SallingPrice = mongoose.model("SallingPrice", schema.sallingPriceSchema);
const Stock = mongoose.model("Stock", schema.stockSchema);
const Supplier = mongoose.model("Supplier", schema.supplierSchema);
const SupplierPayment = mongoose.model(
  "SupplierPayment",
  schema.SupplierPaymentSchema
);
const User = mongoose.model("User", schema.userSchemaGST);
const UserEstimate = mongoose.model("UserEstimate", schema.userSchemaEstimate);

module.exports = {
  Customer,
  CustomerPayment,
  Expense,
  Income,
  ProductGST,
  ProductEstimate,
  PurchaseGST,
  PurchaseEstimate,
  Sale,
  SallingPrice,
  Stock,
  Supplier,
  SupplierPayment,
  User,
  UserEstimate
};
