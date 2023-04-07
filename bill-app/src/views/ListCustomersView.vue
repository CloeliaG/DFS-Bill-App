<template>
    <div class="customers">
        <!-- titre + bouton -->
        <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
            <h1 class="mb-4"><i class="fas fa-angle-down me-2" />Liste des clients</h1>
            <BButton size="sm" iconLeft="circle-plus" :to="{ name: 'customer', params: { id: -1 } }">
                Ajouter un client
            </BButton>
        </div>
        <!-- ./titre + bouton -->
        
        <p v-if="!customers || !customers.length" class="text-primary my-5">Aucune facture pour l'instant.</p>

        <!-- tableau des clients -->
        <CustomerList v-else>
            <CustomerListItem
            v-for="customer in customers"
            :key="customer._id"
            :customer="customer"
            message="test"
            @delete="deleteCustomer($event)"
            @edit="editCustomer($event)"
            />
        </CustomerList>
        
        <!-- ./tableau des clients -->
          
            <p class="text-center text-muted">
                {{ totalCustomers }} client<span v-if="totalCustomers > 1">s</span>
            </p>
        </div>
    </template>
    
<script>
    import CustomerList from '@/components/CustomerList.vue'
    import CustomerListItem from '@/components/CustomerListItem.vue'
    // on charge le store des customers
    import { useCustomerStore } from '@/stores/customer.js'
    import { mapState, mapActions } from 'pinia'

    export default {
        components: {
            CustomerList,
            CustomerListItem
        },
        computed: {
            // récupère le state de customers et le count
            ...mapState(useCustomerStore, ['customers', 'totalCustomers'])
            },
        mounted() {
            // récupérer la liste des customers depuis l'API et le store
            this.getAllCustomers()
        },
        methods: {
            ...mapActions(useCustomerStore, ['deleteCustomer', 'getAllCustomers']),

            // méthode appelée lorsque le composant enfant envoie
            // l'évémenent onEditCustomer
            editCustomer(id) {
                this.$router.push({
                    name: 'customer',
                    params: { id }
                })
            }
        }
    }
</script>
                            