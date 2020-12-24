
import ListUser from './ListUser/ListUser';
import {ListMatch} from './ListMatch';
import {UserDetail} from './UserDetail';	

const dashboardRoutes = [	
  {	
    path: "/list",		
    component: ListUser,	
    layout: "/adminboard"	
  },	
  {	
    path: "/user",		
    component: UserDetail,	
    layout: "/adminboard"	
  },	
  {	
    path: "/match",		
    component: ListMatch,	
    layout: "/adminboard"	
  },	
];	

export default dashboardRoutes;