import Sequelize, {Model} from 'sequelize';

class Evaluation extends Model {
    static init(sequelize) {
        super.init(
            {
                opinion: Sequelize.STRING,
                note: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
        this.belongsTo(models.Professional, {foreignKey: 'professional_id', as: 'professional'});
    }
}

export default Evaluation;