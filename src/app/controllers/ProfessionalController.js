import Professional from '../models/Professional';

class ProfessionalController {

    async index(req, res) {
        
        const allProfessionals = await Professional.findAll({
            attributes: ['id', 'name', 'email', 'workplace']
        });

        return res.json(allProfessionals);
    }

    async indexEvaluations(req, res) {
        const {professional_id} = req.params;

        const profEvaluations = await Professional.findByPk(professional_id,  {
            include: {association: 'evaluationsProfessional'}
        })
        
        res.json(profEvaluations);
    }

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