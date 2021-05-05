<template>
  <div id="app">
    
    <router-view> </router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <Main msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import Login from './components/Login.vue'

export default {

  name: 'App',
  components: {
    // Login
  },
  methods: {
     
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 30px;
  margin: auto;
  overflow: hidden;
}
</style>
