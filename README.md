# API Documentation

This document outlines the available endpoints for the **leadbase-spark backend API**.

---

# Base URL

Default local development URL:

```
http://localhost:3001/api
http://192.168.88.19:8080/
```

---

# Authentication

Protected routes require the `x-api-key` header.

The value must match the `API_KEY` defined in your backend `.env` file.

### Example Header

```http
x-api-key: your-secret-api-key
```

---

# Auth Endpoints

## Verify API Key

Used to check if an API key is valid.

| Property | Value |
|--------|------|
| URL | `/auth/verify` |
| Method | `POST` |
| Auth Required | Yes |

### Success Response

**200 OK**

```json
{
  "success": true
}
```

---

# Blog Endpoints

## Get All Posts

Returns a list of blog posts sorted by `publishedAt` (descending).

| Property | Value |
|--------|------|
| URL | `/blog` |
| Method | `GET` |
| Auth Required | No |

### Success Response

**200 OK**

Returns an array of `Post` objects.

---

## Get Single Post

| Property | Value |
|--------|------|
| URL | `/blog/:slug` |
| Method | `GET` |
| Auth Required | No |

### Success Response

- **200 OK**
- **404 Not Found**

---

## Get Blog Categories

| Property | Value |
|--------|------|
| URL | `/blog/categories` |
| Method | `GET` |
| Auth Required | No |

### Success Response

**200 OK**

Returns an array of category names.

---

## Create Blog Post

| Property | Value |
|--------|------|
| URL | `/blog` |
| Method | `POST` |
| Auth Required | Yes |

### Request Body

```json
{
  "slug": "my-post",
  "title": "My Post Title",
  "excerpt": "Short summary...",
  "category": "Growth",
  "content": "Markdown content...",
  "readingTime": "5 min read",
  "publishedAt": "2024-03-04",
  "image": "base64-string-or-url",
  "isHighlighted": true
}
```

---

## Update Blog Post

| Property | Value |
|--------|------|
| URL | `/blog/:slug` |
| Method | `PUT` |
| Auth Required | Yes |

### Request Body

Partial JSON of the **Create Blog Post** object.

---

## Delete Blog Post

| Property | Value |
|--------|------|
| URL | `/blog/:slug` |
| Method | `DELETE` |
| Auth Required | Yes |

---

# App Endpoints

## Get All Apps

| Property | Value |
|--------|------|
| URL | `/apps` |
| Method | `GET` |
| Auth Required | No |

### Query Parameters

| Param | Description |
|------|-------------|
| `category` | Filter apps by category (optional) |

---

## Get Single App

| Property | Value |
|--------|------|
| URL | `/apps/:slug` |
| Method | `GET` |
| Auth Required | No |

---

## Get App Categories

| Property | Value |
|--------|------|
| URL | `/apps/categories` |
| Method | `GET` |
| Auth Required | No |

---

## Create App

| Property | Value |
|--------|------|
| URL | `/apps` |
| Method | `POST` |
| Auth Required | Yes |

### Request Body

```json
{
  "slug": "app-slug",
  "name": "App Name",
  "tagline": "Catchy tagline",
  "description": "Full description",
  "category": "Marketing",
  "rating": 4.5,
  "merchants": "1,000+",
  "features": ["Feature 1", "Feature 2"],
  "pricing": [
    {
      "name": "Basic",
      "price": "$10/mo",
      "features": ["..."]
    }
  ],
  "howItWorks": [
    {
      "step": "Step 1",
      "description": "..."
    }
  ],
  "faqs": [
    {
      "q": "Question?",
      "a": "Answer."
    }
  ]
}
```

---

## Update App

| Property | Value |
|--------|------|
| URL | `/apps/:slug` |
| Method | `PUT` |
| Auth Required | Yes |

---

## Delete App

| Property | Value |
|--------|------|
| URL | `/apps/:slug` |
| Method | `DELETE` |
| Auth Required | Yes |

---
