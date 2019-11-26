'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { v1: 'API REST RSXP' }
})

/**
 * ROUTE SESSION JWT
 */
Route.post('sessions', 'SessionController.store').validator('Session')

/**
 * ROUTE USUARIO
 */
Route.get('users', 'UserController.index').middleware(['auth'])
Route.post('users', 'UserController.store').validator('User')

/**
 * ROUTE FORGOT PASSWORD
 */
// Route.post('passwords', 'ForgotPasswordController.store').validator(
//   'ForgotPassword'
// )
// Route.put('passwords', 'ForgotPasswordController.update').validator(
//   'ResetPassword'
// )

/**
 * ROUTE FILE
 */
Route.group(() => {
  Route.resource('files', 'FileController')
    .apiOnly()
    .except(['show', 'update'])
    .validator(new Map([[['files.store'], ['File']]]))
}).middleware(['auth'])
Route.get('files/:id', 'FileController.show')

/**
 * ROUTE GROUP
 */
Route.group(() => {
  // ROUTE PERFIL USER
  Route.resource('perfiluser', 'PerfilUserController').apiOnly()
