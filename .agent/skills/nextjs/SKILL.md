# Next.js App Router - Production Patterns
**Version**: Next.js 16.1.1
**React Version**: 19.2.3
**Node.js**: 20.9+

## Core Concepts & Updates

### Caching and Data Fetching
Next.js 16 introduces `"use cache"` for granular caching control.

```typescript
"use cache"
```

**Revalidating Tags:**
```typescript
revalidateTag('tag-name')
```

### Async Params and SearchParams
In Next.js 16, `params` and `searchParams` are Promises and must be awaited.

**❌ This no longer works in Next.js 16:**
```typescript
export default function Page({ params, searchParams }: { params: { slug: string }, searchParams: { query: string } }) {
  const slug = params.slug // ❌ Error: params is a Promise
  const query = searchParams.query // ❌ Error: searchParams is a Promise
  return <div>{slug}</div>
}
```

**✅ Correct: await params and searchParams:**
```typescript
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ query: string }> }) {
  const { slug } = await params // ✅ Await the promise
  const { query } = await searchParams // ✅ Await the promise
  return <div>{slug}</div>
}
```

### Headers and Cookies
`cookies()` and `headers()` are now async.

**❌ Before:**
```typescript
import { cookies, headers } from 'next/headers'
export function MyComponent() {
  const cookieStore = cookies() // ❌ Sync access
  const headersList = headers() // ❌ Sync access
}
```

**✅ After:**
```typescript
import { cookies, headers } from 'next/headers'
export async function MyComponent() {
  const cookieStore = await cookies() // ✅ Async access
  const headersList = await headers() // ✅ Async access
}
```

### Client Components
For client components, use `React.use()` to unwrap promises from props.

```typescript
'use client';
import { use } from 'react';

export default function ClientComponent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap Promise in client
  return <div>{id}</div>;
}
```

### Middleware vs Proxy
Next.js 16 introduces `proxy.ts` as a replacement/alternative for some middleware use cases, though middleware is still supported (with deprecation warnings for some patterns).

**Middleware (Deprecated pattern):**
```typescript
// middleware.ts ❌ Deprecated in Next.js 16
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}
export const config = {
  matcher: '/api/:path*',
}
```

**Proxy (New):**
```typescript
// proxy.ts ✅ New in Next.js 16
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}
export const config = {
  matcher: '/api/:path*',
}
```

### Parallel Routes
`default.tsx` is now **REQUIRED** in Next.js 16 for parallel routes.

Structure:
```
app/
├── @auth/
│   ├── login/
│   │   └── page.tsx
│   └── default.tsx ← REQUIRED in Next.js 16
├── @dashboard/
│   ├── overview/
│   │   └── page.tsx
│   └── default.tsx ← REQUIRED in Next.js 16
└── layout.tsx
```

`app/layout.tsx`:
```typescript
export default function Layout({
  children,
  auth,
  dashboard,
}: {
  children: React.ReactNode
  auth: React.ReactNode
  dashboard: React.ReactNode
}) {
  return (
    <html>
      <body>
        {auth}
        {dashboard}
        {children}
      </body>
    </html>
  )
}
```

`app/@auth/default.tsx`:
```typescript
export default function AuthDefault() {
  return null // or <Skeleton /> or redirect
}
```

### Image Optimization
Default device sizes and ttl have changed or should be configured.

`next.config.ts`:
```typescript
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    minimumCacheTTL: 60, // Revert to 60 seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Add larger sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Restore old sizes
    formats: ['image/webp'], // Default
  },
}
export default config
```

### "use cache" Directive
Use `"use cache"` to cache the output of a function (component or data fetch).

**Example: Expensive Component**
```typescript
// app/components/expensive-component.tsx
'use cache'
export async function ExpensiveComponent() {
  const data = await fetch('https://api.example.com/data')
  const json = await data.json()
  return (
    <div>
      <h1>{json.title}</h1>
      <p>{json.description}</p>
    </div>
  )
}
```

**Example: Data Function**
```typescript
// lib/data.ts
'use cache'
export async function getExpensiveData(id: string) {
  const response = await fetch(`https://api.example.com/items/${id}`)
  return response.json()
}
```

