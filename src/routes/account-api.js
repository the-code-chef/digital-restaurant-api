import {createController} from 'awilix-koa'
import bodyParser from "koa-bodyparser";

/**
 * Account API controller abstraction.
 * This file contains functions that map HTTP calls to the AccountService.
 */
const api = accountService => ({
    loginAccount: async ctx => ctx.ok(await accountService.login(ctx)),
    logoutAccount: async ctx => ctx.ok(await accountService.logout(ctx)),
    createAccount: async ctx => ctx.created(await accountService.create(ctx)),
});

/**
 * Maps routes to method calls on the API controller (above).
 */
export default createController(api)
    .prefix('/account')
    .post('/login', 'loginAccount', {
        // Maps `POST /todos` to the `createTodo` function on the returned object from `API`
        before: [bodyParser()] // Runs the bodyParser just for this endpoint
    })
    .get('/logout', 'logoutAccount')
    .post('/signup', 'createAccount', {
        // Maps `POST /todos` to the `createTodo` function on the returned object from `API`
        before: [bodyParser()] // Runs the bodyParser just for this endpoint
    });
