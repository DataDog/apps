<template>
    <section>
        <h2>Hello App Developer! 👋</h2>
        <p>Welcome to your first Datadog application.</p>
        <p>Your favorite metric is: <strong>TODO</strong></p>
    </section>
</template>

<script>
import { init } from '@datadog/ui-extensions-sdk';
import 'milligram';
import 'typeface-roboto';

init();

export default {
    name: 'Widget'
};
</script>

<style scoped>
section {
    padding: 10px;
}
</style>
