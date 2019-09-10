<template>
    <div id="admin">
            <el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- 给el-menu添加 router属性后 点击el-submenu会跳转到对应 index的页面 -->
    <!-- :default-openeds 默认打开的    unique-opened 表示一次只能打开一个     :default-active="$route.parmas" 添加高亮-->
    <!-- :default-openeds="['1']" 默认打开index为1的 -->
    <!--  router表示设置成路由属性 菜单中可以使用index设置路由跳转地址 -->
    <el-menu router :default-active="$route.parmas" unique-opened>

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
         <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/create">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
          <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="2">
         <template slot="title"><i class="el-icon-tickets"></i>文章管理</template>
        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
       <el-menu-item-group>
          <template slot="title">广告位</template>
          <el-menu-item index="/ads/create">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位列表</el-menu-item>
        </el-menu-item-group>
        </el-submenu>

      <el-submenu index="3">
         <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-tools"></i>系统管理</template>
       <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
         <!-- 默认是以组件区分 -->
        <!-- 这里改成:key=""设置以路径区分 -->
      <router-view :key="$route.path"></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>
 

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    name:"admin",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>