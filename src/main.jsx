import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const loadMidtrans = () => {
  const script = document.createElement('script')
  script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
  script.setAttribute(
    'data-client-key',
    import.meta.env.VITE_MIDTRANS_CLIENT_KEY
  )
  script.async = true
  document.body.appendChild(script)
}

loadMidtrans()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)