import usersController from "../controller/users/users.controller";
import { validateSchema } from "../utils/helper";
import listUsersSchema from "../json_schema/list-users.schema.json";

const dataSet = [
    {
        title: `can get list data users`,
        pageParam: 0,
        perPageParam: 0
    },
    {
        title: `can get list data users with undefined query param`,
        pageParam: undefined,
        perPageParam: undefined
    },
    {
        title: `can get list data users with null query param`,
        pageParam: null,
        perPageParam: null
    },
    {
        title: `can get list data users with specific page and per page`,
        pageParam: 1,
        perPageParam: 5
    },
    {
        title: `can get list data users with per page is more than total data`,
        pageParam: 1,
        perPageParam: 13
    },
    {
        title: `can get list data users with per page is equal to total data`,
        pageParam: 1,
        perPageParam: 12
    },
    {
        title: `can get list data users with next page`,
        pageParam: 2,
        perPageParam: 5
    },
    {
        title: `cannot get list data users with per page is more than total data and page is more than total pages`,
        pageParam: 2,
        perPageParam: 13
    }
]

describe(`Reqres API`, () => {
    describe(`Get list users`, () => {
        test.each(dataSet)(`As an admin, I $title`, async ({pageParam, perPageParam}) => {

            let data = {
                page: pageParam,
                per_page: perPageParam
            }

            const response = await usersController.getListUsers(data);
            expect(response.statusCode).toEqual(200);
            validateSchema(response.body, listUsersSchema);

            if(pageParam === 0) {
                expect(response.body.page).toEqual(1);
                expect(response.body.per_page).toEqual(6);
            }

            if(pageParam > 0) {
                expect(response.body.page).toEqual(pageParam);   
            }

            if(perPageParam > 0) {
                expect(response.body.per_page).toEqual(perPageParam);

                if(perPageParam > response.body.total && pageParam > response.body.total_pages) {
                    expect(response.body.data.length).toEqual(0);
                } else if (perPageParam > response.body.total) {
                    expect(response.body.data.length).toEqual(response.body.total);
                } else {
                    expect(response.body.data.length).toEqual(perPageParam);
                }
            }

            if(!perPageParam > response.body.total && !pageParam > response.body.total_pages) {
                expect(response.body.total_pages).toEqual(Math.ceil(response.body.total/perPageParam));
            }
        });
    });
})