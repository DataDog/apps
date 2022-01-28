<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import { init } from '@datadog/ui-extensions-sdk';

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

init();

export default {
    name: 'Widget',
    components: {
        HelloWorld
    }
};
</script>
