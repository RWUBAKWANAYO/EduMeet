import mongoose from "mongoose";
const connectMongoDB = (url: string) => {
	mongoose.set("strictQuery", true);

	mongoose
		.connect(url)
		.then(() => console.log("MongoDB connected"))
		.catch((error: any) => console.error("Error connecting to MongoDB:", error));
};

export default connectMongoDB;
