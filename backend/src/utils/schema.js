const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const logSchema = {
  type: "object",
  required: [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata",
  ],
  properties: {
    level: { type: "string", enum: ["error", "warn", "info", "debug"] },
    message: { type: "string" },
    resourceId: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
    traceId: { type: "string" },
    spanId: { type: "string" },
    commit: { type: "string" },
    metadata: {
      type: "object",
      required: ["parentResourceId"],
      properties: {
        parentResourceId: { type: "string" },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

const validate = ajv.compile(logSchema);

module.exports = {
  validateLog: (data) => {
    const isValid = validate(data);
    return {
      isValid,
      errors: validate.errors || [],
    };
  },
};
