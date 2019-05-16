<template>
  <div class="aside">
    <header class="aside__header">
      <Icon class="icon icon-add"
            type="add" />
      <h4 class="title">Categories</h4>
    </header>
    <div class="aside__body">
      <ul class="categories">
        <li class="category"
            v-for="(category, index) in categories"
            :class="{active: current.index === index}"
            :key="category.name"
            @click="getArticleList(category, index)">
          <Icon class="category-icon"
                type="folder" />
          <span class="category-name">{{ category.name }}</span>
        </li>
      </ul>
    </div>
  </div>
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
    return {
      current: {
        index: 0
      }
    }
  },
  methods: {
    getArticleList ({ path }, index) {
      this.current.index = index
      this.$emit('getArticleList', path)
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  display: flex;
  height: 100%;
  flex-direction: column;

  &__header,
  &__footer {
    flex-shrink: 0;
  }

  &__header {
    display: flex;
    padding: 0 18px;
    height: 50px;
    align-items: center;
    color: #888;
    border-bottom: 1px solid #e4e4e4;

    .title {
      flex: auto;
      color: $text-color-dark;
    }

    .icon {
      margin-right: 16px;
      padding: 4px;
      flex-shrink: 0;
      font-size: 14px;
      color: $text-color-dark;
    }
  }

  &__body {
    flex: auto;
    overflow: auto;
  }

  &__footer {
    display: flex;

    padding: 10px;
    justify-content: space-between;
  }
}

.categories {
  color: #768191;

  .category {
    padding: 0 18px;
    line-height: 38px;

    &:hover,
    &.active {
      background-color: rgba(#000, 0.03);
    }
    &.active {
      color: $text-color-dark;

      .category-icon {
        color: $text-color-dark;
      }
    }

    .category-icon {
      margin-right: 12px;
      padding: 3px;
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
