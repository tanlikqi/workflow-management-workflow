# Revolab — Workflow Management

Take-home for Revolab. An AI-powered call centre platform where operators
build call routing flows, monitor live analytics, and manage conversation
outcomes. Replicates the two reference screens (admin dashboard + workflow
builder) as a fully interactive React SPA, with a lightweight Express
backend for the bonus track.

## Quick start

```bash
npm install
npm run dev
```

That boots **both** processes in parallel via `concurrently`:

- **client** on `http://localhost:5173` (Vite)
- **server** on `http://localhost:3001` (Express + tsx watch)

Vite proxies `/api/*` to the server, so the React app talks to `/api/...`
directly. Open the client URL and you'll land on the Dashboard.

## Scripts

| Command              | What it does                                      |
|----------------------|---------------------------------------------------|
| `npm run dev`        | Client (Vite) + server (Express) in parallel      |
| `npm run dev:client` | Frontend only                                     |
| `npm run dev:server` | API only                                          |
| `npm run build`      | Type-check (`tsc -b`) + production frontend build |
| `npm run preview`    | Serve the production build locally                |
| `npm run lint`       | Type-only lint via `tsc -b --noEmit` (both)       |

## Tech stack

### Frontend
- **React 18** + **TypeScript** (strict)
- **Vite 5** — dev server / build
- **Tailwind CSS 3** — styling, with a small set of brand tokens
- **Zustand** — UI store (toasts) + workflow store (graph + selection)
- **React Router v6** — one route per tab
- **TanStack Query v5** — server-state caching, loading / error states,
  optimistic mutations
- **Recharts** — donut, line charts
- **@xyflow/react (React Flow v12)** — workflow canvas
- **lucide-react** — icons
- **clsx + tailwind-merge + class-variance-authority** — class composition

### Backend
- **Node.js 20 + Express 4 + TypeScript**
- **Zod** — request validation + inferred types (single source of truth)
- **tsx** — TS runner with watch mode
- In-memory store seeded from the same data the frontend mocks use

## What's implemented

### Dashboard (`/dashboard`)

- Search + notification / calls icons + user identity chip in the page header
- **Flows distribution** — donut chart + legend; week / month selector
- **Call distribution** — 9-hour × 7-day heatmap (CSS grid)
- Four **metric cards** with trend pills (green ↑ / rose ↓)
- **Last conversations** — table with Success / Hang Up status badges,
  "Show more" toggles between 5 and 8 rows
- **Calls handled** — dual-series line chart (Successful + Transferred),
  3 ranges (Today / Yesterday / This week)
- **Total duration** — 7-bar weekly chart with peak day highlighted, 3
  weeks selectable
- **Quick actions** — "New call flow" navigates to Workflows + fires a
  toast; "Add AI agent" and "View analytics" are wired too
- **AI Powered** promo banner with "Take a tour" CTA (fires a toast)

### Workflow builder (`/workflows`)

- Custom React Flow nodes — one trigger ("Incoming Call Initiated") + five
  step nodes (Call Qualification, Process Valid Call, Handle Ineligible
  Caller, Route to Human, Close Call)
- Edges colored per-branch (violet for trunk, green for happy path, dashed
  rose for ineligible/close paths)
- **Click any node** to open the right-hand side panel
- **Edit** Step Name and description — changes flow back into the store
  and persist while the panel is open
- **Close (×)** button collapses the panel; clicking the empty canvas also
  deselects
- **Zoom controls** (top-right) — zoom in / out / fit-view / close

### Placeholder routes

`/knowledge`, `/integrations`, `/analytics`, `/test` render a minimal
gradient-icon empty state. They keep the tab bar functional without
distracting from the implemented surfaces.

## Backend (bonus)

Express API at `server/`. At a glance:

| Method | Path                                       | Request body                                                                                                | Response                                                                                                | Used by |
|--------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|---------|
| GET    | `/api/health`                              | —                                                                                                            | `{ ok: true }`                                                                                           | sanity check |
| GET    | `/api/metrics/dashboard`                   | —                                                                                                            | `{ flowsDistribution, callHeatmap, lastConversations, callsHandledTotals, callsHandledSeries, totalDurationTotal, totalDurationSeries }` | FlowsDistribution, CallDistribution, MetricCards, CallsHandled, TotalDuration (one shared query) |
| GET    | `/api/workflows/:id`                       | —                                                                                                            | `Workflow` — `{ id, name, nodes: Node[], edges: Edge[], createdAt, updatedAt }` (404 if not found)        | WorkflowCanvas — hydrates the graph on mount |
| PATCH  | `/api/workflows/:id/steps/:stepId`         | `{ title?: string, description?: string, primaryOutcome?: Outcome, secondaryOutcome?: Outcome }` (≥1 field)  | Updated step `{ id, type, position, data }` · 400 invalid body · 404 step/workflow not found              | NodePanel — save-on-blur PATCH with success / fail toast |
| GET    | `/api/calls?limit&status`                  | —                                                                                                            | `CallRecord[]` — `{ id, flow, duration, time, status: "success" \| "hangup" }[]`                          | LastConversations widget |

All errors come back as `{ "error": "message" }`. Full request/response
JSON examples + `curl` commands live in
[`server/README.md`](server/README.md).

Storage is in-memory only — edits survive while the server runs and reset
on restart.

## Project structure

```
src/                    frontend (React + Vite)
  lib/                  cn() helper + apiFetch helper
  data/                 mock data (dashboard fallback + workflow types)
  store/                zustand stores (UI toasts, workflow graph)
  components/
    ui/                 Button, Badge, Card, Toast, Select, IconTile
    layout/             Sidebar, TopBar, AppShell
    dashboard/          dashboard widgets (FlowsDistribution, ...)
    workflow/           WorkflowCanvas, NodePanel, ZoomControls, nodes/
  pages/                DashboardPage, WorkflowsPage, PlaceholderPage
  App.tsx               routes
  main.tsx              entry point + BrowserRouter + QueryClientProvider

server/                 backend (Express + Zod)
  src/
    index.ts            Express bootstrap, route mounting
    schemas.ts          Zod schemas + inferred types
    db.ts               in-memory store + accessors
    middleware/         Zod request validator
    routes/             workflows / metrics / calls
  README.md             endpoint reference
```

## State management at a glance

- **`useUiStore`** — single global concern: the toast queue. `pushToast`,
  `dismissToast`. Mounted once in `AppShell` via `ToastViewport`.
- **`useWorkflowStore`** — graph state shared between canvas and side
  panel: `nodes`, `edges`, `selectedNodeId`. Exposes
  `selectNode`, `updateNode`, and proxies React Flow's
  `onNodesChange` / `onEdgesChange`.
- Everything else (chart range selectors, "show more" toggles) is
  component-local `useState`.
- Active tab is driven by the URL (`react-router-dom NavLink`) — no
  duplicated state.

## Notes

- TypeScript is strict (`noUnusedLocals`, `noUnusedParameters`). The
  `lint` script runs `tsc -b --noEmit` as a cheap CI gate.
- `*.tsbuildinfo` files are gitignored — they're TypeScript's incremental
  build cache, equivalent to `dist/`.
- `vite.config.ts` uses a root-relative alias (`"@": "/src"`) to avoid
  pulling in `@types/node` just to compute a path.
