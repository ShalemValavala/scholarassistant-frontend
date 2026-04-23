"use client";
import "./globals.css";
import { useState, useEffect, ChangeEvent } from "react";
import Chatbot from "./components/Chatbot";

type Order = {
  name: string;
  email: string;
  service: string;
  file?: string;
  paymentId?: string;
};

export default function Home() {

  // ✅ MOVE HOOKS INSIDE FUNCTION
  const [paid, setPaid] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [paymentFile, setPaymentFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    file: null as File | null,
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle input
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else if (name === "paymentFile") {
      setPaymentFile(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.service) {
      alert("❌ Please fill all fields");
      return;
    }

    if (!paid) {
      alert("❌ Please complete payment first");
      return;
    }

    if (!form.file || !paymentFile) {
      alert("❌ Upload paper AND payment screenshot");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("service", form.service);
    data.append("file", form.file);
    data.append("paymentFile", paymentFile);
    data.append("paymentId", paymentId);

    await fetch("https://scholarassistant-backend.onrender.com", {
      method: "POST",
      body: data,
    });

    alert("✅ Order submitted successfully!");
  };

  // Payment
const handlePayment = () => {
  if (typeof window === "undefined") return;

  if (!(window as any).Razorpay) {
    alert("Razorpay not loaded");
    return;
  }

  const options = {
    key: "rzp_live_SguSACyR1OTj2y",
    amount: 1000 * 100,
    currency: "INR",
    name: "ScholarAssistant",

    handler: function (response: any) {
      setPaid(true);
      setPaymentId(response.razorpay_payment_id);
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

  // Fetch orders
  useEffect(() => {
    fetch("https://scholarassistant-backend.onrender.com")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  // Login
  const handleLogin = () => {
    const email = prompt("Enter admin email:");
    const password = prompt("Enter password:");

    if (email === "admin@gmail.com" && password === "123456") {
      setIsAdmin(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>

      {/* Navbar */}
      <a href="/about">About</a>
<a href="/services">Services</a>
<a href="/contact">Contact</a>
      <div className="navbar">
        <div className="logo">ScholarAssistant</div>
        <button className="btn" onClick={handleLogin}>Admin Login</button>
      </div>

      {/* Hero */}
      <div className="hero">
        <h1>AI Research Assistant</h1>
        <p>Write better research papers faster</p>
      </div>

      {/* Services */}
      <div className="services">
        {[
          ["Editing", "₹999 – ₹2999"],
          ["Plagiarism", "₹1499 – ₹4999"],
          ["AI Reduction", "₹1999 – ₹5999"],
          ["Guidance", "₹2999 – ₹10000"],
          ["Formatting", "₹799 – ₹2499"],
        ].map((s, i) => (
          <div className="card" key={i}>
            <h3>{s[0]}</h3>
            <p>{s[1]}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="form-container">
        <h2>Submit Work</h2>

        <input name="name" placeholder="Name *" onChange={handleChange} />
        <input name="email" placeholder="Email *" onChange={handleChange} />

        <select name="service" onChange={handleChange}>
          <option>Select Service *</option>
          <option>Editing</option>
          <option>Plagiarism</option>
          <option>AI Reduction</option>
          <option>Guidance</option>
          <option>Formatting</option>
        </select>

        {!paid && (
          <button className="pay-btn" onClick={handlePayment}>
            Pay First
          </button>
        )}

        {paid && (
          <>
            <label>Upload Paper *</label>
            <input type="file" name="file" onChange={handleChange} />

            <label>Upload Payment Screenshot *</label>
            <input type="file" name="paymentFile" onChange={handleChange} />

            <button className="submit-btn" onClick={handleSubmit}>
              Submit Order
            </button>
          </>
        )}
      </div>

    </div>
  );
}