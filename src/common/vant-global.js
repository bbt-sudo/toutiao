import Vue from 'vue'  //引入vue

import { Button } from 'vant';  //按钮
import { Icon } from 'vant';  // icon图标
import { Toast } from 'vant';
import { Lazyload } from 'vant';
import { NavBar } from 'vant';

Vue.use(NavBar);
Vue.use(Lazyload);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Button);
