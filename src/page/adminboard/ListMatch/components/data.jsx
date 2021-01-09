import { v4 as uuid } from 'uuid';
const boards = Array(20 * 20).fill(null);
boards[4]='X';
boards[5]='X';
boards[6]='O';
boards[7]='O';
boards[24]='O';
boards[25]='X';
boards[26]='O';
boards[44]='O';
boards[46]='X';
const historyMatch = {
  
}
export default [
  {
    "_id":{"$oid":"5fd9d2436f0c375c583576d3"},
    "roomId":"1001",
    "result": boards,
    "winner":"nhi",
    "loser":"lu",
    "createdAt":"16-12-2020 16:24:19",
    "chat": [{username:"nhi",message:"hii"},{username:"nhung",message:"hello"}],
    "__v":0
  },
  {
    "_id":{"$oid":"5fd9d2436f0c375c583576d3"},
    "roomId":"1111",
    "result": boards,
    "winner":"minh",
    "loser":"nhung",
    "createdAt":"16-12-2020 16:24:19",
    "chat": [{username:"nhi",message:"hii"},{username:"nhung",message:"hello"}],
    "__v":0
  },
  {
    "_id":{"$oid":"5fd9d2436f0c375c583576d3"},
    "roomId":"1002",
    "result": boards,
    "winner":"nhi",
    "loser":"nhung",
    "createdAt":"16-12-2020 16:24:19",
    "chat": [{username:"nhi",message:"hii"},{username:"nhung",message:"hello"}],
    "__v":0
  },
  {
    "_id":{"$oid":"5fd9d2436f0c375c583576d3"},
    "roomId":"1003",
    "result": boards,
    "winner":"nhung",
    "loser":"nhi",
    "createdAt":"16-12-2020 16:24:19",
    "chat": [{username:"nhi",message:"hii"},{username:"nhung",message:"hello"}],
    "__v":0
  },
  {
    "_id":{"$oid":"5fd9d2436f0c375c583576d3"},
    "roomId":"1004",
    "result": boards,
    "winner":"nhung",
    "loser":"lu",
    "createdAt":"16-12-2020 16:24:19",
    "chat": [{username:"nhi",message:"hii"},{username:"nhung",message:"hello"}],
    "__v":0
  },
  {
    "_id":{"$oid":"5fd9d2436f0c375c583576d3"},
    "roomId":"1005",
    "result": boards,
    "winner":"nhi",
    "loser":"lu",
    "createdAt":"16-12-2020 16:24:19",
    "chat": [{username:"nhi",message:"hii"},{username:"nhung",message:"hello"}],
    "__v":0
  }
];
