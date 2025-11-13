import { useState } from "react";
import { registerUser } from "../../api/auth.api";
import "./RegisterForm.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { Envelope, Lock, UserPlus, Eye, EyeClosed } from "phosphor-react";
import { motion } from "framer-motion";
import { fadeInWithEase, staggerContainer } from "../../functions/motionUtils";
import { usePageTransition } from "../../functions/usePageTransition";
import PageTransition from "../pageTransition/PageTransition";
import Button from "../buttons/button/Button";

export default function RegisterForm({ setMessage }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isTransitioning, triggerTransition } = usePageTransition();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage({
        text: "Name, email, and password are required",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "Registering user...", type: "loading" });

    try {
      const res = await registerUser(name, username, email, password);

      login(res.user);

      setMessage({
        text: "Registration successful! Redirecting...",
        type: "success",
      });

      // Redirect based on role
      if (res.user.role === "admin") triggerTransition("/admin/dashboard");
      else triggerTransition("/user/dashboard");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTransition isVisible={isTransitioning} />
      <section className="sectionDark">
        <motion.div
          className="sectionWrapper registerFormWrapper"
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.form
            onSubmit={handleRegister}
            className="registerFormContainer"
            variants={fadeInWithEase}
          >
            <div className="registerFormHeader">
              <img
                src="./favicon.svg"
                alt="Logo"
                className="registerFormLogo"
              />
              <h2 className="textM textRegular">Create Account</h2>
              <p className="textXXS textLight">
                Enter your details to create a new account.
              </p>
            </div>

            <div className="form-group">
              {/* Name */}
              <label htmlFor="name" className="textRegular textXXS form-label">
                <UserPlus size="18" /> Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />

              {/* Username */}
              <label
                htmlFor="username"
                className="textRegular textXXS form-label"
              >
                Username (optional)
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Optional username"
              />

              {/* Email */}
              <label htmlFor="email" className="textRegular textXXS form-label">
                <Envelope size="18" /> Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />

              {/* Password */}
              <label
                htmlFor="password"
                className="textRegular textXXS form-label"
              >
                <Lock size="18" /> Password
              </label>
              <div className="form-group-password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="new-password"
                />
                <div
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size="24" /> : <EyeClosed size="24" />}
                </div>
              </div>
            </div>

            <Button
              name="Register"
              style="button buttonType2"
              icon={UserPlus}
              type="submit"
            />

            <p>
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </motion.form>
        </motion.div>
      </section>
    </>
  );
}
