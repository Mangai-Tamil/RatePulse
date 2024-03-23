import db from '../models/index.js';

// model
const Login = db.logins

// functions

//1. Add Review

const addUser = async (req, res) => {

    const id = req.params.id

    let data = {
        user_id: id,
       
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        
    }

    const login = await Login.create(data)
    res.status(200).send(login)

}



export { addUser };