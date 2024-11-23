var assert = require("assert");
const chai = require("chai");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const expect = chai.expect;
const httpHelper = require("../httpHelper");
const url = "http://localhost:3000";

describe("Pruebas al modulo de Curricula", function () {
  it("obtener la lista de curriculas", async function () {
    const list = await httpHelper.get(url, "/curricula/list");
    console.log(list.body);
    expect(list.body).to.not.be.null;
    expect(list.status).to.equal(200);
  });

  it("Endpoint incorrecto", async function () {
    const list = await httpHelper.get(url, "/curricula/nolist");
    expect(list.status).to.equal(404);
  });

  it("obtener curricula por id existente", async function () {
    const list = await httpHelper.get(url, "/curricula?ep=FIIS2018");
    console.log(list.body);
    expect(list.body).to.not.be.null;
    expect(list.status).to.equal(200);
  });

  it("obtener curricula por id inexistente", async function () {
    const CURRICULA = await httpHelper.get(url, "/curricula?ep=NOEXISTE");
    expect(CURRICULA.status).to.equal(500);
    expect(CURRICULA.text).to.equal("ESCUELA NO REGISTRADA");
  });
});

describe("Pruebas al modulo de Record de Notas", () => {
  it("Enviar record correctamente", async () => {
    try {
      const baseDir = path.dirname(__dirname);
      const fileData = await fs.promises.readFile(baseDir + '/src/assets/dayana' + '.pdf');
      const formData = new FormData();
      formData.append('pdfFile', fileData, { filename: 'dayana.pdf' }); // 'file' es el nombre del campo en el formulario
  
      const response = await axios.post(url +'/record', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante: Establecer el tipo de contenido adecuado
        },
      });
      console.log(response.data);
      expect(response.body).to.not.be.null;
      expect(response.status).to.equal(200);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  it("Enviar record incorrecto", async () => {
    try {
      const baseDir = path.dirname(__dirname);
      const fileData = await fs.promises.readFile(baseDir + '/src/assets/SeccionSegunda-2' + '.pdf');
      const formData = new FormData();
      formData.append('pdfFile', fileData, { filename: 'SeccionSegunda-2.pdf' }); // 'file' es el nombre del campo en el formulario
  
      const response = await axios.post(url +'/record', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante: Establecer el tipo de contenido adecuado
        },
      });
    } catch (error) {
      expect(error.response.status).to.equal(500);

    }
  });
});
