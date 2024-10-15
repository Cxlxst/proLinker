export default function Register(){
    return(
        <body>
            <div className="container">
                <div className="column">
                    <div className="row">
                        <div>
                            <label>Prénom</label>
                            <input type="text" placeholder="John"/>
                        </div>

                        <div>
                            <label>Nom</label>
                            <input type="text" placeholder="Doe"/>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>E-mail</label>
                            <input type="email" placeholder="john.doe@example.com"/>
                        </div>

                        <div>
                            <label>Numéro de téléphone</label>
                            <input type="tel" placeholder="0123456789"/>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>Date de naissance</label>
                            <input type="date"/>
                        </div>

                        <div>
                            <label>Mot de passe</label>
                            <input type="password"/>
                        </div>
                    </div>
                </div>
            </div>

            <button>S'inscrire</button>
        </body>
    )
}