
export default function Register(){
    return(
        <body>
            <div className="container">
                <div className="column">
                    <div>
                        <label>Prénom</label>
                        <input type="text"/>
                    </div>

                    <div>
                        <label>E-mail</label>
                        <input type="email"/>
                    </div>

                    <div>
                        <label>Date de naissance</label>
                        <input type="date"/>
                    </div>
                </div>

                <div className="column">
                <div>
                        <label>Nom</label>
                        <input type="text"/>
                    </div>

                    <div>
                        <label>Numéro de téléphone</label>
                        <input type="tel"/>
                    </div>

                    <div>
                        <label>Mot de passe</label>
                        <input type="password"/>
                    </div>
                </div>
            </div>

            <button>S'inscrire</button>
        </body>
    )
}