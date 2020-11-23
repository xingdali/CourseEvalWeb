const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const Account = require('./model/Accounts')

router.get('/:id', async (req, res) => {
    try{
        const accounts = await Account.findById(req.params.id);
        res.json(accounts);
    }catch(err){
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    const account = new Account({
        _id: req.body._id,
        pass: req.body.pass
    })

    const saveAccount = await account.save();
    try {
        res.json(saveAccount)
    } catch (err) {
        res.json({message: err});
    }
})
router.get('/', async (req, res) => {
    try{
        const accounts = await Account.find();
        res.json(accounts);
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router;