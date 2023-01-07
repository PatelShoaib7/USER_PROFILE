
export const get_singal_User =((value)=> `https://randomuser.me/api?seed=${value}`)

export const GetData =(slectVal)=> `https://randomuser.me/api/?page=3&results=${slectVal}`
   
export const GetData_OF_Body =(page,slectVal)=>`https://randomuser.me/api/?page=${page}&results=${slectVal}`