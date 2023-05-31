import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import CreateReceipt from './pages/CreateReceipt'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="crear-recibo" element={<CreateReceipt />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
