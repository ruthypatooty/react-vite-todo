import Todo from "./models/Todo";
import sequelize from "./sequelize";


export async function initDatabase(){
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

export {sequelize, Todo};