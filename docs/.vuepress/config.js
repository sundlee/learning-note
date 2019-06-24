module.exports = {
    title: 'Vue.js 정복 학습 노트',
    description: '나는 오늘 무엇을 배웠는가',
    base: "/vue-camp/",
    head: [
      ['link', {
        rel: 'icon',
        href: '/logo.png'
      }]
    ],
    themeConfig: {
      sidebar: [
        '/day1',
        {
          title: 'Day 2',
          collapsable: false,
          children: [
              '/components',
          ]
        }
      ],
      nav: [
        {
          text: 'Text Book',
          link: '/textbook'
        },
        {
          text: 'FrontEnd Development',
          link: '/front-dev'
        },
        {
          text: 'Online Courses',
          link: 'https://www.inflearn.com/?post_type=course&s=%EC%9E%A5%EA%B8%B0%ED%9A%A8'
        },
        {
          text: 'More Articles',
          link: 'https://joshua1988.github.io/'
        }
      ]
    }
  }
