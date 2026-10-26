# Kabbik web — feature-based architecture

## Layout

```
src/
  app/                 # Next.js routes (thin pages only)
  features/<name>/     # Domain modules
  shared/              # Cross-cutting UI, API core, config, icons
  store/               # Redux root store + typed hooks
```

## Feature module contract

Each feature under `src/features/<name>/`:

| Folder        | Purpose                                      |
|---------------|----------------------------------------------|
| `components/` | UI moved from legacy `src/components/<Name>/` |
| `api/`        | Client API functions (split from apiServices) |
| `store/`      | Redux slice + selectors when domain-owned   |
| `types/`      | Optional domain types                         |
| `index.ts`    | **Public API** — only entry for other layers  |

**Rules**

- Code outside a feature imports `@/features/<name>` or `@/shared/*` only.
- Features do not import another feature’s internals; use that feature’s `index.ts` or `shared/`.
- Redux reducer **keys** in `store.tsx` stay stable (`loginSlice`, `user`, …).
- `app/[lang]/*` pages fetch data and render a feature screen component; avoid large UI in routes.

## Shared

| Path            | Contents                                      |
|-----------------|-----------------------------------------------|
| `shared/ui/`    | shadcn/Radix primitives                       |
| `shared/api/`   | `apiEndpoints`, `CommonApicalls`, barrel      |
| `shared/lib/`   | Generic helpers                               |
| `shared/icons/` | SVG components (legacy `@/svgs`)              |
| `shared/config/`| App config + locales                          |

## API

Domain HTTP helpers live in `features/<name>/api/`. The compatibility barrel `@/utils/apiServices` re-exports all feature APIs for legacy imports.

## Migration

During transition, avoid new imports from `@/components/*` or deep paths under `features/*/components`. Prefer `@/features/<name>`.
