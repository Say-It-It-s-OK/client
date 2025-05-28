export default function appendSubjectParticle(word: string) {
    const lastChar = word[word.length - 1];
    const lastCharCode = lastChar.charCodeAt(0);

    if (lastCharCode < 0xac00 || lastCharCode > 0xd7a3) {
        return word + "가";
    }

    const baseCode = lastCharCode - 0xac00;
    const jongseongIndex = baseCode % 28;

    if (jongseongIndex === 0) {
        return word + "가";
    } else {
        return word + "이";
    }
}
