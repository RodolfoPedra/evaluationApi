import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {

        const userExists = await User.findOne({
            where: { email: req.body.email }
        })

        if(userExists) {
            res.status(400).json({error: 'Email cadastrado já existe!'});
        }

        const {id, name, email} = await User.create(req.body);

        return res.json({
            id, name, email
        });
    }
 
    async update(req, res) {

        console.log('userId: ', req.userId);
        
        return res.json({ok:"ok no update users"})
    }
}

export default new UserController();