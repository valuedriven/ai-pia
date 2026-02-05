---
description: Next.js App Router - Production Patterns (v16.1.1)
---

# Next.js App Router - Production Patterns

**Version**: Next.js 16.1.1
**React Version**: 19.2.3
**Node.js**: 20.9+
**Last Verified**: 2026-01-09

## 1. Async Request APIs (Breaking Change)
In Next.js 16, dynamic APIs that access request-time information are asynchronous.

### `params` & `searchParams`
**❌ Next.js 15 (Synchronous)**
```tsx
export default function Page({ params, searchParams }: { params: { slug: string }, searchParams: { query: string } }) {
  const slug = params.slug; // ❌ Error: params is a Promise
  const query = searchParams.query; // ❌ Error: searchParams is a Promise
}
```

**✅ Next.js 16 (Asynchronous)**
```tsx
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ query: string }> }) {
  const { slug } = await params;
  const { query } = await searchParams;
}
```

### `cookies()` & `headers()`
**❌ Next.js 15**
```tsx
import { cookies, headers } from 'next/headers'
const cookieStore = cookies() // ❌ Sync access
const headersList = headers() // ❌ Sync access
```

**✅ Next.js 16**
```tsx
import { cookies, headers } from 'next/headers'
const cookieStore = await cookies() // ✅ Async access
const headersList = await headers() // ✅ Async access
```

## 2. Server Actions & Caching
New explicit caching APIs replace implicit behavior.

### `use cache` Directive
Use `'use cache'` to opt-in to caching for specific functions or files.

```tsx
'use cache'
export async function getPosts() {
  const response = await fetch('/api/posts')
  return response.json()
}
```

### `revalidateTag`
Requires a second argument in Next.js 16 to specify cache life or 'max'.

**❌ Next.js 15**
```ts
revalidateTag('posts')
```

**✅ Next.js 16**
```ts
revalidateTag('posts', 'max')
// OR
revalidateTag('posts', {
  stale: 3600,
  revalidate: 86400,
})
```

## 3. Middleware Replacement: `proxy.ts`
`middleware.ts` is deprecated in favor of `proxy.ts` for improved performance and clarity.

**✅ `app/proxy.ts`**
```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

## 4. Parallel Routes: `default.tsx`
`default.tsx` is now **REQUIRED** for every parallel route slot to prevent 404s during soft navigation.

```
app/
├── @modal/
│   ├── login/
│   │   └── page.tsx
│   └── default.tsx     ← REQUIRED
└── layout.tsx
```

**`app/@modal/default.tsx`**
```tsx
export default function Default() {
  return null;
}
```

## 5. React 19 Integration

### `use` Hook
Unwrap promises in Client Components.

```tsx
'use client';
import { use } from 'react';

export default function ClientComponent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <div>{id}</div>;
}
```

### React Compiler
Enabled via `next.config.ts`. Automatically memoizes components.

```ts
const config: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
}
```

## 6. Image Optimization
Image configuration has changed defaults.

```ts
// next.config.ts
const config: NextConfig = {
  images: {
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
}
```
