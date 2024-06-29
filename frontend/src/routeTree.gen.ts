/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const MessageLazyImport = createFileRoute('/message')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const MessageLazyRoute = MessageLazyImport.update({
  path: '/message',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/message.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/message': {
      id: '/message'
      path: '/message'
      fullPath: '/message'
      preLoaderRoute: typeof MessageLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  MessageLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/message"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/message": {
      "filePath": "message.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
