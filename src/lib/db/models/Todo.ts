import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";


interface TodoAttributes {
    id: number;
    title: string;
    completed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TodoCreateAttributes extends Optional<TodoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Todo extends Model<TodoAttributes, TodoCreateAttributes> implements TodoAttributes{
    public id!: number;
    public title!: string;
    public completed!: boolean;

    public readonly createdAt?: Date | undefined;
    public readonly updatedAt?: Date | undefined;
}

Todo.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    tableName: 'todos',
    timestamps: true,
    underscored: true,
    modelName: 'Todo',
});

export default Todo;
