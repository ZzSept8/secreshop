<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.reg-form>a>div div input{
    background: rgba(36,44,58,0.8);
    height: 38px;
    border-radius: 3px;
    font-size: 14px;
    text-indent: 5px;
}
.reg-form>a>.mint-cell-wrapper{
background-image:none!important;
}
/* body{
     background-color: #f1f1f1;
    width: 100%;
    height: 100%;
} */
</style>

