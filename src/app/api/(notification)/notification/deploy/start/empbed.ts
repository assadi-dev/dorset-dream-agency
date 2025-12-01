import packageJson from "../../../../../../../package.json";
import { cicd_link } from "../utils";

export const EMBED_MESSAGES = () => {
    const date_now = Date.now();
    const version = packageJson.version;

    return {
        deploy: {
            start: {
                content: "🚀 **MDT Dynasty 8 — Déploiement démarré**",
                embeds: [
                    {
                        title: "🔵 Build Started — Déploiement en cours",
                        description:
                            "Le déploiement de **MDT Dynasty 8** vient de commencer. Les étapes CI/CD s’exécutent…",
                        color: 3447003,
                        fields: [
                            {
                                name: "📦 Informations du build",
                                value: `• **Version :** \`${version}\`\n• **Branche :** \`main\``,
                            },

                            {
                                name: "📎 Liens utiles",
                                value: `• ⚙️ [Logs CI/CD](${cicd_link})\n•  🌍 [Production](https://mdt.dynasty8flashback.fr)`,
                            },
                        ],
                        author: {
                            name: "Dynasty 8 Deployment Sentinel",
                            url: "https://mdt.dynasty8flashback.fr",
                            icon_url: "https://i.imgur.com/AfFp7pu.png",
                        },
                        footer: {
                            text: "Déploiement lancé — surveillance active",
                            icon_url: "https://i.imgur.com/AfFp7pu.png",
                        },
                        timestamp: date_now,
                    },
                ],
                attachments: [],
            },
        },
    };
};
