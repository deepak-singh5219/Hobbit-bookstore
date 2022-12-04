const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/index");

// creating a function ()
// running a function ()()

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB Connected Successfully");

    app.on("error", (err) => {
      console.log("Error: " + err);
      throw err;
    });

    app.listen(config.PORT, () => {
      console.log(`Server Listening on: ${config.PORT}`);
    });
  } catch (err) {
    console.log("Error: " + err);
    throw err;
  }
})();
