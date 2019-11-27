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
Route.get("talks", "TalkController.index");
Route.post("talks", "TalkController.store");
Route.get("talks/:id", "TalkController.show");
Route.put("talks/:id", "TalkController.update");

//courses routers return default courses to be used into Talks
Route.get("courses", "CourseController.index");
Route.get("courses", "CourseController.show");
Route.post("courses", "CourseController.store");
Route.put("courses/:id", "CourseController.update");
