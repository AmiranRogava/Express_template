
import testing from "./controllers/testing.mjs"
import userC from "./controllers/userController.mjs"
import audioC from "./controllers/audioController.mjs"
import imageC from "./controllers/imageController.mjs";
import { checkAdmin } from "./middlewares/isAdmin.mjs"



const routes = (app)=> {
    app.route("/test")
    .post(testing.test);

    app.route("/user/:id")
    .delete(userC.del)

    app.route("/user")
    .post( userC.reg);

    app.route("/change_user")
    .post(checkAdmin, userC.change);

    app.route("/upload_image")
    .post(imageC.uploadImage)


    app.route("/get_image")
    .get(imageC.imageSend)


    
    app.route("/upload_audio")
    .post(audioC.uploadAudio)


    app.route("/get_audio/:audioId")
    .get(audioC.audioSend)
    
    
    
}

export {routes}