export default function Settings(){
    return(
        <body>
            <div className="container">
                <div className="column">
                    <div className="row">
                        <div>
                            <label>Prénom</label>
                            <input type="text"/>
                        </div>

                        <div>
                            <label>Nom</label>
                            <input type="text"/>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>E-mail</label>
                            <input type="email"/>
                        </div>

                        <div>
                            <label>Numéro de téléphone</label>
                            <input type="tel"/>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>Date de naissance</label>
                            <input type="date"/>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>Mot de passe actuel</label>
                            <input type="password"/>
                        </div>

                        <div>
                            <label>Nouveau mot de passe</label>
                            <input type="password"/>
                        </div>
                    </div>
                </div>
            </div>

            <button>Modifier</button>
        </body>
    )
}