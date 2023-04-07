import { defineStore } from 'pinia'
import customerInterface from '../interfaces/customerInterface.js'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'

const useCustomerStore = defineStore('customer', {
    state: () => ({
        customer: null,
        customers: [],
        lastCustomers: []
    }),
    getters: {
        totalCustomers: (state) => state.customers.length
    },
    actions: {
        // récupère la liste des clients
        async getAllCustomers() {
            try {
                const response = await axios.get('/customers')
                this.$patch({ customers: cloneDeep(response.data) })
            } catch (error) {
                console.log(error)
            }
        },
            
        // récupère les n derniers customers
        async getLastNCustomers(num) {
            try {
                // requête à l'API GET /customers
                const response = await axios.get(`/customers/last/${num}`)
                // raffraichit la liste après suppression
                this.$patch({ lastCustomers: cloneDeep(response.data) })
            } catch (error) {
                console.log(error)
            }
        },
        
        // créer un nouveau client
        createCustomer() {
            console.log("Création d'un nouveau client")
            this.$patch({ customer: cloneDeep(customerInterface) })
        },
        
        // éditer un client existant à partir de son id
        async getCustomer(id) {
            try {
                const response = await axios.get(`/customers/${id}`)
                this.$patch({ customer: cloneDeep(response.data) })
            } catch (error) {
                console.log(error)
            }
        },
        
        // enregistre les modifications d'un client (nouvelle/en édition)
        async saveCustomer(customer) {
            if (customer._id) {
                try {
                    const response = await axios.patch(`/customers/${customer._id}`, customer)
                    this.$reset()
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("création d'une nouvelle facture")
                try {
                    const response = await axios.post(`/customers`, customer)
                    //   console.log('post response ', response.data)
                    this.$reset()
                } catch (error) {
                    console.log(error)
                }
            }
        },
        
        // méthode pour supprimer un client du tableau customers
        async deleteCustomer(id) {
            try {
                const response = await axios.delete(`/customers/${id}`)
                // console.log('delete response ', response.data)
                this.getAllCustomers()
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export { useCustomerStore }
