# Updates log

## Tech Stack

1. React
2. Vite
3. React-Router
4. Sass
5. Axios
6. Framer-motion
7. Phosphor-react
8. Prop-types

## File Structure

```bash
src/

- api/
-- auth.api.js #Auth-specific API calls
-- axiosConfig.js #connection to server

- components/
-- loginForm/ #Login Form Component + functionality

- functions/
-- clearMessage.js #reusable function to timeout clear UI message
-- motionUtils.js #reusable framer-motion animations

- pages/

- routes/
-- ProtectedRoute.jsx #reusable component to protect routes in src/main.jsx

- styles/ #global styles and scss variables

- utils/ # ???

.env #environment variables
.gitignore
index.html
package-lock.json
package.json
README.md
vite.config.js
```

## API Call flow

**handleLogin example:**

- 2 files
  - src/components/loginForm/LoginForm.jsx -> handleLogin button functionality
  - src/api/auth.api.js -> calling API endpoint and receiving response data (JSON)

```js
// src/components/loginForm/LoginForm.jsx

1. onSubmit={handleLogin}

2. useClearMessage(message, setMessage)  -> Clears message on timeout 3 seconds

3. const handleLogin function
3.1 e.preventDefault();
3.2 Frontend Form Validation
3.3 try/catch block
3.3.1 const res = await loginUser(email,password)  -> call API in src/api/auth.api.js

// src/api/auth.api.js

4. const res = await axios.post("/auth/login", {email, password})  -> send POST request to api endpoint /ath/login
5. return res.data  -> receive response data (JSON) from server

```
