module.exports = {
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
