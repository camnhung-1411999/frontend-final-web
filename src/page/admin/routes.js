
import Person from "@material-ui/icons/Person";	
import TableList from "./ListUser/TableList";	

const dashboardRoutes = [	
  {	
    path: "/table",	
    name: "User manage",	
    rtlName: "قائمة الجدول",	
    icon: Person,	
    component: TableList,	
    layout: "/admin"	
  },	
];	

export default dashboardRoutes;