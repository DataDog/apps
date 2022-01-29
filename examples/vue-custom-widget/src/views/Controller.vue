<template>
    <div>The application controller is running in the background.</div>
    <router-link to="/widget">Click here to open your widget</router-link>
</template>

<script>
import { init } from '@datadog/ui-extensions-sdk';

init();

export default {
    name: 'Controller'
};
</script>
