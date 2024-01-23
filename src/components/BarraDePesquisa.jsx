import './rotas/style.scss'
import { useState } from 'react'

import DuasColunas from '../assets/duas-colunas.png'
import UmaColuna from '../assets/uma-coluna-media.png'
import UmaColunaLarga from '../assets/uma-coluna-larga.png'
import Lupa from '../assets/lupa.png'


export default function BarraDePesquisa({filtrar, mudarColunas, colunaCor1, colunaCor2, colunaCor3}) {

    const [pesquisa, setPesquisa] = useState('')

    return (
        <section className='barraDePesquisa'>
        <div>
            <input type="search" placeholder='Pesquisar'  value={pesquisa} onKeyDownCapture={(e) => e.code == 'Enter' ? filtrar(pesquisa) : ''} onChange={(e) => setPesquisa(e.target.value)}/>
            <button className='pesquisa-button' onClick={() => filtrar(pesquisa)}>
                <img src={Lupa} alt="" />
            </button>
        </div>
        <div>
            <button title='Uma coluna' style={{backgroundColor: colunaCor1}} onClick={() => mudarColunas('50rem', 0)}>
                <img src={UmaColuna} alt=""/>
            </button>
            <button title='Uma coluna máxima' style={{backgroundColor: colunaCor2}} onClick={() => mudarColunas('none', 1)}>
                <img src={UmaColunaLarga} alt=""/>
            </button>
            <button title='Duas colunas' style={{backgroundColor: colunaCor3}} onClick={() => mudarColunas('32.5rem', 2)}>
                <img src={DuasColunas} alt=""/>
            </button>
        </div>
    </section>
    )
}