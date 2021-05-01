const users = [
    {
     username: "sneha",
     password: "amruth"
   },
   {
    username: "tintu",
    password: "chintu"
  },
  {
    username: "montu",
    password: "poppy"
  },
]

const findUserByUsername = (username) => {
   return users.find(user => user.username === username);
}

export const fakeAuthApi = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = findUserByUsername(username);
            if(user && user.password === password){
                resolve({success: true, status: 200});
            }
            reject({success: false, status: 401});
        }, 1000)
    }); 
}