import { useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import Lupa from '../../assets/lupa.png'
import DuasColunas from '../../assets/duas-colunas.png'
import UmaColuna from '../../assets/uma-coluna-media.png'
import UmaColunaLarga from '../../assets/uma-coluna-larga.png'

export default function Clas() {

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
    }
    const colunaGrande = () => {
        SetColunas('none')
        SetColunaCor1('#ff8906')
        SetColunaCor2('#f25f4c')
    }
    const duasColunas = () => {
        SetColunas('32.5rem')
        SetColunaCor1('#ff8906')
        SetColunaCor2('#ff8906')
        SetColunaCor3('#f25f4c')
    }

    const [clas, SetClas] = useState([])
    const [pagina, SetPagina] = useState(1)

    const pegarDados = async () => {
        const Dados = await axios.get(`https://www.narutodb.xyz/api/clan?page=${pagina}&limit=20`)

        SetClas(Dados.data.clans)
    }

    useEffect(() => {
        pegarDados()
        if(clas.name == 'Uchiha') {
            console.log('tem uchiha aq')
        }
    }, [])

    
    const proximaPagina = () => {
        if(pagina >= 1 && pagina < 3) {
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
                
                {clas.map((item) => (
                    <div className='item' style={{maxWidth: colunas}}>
                        <figure>
                            <img src={item.characters[0].images[0] ? item.characters[0].images[0] : 'https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png'} alt="" />
                        </figure>
                        <a className='saiba-mais' title='Saiba Mais' target='blank_' href={`https://naruto.fandom.com/wiki/${item.name.replace(' ', '_')}_Clan`}>
                            <img src={Lupa} alt="Saiba Mais" />
                        </a>
                        <div>
                        <h2>
                            Clã {item.name}
                        </h2>
                        <h3>
                            Personagens
                        </h3>
                        <ul className='lista'>
                            {item.characters.length > 20 ? item.characters.map((e) => (
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
            <section className='selecionar-pagina'>
                <div onClick={anteriorPagina}>
                    &lt;
                </div>
                <h5>
                    {pagina}
                </h5>
                <div onClick={proximaPagina}>
                    &gt;
                </div>
            </section>
        </main>
    )
}