<template>
  <ul class="categories">
    <li class="category"
        v-for="(category) in categories"
        :key="category.name"
        @click="getArticleList(category)">
      <Icon class="category-icon"
            type="folder" />
      <span class="category-name">{{ category.name }}</span>
    </li>
  </ul>
</template>

<script>
import Icon from '@/components/icon'

export default {
  name: 'Categories',
  components: {
    Icon
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    getArticleList ({ path }) {
      this.$emit('getArticleList', path)
    }
  }
}
</script>

<style lang="scss" scoped>
.categories {
  color: #768191;

  .category {
    padding: 0 10px 0 16px;
    line-height: 36px;
    border-left: 3px solid transparent;

    &.active,
    &:hover {
      background-color: #f7f7f7;
    }
    &.active {
      border-color: #2b50ed;
      color: #2b50ed;
      .category-icon {
        color: #2b50ed;
      }
    }

    .category-icon {
      margin-right: 10px;
      font-size: 18px;
      color: #bac3d0;
      vertical-align: middle;
    }

    .category-name {
      vertical-align: middle;
    }
  }
}
</style>
