<template>
  <div class="layout-workspace">
    <aside class="layout-workspace__aside">
      <Categories />
    </aside>
    <div class="layout-workspace__articles">
      <Articles />
    </div>
    <div class="layout-workspace__article">
      <Article />
    </div>
  </div>
</template>

<script>
import Button from '@/components/button'
import Icon from '@/components/icon'

import Article from './components/article'
import Articles from './components/articles'
import Categories from './components/categories'

export default {
  name: 'Workspace',
  components: {
    Button,
    Icon,
    Article,
    Articles,
    Categories
  },
  data () {
    return {
      categories: [],
      categoryPath: '',
      articlePath: ''
    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.layout-workspace {
  display: flex;
  height: 100vh;
  flex-direction: row;
  background-color: #fff;

  &__aside,
  &__articles,
  &__article {
    flex-shrink: 0;
    overflow: auto;
  }

  &__articles,
  &__article {
    border-left: 1px solid var(--border-color);
  }

  &__aside {
    width: 240px;
  }

  &__articles {
    position: relative;
    width: 300px;
    background-color: #fafafa;
  }

  &__article {
    flex: auto;
  }
}
</style>
