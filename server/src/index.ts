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
        const todos = await Todo.findAll({order:[['createdAt','updatedAt']]}); 
        res.json(todos); // SEND THE DATA BACK
    }catch(error){
        console.error('Error fetching todos:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch todos' }); // Send an error response
    }
});

app.post('api/todos', async(req, res)=>{
    try{
        const { title } = req.body;
        const newTodo = await Todo.create({
            title,
            completed: false
        });
        res.status(201).json(newTodo);
    }catch(error){
        console.error('backend error post',error);
        res.status(500).json({error: 'failed to create todo'});
    }
});

app.patch('api/todos/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const {completed} = req.body;

        const [updatedRows] = await Todo.update(
            {completed: true},
            {where:{
                id: parseInt(id,10)
            }});
        if(updatedRows === 0){
            res.status(404).json({error:'oh noesss'});
        }
        const updatedTodo = await Todo.findByPk(parseInt(id,10));
        res.json(updatedTodo);

    }catch(error){
        console.error('backend error patch');
        res.status(500).json('catch block in patch');
    }
});

app.delete('/api/todos/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const deletedRows = await Todo.destroy({
            where:{
                id: parseInt(id, 10)
            },
        });
        if(deletedRows === 0){
            res.status(404).json('id doesnt exist');
        }
        
        res.status(200).json({message: "todo deleted successfully"});
    }catch(error){
        console.error('backend error delete');
        res.status(404).json('catch block in delete');
    }
});

// --- START THE SERVER ---
async function startServer() {
  await initDatabase(); // This calls your connection test
  app.listen(BACKEND_PORT, () => {
    console.log(`Backend server running on http://localhost:${BACKEND_PORT}`);
    console.log(`CORS enabled for http://localhost:5173`);
  });
}

startServer();