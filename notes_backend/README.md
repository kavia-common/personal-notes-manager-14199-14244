# Notes Backend (Express)

Production-ready Express backend for a personal notes manager with CRUD endpoints, input validation, error handling, and Swagger docs.

## Features
- RESTful CRUD for notes: create, list, get by id, update, delete
- Input validation without external deps
- Centralized error handling with structured responses
- CORS enabled (configurable)
- Swagger UI at `/docs` with dynamic server URL
- Clear project structure and service/controller layering
- .env-based configuration with `.env.example`

## Project Structure
```
notes_backend/
  src/
    app.js
    server.js
    routes/
      index.js
      notes.js
    controllers/
      health.js
      notes.js
    services/
      health.js
      notes.js
    models/
      noteStore.js
    utils/
      validation.js
      errors.js
  swagger.js
  package.json
  .env.example
```

## Setup
1. Install dependencies
   ```
   npm install
   ```
2. Configure environment
   - Copy `.env.example` to `.env` and adjust values as needed.

3. Run the server
   - Development: `npm run dev`
   - Production: `npm start`

Server listens on `http://HOST:PORT` (default `http://0.0.0.0:3000`).

## API Documentation
Open Swagger UI at:
```
/docs
```

## Endpoints

- Health
  - GET `/` — service status

- Notes
  - GET `/api/notes` — list notes with optional `q`, `tag`, `page`, `pageSize`
  - POST `/api/notes` — create note `{ title, content, tags? }`
  - GET `/api/notes/:id` — get note by id
  - PUT `/api/notes/:id` — update note `{ title?, content?, tags? }` (at least one required)
  - DELETE `/api/notes/:id` — delete note by id

Response format on errors:
```json
{
  "status": "error",
  "message": "Error message",
  "details": { "errors": ["..."] } // optional
}
```

## cURL Samples

- Create a note
  ```
  curl -sS -X POST http://localhost:3000/api/notes \
    -H "Content-Type: application/json" \
    -d '{"title":"First Note","content":"Hello world","tags":["personal","todo"]}'
  ```

- List notes
  ```
  curl -sS "http://localhost:3000/api/notes?page=1&pageSize=10&q=hello&tag=personal"
  ```

- Get a note
  ```
  curl -sS http://localhost:3000/api/notes/<id>
  ```

- Update a note
  ```
  curl -sS -X PUT http://localhost:3000/api/notes/<id> \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated Title"}'
  ```

- Delete a note
  ```
  curl -sS -X DELETE http://localhost:3000/api/notes/<id>
  ```

## Notes
- Data is stored in-memory via `noteStore.js`. Replace with a database implementation for persistence.
- Validation is intentionally minimal and dependency-free; integrate a schema validator if needed as the project grows.

## License
MIT
