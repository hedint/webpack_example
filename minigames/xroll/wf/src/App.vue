<template>
    <div id="app">
        <img src="./assets/tutorial.jpg">
        <HelloWorld/>
    </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld';
console.log('zzz');
  export default {
    name: 'App',
    components: {
      HelloWorld,
    },
  };
</script>
