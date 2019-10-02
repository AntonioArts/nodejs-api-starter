import pingRoutes from "./ping/routes";
import userRoutes from "./user/routes";
import pushRoutes from "./push/routes";

export default [
    ...pingRoutes, 
    ...userRoutes, 
    ...pushRoutes,
];