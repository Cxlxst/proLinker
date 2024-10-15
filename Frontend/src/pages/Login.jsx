export default function Login(){
    return(
        <body>
            <div className="container">
                <div className="column">
                    <div>
                        <label>E-mail</label>
                        <input type="email"/>
                    </div>

                    <div>
                        <label>Mot de passe</label>
                        <input type="password"/>
                    </div>
                </div>
            </div>

            <button>Connexion</button>
        </body>
    )
}