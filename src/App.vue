<template>
  <div id="app">
    <el-container>
      <el-main>
        <Home />
      </el-main>
    </el-container>
    <Seesaw />
  </div>
</template>

<script>
import Seesaw from './components/Seesaw'
import Home from './components/Home'
export default {
  name: 'app',
  components: {
    Seesaw,
    Home
  },
  mounted() {
    document.getElementById("app").style.height = window.innerHeight + "px";
    window.addEventListener("resize", () => {
      document.getElementById("app").style.height = window.innerHeight + "px";
    })
  }
}
</script>

<style lang="scss">
*{
  font-family: SANS-SERIF,
  "Helvetica Neue",
  Helvetica,
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei UI Light",
  "Microsoft YaHei",
  "微软雅黑",
  Arial,sans-serif;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
