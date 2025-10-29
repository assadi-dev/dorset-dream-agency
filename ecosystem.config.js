// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
    apps: [
        {
            name: "dorset-dream-agency-web",
            script: "npm",
            args: "start",
            instances: 1,
            autorestart: true,
            watch: true,
            max_memory_restart: "500M",
            restart_delay: 1000,
            env: {
                NODE_ENV: "production",
                PORT: 3001,
            },
        },
    ],
};
