import { useState } from "react";
import { loginUser } from "../../api/auth.api";
import "./LoginForm.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { Envelope, Eye, EyeClosed, Lock, SignIn } from "phosphor-react";
import { motion } from "framer-motion";
import { fadeInWithEase, staggerContainer } from "../../functions/motionUtils";
import { usePageTransition } from "../../functions/usePageTransition";
import PageTransition from "../pageTransition/PageTransition";
import Button from "../buttons/button/Button";

export default function LoginForm({ setMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isTransitioning, triggerTransition } = usePageTransition(); // Page transition function
  const { login } = useAuth();
  const navigate = useNavigate();

  // LOGIN HANDLING: POST req to /api/auth/login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Frontend Form Validation
    if (!email || !password) {
      setMessage({ text: "All fields are required", type: "error" }); // set Message for UI
      return;
    }

    setLoading(true);
    setMessage({ text: "Logging in...", type: "loading" });

    // API POST req to /api/auth/login
    try {
      const res = await loginUser(email, password);

      // Use AuthContext login handling function
      login(res.user);

      setMessage({ text: "Login successful! Redirecting...", type: "success" }); // Message for UI

      // If role = admin -> /admin/dashboard
      // If role = user -> /user/dashboard
      {
        res.user.role === "admin"
          ? triggerTransition("/admin/dashboard")
          : triggerTransition("/user/dashboard");
      }
    } catch (err) {
      console.error(err);

      // Extract error message from backend
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";

      setMessage({ text: errorMessage, type: "error" }); // Message for UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTransition isVisible={isTransitioning} />
      <section className="sectionDark">
        <motion.div
          className="sectionWrapper loginFormWrapper"
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.form
            onSubmit={handleLogin}
            className="loginFormContainer"
            variants={fadeInWithEase}
          >
            <div className="loginFormHeader">
              <img src="./favicon.svg" alt="Logo" className="loginFormLogo" />
              <h2 className="textM textRegular">Welcome Back!</h2>
              <p className="textXXS textLight">
                Enter your email and password to access your account.
              </p>
            </div>

            <div className="form-group">
              {/* Email Field */}
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="textRegular textXXS form-label"
                >
                  <Envelope size="18" /> Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label
                  htmlFor="password"
                  className="textRegular textXXS form-label"
                >
                  <Lock size="18" /> Password
                </label>
                <div className="form-group-password">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                  />

                  {/* Show/Hide Password Icon */}
                  <div
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size="24" /> : <EyeClosed size="24" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              name="Login"
              style="button buttonType1"
              icon={SignIn}
              type="submit"
            />
          </motion.form>
        </motion.div>
      </section>
    </>
  );
}
