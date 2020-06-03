import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class Professional extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                workplace: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING
            },
            {
                sequelize
            }
        );

        this.addHook('beforeSave', async professional => {
            if(professional.password) {
                professional.password_hash = await bcrypt.hash(professional.password, 8);
            }
        });

        return this;
    }

    static associate(models) {
        this.hasMany(models.Evaluation, {foreignKey: 'professional_id', as: 'evaluationsProfessional'})
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default Professional;