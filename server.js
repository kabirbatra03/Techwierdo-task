const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("Upload");
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public")
  },
  filename: (req, file, cb) => {
    console.log("type:", path.join(__dirname, 'public', file.originalname));
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1 * 1000 * 1000
  // },
  fileFilter: (req, file, cb) => {
    return cb(null, true);
  }
}).single("mypic");

app.post("/uploadFile", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send("File uploaded! you can find it here:")
    }
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));