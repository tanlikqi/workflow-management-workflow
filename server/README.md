# Revolab API

Lightweight REST backend for the Revolab workflow management app. Express +
TypeScript + Zod, in-memory store seeded with the same data the frontend
mocks use.

## Quick start

The API is part of the same workspace as the frontend. From the **repo
root**:

```bash
npm install
npm run dev
```

That boots **both** processes via `concurrently`:

- **client** on `http://localhost:5173` (Vite dev server)
- **server** on `http://localhost:3001`

Vite is configured to proxy `/api/*` to the server, so the frontend talks
to `/api/...` without any CORS noise.

Run them individually if you prefer:

```bash
npm run dev:client      # frontend only
npm run dev:server      # API only
```

Smoke test:

```bash
curl http://localhost:3001/api/health
# → {"ok":true}
```

## Endpoints

| Method | Path                                       | Body              | Response                                                  |
|--------|--------------------------------------------|-------------------|-----------------------------------------------------------|
| GET    | `/api/health`                              | —                 | `{ ok: true }`                                            |
| GET    | `/api/metrics/dashboard`                   | —                 | Aggregated dashboard metrics (see below)                  |
| GET    | `/api/workflows/:id`                       | —                 | `Workflow` (404 if not found)                             |
| PATCH  | `/api/workflows/:id/steps/:stepId`         | `StepPatch`       | Updated step `{ id, type, position, data }`               |
| GET    | `/api/calls?limit&status`                  | —                 | `CallRecord[]`                                            |

### `GET /api/metrics/dashboard`

Returns everything the dashboard needs in one call:

```jsonc
{
  "flowsDistribution":   [{ "key": "...", "label": "...", "percent": 62, "count": 87, "trend": 19, "color": "#7c5cff" }, ...],
  "callHeatmap":         [[3,4,5,...], ...],
  "lastConversations":   [{ "id": "c1", "flow": "...", "duration": "10m 05s", "time": "15 min. ago", "status": "success" }, ...],
  "callsHandledTotals":  { "today": 143, "yesterday": 128, "this_week": 967 },
  "totalDurationTotal":  { "this_week": 98, "last_week": 76, "two_weeks_ago": 61 }
}
```

### `GET /api/workflows/:id`

Returns a workflow with React Flow-compatible node + edge shapes (so the
frontend store can consume it directly):

```jsonc
{
  "id": "incoming-call-routing",
  "name": "Incoming Call Routing",
  "nodes": [
    {
      "id": "call-qualification",
      "type": "step",
      "position": { "x": 80, "y": 180 },
      "data": {
        "kind": "step",
        "title": "Call Qualification",
        "description": "Identify caller intent and basic business details.",
        "tone": "violet",
        "iconKey": "phone",
        "primaryOutcome":   { "label": "Caller is eligible",   "iconKey": "check" },
        "secondaryOutcome": { "label": "Caller is ineligible", "iconKey": "alert" },
        "likes": 2,
        "dislikes": 2
      }
    }
  ],
  "edges": [
    { "id": "e_start_to_qualification", "source": "incoming-call-initiated", "target": "call-qualification", "type": "smoothstep", "style": { "stroke": "#7c5cff", "strokeWidth": 1.5 } }
  ],
  "createdAt": "2026-05-01T09:00:00.000Z",
  "updatedAt": "2026-05-19T11:00:00.000Z"
}
```

Seeded with one workflow at `id = "incoming-call-routing"`. Any other id returns 404.

### `PATCH /api/workflows/:id/steps/:stepId`

Partially updates one step's editable fields. Body is validated against
`StepPatchSchema` — at least one field must be present.

```bash
curl -X PATCH http://localhost:3001/api/workflows/incoming-call-routing/steps/call-qualification \
  -H "Content-Type: application/json" \
  -d '{"title": "Identify caller intent"}'
```

Allowed fields:

| Field              | Type                                          |
|--------------------|-----------------------------------------------|
| `title`            | string (1–80)                                 |
| `description`      | string (≤ 500)                                |
| `primaryOutcome`   | `{ label: string, iconKey: string }`          |
| `secondaryOutcome` | `{ label: string, iconKey: string }`          |

Returns the updated step (the full `{ id, type, position, data }`). The
parent workflow's `updatedAt` is bumped.

Invalid body → `400 { error: "..." }`.
Unknown workflow → `404 { error: "Workflow not found" }`.
Unknown step → `404 { error: "Step not found" }`.

### `GET /api/calls`

Returns the recent calls list used by the dashboard's **Last conversations**
widget.

Query params:

| Param    | Type                  | Notes                              |
|----------|-----------------------|------------------------------------|
| `limit`  | integer 1–100         | optional cap on rows returned       |
| `status` | `success` \| `hangup` | optional filter                     |

```bash
curl 'http://localhost:3001/api/calls?status=success&limit=3'
```

## Error envelope

All errors come back in the same shape:

```json
{ "error": "Step not found" }
```

The status code distinguishes the situation (400 for validation, 404 for
missing resources, 500 for unhandled).

## Storage model

- **In-memory only.** Workflow edits persist across the API process's
  lifetime but are wiped on every server restart. Reseed by restarting
  `npm run dev:server`.
- Backed by `Map<string, Workflow>` + `CallRecord[]` in [`src/db.ts`](src/db.ts).
- One workflow seeded at boot (`id = "incoming-call-routing"`) — the same graph that
  was previously hardcoded in [`src/data/workflow.ts`](../src/data/workflow.ts)
  on the frontend.

If/when a real database lands, every accessor (`getWorkflow`, `patchStep`,
`listCalls`, `getDashboardMetrics`) becomes the place a query goes — the
route handlers don't need to change.

## Project layout

```
server/
├── README.md                 (this file)
├── tsconfig.json             strict TS, ESM, noEmit
└── src/
    ├── index.ts              Express bootstrap, route mounting
    ├── schemas.ts            Zod schemas + inferred types
    ├── db.ts                 in-memory store + accessors
    └── routes/
        ├── workflows.ts      GET /api/workflows/:id, PATCH .../steps/:stepId
        ├── metrics.ts        GET /api/metrics/dashboard
        └── calls.ts          GET /api/calls
```
