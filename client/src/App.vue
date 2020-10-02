<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
export default {
  name : "App",
  components:{
    Navbar,
  }
}
</script>

<style>
*{
  font-family: "Poppins", sans-serif;
}
</style>
