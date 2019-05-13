<template>
  <aside class="workspace-sidebar">
    <header class="workspace-sidebar__header">
      <div class="user">
        <div class="user__avatar"/>
        <div class="user__username">VinciVinciVinciVinciVinciVinciVinciVinci</div>
      </div>
    </header>
    <div class="workspace-sidebar__body">
      <section class="group">
        <header class="group__header">
          <h4 class="title">Categories</h4>
          <Icon class="icon icon-add" type="add"/>
        </header>
        <ul class="categories">
          <li class="category" v-for="(category, index) in categories" :key="index">
            <Icon class="category-icon" type="{category.icon}"/>
            <span class="category-name">{{ category.name }}</span>
          </li>
        </ul>
      </section>
    </div>
    <footer class="workspace-sidebar__footer">
      <Button class="sync-setting" icon="sync"/>
      <Button class="btn-setting" icon="setting"/>
    </footer>
  </aside>
</template>

<script>
import Button from '@/components/button'
import Icon from '@/components/icon'

export default {
  name: 'Categories',
  components: {
    Icon,
    Button
  },
  data () {
    return {
      categories: [
        {
          id: 0,
          icon: 'folder',
          name: 'JavaScript'
        },
        {
          id: 1,
          icon: 'folder',
          name: 'CSS'
        },
        {
          id: 2,
          icon: 'folder',
          name: 'WebGL'
        },
        {
          id: 3,
          icon: 'folder',
          name: 'PHP'
        },
        {
          id: 4,
          icon: 'folder',
          name: 'Python'
        },
        {
          id: 5,
          icon: 'folder',
          name: 'Go'
        },
        {
          id: 6,
          icon: 'folder',
          name: 'NodeJS'
        },
        {
          id: 7,
          icon: 'folder',
          name: 'Electron'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.workspace-sidebar {
  display: flex;
  height: 100%;
  flex-direction: column;

  &__header,
  &__footer {
    flex-shrink: 0;
  }

  &__body {
    flex: auto;
    overflow: auto;
    padding: 15px 0;
  }

  &__footer {
    display: flex;

    padding: 10px;
    justify-content: space-between;
  }
}

.user {
  display: flex;
  padding: 20px 10px;
  align-items: center;

  &__avatar {
    flex-shrink: 0;
    margin-right: 10px;
    @include circle(50px);
    background-color: #2b50ed;
  }

  &__username {
    @include text-truncate;
  }
}

.group {
  &__header {
    display: flex;
    padding: 0 10px 0 18px;
    height: 50px;
    align-items: center;
    color: #888;

    .title {
      flex: auto;
    }

    .icon {
      flex-shrink: 0;
      font-size: 14px;
    }
  }
}

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
