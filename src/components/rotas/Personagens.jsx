import { useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import Lupa from '../../assets/lupa.png'
import DuasColunas from '../../assets/duas-colunas.png'
import UmaColuna from '../../assets/uma-coluna-media.png'
import UmaColunaLarga from '../../assets/uma-coluna-larga.png'
import SeletorPagina from '../SeletorPagina'

export default function Personagens() {

    const [colunas, SetColunas] = useState('50rem')

    // #ff8906
    // #f25f4c

    const [colunaCor1, SetColunaCor1] = useState('#f25f4c')
    const [colunaCor2, SetColunaCor2] = useState('#ff8906')
    const [colunaCor3, SetColunaCor3] = useState('#ff8906')

    const colunaMedia = () => {
        SetColunas('50rem')
        SetColunaCor1('#f25f4c')
        SetColunaCor2('#ff8906')
        SetColunaCor3('#ff8906')
    }
    const colunaGrande = () => {
        SetColunas('none')
        SetColunaCor1('#ff8906')
        SetColunaCor2('#f25f4c')
        SetColunaCor3('#ff8906')
    }
    const duasColunas = () => {
        SetColunas('32.5rem')
        SetColunaCor1('#ff8906')
        SetColunaCor2('#ff8906')
        SetColunaCor3('#f25f4c')
    }

    const [personagens, SetPersonagens] = useState([])
    const [pagina, SetPagina] = useState(1)
    const [maxDePaginas, SetMaxDePaginas] = useState()

    const pegarDados = async () => {
        const Dados = await axios.get(`https://www.narutodb.xyz/api/character?page=${pagina}&limit=20`)

        SetPersonagens(Dados.data.characters)
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
            {maxDePaginas}
            <section className='barraDePesquisa'>
                <div>
                    <input type="text" placeholder='Pesquisar'/>
                    <button className='pesquisa-button'>
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