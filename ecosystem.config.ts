// eslint-disable-next-line import/no-anonymous-default-export
export default {
    apps: [
        {
            name: "dorset-dream-agency-web",
            script: "npm",
            args: "start",
            watch: true,
            instances: 1,
            max_memory_restart: "500M",
            restart_delay: 1000,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
