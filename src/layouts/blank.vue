<script lang="ts">

export default defineComponent({
  setup() {
    const routerView = resolveComponent('router-view')

    return () => h('div', { class: 'layout-wrapper layout-blank' }, h(routerView))
  },
})
</script>


<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported

.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
