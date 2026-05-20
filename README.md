# Revolab — Workflow Management

Frontend take-home for Revolab. An AI-powered call centre platform where
operators build call routing flows, monitor live analytics, and manage
conversation outcomes. Replicates the two reference screens from the
brief (admin dashboard + workflow builder) as a fully interactive React
single-page app.

## Quick start

```bash
npm install
npm run dev
```

The app boots on the URL Vite prints (usually `http://localhost:5173`).
Open it and you'll land on the Dashboard. Click the **Workflows** tab to
see the canvas + node panel.

## Scripts

| Command           | What it does                                    |
|-------------------|-------------------------------------------------|
| `npm run dev`     | Vite dev server with HMR                        |
| `npm run build`   | Type-check (`tsc -b`) + production build         |
| `npm run preview` | Serve the production build locally              |
| `npm run lint`    | Type-only lint via `tsc -b --noEmit`            |

## Tech stack

- **React 18** + **TypeScript** (strict)
- **Vite 5** — dev server / build
- **Tailwind CSS 3** — styling, with a small set of brand tokens
- **Zustand** — UI store (toasts) + workflow store (graph + selection)
- **React Router v6** — one route per tab
- **Recharts** — donut, line charts
- **@xyflow/react (React Flow v12)** — workflow canvas
- **lucide-react** — icons
- **clsx + tailwind-merge + class-variance-authority** — class composition

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

## Project structure

```
src/
  lib/                  cn() helper (clsx + tailwind-merge)
  data/                 mock data (dashboard + workflow graph)
  store/                zustand stores (UI toasts, workflow graph)
  components/
    ui/                 Button, Badge, Card, Toast, Select, IconTile
    layout/             Sidebar, TopBar, AppShell
    dashboard/          dashboard widgets (DashboardHeader, FlowsDistribution, ...)
    workflow/           WorkflowCanvas, NodePanel, ZoomControls, nodes/
  pages/                DashboardPage, WorkflowsPage, PlaceholderPage
  App.tsx               routes
  main.tsx              entry point + BrowserRouter
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
