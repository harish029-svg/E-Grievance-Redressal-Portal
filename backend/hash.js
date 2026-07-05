const bcrypt = require("bcryptjs");

bcrypt.hash("officer123", 10).then((hash) => {
  console.log(hash);
});