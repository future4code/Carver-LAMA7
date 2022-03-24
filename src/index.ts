import app from "./app";
import { BandController } from "./controller/BandController";
import { UserController } from "./controller/UserController";
import { ShowController} from "./controller/ShowController";

// Users
const userController = new UserController()

app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)


// Bands
const bandController = new BandController()

app.post("/band/register", bandController.register)
app.get("/band", bandController.findBandByIdOrName)

// Shows
const showController = new ShowController()
app.post('/show/register', showController.createShow)
app.get("/show", showController.getAllShowsByDay)