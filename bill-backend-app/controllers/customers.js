const Customer = require('../models/Customers')

// récupérer la liste, correspond à la route GET /customers
const getCustomers = (req, res)=> {
    Customer.find().then((customers)=>{
        res.status(200).json(customers)
    }).catch(error => res.status(400).json({ error }))
}

// récupérer un élément unique, correspond à la route GET /customers/:id
const getCustomer = (req, res)=> {
    const id = req.params.id

    Customer.findOne({
        _id: id
    }).then((customer)=>{
        res.status(200).json(customer)
    }).catch(error => res.status(400).json({ error }))
}

// récupère les n derniers customer
const getLastNCustomer = (req, res)=> {
    const nLast = req.params.num
    Customer.find().sort({ _id: -1 }).limit(nLast)
    .then((customers)=>{
        res.status(200).json(customers)
    }).catch(error => res.status(400).json({ error }))
}

// modifie un élément unique, correspond à la route PATCH /customers/:id
const patchCustomer = (req, res)=> {
    const id = req.params.id
    const updatedCustomer = req.body
  
    Customer.updateOne({
        _id: id
    }, {
        ...updatedCustomer
    }).then((customer)=>{
        res.status(201).json(customer)
    }).catch(error => res.status(400).json({ error }))
}

// Crée un élément, correspond à la route POST /customers/
const postCustomer = (req, res)=> {
    const newCustomer = req.body

    // On vérifie les champs obligatoires
    if(!newCustomer.firstName || !newCustomer.lastName || !newCustomer.dateAdded) {
        return res.status(400).json({error: 'Les paramètres dateAdded, firstName et lastName sont requis.'})
    }

    const customer = new Customer({ ...newCustomer })
    customer.save().then(()=> {
        res.status(201).json(customer)
    }).catch(error => res.status(400).json({ error }))
}

// delete un élément unique, correspond à la route DELETE /customers/:id
const deleteCustomer = (req, res)=> {
    const id = req.params.id
    Customer.deleteOne({
        _id: id
    }).then(()=>{
        res.sendStatus(204)
    }).catch(error => res.status(400).json({ error }))
}

module.exports = { getCustomers, getCustomer,getLastNCustomer, patchCustomer, postCustomer, deleteCustomer }