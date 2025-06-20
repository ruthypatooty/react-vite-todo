import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import  express  from 'express';
import cors from 'cors';

const path = require('path');

const envPath = '/mnt/c/Users/cid/Documents/practice/react-vite-todo/.env.local';

require('dotenv').config({path: envPath});

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10):5432;
const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'mysecretpassword';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
});

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

async function initDatabase(){
    try{
        await sequelize.authenticate();
        console.log("DB connection successful");

        await sequelize.sync({alter: true});
        console.log('Models synced');

    }catch(error){
        console.error('unable to connect', error);
        process.exit(1);
    }
}

const app = express();
const BACKEND_PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/api/todos', async(req,res)=>{
    try{
        const todos = await Todo
    }catch(error){

    }
})