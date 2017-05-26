<template>
  <div>
    {{a}}
  </div>
</template>

<script>
export default{
  data () {
    return {
      a: this.$route.params.id
    }
  }
}
</script>

<style lang="stylus">

</style>
