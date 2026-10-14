import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'

const Services = lazy(() => import('./pages/Services.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const page = (C) => <Suspense fallback={<div className="min-h-[60vh]" />}><C /></Suspense>

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', element: page(Services) },
      { path: '/about', element: page(About) },
      { path: '/contact', element: page(Contact) },
      { path: '/admin', element: page(Admin) },
      { path: '*', element: page(NotFound) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
