<template>
  <div class="home">
    <!-- titre + bouton -->
    <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
      <h1 class="mb-4"><i class="fas fa-angle-down me-2" />Dashboard</h1>
      <div class="d-flex gap-2">
        <BButton size="sm" variant="outline-primary" iconLeft="circle-plus" :to="{ name: 'customer', params: { id: -1 } }">
          Ajouter un client
        </BButton>
        <BButton size="sm" variant="outline-primary" iconLeft="circle-plus" :to="{ name: 'bill', params: { id: -1 } }">
          Ajouter une facture
        </BButton>
      </div>
    </div>
    <!-- ./titre + bouton -->

    <div class="row justify-content-between">
      <div class="col-12 col-md-4 m-4">
        <div class="card rounded shadow-sm border p-3 text-center h-50">
          <h4>
            Coming Soon :
          </h4>
          <p>Stats here</p>
        </div>
      </div>
      <div class="col-12 col-md-7 m-4 d-flex flex-column gap-4">
        <div class="card p-4 rounded shadow-sm">
          <h4>Factures en cours</h4>
          <p v-if="!lastBills || !lastBills.length" class="text-primary my-5">Aucune facture pour l'instant.</p>
          <BillListSample v-else>
            <BillListSampleItem
              v-for="bill in lastBills"
              :key="bill.id"
              :bill="bill"
            />
          </BillListSample>
        </div>
        <div class="card p-3 rounded shadow-sm">
          <h4>Clients</h4>
          <p v-if="!lastCustomers || !lastCustomers.length" class="text-primary my-5">Aucune facture pour l'instant.</p>
          <CustomerListSample v-else>
            <CustomerListSampleItem
              v-for="customer in lastCustomers"
              :key="customer._id"
              :customer="customer"
            />
          </CustomerListSample>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BillListSample from '@/components/BillListSample.vue'
  import BillListSampleItem from '@/components/BillListSampleItem.vue'
  import CustomerListSample from '@/components/CustomerListSample.vue'
  import CustomerListSampleItem from '@/components/CustomerListSampleItem.vue'
  // on charge le store des bills
  import { useBillStore } from '@/stores/bill.js'
  import { useCustomerStore } from "@/stores/customer.js";
  import { mapState, mapActions } from 'pinia'
  
  export default {
    components: {
      BillListSample,
      BillListSampleItem,
      CustomerListSample,
      CustomerListSampleItem
    },
    computed: {
      ...mapState(useBillStore, ['lastBills']),
      ...mapState(useCustomerStore, ['lastCustomers'])
    },
    mounted() {
      this.getLastNCustomers(5)
      this.getLastNBills(5)
      
    },
    methods: {
      ...mapActions(useBillStore, ['getLastNBills']),
      ...mapActions(useCustomerStore,['getLastNCustomers']),


      
    }
  }
</script>