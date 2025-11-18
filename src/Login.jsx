import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";


function useEyesFollowCursor(pairs, { maxMove = 10 } = {}) {
  useEffect(() => {
    const valid = pairs.filter(
      (p) => p?.eyeRef?.current && p?.containerRef?.current
    );
    if (!valid.length) return;

    valid.forEach(({ eyeRef }) => {
      const el = eyeRef.current;
      const base = getComputedStyle(el).transform;
      el.dataset.baseTransform = base === "none" ? "" : base;
    });

    let mx = 0, my = 0, ticking = false;

    const update = () => {
      ticking = false;
      valid.forEach(({ eyeRef, containerRef }) => {
        const eye = eyeRef.current;
        const cont = containerRef.current;

        const cRect = cont.getBoundingClientRect();
        const headCx = cRect.x + cRect.width / 2;
        const headCy = cRect.y + cRect.height / 2;

        const ang = Math.atan2(my - headCy, mx - headCx);
        const dx = Math.cos(ang) * maxMove;
        const dy = Math.sin(ang) * maxMove;

        const base = eye.dataset.baseTransform || "";
        eye.style.transform = `${base} translate(${dx}px, ${dy}px)`;
      });
    };

    const onPointerMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };

    const onLeave = () => {
      valid.forEach(({ eyeRef }) => {
        const eye = eyeRef.current;
        eye.style.transform = eye.dataset.baseTransform || "";
      });
    };

    const onResize = () => requestAnimationFrame(update);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [pairs, maxMove]);
}

function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 
  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      const res = await fetch("https://piras-back-2.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const text = await res.text();
      if (res.ok) {
        setMessage(" " + text);
        setTimeout(() => navigate("/home"), 500);
      } else {
        setMessage("!!" + text+"!!");
      }
    } catch (err) {
      console.error("Network error:", err);
      setMessage("Server not reachable");
    }
  };

  const doll1Ref = useRef(null);
  const doll2Ref = useRef(null);
  const marcRef = useRef(null);
  const fanRef = useRef(null);

  const receyeRef = useRef(null);
  const receyeeRef = useRef(null);
  const recmouthRef = useRef(null);
  const cireyeRef = useRef(null);
  const cireyeeRef = useRef(null);
  const cirmouthRef = useRef(null);
  const marceyeRef = useRef(null);
  const marceye1Ref = useRef(null);
  const faneyeRef = useRef(null);
  const faneyeeRef = useRef(null);
  const fanmouthRef = useRef(null);

  const receyepupilRef = useRef(null);
  const receyeepupilRef = useRef(null);
  const marcpupilRef = useRef(null);
  const marcpupil1Ref = useRef(null);
  const faneyepupilRef = useRef(null);
  const faneyeepupilRef = useRef(null);

  useEyesFollowCursor(
    [
      { eyeRef: receyeRef, containerRef: doll1Ref },
      { eyeRef: receyeeRef, containerRef: doll1Ref },
      { eyeRef: recmouthRef, containerRef: doll1Ref },
      { eyeRef: cireyeRef, containerRef: doll2Ref },
      { eyeRef: cireyeeRef, containerRef: doll2Ref },
      { eyeRef: cirmouthRef, containerRef: doll2Ref },
      { eyeRef: marceyeRef, containerRef: marcRef },
      { eyeRef: marceye1Ref, containerRef: marcRef },
      { eyeRef: faneyeRef, containerRef: fanRef },
      { eyeRef: faneyeeRef, containerRef: fanRef },
      { eyeRef: fanmouthRef, containerRef: fanRef },
    ],
    { maxMove: 10 }
  );
  useEyesFollowCursor(
    [
      { eyeRef: receyepupilRef, containerRef: receyeRef },
      { eyeRef: receyeepupilRef, containerRef: receyeeRef },
      { eyeRef: marcpupilRef, containerRef: marceyeRef },
      { eyeRef: marcpupil1Ref, containerRef: marceye1Ref },
      { eyeRef: faneyepupilRef, containerRef: faneyeRef },
      { eyeRef: faneyeepupilRef, containerRef: faneyeeRef },
    ],
    { maxMove: 3 }
  );


  return (
    <div className="login-page"
  >
      <div className="illustration-section">
        {/* Doll 1 */}
        <div className="doll1" id="doll1" ref={doll1Ref}>
          <div className="receye" ref={receyeRef}>
            <div className="receyepupil" ref={receyepupilRef} />
          </div>
          <div className="receyee" ref={receyeeRef}>
            <div className="receyeepupil" ref={receyeepupilRef} />
          </div>
          <div className="recmouth" ref={recmouthRef} />
        </div>

        {/* Doll 2 */}
        <div className="doll2" ref={doll2Ref}>
          <div className="cireye" ref={cireyeRef} />
          <div className="cireyee" ref={cireyeeRef} />
          <div className="cirmouth" ref={cirmouthRef} />
        </div>

     
        <div className="marc" ref={marcRef}>
          <div className="marceye" ref={marceyeRef}>
            <div className="marcpupil" ref={marcpupilRef} />
          </div>
          <div className="marceye1" ref={marceye1Ref}>
            <div className="marcpupil1" ref={marcpupil1Ref} />
          </div>
        </div>

     
        <div className="fan" ref={fanRef}>
          <div className="faneye" ref={faneyeRef}>
            <div className="faneyepupil" ref={faneyepupilRef} />
          </div>
          <div className="faneyee" ref={faneyeeRef}>
            <div className="faneyeepupil" ref={faneyeepupilRef} />
          </div>
          <div className="fanmouth" ref={fanmouthRef} />
        </div>
      </div>

      <div className="form-section">
       
        <form className="login-form" onSubmit={handleLogin}
       >
          <center>
            <div className="cap-logo"></div>
            <h1 className="uuu">FSOCIETY</h1>
            <h2>Welcome!</h2>
          </center>
          <p>Please enter your details</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"       
        name="login_email"      
        autoCorrect="off"
        required
         
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
                 autoComplete="new-password"
        name="login_password"
        autoCapitalize="none"
          />

         
          {message && <div style={{ color:"#000",fontWeight: "bold", marginTop:" 10 "}}>{message}</div>}

          <div className="options">
            <label>
              <input type="checkbox" style={{color::"#000"}} /> Remember me
            </label>
            <a href="#forgot">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">
            Log in
          </button>

          <button type="button" className="google-btn">
            Log in with Google
          </button>

          <p className="signup-text">
            Don’t have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
