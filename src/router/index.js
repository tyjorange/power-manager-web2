import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },

  {
    path: '/monitor',
    component: Layout,
    redirect: '/realData',
    name: 'Monitor',
    meta: {
      title: 'Monitor',
      icon: 'example'
    },
    children: [{
        path: '/realData',
        name: 'RealData',
        component: () => import('@/views/monitor/realdata/index'),
        meta: {
          title: 'RealData',
          icon: 'table'
        }
      },
      {
        path: '/hisData',
        name: 'HisData',
        component: () => import('@/views/monitor/hisdata/index'),
        meta: {
          title: 'HisData',
          icon: 'nested'
        }
      },
      {
        path: '/pointUsed',
        name: 'PointUsed',
        component: () => import('@/views/monitor/pointused/index'),
        meta: {
          title: 'PointUsed',
          icon: 'edit'
        }
      }
    ]
  },

  {
    path: '/quality',
    component: Layout,
    redirect: '/powerFactor',
    name: 'Quality',
    meta: {
      title: 'Quality',
      icon: 'size'
    },
    children: [{
        path: '/powerFactor',
        name: 'PowerFactor',
        component: () => import('@/views/form/index'),
        meta: {
          title: 'PowerFactor',
          icon: 'guide'
        }
      },
      {
        path: '/loadRate',
        name: 'LoadRate',
        component: () => import('@/views/form/index'),
        meta: {
          title: 'LoadRate',
          icon: 'eye'
        }
      }, {
        path: '/pointCurve',
        name: 'PointCurve',
        component: () => import('@/views/form/index'),
        meta: {
          title: 'PointCurve',
          icon: 'clipboard'
        }
      }, {
        path: '/unbalanceRate',
        name: 'UnbalanceRate',
        component: () => import('@/views/form/index'),
        meta: {
          title: 'UnbalanceRate',
          icon: 'drag'
        }
      }, {
        path: '/balanceReport',
        name: 'BalanceReport',
        component: () => import('@/views/form/index'),
        meta: {
          title: 'BalanceReport',
          icon: 'nested'
        }
      }, {
        path: '/alarmRecord',
        name: 'AlarmRecord',
        component: () => import('@/views/form/index'),
        meta: {
          title: 'AlarmRecord',
          icon: 'tab'
        }
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/gradeSubentry',
    name: 'Statistics',
    meta: {
      title: 'Statistics',
      icon: 'nested'
    },
    children: [{
      path: '/gradeSubentry',
      name: 'GradeSubentry',
      component: () => import('@/views/statistics/GradeSubentry'),
      meta: {
        title: 'GradeSubentry',
        icon: 'form'
      }
    }, {
      path: '/gradeTime',
      name: 'GradeTime',
      component: () => import('@/views/statistics/GradeTime'),
      meta: {
        title: 'GradeTime',
        icon: 'form'
      }
    }, {
      path: '/classifyItemTime',
      name: 'ClassifyItemTime',
      component: () => import('@/views/statistics/ClassifyItemTime'),
      meta: {
        title: 'ClassifyItemTime',
        icon: 'form'
      }
    }, {
      path: '/classifySumm',
      name: 'ClassifySumm',
      component: () => import('@/views/statistics/ClassifySumm'),
      meta: {
        title: 'ClassifySumm',
        icon: 'form'
      }
    }, {
      path: '/compHorizontal',
      name: 'CompHorizontal ',
      component: () => import('@/views/statistics/CompH'),
      meta: {
        title: 'CompHorizontal',
        icon: 'form'
      }
    }, {
      path: '/compVertical ',
      name: 'CompVertical',
      component: () => import('@/views/statistics/CompV'),
      meta: {
        title: 'CompVertical',
        icon: 'form'
      }
    }, {
      path: '/compSameTerm ',
      name: 'CompSameTerm',
      component: () => import('@/views/statistics/CompSameTerm'),
      meta: {
        title: 'CompSameTerm',
        icon: 'form'
      }
    }, {
      path: '/usedReport ',
      name: 'UsedReport',
      component: () => import('@/views/statistics/UsedReport'),
      meta: {
        title: 'UsedReport',
        icon: 'form'
      }
    }]
  },

  {
    path: '/record',
    component: Layout,
    redirect: '/enterprise',
    name: 'Record',
    meta: {
      title: 'Record',
      icon: 'message'
    },
    children: [{
        path: '/enterprise',
        name: 'Enterprise',
        component: () => import('@/views/record/Enterprise'),
        meta: {
          title: 'Enterprise',
          icon: 'tree'
        }
      },
      {
        path: '/energyStructure',
        name: 'EnergyStructure',
        component: () => import('@/views/record/energyStructure/index'),
        meta: {
          title: 'EnergyStructure',
          icon: 'tree'
        }
      },
      {
        path: '/rtuManage',
        name: 'RtuManage',
        component: () => import('@/views/record/RtuManage'),
        meta: {
          title: 'RtuManage',
          icon: 'tree'
        }
      },
      {
        path: '/balanceFormula',
        name: 'BalanceFormula',
        component: () => import('@/views/tree/index'),
        meta: {
          title: 'BalanceFormula',
          icon: 'tree'
        }
      },
      {
        path: '/alarmParam',
        name: 'AlarmParam',
        component: () => import('@/views/tree/index'),
        meta: {
          title: 'AlarmParam',
          icon: 'tree'
        }
      }
    ]
  },

  {
    path: '/webSystem',
    component: Layout,
    redirect: '/accountManageInit',
    name: 'WebSystem',
    alwaysShow: true,
    meta: {
      title: 'WebSystem',
      icon: 'peoples'
    },
    children: [{
      path: '/accountManageInit',
      name: 'AccountManageInit',
      component: () => import('@/views/table/index'),
      meta: {
        title: 'AccountManageInit',
        icon: 'people'
      }
    }, ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
