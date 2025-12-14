# 📄 `news-rag-frontend/README.md`

```markdown
# 📰 News RAG Chatbot — Frontend

This is the **frontend** for the Retrieval-Augmented Generation (RAG) powered chatbot, built as part of the **Voosh Full Stack Developer Assignment**.  

It provides a modern chat interface for interacting with the backend RAG service.  
Users can ask questions about the news, see responses retrieved from a news corpus, and manage their session history.

---

## 🚀 Tech Stack
- **Framework:** React + TypeScript (Vite)
- **Styling:** SCSS (custom chat styles + animations)
- **State Management:** LocalStorage (for session persistence)
- **API Integration:** REST calls to Express backend
- **Hosting:** Vercel (recommended)

---

## 📂 Project Structure
```

src/
api/            # API helper functions (session, chat, etc.)
components/     # UI components (ChatWindow, MessageBubble)
styles/         # SCSS styles
types.ts        # Shared TypeScript types
App.tsx         # Root app component
main.tsx        # React entry point

````

---

## ⚙️ Setup & Installation

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/news-rag-frontend.git
cd news-rag-frontend
npm install
````

### 2. Environment Variables

Create a `.env` file (never commit it) using `.env.example` as a template:

```env
VITE_API_URL=http://localhost:3000/api
```

* For **local dev** → keep it as above.
* For **deployment** → replace with your deployed backend URL (e.g. Render):

  ```
  VITE_API_URL=https://news-rag-backend.onrender.com/api
  ```

### 3. Start Development

```bash
npm run dev
```

App will be available at `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
```

---

## ✨ Features

* 💬 **Modern Chat UI** — clean design with message bubbles.
* 🔄 **Session Management** — resumes existing session using `localStorage`.
* ⚡ **Fast Responses** — connects directly to backend APIs.
* 🧹 **Reset Button** — clears current session locally & on backend.
* 🎨 **Animations** — smooth fade-in for chat, pop-in for messages.

---

## 📡 API Integration

The frontend calls the backend REST APIs:

* **Start session** → `POST /api/session/start`
* **Get history** → `GET /api/session/:id`
* **Send query** → `POST /api/chat/:sessionId`
* **Reset session** → `DELETE /api/session/:id`

---

## 🚀 Deployment (Vercel Example)

1. Push repo to GitHub.
2. Import into [Vercel](https://vercel.com/).
3. Set environment variable:

   ```
   VITE_API_URL=https://news-rag-backend.onrender.com/api
   ```
4. Deploy → frontend available at `https://your-app.vercel.app`.

---

## 📜 License

MIT

```

