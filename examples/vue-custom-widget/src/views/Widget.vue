<template>
    <section>
        <h2>Hello App Developer! 👋</h2>
        <p>Welcome to your first Datadog application.</p>
        <p>
            Your favorite metric is: <strong>{{ metric }}</strong>
        </p>
    </section>
</template>

<script>
import { EventType, init } from '@datadog/ui-extensions-sdk';
import 'milligram';
import 'typeface-roboto';

const client = init();

export default {
    name: 'Widget',
    data() {
        return {
            metric: 'system.cpu.idle',
            $_unsubscribe: undefined
        };
    },
    mounted() {
        client.getContext().then(context => {
            this.metric = context.widget?.definition.options?.metric;
        });

        this.$_unsubscribe = client.events.on(
            EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
            options => {
                if (typeof options.metric !== 'string') {
                    return;
                }

                this.metric = options.metric;
            }
        );
    },
    beforeUnmount() {
        this.$_unsubscribe?.();
    }
};
</script>

<style scoped>
section {
    padding: 10px;
}
</style>
