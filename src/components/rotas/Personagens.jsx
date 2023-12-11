import { useEffect, useState } from 'react'
import axios from 'axios'
import Lupa from '../../assets/lupa.png'
import './style.scss'

import SeletorPagina from '../SeletorPagina'
import BarraDePesquisa from '../BarraDePesquisa'

export default function Personagens() {

    // #ff8906
    // #f25f4c
    const [colunas, SetColunas] = useState('50rem')

    const [personagens, SetPersonagens] = useState([])
    const [pagina, SetPagina] = useState(1)
    const [maxDePaginas, SetMaxDePaginas] = useState()
    const [personagensFiltrados, SetPersonagensFiltrados] = useState([])

    const pegarDados = async () => {
        const Dados = await axios.get(`https://narutodb.xyz/api/character?page=${pagina}&limit=20`)
        const Dados2 = await axios.get(`https://narutodb.xyz/api/character?page=${pagina}&limit=2000`)

        SetPersonagens(Dados.data.characters)
        SetPersonagensFiltrados(Dados2.data.characters)
        SetMaxDePaginas(Math.ceil(Dados.data.totalCharacters / 20))
    }
    
    
    useEffect(() => {
        pegarDados()
    }, [])

    const proximaPagina = () => {
        if(pagina >= 1 && pagina < maxDePaginas) {
            SetPagina(pagina + 1)
            window.scrollTo({top:0 , behavior: 'smooth'})
        }
    }
    const anteriorPagina = () => {
        if(pagina > 1) {
            SetPagina(pagina - 1)
            window.scrollTo({top:0 , behavior: 'smooth'})
        }
    }
    const clicarNumeroPagina = (e) => {
        SetPagina(Number(e.target.innerText))
        window.scrollTo({top:0 , behavior: 'smooth'})
    }
    useEffect(() => {
        pegarDados()
    }, [pagina])

    return (
        <main>
            <BarraDePesquisa/>
            <section className='container-itens'>
                {personagens.map((item) => (
                    <div className='item' style={{maxWidth: colunas}}>
                        <figure>
                            <img src={item.images[0] ? item.images[0] : 'https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png'} alt="" />
                        </figure>
                        <a className='saiba-mais' title='Saiba Mais' target='blank_' href={`https://naruto.fandom.com/wiki/${item.name.replace(' ', '_')}`}>
                            <img src={Lupa} alt="Saiba Mais" />
                        </a>
                        <div>
                        <h2>
                            {item.name}
                        </h2>
                        <ul>
                            <li>
                                Idade: {item.personal.age ? item.personal.age['Part II'] ? item.personal.age['Part II'] : item.personal.age['Part I'] ? item.personal.age['Part I'] : '?' : '?'}
                            </li>
                            <li>
                                Afiliação: {item.personal.affiliation ? typeof(item.personal.affiliation) == 'object' ? item.personal.affiliation[0] : item.personal.affiliation : '?'}
                            </li>
                            <li>
                                Rank Ninja: {item.rank ? item.rank.ninjaRank ? item.rank.ninjaRank['Part II'] ? item.rank.ninjaRank['Part II'] : item.rank.ninjaRank['Part I'] ? item.rank.ninjaRank['Part I'] : '?' : '?' : '?'}
                            </li>
                            <li>
                                Status: {item.personal.status ? item.personal.status == 'Deceased' ? 'Morto' : item.personal.status == 'Presumed Deceased' ? 'Desconhecido' : 'Incapacitado' : 'Com vida'}
                            </li>
                            <li>
                                Clã: {item.personal.clan ? item.personal.clan : '?'}
                            </li>
                        </ul>
                        </div>
                    </div>
                ))}
            </section>
            <SeletorPagina 
            clicarPagina={clicarNumeroPagina}
            anteriorPg={anteriorPagina} 
            proximaPg={proximaPagina} 
            pagina={pagina}
            limiteDePagina={maxDePaginas}/>
        </main>
    )
}