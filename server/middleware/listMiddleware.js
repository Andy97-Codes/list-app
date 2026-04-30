

export async function validateUserInput(req, res, next) {
    const userInput = req.body;
    if (!userInput.editItemName) {
        res.status(400).send('Write something before saving');
    } else {
        next();
    }
}


