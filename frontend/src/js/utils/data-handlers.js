export const URL = 'http://localhost:8000'

const endpoints = {
    'mainMenu': `${URL}/menu-items/main/view/`,
    'login': `${URL}/authorize/`,
    'tags': `${URL}/blog/tags/view/`,
    'getPosts': `${URL}/blog/post/view/`,
    'savePost': `${URL}/blog/post/create/`,
};

const DEFAULT_OPTIONS = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
};

export function API(endpoint, params=[], options={}){

    let url = endpoints[endpoint];
    let OPTIONS = {
        ...DEFAULT_OPTIONS,
        ...options,
        headers: {
            ...DEFAULT_OPTIONS.headers,
            ...options.headers
        },
    };
    if(params.length >= 1){
        let parameters = "";
        params.map((param, i) => {
            if(i === 0){
                parameters += `?${param}`;
            }else{
                parameters += `&${param}`;
            }
            return true
        })
        url += parameters
    }
    console.log(url);
    if(OPTIONS.method !== "GET" && OPTIONS.body){
        let body = OPTIONS.body;
        let BODY = (typeof(body) === "object") ? JSON.stringify(body): null;
        OPTIONS.body = BODY;
        console.log(OPTIONS);
    }

    async function fetchAPI() {
        let response = await fetch(
            url,
            OPTIONS
        )
        .then(r => r.json())

        return response;
    }

    return fetchAPI()
}