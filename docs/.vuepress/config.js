module.exports = {
  title: "Vue.js 정복 Camp 4기 학습 노트",
  description: "나는 오늘 무엇을 배웠는가",
  base: "/learning-note/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/ncsoft.png",
      },
    ],
  ],
  themeConfig: {
    sidebar: [
      {
        title: "Day 1",
        collapsable: true,
        children: ["/vuepress", "/instance"],
      },
      {
        title: "Day 2",
        collapsable: true,
        children: ["/components", "/props"],
      },
      {
        title: "Day 3",
        collapsable: true,
        children: ["/event-emit", "/axious", "/lifecycle"],
      },
      {
        title: "Day 4",
        collapsable: true,
        children: ["/template", "/components-communication", "/cli", "/sfc"],
      },
      {
        title: "Day 5",
        collapsable: true,
        children: ["/slots", "/scoped-slot", "/const-let"],
      },
      {
        title: "Day 6",
        collapsable: true,
        children: ["/router", "/hacker-news"],
      },
      {
        title: "Day 7",
        collapsable: true,
        children: ["/webpack"],
      },
      {
        title: "Day 8",
        collapsable: true,
        children: ["/computed", "/method", "/filters"],
      },
      {
        title: "Day 9",
        collapsable: true,
        children: ["/vuex"],
      },
      {
        title: "Day 10",
        collapsable: false,
        children: ["/chart"],
      },
      {
        title: "Day 11",
        collapsable: false,
        children: ["/async", "/five-common-mistakes"],
      },
      {
        title: "Day 12",
        collapsable: false,
        children: ["/crud", "/test"],
      },
    ],
  },
};
