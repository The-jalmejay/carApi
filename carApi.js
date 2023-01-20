let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var port = process.env.PORT||2410;
app.listen(port, () => console.log(`Node app listening on port jai~ ${port}!`));
let { carMaster, cars } = require("./carData");
app.get("/cars", function (req, res) {
  let fuelStr = req.query.fuel;
  let typeStr = req.query.type;
  let minPriceStr = +req.query.minPrice;
  let maxPriceStr = +req.query.maxPrice;
  let sortStr = req.query.sortBy;
  let arr1 = cars;
  let arr2 = carMaster;
  // console.log(minPriceStr);
  // console.log(fuelStr);
  // console.log(typeStr);
  console.log(sortStr);
  if (fuelStr) {
    arr2 = arr2.filter((e) => e.fuel === fuelStr);
    console.log(arr2);
    arr1 = arr1.filter((e) => arr2.find((e2) => e2.model === e.model));
  }
  if (typeStr) {
    arr2 = arr2.filter((e) => e.type === typeStr);
    console.log(arr2);
    arr1 = arr1.filter((e) => arr2.find((e2) => e2.model === e.model));
  }
  if (minPriceStr) {
    arr1 = arr1.filter((e) => e.price > minPriceStr);
    console.log(arr1);
  }
  if (maxPriceStr) {
    arr1 = arr1.filter((e) => e.price < maxPriceStr);
  }
  if ((sortStr === "kms")) {
    arr1.sort((c1, c2) => +c1.kms - +c2.kms);
    console.log(arr1); //showing there
  }
  if ((sortStr === "price")) {
    arr1.sort((c1, c2) => +c1.price - +c2.price);
    console.log(arr1); //showing there
  }
  if ((sortStr === "year")) {
    arr1.sort((c1, c2) => +c1.year - +c2.year);
    console.log(arr1); //showing there

  }
  res.json({ carMaster: arr2, cars: arr1 });
});
app.post("/cars", function (req, res) {
  let body = req.body;
  console.log(body);
  cars.push(body);
  res.send(body);
});
app.get("/cars/:id", function (req, res) {
  let id = req.params.id;
  let arr = cars.find((e) => e.id === id);
  res.send(arr);
});
app.put("/cars/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  console.log(id);
  let index = cars.findIndex((e) => e.id === id);
  if (index >= 0) {
    let updatedCars = { id: id, ...body };
    cars[index] = updatedCars;
    res.send(updatedCars);
  } else {
    res.status(404).send("No Customer Found");
  }
});
app.delete("/cars/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = cars.findIndex((e) => e.id === id);
  if (index >= 0) {
    let updatedCars = { id: id, ...body };
    cars.splice(index, 1);
    res.send(updatedCars);
  } else {
    res.status(404).send("No Customer Found");
  }
});
