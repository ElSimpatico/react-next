import authEs from "./auth/es.json";
import detailEs from "./detail/es.json";
import errorEs from "./error/es.json";
import homeEs from "./home/es.json";
import languagesEs from "./languages/es.json";
import sharedEs from "./shared/es.json";

const messages = {
    ...authEs,
    ...detailEs,
    ...errorEs,
    ...homeEs,
    ...languagesEs,
    ...sharedEs,
};

export default messages;
