const API_URL: string = import.meta.env.VITE_STT_URL + "stt";

const sendAudioToServer = async (audioBlob: Blob) => {
    console.log("👉 STT_URL:", API_URL);
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("STT 서버 오류");

    const data = await res.json();
    return data.transcript;
};

export default sendAudioToServer;
