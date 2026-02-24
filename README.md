# Postwave

A full-stack newsletter platform for creators. Creators can build publications, write and publish newsletters, and manage subscribers. Subscribers can discover publications, subscribe, and read newsletters on a public-facing page.

---

## API Design

### AUTH

```
POST   /api/v1/auth/sign-up/email
POST   /api/v1/auth/sign-in/email
POST   /api/v1/auth/sign-out
GET    /api/v1/auth/get-session

POST   /api/v1/auth/send-verification-email
GET    /api/v1/auth/verify-email

POST   /api/v1/auth/request-password-reset
POST   /api/v1/auth/reset-password

PATCH  /api/v1/auth/update-user
POST   /api/v1/auth/change-password
POST   /api/v1/auth/delete-user
```

---

### USERS

```
GET    /api/v1/users/me
PATCH  /api/v1/users/me
PATCH  /api/v1/users/me/avatar
DELETE /api/v1/users/me
```

---

### PUBLICATIONS

```
POST   /api/v1/publications
GET    /api/v1/publications
GET    /api/v1/publications/:id
PATCH  /api/v1/publications/:id
PATCH  /api/v1/publications/:id/logo
DELETE /api/v1/publications/:id
GET    /api/v1/publications/check-subdomain
```

---

### NEWSLETTERS

```
POST   /api/v1/newsletters
GET    /api/v1/newsletters
GET    /api/v1/newsletters/:id
DELETE /api/v1/newsletters/:id

POST   /api/v1/newsletters/versions
GET    /api/v1/newsletters/versions
GET    /api/v1/newsletters/versions/:id
POST   /api/v1/newsletters/versions/:id/restore

POST   /api/v1/newsletters/:id/publish
POST   /api/v1/newsletters/:id/schedule
POST   /api/v1/newsletters/:id/unschedule
```

---

### COMMENTS

```
GET    /api/v1/newsletters/:id/comments
POST   /api/v1/newsletters/:id/comments
DELETE /api/v1/newsletters/:id/comments/:id
```
