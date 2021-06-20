const setLoginStatus=(status)=>{
  return{
      type:'LOGIN_STATUS',
      payload:status
  }
}

export const setUsers=(users)=>{
  return{
      type:'SET_USERS',
      payload:users
  }
}

export default setLoginStatus