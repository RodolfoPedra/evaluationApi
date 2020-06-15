import * as Yup from 'yup';
import {Op} from 'sequelize';
import Evaluation from '../models/Evaluation';
import Professional from '../models/Professional';
import User from '../models/User';

class EvaluationController {

    async indexEvaluations(req, res) {
        let evaluations = '';
        const {professional_id} = req.params;

        evaluations = await Evaluation.findAll({
            where: {
                professional_id: professional_id
            },
            include: [
                {association: 'user', attributes: ['id', 'name']},
                {association: 'professional', attributes: ['name', 'workplace']}
            ]
        });

        if(!evaluations) {
            return Professional.findByPk(professional_id);
        } else {
            return res.json(evaluations);
        }

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