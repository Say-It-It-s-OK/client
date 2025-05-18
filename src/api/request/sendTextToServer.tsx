const API_URL: string = import.meta.env.VITE_STT_URL + "tts";

const sendTextToServer = async (text: string) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
    } catch (error) {
        console.error("TTS 요청 실패:", error);
    }
};

export default sendTextToServer;
