import { createRouter, createWebHistory } from 'vue-router';
import $bus, { eventTypes } from '@/eventBus/events';
import { auth } from '@/middlewares';

// Layouts
const Public = () => import(/* webpackChunkName: "Layout" */ 'layouts/Public');
const Secured = () => import(/* webpackChunkName: "Layout" */ 'layouts/Secured');

// GeneralViews
const PageNotFound = () => import(/* webpackChunkName: "Pages" */ 'views/public/NotFoundPage');

// Public Pages
const About = () => import(/* webpackChunkName: "Pages" */ 'views/public/About');

// Auth Pages
const Login = () => import(/* webpackChunkName: "AuthPages" */ 'views/auth/Login');
const Register = () => import(/* webpackChunkName: "Register" */ 'views/auth/Register.vue');
const Verify = () => import(/* webpackChunkName: "Register" */ 'views/auth/Verify.vue');

// Secured Pages
const Dashboard = () => import(/* webpackChunkName: "dashboard page" */ 'views/dashboard/Dashboard.vue');
const CategoryPage = () => import(/* webpackChunkName: "users" */ 'views/product/ProductCategory.vue');
const ProductPage = () => import(/* webpackChunkName: "users" */ 'views/product/Product.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      component: Public,
      redirect: '/login',
      children: [
        {
          path: 'login',
          name: 'Login',
          meta: {
            title: 'Login',
          },
          component: Login,
        },
        {
          path: 'register',
          name: 'Register',
          meta: {
            title: 'Registration',
          },
          component: Register,
        },
        {
          path: 'verify',
          name: 'VerifyUser',
          meta: {
            title: 'Verify User Email',
          },
          component: Verify,
        },
        {
          path: 'about',
          name: 'About',
          meta: {
            title: 'About us',
          },
          component: About,
        },
      ],
    },
    {
      path: '/dashboard',
      component: Secured,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          meta: {
            title: 'Dashboard',
            requiresAuth: true,
          },
          component: Dashboard,
        },
      ],
    },
    {
      path: '/',
      component: Secured,
      children: [
        {
          path: '/categories/:category',
          name: 'CategoryPage',
          meta: {
            title: 'Category Page',
            requiresAuth: true,
          },
          component: CategoryPage,
        },
        {
          path: '/:category/product/:productId',
          name: 'ProductPage',
          meta: {
            title: 'Product Page',
            requiresAuth: true,
          },
          component: ProductPage,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: Public,
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'PageNotFound',
          meta: {
            title: 'Page Not Found',
          },
          component: PageNotFound,
        },
      ],
    },
  ],
});

router.beforeEach(async (from, to, next) => {
  return auth(from, to, next);
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    $bus.$emit(eventTypes.viewed_page, {
      ...to,
      name: document.title,
    });
  }

  const defaultDocumentTitle = import.meta.env.VITE_APP_NAME;
  if (to.name) {
    document.title = `${String(to.meta.title)} — ${defaultDocumentTitle}`;
  } else {
    document.title = defaultDocumentTitle;
  }
});

export default router;
