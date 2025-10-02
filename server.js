// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (local)
mongoose.connect("mongodb://127.0.0.1:27017/complaintsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Complaint schema with SLA fields
const complaintSchema = new mongoose.Schema({
  city: String,
  country: String,
  description: String,
  lat: Number,
  lng: Number,
  status: { type: String, default: "open" }, // open / resolved
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date,
  slaHours: { type: Number, default: 48 },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// Helper: check if a complaint is overdue
function isOverdue(complaint) {
  if (!complaint) return false;
  if (complaint.status === "resolved") return false;
  const deadline = new Date(complaint.createdAt);
  deadline.setHours(deadline.getHours() + (complaint.slaHours || 48));
  return new Date() > deadline;
}

// API: get complaints (adds overdue flag)
app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find({});
    const result = complaints.map((c) => ({
      ...c._doc,
      overdue: isOverdue(c),
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
