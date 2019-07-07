module.exports = {
    title: 'Vue.js 정복 Camp 4기 학습 노트',
    description: '나는 오늘 무엇을 배웠는가',
    base: "/learning-note/",
    head: [
      ['link', {
        rel: 'icon',
        href: '/logo.png'
      }]
    ],
    themeConfig: {
      sidebar: [
        {
          title: 'Day 1',
          collapsable: false,
          children: [
              '/vuepress',
              '/instance'
          ]
        },
        {
          title: 'Day 2',
          collapsable: false,
          children: [
              '/components',
              '/props'
          ]
        },
        {
          title: 'Day 3',
          collapsable: false,
          children: [
              '/event-emit',
              '/axious',
              '/lifecycle'
          ]
        },
        {
          title: 'Day 4',
          collapsable: false,
          children: [
              '/template',
              '/components-communication',
              '/cli'
          ]
        }
      ]
    }
  }
