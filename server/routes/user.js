const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("User test successful");
});

module.exports = router;
