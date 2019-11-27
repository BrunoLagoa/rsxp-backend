"use strict";

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
const Route = use("Route");

Route.get("/", () => {
  return { v1: "API REST RSXP" };
});

/**
 * ROUTE USUARIO
 */
Route.get("users", "UserController.index");
Route.post("users", "UserController.store");
Route.put("categories/:id", "CategoryController.update").middleware(["auth"]);


Route.get("talks", "TalksController.index");
Route.post("talks", "TalksController.store");
Route.put("talks/:id", "TalksController.update");

Route.get("courses", "CoursesController.index");
Route.post("courses", "CoursesController.store");
Route.put("courses/:id", "CoursesController.update");
