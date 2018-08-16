class Users {
    constructor() {
        this.users = [];
    }

    addUser(user){
        return this.users.push(user);
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
        let usersInRoom = usersOfRoom.map((user) => user.name);

        return usersInRoom;
    }

    getActiveRooms(){
        let rooms = this.users.map((user) => user.room);

        return rooms;
    }
}

module.exports = {Users};