<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --main: #00b6a6;
  --sub: #6c757d;
}
body {
  background-color: whitesmoke !important;
}
@font-face {
  font-family: "Cairo";
  src: local("Cairo"), url(./assets/fonts/Cairo-Regular.ttf) format("truetype");
}
#app {
  font-family: "Cairo";
  font-size: 14px;
}
</style>
