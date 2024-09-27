import db from "@config/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

/**
 * Article model
 * @class
 * @extends Model
 * @type {Article}
 * @return {Article}
 * @property {String} id - Article id - not null - primary key - no update
 * @property {String} name - Article name - not null - max 20 characters - no update
 * @property {String} description - Article description - max 200 characters
 * @property {Number} price - Article price - not null - max 10 digits - 2 decimals - no update
 * @property {String} model - Article model - not null - max 10 characters
 */
class Article extends Model<
  InferAttributes<Article>,
  InferCreationAttributes<Article>
> {
  declare id: String;
  declare name: String;
  declare description: String;
  declare price: Number;
  declare model: String;
}

Article.init(
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
      set(value: string) {
        if (this.isNewRecord) {
          this.setDataValue('id', value);
        } else {
          throw new Error('No se puede actualizar el id', {cause: 'validation'});
        }
      },
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      set(value: string) {
        if (this.isNewRecord) {
          this.setDataValue('name', value);
        } else {
          throw new Error('No se puede actualizar el nombre', {cause: 'validation'});
        }
      },
    },
    description: DataTypes.STRING(200),
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      set(value: number) {
        if (this.isNewRecord) {
          this.setDataValue('price', value);
        } else {
          throw new Error('No se puede actualizar el precio', {cause: 'validation'});
        }
      },
    },
    model: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "article",
    freezeTableName: true,
    hooks: {
      beforeUpdate: (article, options) => {
        if (article.changed('id')) {
          throw new Error('Cannot update id');
        }
        if (article.changed('name')) {
          throw new Error('Cannot update name');
        }
        if (article.changed('price')) {
          throw new Error('Cannot update price');
        }
      },
    },
  }
);

export default Article;