/**
 * Configuration of the server middlewares.
 */
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const routes = require("../routes/routes");
const isTest = process.env.NODE_ENV === "test";
const isDev = process.env.NODE_ENV === "development";
const { errorHandler, errorHandlerAll } = require("../middleware/errorHandler");

exports.app = (app) => {
    //#region Logger Middleware
    if (isDev && !isTest) {
        app.use(morgan("combined"));
    }
    //#endregion

    //#region CORS && HELMET && SWAGGER Middleware
    app.use(cors());
    app.use(expressSanitizer());
    app.use(helmet());
    app.use(helmet.hidePoweredBy({ setTo: "The Idea Factory 2020" }));
    app.use(
        helmet.hsts({
            // Must be at least 1 year to be approved
            maxAge: 31536000,
            // Must be enabled to be approved
            includeSubDomains: true,
            preload: true,
        })
    );
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard({ action: "deny" }));
    // app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerObject));
    //#endregion

    //#region  BodyParser Middleware
    app.use(bodyParser.json());
    //#endregion

    //#region Base-Routes
    app.use("/api", routes);
    //#endregion

    //#region Error-Handler Middleware
    app.use(errorHandler);
    app.use(errorHandlerAll);
    //#endregion
};