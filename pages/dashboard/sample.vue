<template>
    <div>
        <HistorySample></HistorySample>
    </div>
</template>

<script>

   import HistorySample from '~/components/history-sample.vue'
export default {
     name: "dashboard",
     layout: 'Auth',
     // middleware: 'authenticated',
     components: {
            HistorySample
     },
     data(){
         return {
             data: 'Helo workd'
         }
     }
    
}
</script>

<style scoped>

</style>
