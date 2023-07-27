const mongoose = require("mongoose");
var validate = require("validator");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  gstno: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  dueAmount: {
    type: Number,
    default: 0,
  },
});

const customerPaymentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    require: true,
  },
  pandingAmt: {
    type: Number,
    required: true,
  },
  paidAmt: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
});

const expenseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
});

const incomeSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
});

const productSchemaGST = new mongoose.Schema({
  partNo: {
    type: String,
    unique: true,
  },
  HSNCode: {
    type: Number,
    require: true,
  },
  productName: {
    type: String,
    unique: true,
    require: true,
  },
  unit: {
    type: String,
    required: true,
  },
  minimumStock: {
    type: Number,
    default: 5,
  },
  supplier: {
    type: String,
    required: true,
  },
});

const productSchemaEstimate = new mongoose.Schema({
  partNo: {
    type: String,
    unique: true,
  },
  productName: {
    type: String,
    unique: true,
    require: true,
  },
  unit: {
    type: String,
    required: true,
  },
  minimumStock: {
    type: Number,
    default: 5,
  },
  supplier: {
    type: String,
    required: true,
  },
});

const purchaseSchemaGST = new mongoose.Schema({
  billNo: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  purchaseProducts: [
    {
      partNo: {
        type: String,
        unique: true,
      },
      hsn: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        default: 0,
        required: true,
      },
      qty: {
        type: Number,
        default: 0,
        required: true,
      },
      disc: {
        type: Number,
        default: 0,
      },
      igstp: {
        type: Number,
        default: 0,
      },
      cgstp: {
        type: Number,
        default: 0,
      },
      sgstp: {
        type: Number,
        default: 0,
      },
      gstAmt: {
        type: Number,
        default: 0,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  cgst: {
    type: Number,
    default: 0,
  },
  sgst: {
    type: Number,
    default: 0,
  },
  igst: {
    type: Number,
    default: 0,
  },
  roff: {
    type: Number,
    default: 0,
  },
  gTotal: {
    type: Number,
    required: true,
  },
});

const purchaseSchemaEstimate = new mongoose.Schema({
  billNo: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  purchaseProducts: [
    {
      partNo: {
        type: String,
        unique: true,
      },
      productName: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        default: 0,
        required: true,
      },
      qty: {
        type: Number,
        default: 0,
        required: true,
      },
      disc: {
        type: Number,
        default: 0,
      },
      netRate: {
        type: Number,
        default: 0,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totalQty: {
    type: Number,
    required: true,
  },
  gTotal: {
    type: Number,
    required: true,
  },
});

const saleSchema = new mongoose.Schema({
  billNo: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  saleProducts: [
    {
      productName: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        default: 0,
        required: true,
      },
      qty: {
        type: Number,
        default: 0,
        required: true,
      },
      dis: {
        type: Number,
        default: 0,
        required: true,
      },
      netRate: {
        type: Number,
        default: 0,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  oldAmt: {
    type: Number,
    required: true,
  },
  roff: {
    type: Number,
    default: 0,
  },
  gTotal: {
    type: Number,
    required: true,
  },
});

const sallingPriceSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  products: [
    {
      productName: {
        type: String,
        required: true,
      },
      sellingPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

const stockSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
    unique: true,
  },
  qty: {
    type: Number,
    require: true,
    default: 0,
  },
  purchasePrice: {
    type: Number,
    default: 0,
  },
  storeLocation: {
    type: String,
  },
  minimumStock: {
    type: Number,
    default: 5,
  },
});

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  gstno: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  dueAmount: {
    type: Number,
    default: 0,
  },
});

const SupplierPaymentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    require: true,
  },
  pandingAmt: {
    type: Number,
    required: true,
  },
  paidAmt: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
});

const userSchemaGST = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is require"],
    validate: {
      validator: function (v) {
        return validate.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid Email!`,
    },
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "phone number is require"],
    validate: {
      validator: function (v) {
        return validate.isMobilePhone(String(v));
      },
      message: (props) => `${props.value} is not a valid number!`,
    },
  },
  companyName: {
    type: String,
    required: [true, "company name is require"],
  },
  address: {
    type: String,
    required: [true, "address is require"],
  },
  city: {
    type: String,
    required: [true, "city is require"],
  },
  state: {
    type: String,
    required: [true, "state is require"],
  },
  gstNo: {
    type: String,
    required: [true, "GST number is require"],
  },
  bankName: {
    type: String,
    required: [true, "Bank Name is require"],
  },
  accountNumber: {
    type: Number,
    required: [true, "Account number is require"],
  },
  ifsc: {
    type: String,
    required: [true, "IFSC code is require"],
  },
  branchName: {
    type: String,
    required: [true, "Branch Name is require"],
  },
  token: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["GST", "Inventory"],
    default: "GST"
  }
});

const userSchemaEstimate = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is require"],
    validate: {
      validator: function (v) {
        return validate.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid Email!`,
    },
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "phone number is require"],
    validate: {
      validator: function (v) {
        return validate.isMobilePhone(String(v));
      },
      message: (props) => `${props.value} is not a valid number!`,
    },
  },
  companyName: {
    type: String,
    required: [true, "company name is require"],
  },
  address: {
    type: String,
    required: [true, "address is require"],
  },
  city: {
    type: String,
    required: [true, "city is require"],
  },
  state: {
    type: String,
    required: [true, "state is require"],
  },
  token: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["GST", "Inventory"],
    default : "Estimate"
  }
});

module.exports = {
  customerSchema,
  customerPaymentSchema,
  expenseSchema,
  incomeSchema,
  productSchemaGST,
  productSchemaEstimate,
  purchaseSchemaGST,
  purchaseSchemaEstimate,
  saleSchema,
  sallingPriceSchema,
  stockSchema,
  supplierSchema,
  SupplierPaymentSchema,
  userSchemaGST,
  userSchemaEstimate
};
