import { Router } from 'express';
import { getList, addToList }  from '../controller/listController.js';



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


export default router;