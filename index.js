const VK_API_VERSION = "5.95";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

let connect = null;
const init = (newConnect) => {
    connect = newConnect;
};

const shareStory = (app_id, story, { add_to_news = false, user_ids = [] }) => new Promise((resolve, reject) => {
    connect.send("VKWebAppGetAuthToken", { app_id, scope: "stories" })
        .then((response) => {
            const access_token = response.data.access_token;
            connect.send("VKWebAppCallAPIMethod", {
                method: "stories.getPhotoUploadServer",
                params: {
                    access_token,
                    add_to_news: add_to_news ? "1": "0",
                    user_ids: user_ids.join(","),
                    link_text: "open",
                    link_url: "https://vk.com/app" + app_id,
                    v: VK_API_VERSION
                }
            })
                .then((response) => {
                    const uploadUrl = response.data.response.upload_url;

                    const request = new FormData();
                    request.append("file", __makeFakeFile(story, "story.png"));

                    fetch(CORS_PROXY + uploadUrl, {
                        method: "POST",
                        body: request
                    })
                        .then((response) => response.json())
                        .then((response) => resolve(response.response.story))
                        .catch(() => reject({ error_code: 3, error_text: "Can't upload story" }))
                })
                .catch(() => reject({ error_code: 2, error_text: "Can't get upload url" }))
        })
        .catch(() => reject({ error_code: 1, error_text: "Can't get access_token" }))
});

const generateStoryFromTemplate = (templateUrl, fields = [], imageSrc = undefined) => new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");

    const background = new Image();
    const image = new Image();
    background.onload = () => {
        ctx.drawImage(background, 0, 0);
        if(imageSrc != indefined) ctx.drawImage(image, 50, 10);
        fields.forEach((field) => {
            ctx.font = field.font;
            ctx.textAlign = field.align;
            ctx.fillStyle = field.color;
            ctx.fillText(field.value, field.x, field.y);
        });

        resolve(canvas.toDataURL());
    };
    background.src = templateUrl;
    image.src = imageSrc;
    
});

// Helpers
const __makeFakeFile = (dataUrl, filename) => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
};

export default { init, shareStory, generateStoryFromTemplate };
