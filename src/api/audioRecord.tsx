import { useEffect, useRef, useState } from "react";

const useAutoRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const mics = devices.filter((d) => d.kind === "audioinput");
                console.log("🎙️ 감지된 마이크:", mics);

                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) chunksRef.current.push(e.data);
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, {
                        type: "audio/webm",
                    });
                    setAudioBlob(blob);
                    chunksRef.current = [];
                    setRecording(false);
                };

                const audioContext = new AudioContext();
                if (audioContext.state === "suspended") {
                    await audioContext.resume();
                }

                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 512;
                const data = new Uint8Array(analyser.frequencyBinCount);
                source.connect(analyser);

                let lastSilentTime = Date.now();

                const detectVolume = () => {
                    analyser.getByteTimeDomainData(data);
                    const volume = Math.max(...data) - Math.min(...data);

                    if (
                        volume >= 100 &&
                        mediaRecorderRef.current &&
                        mediaRecorderRef.current.state === "inactive"
                    ) {
                        try {
                            console.log("🎙️ 볼륨:", volume);
                            mediaRecorderRef.current.start();
                            setRecording(true);
                            console.log("🎙️ 녹음 시작");
                        } catch (err) {
                            console.error("❌ start 중 오류:", err);
                        }
                    }

                    if (
                        volume < 50 &&
                        mediaRecorderRef.current &&
                        mediaRecorderRef.current.state === "recording"
                    ) {
                        const now = Date.now();
                        if (now - lastSilentTime > 1000) {
                            mediaRecorderRef.current.stop();
                            setRecording(false);
                            console.log("🛑 녹음 종료");
                        }
                    } else {
                        lastSilentTime = Date.now();
                    }

                    requestAnimationFrame(detectVolume);
                };
                detectVolume();
            } catch (err) {
                console.error("❌ 마이크 접근 실패:", err);
            }
        };

        init();
    }, []);

    return { audioBlob, recording };
};

export default useAutoRecorder;
