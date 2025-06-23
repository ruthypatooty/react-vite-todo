import Todo from "./models/Todo";
import sequelize from "./sequelize";


export async function initDatabase(){
    try{
        await sequelize.authenticate();
        console.log("DB connection successfulss");

        await sequelize.sync({alter: true});
        console.log('Models syncedss');

    }catch(error){
        console.error('unable to connectss', error);
        process.exit(1);
    }
}

export {sequelize, Todo};