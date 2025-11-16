// src/pages/AllIncidents.jsx
import React, { useEffect, useState } from "react";
import "./RecentIncidents.css";

const API_BASE = process.env.REACT_APP_API_BASE ?? "http://localhost:8080";

export default function AllIncidents() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("Loading…");
  const [lightbox, setLightbox] = useState(null);

  const load = async () => {
    try {
      setStatus("Loading…");
      const res = await fetch("https://piras-back-2.onrender.com/api/incidents/all");
      if (!res.ok) throw new Error("Server " + res.status);
      const data = await res.json();
      setItems(data);
      setStatus(data.length ? "" : "No incidents yet.");
    } catch (e) {
      console.error(e);
      setStatus("Failed to load incidents.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="ai-page">
      <section className="ai-card">
        <div className="ai-head">
          <h1 className="ai-title">All Incidents</h1>
          <button className="ai-btn" onClick={load}>Refresh</button>
        </div>

        {status && <p className="ai-status">{status}</p>}

        <ul className="ai-list">
          {items.map((it) => (
            <li className="ai-item" key={it.id}>
              <div className="ai-item-head">
                <strong>{it.title}</strong>
                <span className="ai-chip">{it.category}</span>
              </div>

              <div className="ai-item-body">
                <p>{it.description}</p>
                {it.location && <p className="ai-dim">Location: {it.location}</p>}
                {it.createdAt && (
                  <p className="ai-dim">
                    Time: {new Date(it.createdAt).toLocaleString()}
                  </p>
                )}
                {it.name && <p className="ai-dim">Reporter: {it.name}</p>}

                {/* ✅ Media preview inside each incident */}
                {it.mediaUrl && it.mediaType?.startsWith("image/") && (
                  <img
                    src={API_BASE + it.mediaUrl}
                    alt={it.title}
                    className="ai-media-thumb"
                    onClick={() =>
                      setLightbox({ type: "image", src: API_BASE + it.mediaUrl })
                    }
                  />
                )}

                {it.mediaUrl && it.mediaType?.startsWith("video/") && (
                  <video
                    className="ai-media-thumb"
                    onClick={() =>
                      setLightbox({ type: "video", src: API_BASE + it.mediaUrl })
                    }
                    muted
                  >
                    <source src={API_BASE + it.mediaUrl} type={it.mediaType} />
                  </video>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Lightbox modal for image/video preview */}
      {lightbox && (
        <div className="ai-modal" onClick={() => setLightbox(null)}>
          <div className="ai-modal-body" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "image" ? (
              <img src={lightbox.src} alt="media" className="ai-modal-media" />
            ) : (
              <video
                src={lightbox.src}
                controls
                className="ai-modal-media"
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
