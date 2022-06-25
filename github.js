class Github {

    constructor() {
        this.url = "https://api.github.com/users/";
    }

    async getUser(username) {
        const responseUser = await fetch(this.url + username); 
        const userData = await responseUser.json(); 
       return  userData
        
    }

      async getRepos(username) {
        const responseRepos = await fetch(this.url + username + "/repos"); 
        const repData = await responseRepos.json(); 
       return  repData
        
    }

      
}





























