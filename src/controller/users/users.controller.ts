import supertest from 'supertest';
const request = supertest(`${process.env.BASE_URL}`);

class UsersController {
    getListUsers(data: {[key: string]: number}) {
        return request.get(`/users`)
        .query(data)
    }

    postUser(data: {[key: string]: any}) {
        return request.post(`/users`)
        .send(data)
    }
}

export default new UsersController();