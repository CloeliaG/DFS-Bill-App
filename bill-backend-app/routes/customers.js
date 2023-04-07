const express = require('express')
const router = express.Router()

//on charge un middleware externe qui sert à contrôler qu'on a bien un params :id dans les requêtes
const verifyParams = require('../middleware/verifyParams')

// on importe le contrôleur des routes
const ctrl = require('../controllers/customers.js')

// récupère la liste des customers
router.get('/', ctrl.getCustomers)
// récupère les 5 derniers customers en fonction 
router.get('/last/:num', ctrl.getLastNCustomer)
// récupère un customer en fonction de son id
router.get('/:id', verifyParams, ctrl.getCustomer)
// créer un nouveau customer
router.post('/', ctrl.postCustomer)
// modifie un customer en fonction de son id
router.patch('/:id', verifyParams, ctrl.patchCustomer)
// supprime un customer en fonction de son id
router.delete('/:id', verifyParams, ctrl.deleteCustomer)

module.exports = router
