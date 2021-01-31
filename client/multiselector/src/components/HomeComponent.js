import React, { Component } from 'react';

    
class Home extends Component {

    render(){
        return(
        <div className="container">    
        <div className="row">
            <div className="col-12">
                <p>Mini progetto/proof of concept per colloquio con D'vel. Il progetto è pubblicato all'indirizzo: <a href="https://github.com/sterte/dvel-project" rel="noreferrer" target="_blank">https://github.com/sterte/dvel-project</a></p>                
                <p>In particolare le <a href="https://github.com/sterte/dvel-project/blob/main/README.md" rel="noreferrer" target="_blank">specifiche di progetto</a> e la <a href="https://github.com/sterte/dvel-project/blob/main/README.md" rel="noreferrer" target="_blank">documentazione "tecnica"</a>.</p>
                <p>La pagina <strong>Single</strong> porta ad un esempio del componente per la ricerca da un gruppo di attori.</p>
                <p>La pagina <strong>Multi</strong> porta ad un esempio con tre istanze contemporanee del componente per la ricerca di categorie diverse (attori, registi, film).</p>
                <p>La pagina <strong>Playground</strong>, al momento analoga a <strong>Single</strong> è stata predisposta per esperimenti e modifiche "live".</p>
            </div>            
        </div>
        </div>
        );
    }
}

export default Home;