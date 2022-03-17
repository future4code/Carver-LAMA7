import app from "./app";
import { BandController } from "./controller/BandController";
import { UserController } from "./controller/UserController";

// Users
const userController = new UserController()

app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)


// Bands
const bandController = new BandController()

app.post("/band/register", bandController.register)
app.get("/band", bandController.findBandByIdOrName)