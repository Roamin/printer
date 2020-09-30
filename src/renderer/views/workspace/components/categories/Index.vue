<template>
  <div class="aside">
    <header class="aside__header">
      <Icon class="icon icon-add" type="add" />
      <h4 class="title">Categories</h4>
    </header>
    <div class="aside__body">
      <ul class="categories">
        <li
          class="category"
          v-for="item in categories"
          :class="{ active: category.path === item.path }"
          :key="item.path"
          @click="cdCategory(item)"
        >
          <Icon class="category-icon" type="folder" />
          <span class="category-name">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '@/components/icon'

export default {
  name: 'Categories',
  components: {
    Icon
  },
  data () {
    return {
      categories: [],
      current: {
        index: 0
      }
    }
  },
  computed: {
    ...mapState('workspace', [
      'category'
    ])
  },
  methods: {
    init () {
      this.getCategoryList()
    },
    getCategoryList () {
      this.$fetch('repository.getCategoryList').then(data => {
        this.categories = data
      })
    },
    cdCategory ({ name, path }) {
      this.$store.commit('workspace/updateCategory', {
        name,
        path
      })
    }
  },
  created () {
    this.init()
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
      color: var(--text-color)-dark;
    }

    .icon {
      margin-right: 16px;
      padding: 4px;
      flex-shrink: 0;
      font-size: 14px;
      color: var(--text-color)-dark;
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
      color: var(--text-color)-dark;

      .category-icon {
        color: var(--text-color)-dark;
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
