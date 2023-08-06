<template>
  <div>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider :width="240">
          <WerdfSider></WerdfSider>
        </Sider>
        <Layout>
          <Content>
            <router-view></router-view>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import WerdfSider from '@/WerdfSider.vue';
import { Content, Footer, Header, Layout, Sider } from 'view-ui-plus';
</script>

<style lang="scss" scoped>
$header-heigth: 64px; // iView UI Plus <Header> default heigth
// $sider-width: 200px; // iView UI Plus <Sider> default width
// $footer-heigth: 128px;

.ivu-layout-header {
  width: 100vw;
}

.ivu-layout-has-sider {
  height: calc(100vh - $header-heigth);
}

.ivu-layout-sider {
  background-color: antiquewhite;
}

.ivu-layout-content {
  padding: 40px;
}

.ivu-layout-footer {
  background-color: lightgrey;
}
</style>
