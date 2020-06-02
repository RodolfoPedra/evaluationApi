import * as Yup from 'yup';
import Evaluation from '../models/Evaluation';
import Professional from '../models/Professional';

class EvaluationController {

    async index(req, res) {
        const {professional_id} = req.params;

        const profEvaluations = await Professional.findByPk(professional_id,  {
            include: {association: 'evaluations'}
        })

        return res.json(profEvaluations.evaluations);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            opinion: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))) {
            res.status(400).json({error: 'Falha ao Cadastrar'})
        }

        const {professional_id} = req.params;

        const {opinion, note} = req.body;

        const opinions = await Evaluation.create({
            user_id: req.userId,
            professional_id,
            opinion,
            note
        });

        return res.json(opinions);
    }

    async update(req, res) {

        const {evaluate_id} = req.params;

        const evaluate = await Evaluation.findByPk(evaluate_id);

        if(!(evaluate)) {
            return res.status(400).json({error: 'Avaliação não existe mais na base de dados'});
        }

        if(evaluate.user_id !== req.userId) {
            return res.status(401).json({error: 'Requisição não autorizada'});
        }

        await evaluate.update(req.body);

        console.log('evaluate_id: ',evaluate_id);
        

        res.json({ok: 'dentro do update'})
    }

    async delete(req, res) {
        const {evaluate_id} = req.params;

        const evaluate = await Evaluation.findByPk(evaluate_id);

        if(!(evaluate)) {
            return res.status(400).json({error: 'Avaliação não existe mais na base de dados'});
        }

        if(evaluate.user_id !== req.userId) {
            return res.status(401).json({error: 'Requisição não autorizada'});
        }

        await evaluate.destroy();
        res.json({ok: 'Avaliação Excluída'});
    }
}

export default new EvaluationController();