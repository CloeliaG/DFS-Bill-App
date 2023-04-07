<template>
    <div class="bill">
        <header class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
            <h1>
                {{ isNewCustomer ? 'Créer un nouveau ' : 'Modifier le' }} client
                <span v-if="!isNewCustomer" class="text-primary">#{{ id }}</span>
            </h1>
            <div class="d-flex gap-2">
                <BButton
                    v-if="!isNewCustomer"
                    size="sm"
                    variant="outline-danger"
                    icon-left="trash"
                    @click="onDeleteCustomer()"
                >
                Supprimer
                </BButton>
                <BButton 
                    to="/customers" 
                    size="sm" 
                    variant="outline-secondary" 
                    icon-left="angle-left"
                >
                Annuler
                </BButton>
            </div>
        </header>
        
        <!-- j'attends que customer existe pour afficher le formulaire -->
        <section v-if="customer" class="p-2">
            <h3>Contact :</h3>
            <div class="p-2">
                <div class="row">
                <div class="col-md-6 col-lg-4">
                    <div class="mb-3 row">
                        <label for="firstName" class="col-sm-4 col-form-label">Prénom</label>
                        <div class="col-sm-8">
                            <input v-model="customer.firstName" class="form-control" id="firstName" required/>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="mb-3 row">
                        <label for="lastName" class="col-sm-4 col-form-label">Nom</label>
                        <div class="col-sm-8">
                            <input v-model="customer.lastName" class="form-control" id="lastName" required/>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <div class="mb-3 row">
                        <label for="dateAdded" class="col-sm-4 col-form-label">Date d'ajout</label>
                        <div class="col-sm-8">
                            <input v-model="customer.dateAdded" class="form-control" id="dateAdded" required/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-4">
                    <div class="mb-3 row">
                        <label for="role" class="col-sm-4 col-form-label">Fonction</label>
                        <div class="col-sm-8">
                            <input v-model="customer.role" class="form-control" id="role" />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="mb-3 row">
                        <label for="phone" class="col-sm-4 col-form-label">Téléphone</label>
                        <div class="col-sm-8">
                            <input v-model="customer.phone" class="form-control" id="phone" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10 col-lg-8">
                    <div class="mb-3 row">
                        <label for="email" class="col-sm-2 col-form-label">E-mail</label>
                        <div class="col-sm-10">
                            <input v-model="customer.email" class="form-control" id="email" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10 col-lg-8">
                    <div class="mb-3 row">
                        <label for="company" class="col-sm-2 col-form-label">Entreprise</label>
                        <div class="col-sm-10">
                            <input v-model="customer.company" class="form-control" id="company" />
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <h3 class="mt-3">Coordonnées :</h3>
            <div class="p-2">
                <div class="row">
                    <div class="col-md-10 col-lg-8">
                        <div class="mb-3 row">
                            <label for="address-ad1" class="col-sm-2 col-form-label">Adresse 1</label>
                            <div class="col-sm-10">
                                <input v-model="customer.address.address1" class="form-control" id="address-ad1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-lg-8">
                        <div class="mb-3 row">
                            <label for="address-ad2" class="col-sm-2 col-form-label">Adresse 2</label>
                            <div class="col-sm-10">
                                <input v-model="customer.address.address2" class="form-control" id="address-ad2" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-4">
                        <div class="mb-3 row">
                            <label for="zipCode" class="col-sm-4 col-form-label">Code Postal</label>
                            <div class="col-sm-8">
                                <input v-model="customer.address.zipCode" class="form-control" id="zipCode" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <div class="mb-3 row">
                            <label for="city" class="col-sm-4 col-form-label">Ville</label>
                            <div class="col-sm-8">
                                <input v-model="customer.address.city" class="form-control" id="city" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-4">
                        <div class="mb-3 row">
                            <label for="country" class="col-sm-4 col-form-label">Pays</label>
                            <div class="col-sm-8">
                                <select
                                    class="form-select"
                                    :arialabel="customer.address.country"
                                    v-model="customer.address.country"
                                    id="country"
                                    required
                                >
                                <option>Choisir</option>
                                <option
                                    v-for="country in listCountries"
                                    :key="country"
                                    :value="country"
                                >
                                    {{ country }}
                                </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    
    <div class="row">
        <div class="col">
            <div class="form-check my-3">
                <input class="form-check-input" type="checkbox" v-model="debug" id="debug" />
                <label class="form-check-label" for="debug"> Debug </label>
            </div>
        </div>
        <div class="col text-end">
            <b-button @click="onSaveCustomer()" icon-right="fas fa-floppy-disk">
                {{ isNewCustomer ? 'Enregistrer' : 'Modifier' }}
            </b-button>
        </div>
    </div>
</section>

<pre class="card p-2" v-if="debug">
    {{ customer }}
</pre>
</div>
</template>

<script>
import { listCountries } from '../libs/listCountries.js'

import { mapState, mapActions } from 'pinia'
import { useCustomerStore } from '../stores/customer.js'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            debug: false,
            listCountries
        }
    },
    computed: {
        // on connecte le state de customer
        ...mapState(useCustomerStore, ['customer']),
        
        // détecte si c'est un nouveau client
        isNewCustomer() {
            return !this.id || this.id < 0
        }
    },
    async mounted() {
        if (this.isNewCustomer) {
            await this.createCustomer()
        } else {
            await this.getCustomer(this.id)
        }
    },
    methods: {
        ...mapActions(useCustomerStore, ['createCustomer', 'getCustomer', 'saveCustomer', 'deleteCustomer']),
        
        onDeleteCustomer() {
            this.deleteCustomer(this.id)
            this.$router.push('/customers')
        },

        async onSaveCustomer() {
            await this.saveCustomer({
                ...this.customer
            })
            this.$router.push('/customers')
        }
    }
}
</script>
