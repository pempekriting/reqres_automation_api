import usersController from '../controller/users/users.controller';
import createUserSchema from '../json_schema/create-user.schema.json';
import { faker } from '@faker-js/faker';
import { validateSchema } from '../utils/helper';

let dataSet = [
    {
        title: `can create new users with valid data`,
        nameParam: `${faker.person.prefix()} ${faker.person.fullName()}`,
        jobParam: faker.person.jobTitle(),
        idParam: `id-user-${faker.number.int()}`
    },
    {
        title: `can create new users without name`,
        nameParam: ``,
        jobParam: faker.person.jobTitle(),
        idParam: `id-user-${faker.number.int()}`
    },
    {
        title: `can create new users without job`,
        nameParam: `${faker.person.prefix()} ${faker.person.fullName()}`,
        jobParam: ``,
        idParam: `id-user-${faker.number.int()}`
    },
    {
        title: `can create new users without id`,
        nameParam: `${faker.person.prefix()} ${faker.person.fullName()}`,
        jobParam: faker.person.jobTitle(),
        idParam: ``
    }
]

let negativeDataSet = [
    { title: `zero`, value: 0},
    { title: `null`, value: null},
    { title: `undefined`, value: undefined}
]

describe(`Reqres API`, () => {
    describe(`Create user`, () => {
        test.each(dataSet)(`As an admin, I $title`, async ({nameParam, jobParam, idParam}) => {
            let data = {
                name: nameParam,
                job: jobParam,
                id: idParam
            }

            const response = await usersController.postUser(data);
            expect(response.statusCode).toEqual(201);
            expect(response.body.name).toEqual(nameParam);
            expect(response.body.job).toEqual(jobParam);
            idParam !== `` ? expect(response.body.id).toEqual(idParam) : expect(response.body.id).toBeTruthy();
            validateSchema(response.body, createUserSchema);
        });

        it.each(negativeDataSet)(`As an admin, I cannot create a new user with $title name`, async ({value}) => {
            let data = {
                name: value,
                job: `${faker.person.prefix()} ${faker.person.fullName()}`,
                id: `id-user-${faker.number.int()}`
            }

            const response = await usersController.postUser(data);
            expect(response.statusCode).toEqual(400);
        });

        it.each(negativeDataSet)(`As an admin, I cannot create a new user with $title job`, async ({value}) => {
            let data = {
                name: `${faker.person.prefix()} ${faker.person.fullName()}`,
                job: value,
                id: `id-user-${faker.number.int()}`
            }

            const response = await usersController.postUser(data);
            expect(response.statusCode).toEqual(400);
        });

        it.each(negativeDataSet)(`As an admin, I cannot create a new user with $title job`, async ({value}) => {
            let data = {
                name: `${faker.person.prefix()} ${faker.person.fullName()}`,
                job: `${faker.person.prefix()} ${faker.person.fullName()}`,
                id: value
            }

            const response = await usersController.postUser(data);
            expect(response.statusCode).toEqual(400);
        });
    });
});