import './rotas/style.scss'
import { useState } from 'react'

import DuasColunas from '../assets/duas-colunas.png'
import UmaColuna from '../assets/uma-coluna-media.png'
import UmaColunaLarga from '../assets/uma-coluna-larga.png'
import Lupa from '../assets/lupa.png'




export default function BarraDePesquisa() {

    const [colunas, SetColunas] = useState('50rem')

    const [colunaCor1, SetColunaCor1] = useState('#f25f4c')
    const [colunaCor2, SetColunaCor2] = useState('#ff8906')
    const [colunaCor3, SetColunaCor3] = useState('#ff8906')

    const colunaMedia = () => {
        // SetColunas('50rem')
        SetColunaCor1('#f25f4c')
        SetColunaCor2('#ff8906')
        SetColunaCor3('#ff8906')
    }
    const colunaGrande = () => {
        // SetColunas('none')
        SetColunaCor1('#ff8906')
        SetColunaCor2('#f25f4c')
        SetColunaCor3('#ff8906')
    }
    const duasColunas = () => {
        // SetColunas('32.5rem')
        SetColunaCor1('#ff8906')
        SetColunaCor2('#ff8906')
        SetColunaCor3('#f25f4c')
    }

    const[pesquisa, setPesquisa] = useState()

    const resultado = () => {
        if(pesquisa == '') {
            pegarDados()
        } else {
            const res = personagensFiltrados.filter(f => f.name.toLowerCase().includes(pesquisa.toLowerCase()))
            SetPersonagens(res)
            console.log(personagensFiltrados)
            SetMaxDePaginas(1)
        }
    }

    return (
        <section className='barraDePesquisa'>
        <div>
            <input type="search" placeholder='Pesquisar'  value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}/>
            <button className='pesquisa-button'  onClick={resultado}>
                <img src={Lupa} alt="" />
            </button>
        </div>
        <div>
            <button title='Uma coluna' style={{backgroundColor: colunaCor1}} onClick={colunaMedia}>
                <img src={UmaColuna} alt=""/>
            </button>
            <button title='Uma coluna máxima' style={{backgroundColor: colunaCor2}} onClick={colunaGrande}>
                <img src={UmaColunaLarga} alt=""/>
            </button>
            <button title='Duas colunas' style={{backgroundColor: colunaCor3}} onClick={duasColunas}>
                <img src={DuasColunas} alt=""/>
            </button>
        </div>
    </section>
    )
}