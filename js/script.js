const getUrl = () => {
    const url = document.querySelector(".form-control").value;
    const loading = document.querySelector(".loading");
    const title = document.querySelector(".title");
    const pp = document.querySelector(".pp");
    const list = document.querySelector(".list");
    const btnMp4 = document.querySelector(".btn-mp4");
    const btnMp3 = document.querySelector(".btn-mp3");
    const user = document.querySelector(".user-name");
    list.classList.add("d-none");
    if (url === "") {
        setTimeout(() => {
            
            loading.innerHTML = "Video Not Found!";
        }, 200);
    } else {
        const api = `https://saipulanuar.ga/api/download/tiktok?url=${url}`;
        loading.innerHTML = "Espere por favor...";
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                if (data["result"].video === undefined) {
                    loading.innerHTML = "Video no encontrado!";
                } else {
                    const video_url = data["result"].video;
                    const username = data["result"].username;
                    const audio_url = data["result"].audio;
                    const pp_url = data["result"].pp;
                    const description = data["result"].description;
                    loading.innerHTML = "";
                    user.innerHTML = `@${username}`;
                    pp.setAttribute("src", pp_url);
                    btnMp4.addEventListener("click", () => {
                        window.location.href = video_url;
                    });

                    btnMp3.addEventListener("click", () => {
                        window.location.href = audio_url;
                    });

                    title.innerHTML = description;
                    list.classList.remove("d-none");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
};
