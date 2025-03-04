import authEn from "./auth/en.json";
import errorEn from "./error/en.json";
import homeEn from "./home/en.json";
import languagesEn from "./languages/en.json";
import sharedEn from "./shared/en.json";

const messages = {
    ...authEn,
    ...errorEn,
    ...homeEn,
    ...languagesEn,
    ...sharedEn,
};

export default messages;
