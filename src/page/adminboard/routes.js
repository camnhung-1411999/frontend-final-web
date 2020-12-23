
import ListUser from './ListUser/ListUser';
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
];	

export default dashboardRoutes;