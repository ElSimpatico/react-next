import authEn from "./auth/en.json";
import errorEn from "./error/en.json";
import languagesEn from "./languages/en.json";
import sharedEn from "./shared/en.json";

const messages = {
    ...authEn,
    ...languagesEn,
    ...sharedEn,
    ...errorEn,
};

export default messages;
