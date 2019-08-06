<template>
  <div>
     <LoaderFull></LoaderFull>
    <nuxt />
  </div>
</template>

<script>
import LoaderFull from '~/components/LoaderFull'
export default {
  name: 'Default',
  components: { LoaderFull },
  methods: {} 
}
</script>
<style>

</style>
