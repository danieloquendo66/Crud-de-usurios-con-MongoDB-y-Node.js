const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose.connect(process.env.MONGODB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("base de datos onlyne");

  try {
  } catch (error) {
    console.log(error);

    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
