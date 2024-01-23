import { useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import Lupa from '../../assets/lupa.png'

import BarraDePesquisa from '../BarraDePesquisa'
import SeletorPagina from '../SeletorPagina'

export default function Clas() {

    const [colunas, setColunas] = useState('50rem')
    const [colunaCor1, SetColunaCor1] = useState('#f25f4c')
    const [colunaCor2, SetColunaCor2] = useState('#ff8906')
    const [colunaCor3, SetColunaCor3] = useState('#ff8906')

    const mudarColunas = (MudancaDeColunas, mudancaDeCor) => {
        setColunas(MudancaDeColunas)

        if(mudancaDeCor === 0) {
            SetColunaCor1('#f25f4c')
            SetColunaCor2('#ff8906') 
            SetColunaCor3('#ff8906')
        } else if(mudancaDeCor === 1) {
            SetColunaCor1('#ff8906')
            SetColunaCor2('#f25f4c')
            SetColunaCor3('#ff8906')
        } else {
            SetColunaCor1('#ff8906')
            SetColunaCor2('#ff8906')
            SetColunaCor3('#f25f4c')
        }
    }

    const [clas, setClas] = useState([])
    const [clasFiltrados, setClasFiltrados] = useState([])
    const [clasCompletos, setClasCompletos] = useState([])

    const [pagina, SetPagina] = useState(1)
    const [maxDePaginas, setMaxDePaginas] = useState()

    const [mensagemDeErro, setMensagemDeErro] = useState('')

    const pegarDados = async () => {
        const Dados = await axios.get(`https://narutodb.xyz/api/clan?page=${pagina}&limit=20`)
        const DadosCompletos = await axios.get(`https://narutodb.xyz/api/clan?page=${pagina}&limit=2000`)
        
        setClas(Dados.data.clans)
        setClasFiltrados(Dados.data.clans)
        setClasCompletos(DadosCompletos.data.clans)
        setMaxDePaginas(Math.ceil(Dados.data.totalClans / 20))

        setMensagemDeErro('')
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

    const filtrar = (pesquisaDoComponente) => {
        const listaFiltrada = clasCompletos.filter(f => f.name.toLowerCase().includes(pesquisaDoComponente.toLowerCase()))

        if(pesquisaDoComponente !== '' && listaFiltrada.length >= 1) {
            setClasFiltrados(listaFiltrada)
            setMensagemDeErro('')
        } 
        else if(pesquisaDoComponente == '') {
            setClasFiltrados(clas)
            setMensagemDeErro('')
        } 
        else{
            setMensagemDeErro('Nada encontrado :(')
            setClasFiltrados([])
        }
        window.scrollTo({top:0 , behavior: 'smooth'})
    }

    
    return (
        <main>
            <BarraDePesquisa 
            filtrar={filtrar}
            mudarColunas={mudarColunas}
            colunaCor1={colunaCor1}
            colunaCor2={colunaCor2}
            colunaCor3={colunaCor3}
            />
            <section className='container-itens'>
                {mensagemDeErro}
                
                {clasFiltrados.map((item) => (
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