const {
  Sale,
  SallingPrice,
  ProductEstimate,
  Customer,
} = require("../models/models");

const addSale = async (req, res) => {
  try {
    const {
      billNo,
      date,
      customerName,
      customerPhoneNo,
      saleProducts,
      total,
      roff,
      gTotal,
    } = req.body;

    // Create an array of update operations for SallingPrice and ProductEstimate
    const updateOperations = [];

    for (const product of saleProducts) {
      console.log("inside");

      // Add update operation to update sellingPrice in SallingPrice collection
      const updateSellingPriceOperation = SallingPrice.updateOne(
        { customerName, "products.productName": product.productName },
        {
          $set: { "products.$.sellingPrice": product.rate },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      updateOperations.push(updateSellingPriceOperation);

      // Add upsert operation to update or insert product in SallingPrice collection
      const upsertProductOperation = SallingPrice.updateOne(
        { customerName },
        {
          $push: {
            products: {
              productName: product.productName,
              sellingPrice: product.rate,
            },
          },
        },
        { upsert: true }
      );
      updateOperations.push(upsertProductOperation);

      // Add upsert operation to update or insert product in ProductEstimate collection
      const existingProduct = await ProductEstimate.findOne({
        productName: product.productName,
      });

      if (!existingProduct) {
        const upsertProductEstimateOperation = ProductEstimate.updateOne(
          { productName: product.productName },
          { $set: { partNo: product.partNo, unit: product.unit } },
        );
        updateOperations.push(upsertProductEstimateOperation);
      }
    }

    // Run all update operations in parallel
    await Promise.all(updateOperations);

    // Update or insert customer details in Customer collection
    await Customer.updateOne(
      { name: customerName },
      { $set: { phone: customerPhoneNo } },
      { upsert: true }
    );

    // Insert the sale details in Sale collection
    await Sale.insertMany({
      billNo,
      date,
      customerName,
      customerPhoneNo,
      saleProducts,
      total,
      roff: roff || 0,
      gTotal,
    });

    console.log("Sale Added");
    res.status(200).json({ type: "Sale", status: "Added", data: "Sale Added" });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports = { addSale };
