import { useState } from 'react'
import './styles/main.scss'
import {Link} from 'react-router-dom' 

export default function Main() {

    const [sessoes, SetSessoes] = useState([
        {
            nome: 'personagens',
            imagem: 'https://wallpapercrafter.com/desktop/422668-Anime-Naruto-Phone-Wallpaper.jpg',
            pagina: '/personagens'
        },
        {
            nome: 'clãs',
            imagem: 'https://wallpapers.com/images/high/sun-seal-naruto-phone-g484kst78jgal00a.webp',
            pagina: '/clas'
        },
        {
            nome: 'vilas',
            imagem: 'https://wallpapers.com/images/high/slumber-naruto-phone-zcovydacgbjzgqij.webp',
            pagina: '/vilas'
        },
        {
            nome: 'Kekkei Genkai',
            imagem: 'https://wallpapercrafter.com/desktop/444058-Anime-Naruto-Phone-Wallpaper.jpg',
            pagina: '/kekkei-genkai'
        },
        {
            nome: 'Bestas de Cauda',
            imagem: 'https://wallpapers.com/images/high/tailed-beasts-naruto-phone-69vgbjqlbq5069pi.webp',
            pagina: '/bestas-de-cauda'
        },
        {
            nome: 'Times',
            imagem: 'https://mfiles.alphacoders.com/989/989759.jpg',
            pagina: '/times'
        }
    ])

    return (
        <main>
            <section className="first-section-main">

                {sessoes.map((e) => (
                <Link to={e.pagina} className='link'>
                    <figure style={{backgroundImage: `url(${e.imagem})`}}>
                        <figcaption>
                            {e.nome}
                        </figcaption>
                    </figure>
                </Link>
                ))}


            </section>
            <section className='second-section-main'>
                <div>
                    <h1>
                        O que é Naruto?
                    </h1>
                    <p>
                    "Naruto" é um anime e mangá que segue a jornada de Naruto Uzumaki, um ninja órfão com o sonho de se tornar o líder de sua vila, o Hokage. Rejeitado por carregar a Raposa de Nove Caudas, ele busca reconhecimento. A história explora temas de amizade, crescimento e destino, enquanto Naruto forma laços com outros ninjas, incluindo Sasuke e Sakura.
                    </p>
                    <p>
                     O enredo inclui missões perigosas, batalhas épicas e revelações sobre o passado de Naruto. A continuação, "Naruto: Shippuden", aborda desafios mais complexos. O anime é conhecido por seu universo rico, personagens cativantes e impacto duradouro na cultura pop.
                    </p>
                </div>
                <figure>
                    <img src="https://i0.wp.com/larica.blog/wp-content/uploads/2018/12/744739.png?fit=1200%2C863&ssl=1" alt="" />
                </figure>
            </section>
        </main>
    )
}