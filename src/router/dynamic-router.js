// 班级管理
const Class = () => import('@/pages/class-manage')
const ClassList = () => import('@/pages/class-manage/class-list')
const ClassOperate = () => import('@/pages/class-manage/class-operate')

// 通知管理
const Notice = () => import('@/pages/notice-manage')
const NoticeList = () => import('@/pages/notice-manage/notice-list')
const NoticeOperate = () => import('@/pages/notice-manage/notice-operate')

/* 订单管理 */
const Order = () => import('@/pages/order-manage')
const OrderList = () => import('@/pages/order-manage/order-list')
const ProductManage = () => import('@/pages/order-manage/product-manage')
const ProductionList = () =>
    import('@/pages/order-manage/product-manage/production-list')
const ReviewManage = () =>
    import('@/pages/order-manage/product-manage/review-manage')
const ReturnGoods = () => import('@/pages/order-manage/return-goods')

/* 产品管理 */
const Goods = () => import('@/pages/goods-manage')
const GoodsList = () => import('@/pages/goods-manage/goods-list')
const GoodsClassify = () => import('@/pages/goods-manage/goods-classify')
// 权限管理
const Permission = () => import('@/pages/permission')
const UserManage = () => import('@/pages/permission/user-manage')
const RoleManage = () => import('@/pages/permission/role-manage')
// const MenuManage = () => import('@/pages/permission/menu-manage')
/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/class',
        component: Class,
        name: 'class.manage',
        meta: {
            name: '班级管理',
            icon: 'example'
        },
        children: [
            {
                path: 'list',
                name: 'class.list',
                component: ClassList,
                meta: {
                    name: '班级列表',
                    icon: 'table'
                }
            },
            {
                path: 'operate',
                name: 'class.operate',
                component: ClassOperate,
                meta: {
                    name: '班级管理',
                    icon: 'table'
                }
            }
        ]
    },
    {
        path: '/notice',
        component: Notice,
        name: 'notice.manage',
        meta: {
            name: '通知管理',
            icon: 'example'
        },
        children: [
            {
                path: 'list',
                name: 'notice.list',
                component: NoticeList,
                meta: {
                    name: '通知列表',
                    icon: 'table'
                }
            },
            {
                path: 'operate',
                name: 'notice.operate',
                component: NoticeOperate,
                meta: {
                    name: '通知管理',
                    icon: 'table'
                }
            }
        ]
    },
    {
        path: '/order',
        component: Order,
        name: 'order-manage',
        meta: {
            name: '订单管理',
            icon: 'example'
        },
        children: [
            {
                path: 'list',
                name: 'order-list',
                component: OrderList,
                meta: {
                    name: '订单列表',
                    icon: 'table'
                }
            },
            {
                path: 'product',
                name: 'product-manage',
                component: ProductManage,
                meta: {
                    name: '生产管理',
                    icon: 'user'
                },
                children: [
                    {
                        path: 'list',
                        name: 'product-list',
                        component: ProductionList,
                        meta: {
                            name: '生产列表',
                            icon: 'table'
                        }
                    },
                    {
                        path: 'review',
                        name: 'review-manage',
                        component: ReviewManage,
                        meta: {
                            name: '审核管理',
                            icon: 'eye'
                        }
                    }
                ]
            },
            {
                path: 'returnGoods',
                name: 'return-goods',
                component: ReturnGoods,
                meta: {
                    name: '退货管理',
                    icon: 'nested'
                }
            }
        ]
    },
    {
        path: '/goods',
        component: Goods,
        name: 'goods',
        meta: {
            name: '产品管理',
            icon: 'user'
        },
        children: [
            {
                path: 'list',
                name: 'goods-list',
                component: GoodsList,
                meta: {
                    name: '产品列表',
                    icon: 'table'
                }
            },
            {
                path: 'classify',
                name: 'goods-classify',
                component: GoodsClassify,
                meta: {
                    name: '产品分类',
                    icon: 'tree'
                }
            }
        ]
    },
    {
        path: '/permission',
        component: Permission,
        name: 'permission',
        meta: {
            name: '权限管理',
            icon: 'table'
        },
        children: [
            {
                path: 'user',
                name: 'user.manage',
                component: UserManage,
                meta: {
                    name: '用户管理',
                    icon: 'table'
                }
            },
            {
                path: 'role',
                name: 'role.manage',
                component: RoleManage,
                meta: {
                    name: '角色管理',
                    icon: 'eye'
                }
            }
            // {
            //     path: 'menu',
            //     name: 'menu.manage',
            //     component: MenuManage,
            //     meta: {
            //         name: '菜单管理',
            //         icon: 'tree'
            //     }
            // }
        ]
    }
]

export default dynamicRoutes
