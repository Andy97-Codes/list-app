import { Router } from 'express';
import { getList, addToList, deleteFromList }  from '../controller/listController.js';



const router = Router();


router.get('/list', async (req, res) => {
    const { groceryList } = await getList();
    res.send({ groceryList });
});


router.post('/list', async (req, res) => {
    const item = req.body;
    const itemName = await addToList(item);
    res.send(itemName);
});


router.delete('/list/:id', async (req, res) => {
    const id = req.params.id;
    const itemToDelete = await deleteFromList(id);
    res.send(itemToDelete);
});


export default router;