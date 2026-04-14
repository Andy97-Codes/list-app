import { dbConnection } from "../database/db.js";


export async function getList() {
    try {
        
        const connection = await dbConnection();
        const [listOfGroceries] = await connection.execute('SELECT * FROM grocerylist');
        
        connection.end();

        return { groceryList: listOfGroceries }
    } catch (err) {
    console.error('DB fejl:', err);
    return { status: 500, body: { succes: false, message: 'kan ikke hente listen' } }
    }   
}


export async function addToList(item) {
    try {
        
        const connection = await dbConnection();
        const [updateList] = await connection.execute('INSERT INTO groceryList (item) VALUES (?)',
            [item.itemName]
         );

        connection.end();

        return { name: item.itemName }
    } catch (err) {
        throw new Error('Cant add your item');
    }
}


export async function deleteFromList(id) {
    try {
        const connection = await dbConnection();
        const [deleteItem] = await connection.execute('DELETE FROM groceryList WHERE id = ?',
            [id]
        );

        connection.end();

        return { id: id }
    } catch (err) {
        throw new Error('Cant delete item');
    }
}


export async function updateItemFromList(id, editItem) {
    try {
        const connection = await dbConnection();
        const [updateItem] = await connection.execute('UPDATE groceryList SET item = ? WHERE id = ?',
            [editItem.editItemName, id]
        );

        connection.end();

        return { name: editItem.editItemName, id: id }
    } catch (err) {
        throw new Error('Cant update item');
    }
}