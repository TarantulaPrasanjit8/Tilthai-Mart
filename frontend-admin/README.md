# Food delivery admin panel (React + Vite + axios)

    npm install
    npm run dev

Set the backend URL in `.env` (VITE_API_URL). Expected endpoints:

| Method | Path | Notes |
|---|---|---|
| POST | /auth/login | body {email, password} -> {token} |
| GET | /orders | each: _id, customerName, phone, address, items[{name, quantity}], total, status (pending/accepted/delivered/cancelled) |
| PATCH | /orders/:id/status | body {status} |
| GET / POST | /products | product: _id, name, price, category, image, description |
| PUT / DELETE | /products/:id | |

Token is sent as `Authorization: Bearer <token>`.
