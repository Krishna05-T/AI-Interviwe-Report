import { Router} from "express"
import { getUser, loggoutUser, loginUser, UpdatePass, userRegister, verifyEmailOtp } from "../controller/user.controller.js";
import { JWTverify } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/verify-email").post(verifyEmailOtp);
router.route("/login").post(loginUser);
router.route("/logout").post(JWTverify, loggoutUser)
router.route("/get-user").get(JWTverify, getUser)
router.route("/update-password").post(JWTverify, UpdatePass)
export default router;