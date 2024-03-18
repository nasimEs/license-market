import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import NProgress from 'vue-nprogress'
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  NProgress.start()
  // Corrected token retrieval
  if (authStore.isLogin) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
