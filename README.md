# BlueMart 🛒

> A premium full-stack grocery and snack delivery application with a focus on Clean Architecture, Type Safety, and Scalable Design.

**Built by Rahul Dhakad** | [Live Demo]https://sesd-project-724p.vercel.app/

---

## 🏗️ Architecture (Clean & Scalable)

BlueMart follows a **monorepo, 5-tier Clean Architecture** with strict separation of concerns:

```
BlueMart/
├── client/          # React + Vite + TypeScript (Frontend SPA)
├── server/          # Node.js + Express + TypeScript (REST API)
│   ├── controllers/ # Thin Request Handlers
│   ├── services/    # Business Logic Tier (Singletons)
│   ├── repositories/# Data Access Tier (Generic Patterns)
│   └── models/      # Mongoose Schemas & Interfaces
├── api/             # Vercel Serverless Entry Point (TypeScript)
└── ...
```

### Modern Tech Stack
- **Frontend**: React 19, Vite, TypeScript, TailwindCSS v4
- **Backend**: Node.js 22, Express 5, TypeScript
- **Database**: MongoDB Atlas + Mongoose
- **Architecture**: Controller-Service-Repository (Clean Architecture)
- **Design Patterns**: Singleton (Services), Repository Pattern, Factory-like instantiation
- **Auth**: JWT + HttpOnly Cookies (XSS-proof)
- **Payments**: Stripe Integration (Online & COD)
- **Media**: Cloudinary CDN for optimized image delivery

---

## 📐 UML Documentation

Required project documentation is available in the root directory:
- [idea.md](./idea.md) → Project scope and key features.
- [useCaseDiagram.md](./useCaseDiagram.md) → Mermaid UML for Actor interactions.
- [sequenceDiagram.md](./sequenceDiagram.md) → Mermaid UML for the end-to-end checkout flow.
- [classDiagram.md](./classDiagram.md) → Mermaid UML showing architectural layer relationships.
- [ErDiagram.md](./ErDiagram.md) → Mermaid UML for the Entity-Relationship data model.

---

## 🧪 Testing Strategy

### Integration Tests (`Jest` — Backend)
Located in `server/tests/`. Run all tests:
```bash
cd server && npm test
```
Integration tests use **`mongodb-memory-server`** (an in-memory MongoDB instance) and **TypeScript ESM** for isolated and reliable testing.

---

## 🚀 Getting Started

### Local Development

1. **Install Dependencies**:
```bash
# Root
bash start.sh
```

2. **Configure Environment**:
Create `server/.env` based on the placeholders provided in the file (requires MongoDB, Cloudinary, and Stripe keys).

3. **Run Application**:
```bash
# Backend (Server)
cd server && npm start

# Frontend (Client)
cd client && npm run dev
```

---

## 🧩 Key Design Decisions

### ① Clean Architecture
To ensure high maintainability (SESD criteria), logic is extracted from controllers into **Services** (Business Logic) and **Repositories** (Data Access).

### ② Full-Stack TypeScript
Migrated the entire codebase from JavaScript to TypeScript to ensure compile-time type safety and professional-grade code quality.

### ③ Automated Deployment (Vercel)
Configured `vercel.json` and `api/index.ts` to bridge the Express backend into a serverless environment with native TypeScript support.

---

## 👨‍💻 Author

**Rahul Dhakad**  
Full-Stack Developer | React · Node.js · MongoDB · TypeScript
y's CDN for fast, global delivery.

---

## 👨‍💻 Author

**Rahul Dhakad**  
Full-Stack Developer | React · Node.js · MongoDB · DevOps
