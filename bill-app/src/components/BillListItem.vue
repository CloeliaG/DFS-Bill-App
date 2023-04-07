<template>
  <tr class="text-muted">
    <td>{{ bill.date }}</td>
    <td>{{ bill.description }}</td>
    <td>{{ bill.client.firstName }} {{ bill.client.lastName }} ({{ bill.client.company }})</td>
    <td class="text-end">{{ bill.totalHT.toFixed(2) }} € HT</td>
    <td class="text-end"><strong>{{ bill.totalTTC.toFixed(2) }} € TTC</strong></td>
    <td class="d-flex gap-2 justify-content-end">
      <BButton
        size="sm"
        variant="outline-danger"
        iconLeft="trash"
        @click="$emit('delete', this.bill._id)"
      >
        Supprimer
      </BButton>
      <BButton
        size="sm"
        variant="outline-primary"
        iconLeft="pen"
        @click="$emit('edit', this.bill._id)"
      >
        Éditer
      </BButton>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    bill: {
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
