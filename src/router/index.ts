import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MarkdownPreviewer from '../views/MarkdownPreviewer.vue'
import Calculator from '../views/Calculator.vue'
import Snake from '../views/Snake.vue'
import Tetris from '../views/Tetris.vue'
import BreakBrick from '../views/BreakBrick.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/markdown',
      name: 'markdown',
      component: MarkdownPreviewer
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: Calculator
    },
    {
      path: '/snake',
      name: 'snake',
      component: Snake
    },
    {
      path: '/tetris',
      name: 'tetris',
      component: Tetris
    },
    {
      path: '/breakbrick',
      name: 'breakbrick',
      component: BreakBrick
    }
  ]
})

export default router