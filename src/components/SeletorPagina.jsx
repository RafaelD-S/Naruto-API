export default function SeletorPagina({anteriorPg, pagina, proximaPg, limiteDePagina, clicarPagina}) {
    return (

    <section className='selecionar-pagina'>
        <div onClick={anteriorPg}>
            &lt;
        </div>
        <h6 onClick={clicarPagina}>
            {pagina - 2 < 1 ? '' : pagina - 2}
        </h6>
        <h6 onClick={clicarPagina}>
            {pagina - 1 < 1 ? '' : pagina - 1}
        </h6>
        <h5>
            {pagina}
        </h5>
        <h6 onClick={clicarPagina}>
            {pagina + 1 > limiteDePagina ? '' : pagina + 1}
        </h6>
        <h6 onClick={clicarPagina}>
            {pagina + 2 > limiteDePagina ? '' : pagina + 2}
        </h6>
        <div onClick={proximaPg}>
            &gt;
        </div>
    </section>

    )
}