import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

// The pre-rendered HTML (dist/index.html) exists purely so crawlers and social
// scrapers receive real, indexable content. On the client we take over with a
// normal render: React replaces the static shell with the live app (animations,
// 3D backdrop, smooth scroll). The hero is painted in its settled state when the
// page was pre-rendered (see src/lib/prerender.js) so there is no visible flash.
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
