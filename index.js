const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

const invoiceNo = [];
const date = [];
var i = 0;
var execute = 0;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/admin", function(req, res) {
  res.sendFile(__dirname + "/admin.html");
});

app.post("/result", function(req, res) {
  var number = req.body.nIN;
  var time = req.body.nID;
  var temp = number;
  // Algorithm for Invoice Number
  if (invoiceNo.length == 0) {
    invoiceNo.push(number);
    execute = 1;
  } else {
    var flag = 0;
    for (i = 0; i < invoiceNo.length; i++) {
      if (number == invoiceNo[i]) {
        flag = 1;
      }
    }
    if (flag == 1) {
      console.log("This invoice number already exists");
    } else {
      invoiceNo.push(number);
      execute = 1;
      invoiceNo.sort(function(a, b) {
        return a - b
      });
      let lowest = invoiceNo[0];
    }
  }

  // Algorithm for Dates
  if (execute == 1) {
    if (date.length == 0) {
      date.push(time);
    } else {
      if (date.length == 1) {
        date.push(time);
        if (invoiceNo.indexOf(number) == 0) {
          if (date[0] <= date[1]){
            date.push(time);
          }
          else{
          }
        }
      }
    }
    execute = 0;
  }

  res.render("list", {
    newInvoiceNumber: invoiceNo,
    newInvoiceDate: date
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000!");
});
