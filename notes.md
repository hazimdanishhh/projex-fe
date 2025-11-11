# Notes

## How authorization is handled

```bash
Frontend Component --> uses AuthContext
                    --> calls loginUser() from auth.api.js
                    --> which calls axios.post('/api/auth/login')
```

## What else needs to have its own global context

Only reach for Context if:

- The data is needed in many unrelated places, or
- It’s painful to pass down via props repeatedly, or
- It affects global UI.

| 🧠 Context            | Use Case                                               |
| --------------------- | ------------------------------------------------------ |
| `AuthContext`         | User login state, JWT, roles                           |
| `ThemeContext`        | Dark/light mode, layout preferences                    |
| `NotificationContext` | Global toasts/snackbars/messages                       |
| `AppConfigContext`    | App-wide config like feature toggles, locale, settings |
| `CartContext`         | For e-commerce: cart items, pricing, shipping state    |
| `LanguageContext`     | i18n language and text direction                       |
| `ModalContext`        | Centralized modal open/close logic                     |
| `SocketContext`       | WebSocket connection state and events                  |

Otherwise, for normal API requests, just call your APIs directly using:

```js
const res = await getProjectById(id);
setProject(res.data);
```

## Creating a new API call

1. Create the designated API request call in something like /api/user.api.js
2. Create the API handler in the designated component/page

## Sitemap

```bash
login/
register/
error/             # 404, 500, etc.
unauthorized/      # 401

user/
├── dashboard/
├── profile/
├── costings/
│   ├── new/
│   ├── [costingId]/
│   └── edit/[costingId]/
└── clients/
    ├── new/
    ├── [clientId]/
    └── edit/[clientId]/

admin/
├── dashboard/
├── users/
│   ├── [userId]/
│   └── create/
├── roles/
├── costings/
└── settings/

```

## Remaining Security Vulnerabilities

| Security Feature                     | Status     | Notes                                                |
| ------------------------------------ | ---------- | ---------------------------------------------------- |
| Auth middleware with roles           | ✅ Done    | Good for route protection                            |
| JWT-based Auth                       | ✅ Done    | Scalable and stateless                               |
| Secure headers (Helmet + CSP)        | 🟡 Pending | Add via `helmet()` middleware                        |
| HttpOnly cookies                     | ✅ Done    | Secured XSS protection                               |
| XSS protection (via React + CSP)     | 🟡 Partial | Avoid `dangerouslySetInnerHTML`, use CSP             |
| CSRF protection                      | ❌         | What is this?                                        |
| HTTPS enforced                       | 🟡 Ensure  | Your production server should **force HTTPS**        |
| Rate limiting / brute-force blocking | ✅ Done    | Added `rateLimiter.middleware.js` for General & Auth |
| Input validation/sanitization        | 🟡 Partial | Use `express-validator` or `zod` on input payloads   |
