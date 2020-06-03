import jwt from 'jsonwebtoken';
import User from '../models/User';
import Professional from '../models/Professional';
import authJwt from '../../config/auth';

class SessionController {
    async store(req, res) {
        
        const {email, password, typePerson} = req.body;
        let user = '';

        if(typePerson == "cliente"){
            user = await User.findOne({ where: {email}});
        }

        if(typePerson == "profissional"){
            user = await Professional.findOne({where: {email}})
        }

        if(!user) {
            return res.status(401).json({error: "Usuário não cadastrado"})
        }

        if(!(await user.checkPassword(password))) {
            return res.status(401).json({error: "Senha Incorreta"})
        }

        const {id, name} = user;

        return res.json({
            user: {
                id, 
                name,
                email
            },
            ok: `Login realizado como ${typePerson}`,
            token: jwt.sign({id}, authJwt.code, {
                expiresIn: authJwt.expiresIn
            })
        });
    }

    // async storeProfessional(req, res) {

    //     const {email, password} = req.body;

    //     const professional = await Professional.findOne({ where: {email}});
    //     if(!professional) {
    //         return res.status(401).json({error: "Usuário não cadastrado"})
    //     }

    //     if(!(await professional.checkPassword(password))) {
    //         return res.status(401).json({error: "Senha Incorreta"})
    //     }

    //     const {id, name} = professional;

    //     return res.json({
    //         professional: {
    //             id, 
    //             name,
    //             email
    //         },
    //         token: jwt.sign({id}, authJwt.code, {
    //             expiresIn: authJwt.expiresIn
    //         })
    //     });
    // }
}

export default new SessionController();