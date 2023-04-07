<template>
    <tr class="text-muted">
        <td><i class="fa-solid fa-user" /> {{ customer.firstName }} {{ customer.lastName }}</td>
        <td>{{ customer.company }}</td>
        <td class="text-end">{{ customer.dateAdded }}</td>
        <td class="d-flex gap-2 justify-content-end">
            <BButton
                size="sm"
                variant="outline-danger"
                iconLeft="trash"
                @click="$emit('delete', this.customer._id)"
            >
                Supprimer
            </BButton>
            <BButton
                size="sm"
                variant="outline-primary"
                iconLeft="pen"
                @click="$emit('edit', this.customer._id)"
            >
                Éditer
            </BButton>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        customer: {
            type: Object,
            required: true
        },
        message: {
            type: String,
            default: '-'
        }
    }
}
</script>

<style lang="scss" scoped></style>
