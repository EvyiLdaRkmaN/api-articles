import db from "@config/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

/**
 * Article model
 * @class
 * @extends Model
 * @type {Article}
 * @return {Article}
 * @property {String} id - Article id - not null - primary key - no update
 * @property {String} name - Article name - not null - no update - max 20 characters
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
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    description: DataTypes.STRING(200),
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
  }
);

export default Article;