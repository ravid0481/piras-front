import React, { useEffect, useMemo, useState } from "react";

import "./report.css";

const API_BASE = process.env.REACT_APP_API_BASE ?? "https://piras-back-2.onrender.com";

export default function ReportIncident() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    category: "Select",
    description: "",
    location: "",
  });
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState("");

  
  useEffect(() => {
    if (!email) {
      const stored = localStorage.getItem("piras_email");
      if (stored) setEmail(stored);
    }
  }, [email]);

  // fetch "my" incidents only if email is available
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        setStatus("Loading your incidents...");
        const res = await fetch(
          `${API_BASE}/api/incidents?email=${encodeURIComponent(email)}`
        );
        if (!res.ok) throw new Error("Server responded with " + res.status);
        const data = await res.json();
        setIncidents(data);
        setStatus("");
      } catch (err) {
        console.error(err);
        setStatus("Backend not reachable or error fetching incidents.");
      }
    })();
  }, [email]);

  // ✅ allow submit without forcing email; validate required fields + category
  const canSubmit = useMemo(() => {
    const hasBasics =
      form.name.trim() &&
      form.title.trim() &&
      form.description.trim() &&
      form.location.trim() &&
      form.category !== "Select";
    return hasBasics; // email is optional for submission
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

 const submitIncident = async (e) => {
  e.preventDefault();
  if (!canSubmit) return;
  try {
    setStatus("Submitting...");
    const fd = new FormData();
    if (email) fd.append("email", email);
    fd.append("name", form.name);
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("location", form.location);
    if (file) fd.append("file", file);

    const res = await fetch(`${API_BASE}/api/incidents/upload`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) throw new Error("Server responded with " + res.status);
    const saved = await res.json();
    setIncidents((list) => [saved, ...list]);
    setForm({ name: "", title: "", category: "Select", description: "", location: "" });
    setFile(null);
    setStatus("Incident reported successfully.");
  } catch (err) {
    console.error(err);
    setStatus("Failed to submit. Is the backend running?");
  }
};

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    localStorage.setItem("piras_email", e.target.value);
  };

  return (
    <div className="ri-page">
      <section className="ri-card">
        <h1 className="ri-title">Report an Incident</h1>

        {/* Email capture / display (optional for submission) */}
        {!email ? (
          <div className="ri-row">
            <label className="ri-label">Email (optional)</label>
            <input
              className="ri-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={onEmailChange}
            />
            <p className="ri-hint">
              Adding email lets us show your reports under “Your Incidents”.
            </p>
          </div>
        ) : (
          <div className="ri-row">
            <label className="ri-label">Signed in as</label>
            <input className="ri-input" type="email" value={email} readOnly />
          </div>
        )}

        {/* ✅ Entire form */}
        <form onSubmit={submitIncident} className="ri-form">
          <div className="ri-row">
            <label className="ri-label">Name</label>
            <input
              className="ri-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., SpiderMan"
              required
            />
          </div>


          <div className="ri-row">
            <label className="ri-label">Title</label>
            <input
              className="ri-input"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Issue/Awareness"
              required
            />
          </div>

          <div className="ri-row1">
            <label className="ri-label1">Category</label>
            <select
              className="ri-input1"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Select</option>
              <option>Accident</option>
              <option>Hazard</option>
              <option>Crime</option>
              <option>Medical</option>
              <option>Fire</option>
              <option>Other</option>
            </select>
          </div>

          <div className="ri-row">
            <label className="ri-label">Description</label>
            <textarea
              className="ri-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What happened?"
              required
            />
          </div>

          <div className="ri-row">
            <label className="ri-label">Location</label>
            <input
              className="ri-input"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g., Main St & 2nd Ave"
              required
            />
          </div>
          <div className="ri-row">
  <label className="ri-label">Photo/Video (optional)</label>
  <input
    className="ri-input"
    type="file"
    accept="image/*,video/*"
    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
  />
</div>


          <div className="ri-actions">
            <button className="ri-btn" type="submit" disabled={!canSubmit}>
              Submit
            </button>
            <span className="ri-status">{status}</span>
          </div>
        </form>
      </section>

      <section className="ri-card">
        <h2 className="ri-subtitle">Your Incidents</h2>
        {!email && (
          <p className="ri-hint">
            Enter your email above to load incidents you’ve reported.
          </p>
        )}
        {email && incidents.length === 0 && (
          <p className="ri-hint">No incidents yet. Submit one above.</p>
        )}
        {email && incidents.length > 0 && (
          <ul className="ri-list">
            {incidents.map((it) => (
              <li className="ri-item" key={it.id}>
                <div className="ri-item-head">
                  <strong>{it.title}</strong>
                  <span className="ri-chip">{it.category}</span>
                </div>
                <div className="ri-item-body">
                  <p>{it.description}</p>
                  <p className="ri-dim">Location: {it.location}</p>
                  <p className="ri-dim">
                    Reported: {new Date(it.createdAt).toLocaleString()}
                  </p>
                  {/* only name will be shown elsewhere; here you can show it too if you want */}
                  {it.name && <p className="ri-dim">Reporter: {it.name}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
