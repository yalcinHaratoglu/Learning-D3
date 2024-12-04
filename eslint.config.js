module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["astro", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json", // TypeScript projesini belirtmek
  },
  rules: {
    "no-unused-vars": "warn", // JavaScript/TypeScript'teki kullanılmayan değişkenler için uyarı
    "astro/no-unused-vars": "warn", // Astro'daki kullanılmayan değişkenler için uyarı
    "@typescript-eslint/no-unused-vars": ["warn"], // TypeScript için özel kural
  },
};
