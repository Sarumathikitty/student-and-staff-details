const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyparser.json());
let staffData = [];
let stuData = [];

app.post("/stuData", (req, res) => {
  stuData.push(req.body);
  res.json({ message: "studentCreation created successfully!" });
});

app.get("/stuData", (req, res) => {
  res.send(stuData);
});

app.post("/staffData", (req, res) => {
  staffData.push(req.body);
  res.json({ message: "staffCreation created successfully!" });
});

app.get("/allstaff", (req, res) => {
  let staf = staffData.map((data) => {
    let count = stuData.filter((item) => item.staffid === data.id);
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      stuCount: count.length,
    };
  });
  res.json(staf);
});

app.put("/stuData/:id", (req, res) => {
  console.log(req.params.id);
  stuData.forEach((ele) => {
    if (ele.id == req.params.id) {
      ele.name = req.body.name;
      res.status(200).send({
        message: "updated",
      });
    }
  });
});

app.delete("/stuData/:id", (req, res) => {
  console.log(req.params.id);
  let filterVal = stuData.filter((ele) => {
    if (ele.id == req.params.id) {
      return ele;
    }
  })[0];
  let index = stuData.indexOf(filterVal);
  stuData.splice(index, 1);
  res.send(stuData);
});

app.listen(process.env.PORT || port, () => {
  console.log(`server is listening ${port}`);
});
