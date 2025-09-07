//prettier-ignore
export const textExtensionList = [
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
export const ALLOWED_TEXT_EXTENSIONS = new Set(textExtensionList);

//prettier-ignore
export const trimedExtensionList = [
  "txt", "csv", "json", "xml",
  "js", "ts", "jsx", "tsx", "html", "htm", "css", "scss",
   "yaml", "ini", "toml",
  "py", "cpp", "c", "h", "hpp", "java", "kt", "rs", "go", "swift", "php",
  "dart", "cs", "fs", "fsi", "fsharp",
  "asm", "s", "tsv", "toml", "cfg",
]

export const routes = {
  vaultRoute: '/vault',
  signIn: '/signin',
  signUp: '/signup',
  dashboard: '/dashboard',
  howTo: '/how-to',
  create: '/create',
  userStats: '/dashboard/stats',
  userSettings: '/dashboard/settings',
  userSupport: '/dashboard/support',
  admin: '/admin',
  adminManageVaults: '/admin/manage-vaults',
  adminActivities: '/admin/activities',
  adminReviews: '/admin/reviews',
  adminMailbox: '/admin/mailbox',
  adminSettings: '/admin/settings',
} as const;

export const FILE_TYPES = [
  'plaintext',
  'image',
  'video',
  'audio',
  'other',
] as const;

export const QUERY_KEYS = {
  textFiles: 'text-file',
  recentVaults: 'recent-vaults',
};

export const redisKeys = {
  publicValut: 'publc-vault',
} as const;

export const cookieKeys = {
  publicVaultCookie: 'public-valut-cookie',
  vaultPasswordCookie: 'vault-password-cookie',
} as const;

export const adminCreds = {
  email: 'jack@mail.com',
  pass: '12345678',
} as const;

export const userCreds = {
  email: 'john@mail.com',
  pass: '12345678',
} as const;
