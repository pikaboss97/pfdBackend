const mongoose = require("mongoose");

const NotaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    apCredits: {
      type: Number,
      required: true,
    },
    matCredits: {
      type: Number,
      required: true,
    },
    eCourses: {
        type: Number,
        required: true,
      },
    fCourses: {
      type: Number,
      required: true,
    },
    ppp: {
      type: Boolean,
      required: true,
    },
    ponderados: {
      type: Number,
      required: true,
    },
    asignaturas: [
      {
        nombre: {
          type: String,
          required: true,
        },
        codigo: {
          type: String,
          required: true,
        },
        creditos: {
          type: Number,
          required: true,
        },
        electivo: {
          type: Boolean,
          required: true,
        },
        aprobado: {
          type: Boolean,
          required: true,
        },
        nota: {
          type: Array,
          required: true,
        },
        matriculado: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("notas", NotaSchema);
