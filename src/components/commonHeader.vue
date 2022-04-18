<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        sizi="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown sizi="mini" trigger="click">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="less" scoped>
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #ccc; //你想要设置的字体颜色
  &:hover {
    color: #409eff !important; //你想要设置的字体颜色
  }
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "commonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.jpeg"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>