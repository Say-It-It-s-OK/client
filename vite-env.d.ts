interface ImportMetaEnv {
    VITE_API_URL: string;
    VITE_NLP_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
