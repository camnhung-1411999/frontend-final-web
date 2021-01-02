
import ListUser from './ListUser/ListUser';
import {ListMatch} from './ListMatch';
import {AdminAccount} from './AdminAccount';	
import {UserDetail} from './UserDetail';	

const dashboardRoutes = [	
  {	
    path: "/list",		
    component: ListUser,	
    layout: "/adminboard"	
  },	
  {	
    path: "/account",		
    component: AdminAccount,	
    layout: "/adminboard"	
  },	
  {	
    path: "/match",		
    component: ListMatch,	
    layout: "/adminboard"	
  },	
  {	
    path: "/user/:id",		
    component: UserDetail,	
    layout: "/adminboard"	
  },	
];	

export default dashboardRoutes;