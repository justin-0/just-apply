/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/sign-up'
import { Route as SignInImport } from './routes/sign-in'
import { Route as ProfileImport } from './routes/profile'
import { Route as OverviewImport } from './routes/overview'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const SignInRoute = SignInImport.update({
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const OverviewRoute = OverviewImport.update({
  path: '/overview',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/overview': {
      id: '/overview'
      path: '/overview'
      fullPath: '/overview'
      preLoaderRoute: typeof OverviewImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/overview': typeof OverviewRoute
  '/profile': typeof ProfileRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
}

interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/overview': typeof OverviewRoute
  '/profile': typeof ProfileRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
}

interface FileRoutesById {
  '/': typeof IndexRoute
  '/overview': typeof OverviewRoute
  '/profile': typeof ProfileRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
}

interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/overview' | '/profile' | '/sign-in' | '/sign-up'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/overview' | '/profile' | '/sign-in' | '/sign-up'
  id: '/' | '/overview' | '/profile' | '/sign-in' | '/sign-up'
  fileRoutesById: FileRoutesById
}

interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  OverviewRoute: typeof OverviewRoute
  ProfileRoute: typeof ProfileRoute
  SignInRoute: typeof SignInRoute
  SignUpRoute: typeof SignUpRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  OverviewRoute: OverviewRoute,
  ProfileRoute: ProfileRoute,
  SignInRoute: SignInRoute,
  SignUpRoute: SignUpRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/overview",
        "/profile",
        "/sign-in",
        "/sign-up"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/overview": {
      "filePath": "overview.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
