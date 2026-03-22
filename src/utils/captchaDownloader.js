const fs = require("fs");

async function DownloadCaptcha(url) {
    // Checking if directory exists then delete and make again also strore picture other wise create and store images
    if (fs.readdirSync("../").includes("images")) {
        fs.rm("../images", { recursive: true, force: true }, () => {
            console.log("Removed Dir");
            fs.mkdir("../images", () => {
                console.log("Created Dir");
                const splittedURL = url.split(",")[1];

                const buffer = Buffer.from(splittedURL, "base64");

                const path = `../images/image.jpg`;
                fs.writeFileSync(path, buffer);
                return path;
            });
        });
    } else {
        fs.mkdir("../images", () => {
            console.log("Created Dir");
            const splittedURL = url.split(",")[1];

            const buffer = Buffer.from(splittedURL, "base64");

            const path = `../images/image.jpg`;
            fs.writeFileSync(path, buffer);
            return path;
        });
    }
}

module.exports = DownloadCaptcha;
