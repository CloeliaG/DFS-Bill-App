<template>
    <table class="table my-2 table-hover">
      <thead class="text-secondary">
        <slot name="head">
          <tr>
            <th scope="col"></th>
            <th scope="col">N°</th>
            <th scope="col">Client</th>
            <th scope="col" class="text-end">Montant HT</th>
            <th scope="col" class="text-end">Montant TTC</th>
            <th scope="col" class="text-end"></th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style lang="scss" scoped></style>
  