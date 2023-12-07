import { useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import Lupa from '../../assets/lupa.png'
import DuasColunas from '../../assets/duas-colunas.png'
import UmaColuna from '../../assets/uma-coluna-media.png'
import UmaColunaLarga from '../../assets/uma-coluna-larga.png'
import SeletorPagina from '../SeletorPagina'

export default function Kekkei() {

    const [colunas, SetColunas] = useState('50rem')

    // #ff8906 - Laranja
    // #f25f4c - Salmão

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

    const [kekkei, SetKekkei] = useState([])
    const [pagina, SetPagina] = useState(1)
    const [maxDePaginas, SetMaxDePaginas] = useState()
    
    const pegarDados = async () => {
        const Dados = await axios.get(`https://narutodb.xyz/api/kekkei-genkai?page=${pagina}&limit=20`)
        
        SetKekkei(Dados.data.kekkeigenkai)
        SetMaxDePaginas(Math.ceil(Dados.data.totalKekkeiGenkai / 20))

    }

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
                
                {kekkei.map((item) => (
                    <div className='item' style={{maxWidth: colunas}}>
                        <figure>
                            <img src={item.characters[0] ? item.characters[0].images[0] ? item.characters[0].images[0] : 'https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png' : 'https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png'} alt="" />
                        </figure>
                        <a className='saiba-mais' title='Saiba Mais' target='blank_' href={`https://naruto.fandom.com/wiki/${item.name.replace(' ', '_')}`}>
                            <img src={Lupa} alt="Saiba Mais" />
                        </a>
                        <div>
                        <h2>
                            {item.name}
                        </h2>
                        <h3>
                            Personagens:
                        </h3>
                        <ul className='lista'> 
                            {item.characters.length > 5 ? item.characters.map((e) => (
                                <li className='lista-grande'>
                                    {e.name}
                                </li>
                            )) : item.characters.map((e) => (
                                <li>
                                    {e.name}
                                </li>
                            ))}
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