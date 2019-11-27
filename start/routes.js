"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { v1: "API REST RSXP" };
});

Route.get("users", "UserController.index");
Route.post("users", "UserController.store");
Route.put("users/:id", "UserController.update");
Route.get("users/:id", "UserController.show");

Route.post("sessions", "SessionController.store");

Route.post("passwords", "ForgotPasswordController.store");
Route.put("passwords", "ForgotPasswordController.update");

Route.get("/files", "FileController.index");
Route.get("/files/:id", "FileController.show");
Route.post("/files", "FileController.store");


//Talks router where return SPEAKER,SCHOOL and date/hour
Route.get("talks", "TalksController.index");
Route.post("talks", "TalksController.store");
Route.put("talks/:id", "TalksController.update");

//courses routers return default courses to be used into Talks
Route.get("courses", "CoursesController.index");
Route.post("courses", "CoursesController.store");
Route.put("courses/:id", "CoursesController.update");
