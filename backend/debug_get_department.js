const mongoose = require('mongoose');
const path = require('path');
const { getDepartmentId } = require(path.join(__dirname, 'controllers', 'authController'));

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const id = await getDepartmentId('Water');
    console.log('departmentId:', id);
    console.log('typeof id:', typeof id);
    console.log('is ObjectId:', id && id._bsontype === 'ObjectID');
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
