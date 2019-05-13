<template>
  <main class="layout-workspace">
    <div class="layout-workspace__categories">
      <Categories/>
    </div>
    <div class="layout-workspace__articles">
      <Articles/>
    </div>
    <div class="layout-workspace__article">
      <Article/>
    </div>
  </main>
</template>

<script>
import Article from './components/article'
import Articles from './components/articles'
import Categories from './components/categories'

export default {
  name: 'Workspace',
  components: {
    Article,
    Articles,
    Categories
  }
}
</script>

<style lang="scss" scoped>
.layout-workspace {
  display: flex;
  height: 100vh;
  flex-direction: row;

  &__categories,
  &__articles,
  &__article {
    flex-shrink: 0;
    overflow: auto;
  }

  &__articles,
  &__article {
    border-left: 1px solid $border-color;
  }

  &__categories {
    width: 200px;
  }

  &__articles {
    position: relative;
    width: 300px;
  }

  &__article {
    flex: auto;
  }
}
</style>
