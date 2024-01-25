import { useEffect, useState } from 'react'
import axios from 'axios'
import Lupa from '../../assets/lupa.png'
import './style.scss'

import SeletorPagina from '../SeletorPagina'
import BarraDePesquisa from '../BarraDePesquisa'

export default function Personagens() {

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



    const [personagens, setPersonagens] = useState([])
    const [personagensFiltrados, setPersonagensFiltrados] = useState([])
    const [personagensCompletos, setPersonagensCompletos] = useState([])

    const [pagina, SetPagina] = useState(1)
    const [maxDePaginas, setMaxDePaginas] = useState()

    const [mensagemDeErro, setMensagemDeErro] = useState('')

    const pegarDados = async () => {
        const Dados = await axios.get(`https://narutodb.xyz/api/character?page=${pagina}&limit=20`)
        const DadosCompletos = await axios.get(`https://narutodb.xyz/api/character?page=${pagina}&limit=2000`)

        setPersonagens(Dados.data.characters)
        setPersonagensFiltrados(Dados.data.characters)
        setPersonagensCompletos(DadosCompletos.data.characters)
        setMaxDePaginas(Math.ceil(Dados.data.totalCharacters / 20))

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
    
    const [aparecerSeletorDePagina, setAparecerSeletorDePagina] = useState(true)

    const filtrar = (pesquisaDoComponente) => {
        const listaFiltrada = personagensCompletos.filter(f => f.name.toLowerCase().includes(pesquisaDoComponente.toLowerCase()))

        if(pesquisaDoComponente !== '' && listaFiltrada.length >= 1) {
            setPersonagensFiltrados(listaFiltrada)
            setMensagemDeErro('')
            setAparecerSeletorDePagina(false)
        } 
        else if(pesquisaDoComponente == '') {
            setPersonagensFiltrados(personagens)
            setMensagemDeErro('')
            setAparecerSeletorDePagina(true)
        } 
        else{
            setMensagemDeErro('Nada encontrado :(')
            setPersonagensFiltrados([])
            setAparecerSeletorDePagina(false)
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
                {personagensFiltrados.map((item) => (
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
            {aparecerSeletorDePagina && <SeletorPagina 
            clicarPagina={clicarNumeroPagina}
            anteriorPg={anteriorPagina} 
            proximaPg={proximaPagina} 
            pagina={pagina}
            limiteDePagina={maxDePaginas}/>}
        </main>
    )
}