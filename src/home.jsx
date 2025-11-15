// File: src/pages/PIRASHome.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./PIRAShome.css";

function FeatureCard({ title, children, icon }) {
  return (
    <div className="card" data-feature-card>
      <div className="card-pill">
        {icon}
        <span className="card-pill-text">{title}</span>
      </div>
      <p className="card-text">{children}</p>
    </div>
  );
}

export default function home() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="container grid2">
          <div className="hero-left">
            <span className="badge">Public Incident Reporting & Awareness System</span>
            <h1 className="hero-title">Empowering Citizens. Ensuring Safety.</h1>
            <p className="muted">
              Report incidents in seconds, view alerts near you, and help your community
              respond faster. PIRAS connects people, data, and action.
            </p>
            <div className="btn-row">
              <Link to="/report" className="btn btn-primary">Report an Incident</Link>
              <Link to="/RecentIncidents" className="btn btn-ghost">View All Incidents</Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="feature-icon">🛡️<p>Safety First</p></div>
            <div className="feature-icon">📍<p>Location Aware</p></div>
            <div className="feature-icon">⚡<p>Real-Time</p></div>
            <div className="feature-icon">🔒<p>Secure</p></div>
            <div className="feature-icon">📈<p>Analytics</p></div>
            <div className="feature-icon">👥<p>Community</p></div>
          </div>
        </div>
      </section>

      {/* What is PIRAS */}
      <section className="section">
        <div className="container grid3">
          <div>
            <h2 className="section-title">What is PIRAS?</h2>
            <p className="muted">
              PIRAS (Public Incident Reporting & Awareness System) enables citizens to
              report accidents, hazards, crimes, and emergencies—making it easier for
              authorities and communities to stay informed and act quickly.
            </p>
          </div>
          <div className="grid2 cards">
            <FeatureCard title="Instant Reporting" icon={<span>📣</span>}>
              Submit incident details with photos, category, and geolocation in seconds.
            </FeatureCard>
            <FeatureCard title="Live Awareness Map" icon={<span>🗺️</span>}>
              See real-time incidents around you and subscribe to nearby alerts.
            </FeatureCard>
            <FeatureCard title="Awareness Analytics" icon={<span>📊</span>}>
              Track trends, hotspots, and response times to improve public safety.
            </FeatureCard>
            <FeatureCard title="Secure by Design" icon={<span>🔐</span>}>
              Backed by Firebase Auth and a Spring Boot API for robust, secure data.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="grid4 steps">
            {[
              { n: 1, t: "User Reports", d: "Citizens submit incidents with details and media." },
              { n: 2, t: "Data Stored", d: "Information is securely saved and queued for review." },
              { n: 3, t: "Awareness Shared", d: "Alerts are shown on maps and can notify subscribers." },
              { n: 4, t: "Action Taken", d: "Officials and volunteers respond faster." },
            ].map((s) => (
              <div className="step" key={s.n}>
                <div className="step-badge">{s.n}</div>
                <h3 className="step-title">{s.t}</h3>
                <p className="muted small">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Be the voice of awareness</h2>
            <p className="muted">
              Together we make our surroundings safer. Report incidents, spread awareness, and
              help responders act faster.
            </p>
            <div className="btn-row">
              <Link to="/report" className="btn btn-primary">Report an Incident</Link>
              <Link to="/RecentIncidents" className="btn btn-ghost">All Incidents</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Democracy Message */}
      <section className="section">
        <div className="container">
          <div className="panel panel--boxed text-center">
            <div className="panel-head panel-head--split">
              <h2 className="quote">“Our democracy has been hacked”</h2>
              <p className="muted lead">
                Not by machines, but by minds — distracted, divided, and deceived.
                Awareness is the only patch left.
              </p>
            </div>

            <div className="grid3 tiles">
              <div className="tile">
                <p className="small">Freedom has become an illusion.</p>
              </div>
              <div className="tile">
                <p className="small">Truth is manipulated, not missing.</p>
              </div>
              <div className="tile">
                <p className="small">Consciousness is the last rebellion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2025 PIRAS — Public Incident Reporting & Awareness System. Built with React, Spring Boot, and Firebase.
      </footer>
    </div>
  );
}
