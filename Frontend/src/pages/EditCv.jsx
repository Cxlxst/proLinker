export default function Register(){
    return(
        <body>
            <div className="container">
                <div className="column">
                    <div className="row">
                        <div>
                            <label>Région</label>
                            <select>
                                <option>Île-de-France</option>
                            </select>
                        </div>

                        <div>
                            <label>Ville</label>
                            <select>
                                <option>Paris</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>Profil</label>
                            <textarea/>
                        </div>

                        <div>
                            <label>Hobbies</label>
                            <textarea/>
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <label>Compétences</label>
                            <textarea/>
                        </div>

                        <div>
                            <label>Soft skill</label>
                            <textarea/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ajouter les exp pro, études et langues */}

            <div className="row">
                <label>Je souhaite que mon CV soit visible</label>
                <input type="checkbox"/>
            </div>
            <button className="mt_50">Modifier mon CV</button>
        </body>
    )
}