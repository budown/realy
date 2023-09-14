module.exports = {
  base: "/realy/",
  title: "东寨村",
  description: "东寨村",
  theme: "@vuepress/theme-default",
  themeConfig: {
    sidebar: "auto",
    smoothScroll: true,
    nextLinks: true,
    prevLinks: true,
    colorModeSwitch: "auto",
    nav: [
      { text: "首页", link: "/" },
      { text: "基础", link: "/basic/" },
      { text: "LeetCode", link: "/leetcode/" },
    ],
  },
};
