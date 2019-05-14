<template>
  <main class="layout">
    <aside class="layout__aside aside">
      <header class="aside__header">
        <div class="user">
          <div class="user__avatar" />
          <div class="user__username"></div>
        </div>
      </header>
      <div class="aside__body">
        <ul>
          <nav>
            <a href=""></a>
          </nav>
        </ul>
      </div>
      <footer class="aside__footer">
        <Button class="btn btn-setting"
                radius="8"
                icon="setting" />
      </footer>
    </aside>
    <div class="layout__view">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Button from '@/components/button'
import Icon from '@/components/icon'

export default {
  name: 'printer',
  components: {
    Button,
    Icon
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;

  &__aside {
    flex-shrink: 0;
    width: 70px;
  }

  &__view {
    flex: auto;
    overflow: auto;
  }
}

.aside {
  display: flex;
  height: 100%;
  flex-direction: column;
  color: #fff;
  background-color: #2b50ed;

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
    padding: 10px;

    .btn {
      margin: 8px 0;
      width: 40px;
      height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}

.user {
  padding: 20px 5px;
  text-align: center;

  &__avatar {
    flex-shrink: 0;
    margin-right: 10px;
    @include circle(50px);
    background-color: #fff;
  }

  &__username {
    margin: 8px 0;
    @include text-truncate;
  }
}
</style>
