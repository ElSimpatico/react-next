import authEs from "./auth/es.json";
import languagesEs from "./languages/es.json";
import sharedEs from "./shared/es.json";
import errorEs from "./error/es.json";

const messages = {
    ...authEs,
    ...languagesEs,
    ...sharedEs,
    ...errorEs,
};

export default messages;
