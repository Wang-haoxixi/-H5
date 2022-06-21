/*
 * @Description: 
 * @Author: xxx
 * @Date: 2022-06-06 16:52:48
 * @LastEditors: xxx
 * @LastEditTime: 2022-06-10 09:23:11
 */

// 导入vue
import Vue from 'vue'

/**
 * 导入所需要用到的vant组件
 */
import { Button } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Card } from 'vant';
import { Empty } from 'vant';
import { Search } from 'vant';
import { IndexBar, IndexAnchor } from 'vant';
import { Cell, CellGroup } from 'vant';
import { List } from 'vant';

// 全局注册
Vue.use(Button)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.use(Empty);
Vue.use(Search);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);