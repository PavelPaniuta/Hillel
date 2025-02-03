import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const user = { username: "admin", password: "admin" };
const app = express();
app.use(cors());
app.use(express.json());
const JWT_SECRET = "JH1z4E8LxY7Vg9QpB2KmN5XwR6TcM0AaUdC3FsZo";
const URI = "mongodb+srv://hillel:hillel@cluster0.ichus.mongodb.net/products";
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

async function getNextSequenceValue() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "productId" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
}

const productSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  info: { type: String, required: true },
});
const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, price, category, quantity, info } = req.body;

  if (!name || !price || !category || !quantity || !info) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const customId = await getNextSequenceValue();

  const product = new Product({
    ...req.body,
    customId,
  });

  await product.save();
  res.json(product);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }

  await Product.findByIdAndDelete(id);
  res.json({ message: "Product deleted" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (user.username !== username || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ _id: user._id, username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
