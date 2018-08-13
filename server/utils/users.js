class Users {
    constructor() {
        this.users = [];
    }

    addUser(user){
        this.users.push(user);
    }

    removeUser(id){
        let user = this.getUser(id);

        if(user)
            this.users = this.users.filter((user) => user.id !== id);
        
        return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room){
        let usersOfRoom = this.users.filter((user) => user.room === room);
        let namesOfRoom = usersOfRoom.map((user) => user.name);

        return namesOfRoom;
    }
}

module.exports = {Users};