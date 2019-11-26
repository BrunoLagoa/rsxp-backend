"use strict";

const Drive = use("Drive");
const Helpers = use("Helpers");
const moment = require("moment");
const sharp = require("sharp");
var fs = require("fs");

const File = use("App/Models/File");

class FileController {
  async index({ request, response, view }) {
    const files = await File.query()
      .with("user")
      .fetch();

    return files;
  }

  async store({ request, response, auth }) {
    try {
      if (!request.file("file")) return;

      const upload = request.file("file", { size: "10mb" });

      const fileName = `${Date.now()}.jpg`;
      const path = moment().format("DD-MM-YYYY");

      await upload.move(Helpers.tmpPath(`uploads/temp`), {
        name: fileName
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      if (!fs.existsSync(Helpers.tmpPath(`uploads/${path}`))) {
        fs.mkdirSync(Helpers.tmpPath(`uploads/${path}`));
      }

      await sharp(Helpers.tmpPath(`uploads/temp/${fileName}`))
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(Helpers.tmpPath(`uploads/${path}/${fileName}`));

      const fileExist = await Drive.exists(`uploads/temp/${fileName}`);
      if (fileExist) {
        await Drive.delete(`uploads/temp/${fileName}`);
      }

      const file = await File.create({
        user_id: auth.user.id,
        file: fileName,
        name: upload.clientName.replace(" ", "-"),
        type: upload.type,
        subtype: upload.subtype,
        path: path
      });

      return file;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Error no upload de arquivo" } });
    }
  }

  async show({ params, response }) {
    try {
      const file = await File.findOrFail(params.id);

      return response.download(
        Helpers.tmpPath(`uploads/${file.path}/${file.file}`)
      );
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Arquivo não encontrado" } });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const file = await File.findOrFail(params.id);

      // verifica se o arquivo existe
      const fileExist = await Drive.exists(`uploads/${file.path}/${file.file}`);
      if (fileExist) {
        await Drive.delete(`uploads/${file.path}/${file.file}`);
      }

      await file.delete();
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Arquivo não encontrado" } });
    }
  }
}

module.exports = FileController;
