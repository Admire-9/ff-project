import { GET, POST} from "@/client/util/http";

const url = "127.0.0.1:3003/";

export default {
    getArticlelist: (params) => {
        return GET(url, params);
    }
}
