const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { config } = require("./config");

const getAWSSecretKey = async () => {
    const secret_name = config.aws.secret_name

    const client = new SecretsManagerClient({
        region: config.aws.region,
    });

    let response;

    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT",
            })
        );
        const secret = JSON.parse(response.SecretString);
        for (const key in secret) {
            process.env[key] = secret[key];
        }
    } catch (error) {
        throw error;
    }
}

module.exports = getAWSSecretKey;
