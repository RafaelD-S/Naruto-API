import './styles/header.scss'
import NarutoLogo from '../assets/Naruto_logo.png'
import Menu from '../assets/menu.png'
import { useState } from 'react'
import {Link} from 'react-router-dom' 


export default function Header() {

    const [menuAparecer, SetMenuAparecer] = useState('hidden')
    const [menuModal, SetMenuModal] = useState(true)

    const abrirFecharMenu = () => {
        if(menuModal == true) {
            SetMenuAparecer('visible')
            SetMenuModal(false)
        } else {
            SetMenuAparecer('hidden')
            SetMenuModal(true)
        }
    }

    return (
        <header>
            <Link to='/'>
                <figure>
                    <img src={NarutoLogo} alt=""/>
                </figure>
            </Link>

            <nav style={{overflow: menuAparecer}}>
                <ul onClick={abrirFecharMenu}>
                    <Link to='/personagens'><li>Personagens</li></Link>
                    <Link to='/clas'><li>Clãs</li></Link>
                    <Link to='/vilas'><li>Vilas</li></Link>
                    <Link to='/kekkei-genkai'><li>Kekkei Genkai</li></Link>
                    <Link to='/bestas-de-cauda'><li>Bestas de Cauda</li></Link>
                    <Link to='/times'><li>Times</li></Link>
                </ul>
            </nav>
            <button>
                <img src={Menu} alt=""  onClick={abrirFecharMenu}/>
            </button>
        </header>
    )
}