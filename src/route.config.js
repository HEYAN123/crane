/* eslint-disable global-require */
import navConfig from './nav.config.json';

// 组件----------------------------
const LOAD_MAP = {
    'zh-CN': (name) => (r) => require.ensure([], () => r(require(`./pages/${name}.vue`)), 'zh-CN'),
};

// 引用组件方法
const load = function (lang, path) {
    return LOAD_MAP[lang](path);
};


// 文档--------------------------------
const LOAD_DOCS_MAP = {
    'zh-CN': (path) => (r) => require.ensure([], () => r(require(`./docs/${path}.md`)), 'zh-CN'),
};

// 引用文档方法
const loadDocs = function (lang, path) {
    return LOAD_DOCS_MAP[lang](path);
};

// 路由配置------------------------------------

// 注册路由
const registerRoute = (navConf) => {
    const route = [];
    // 添加一个路由
    function addRoute(page, lang, index) {
        // changelog引用组件；其他页面引用文档
        const component = page.path === '/changelog'
            ? load(lang, 'changelog')
            : loadDocs(lang, page.path);
        // 生成子路由
        const child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description,
                lang,
            },
            name: `component-${lang}${page.title || page.name}`,
            component: component.default || component,
        };

        route[index].children.push(child);
    }
    Object.keys(navConf).forEach((lang, index) => {
        const navs = navConf[lang];
        // 直接访问“组件”时重定向到“安装”文档
        route.push({
            path: `/${lang}/component`,
            redirect: `/${lang}/component/installation`,
            component: load(lang, 'component'),
            children: [],
        });
        navs.forEach((nav) => {
            if (nav.href) return;
            if (nav.groups) {
                nav.groups.forEach((group) => {
                    group.list.forEach((nav2) => {
                        addRoute(nav2, lang, index);
                    });
                });
            } else if (nav.children) {
                nav.children.forEach((nav2) => {
                    addRoute(nav2, lang, index);
                });
            } else {
                addRoute(nav, lang, index);
            }
        });
    });

    return route;
};

let route = registerRoute(navConfig);

// const generateMiscRoutes = function (lang) {
//
//
//     const themeRoute = {
//         path: `/${lang}/theme`,
//         component: load(lang, 'theme-nav'),
//         children: [
//             {
//                 path: '/', // 主题管理
//                 name: `theme${lang}`,
//                 meta: { lang },
//                 component: load(lang, 'theme'),
//             },
//             {
//                 path: 'preview', // 主题预览编辑
//                 name: `theme-preview-${lang}`,
//                 meta: { lang },
//                 component: load(lang, 'theme-preview'),
//             }],
//     };
//
//     const resourceRoute = {
//         path: `/${lang}/resource`, // 资源
//         meta: { lang },
//         name: `resource${lang}`,
//         component: load(lang, 'resource'),
//     };
//
//     const indexRoute = {
//         path: `/${lang}`, // 首页
//         meta: { lang },
//         name: `home${lang}`,
//         component: load(lang, 'index'),
//     };
//
//     return [resourceRoute, themeRoute, indexRoute];
// };

route.push({
    path: '/play',
    name: 'play',
    component: require('./play/index.vue'),
});

let defaultPath = '/zh-CN';

route = route.concat([{
    path: '/',
    redirect: defaultPath,
}, {
    path: '*',
    redirect: defaultPath,
}]);

export default route;
