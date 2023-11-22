import {BrowserRouter, Routes, Route, Link} from 'react-router-dom' 

import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'

import Personagens from './components/rotas/Personagens.jsx'
import Clas from './components/rotas/Clas.jsx'
import Kekkei from './components/rotas/KekkeiGenkai.jsx'
import Vilas from './components/rotas/Vilas.jsx'
import Bestas from './components/rotas/BestasDeCauda.jsx'
import Times from './components/rotas/Times.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>

      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/personagens' element={<Personagens/>}/>
        <Route path='/clas' element={<Clas/>}/>
        <Route path='/bestas-de-cauda' element={<Bestas/>}/>
        <Route path='/vilas' element={<Vilas/>}/>
        <Route path='/kekkei-genkai' element={<Kekkei/>}/>
        <Route path='/times' element={<Times/>}/>
      </Routes>

    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
