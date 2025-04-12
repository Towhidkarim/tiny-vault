//prettier-ignore
export const ALLOWED_TEXT_EXTENSIONS = new Set(
    [
        // General Text-Based Files
        "txt", "md", "csv", "json", "xml", "yaml", "yml", "ini", "log", "toml", "rtf",
    
        // Programming & Script Files
        "js", "ts", "jsx", "tsx", "html", "htm", "css", "scss", "less",
        "py", "cpp", "c", "h", "hpp", "java", "kt", "rs", "go", "swift", "php",
        "sh", "bat", "cmd", "ps1", "pl", "rb", "lua", "perl", "r", "swift",
        "dart", "groovy", "scala", "m", "mm", "vb", "cs", "fs", "fsi", "fsharp",
        "asm", "s", "tsv", "properties", "toml", "cfg",
    
        // Data & Configuration Files
        "env", "config", "conf", "ini", "prefs", "gitattributes", "gitignore",
        "editorconfig", "npmrc", "yarnrc", "babelrc", "eslintrc", "prettierrc",
        "dockerfile", "dockerignore", "gitmodules",
    
        // Documentation & Markup Files
        "tex", "bib", "rst", "asciidoc", "adoc", "xhtml", "shtml",
        
        // Miscellaneous
        "srt", "sub", "vtt", "po", "pot", "mo", "dic", "aff", "lst"
    ]
)

export const redisKeys = {
  publicValut: 'publc-vault',
} as const;

export const cookieKeys = {
  publicVaultCookie: 'public-valut-cookie',
} as const;
