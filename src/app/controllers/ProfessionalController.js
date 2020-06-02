import Professional from '../models/Professional';

class ProfessionalController {

    async store(req, res) {
        const emailExists = await Professional.findOne({
                where: {email: req.body.email}
            })

            if(emailExists) {
                res.status(400).json({error: 'email cadastrado já existe'});
            }
            
            const {id, name, email} = await Professional.create(req.body);

            return res.json({
                id,
                name,
                email
            })
    }
}

export default new ProfessionalController();