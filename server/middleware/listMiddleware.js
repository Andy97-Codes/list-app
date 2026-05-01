export function validateUserInputForEditItem(req, res, next) {
    const userInputForEdit = req.body;
    if (!userInputForEdit.editItemName) {
        res.status(400).send('Write something before saving');
    } else {
        next();
    }
}


export function validateUserInputForCreateItem(req, res, next) {
    const userInputForCreate = req.body;
    if(!userInputForCreate.itemName) {
        res.status(400).send('You need to write something');
    } else {
        next();
    }
}


export function validateItemIdForDelete(req, res, next) {
    const deleteItemWithId = req.params.id;
    const checkIdIsANumber = isNaN(deleteItemWithId);
    if(checkIdIsANumber === true) {
        res.status(400).send('No item to delete');
    } else {
        next();
    }
}




