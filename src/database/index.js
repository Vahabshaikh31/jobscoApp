const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://vahabs:Svahab3101@cluster0.jb9arqn.mongodb.net/JOBPORTAL?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(connectionUrl);
    console.log("Connection Is Success");
  } catch (error) {
    console.log(error);
  }
};
export default connectToDB;
