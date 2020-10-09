const USER = {
  isLoggingIn: false,  // is the login modal open?
  isAuthenticated: false,  // has the user been logged in?
  user: null,  // user id
  authentication: "",  // the users auth token
};

const ADMIN = {
    blog: {
        editingPostValue: "",
        editingPostTitle: "",
        editingPostDescription: "",
    }
};

const initialState = {
    user: USER,
    mainMenu: {  // keeping main menu state
        isOpen: false,  // is the menu open?
        items: [],  // {"title": str,"url": str} the main menu items.
    },
    admin: ADMIN
}

export default function rootReducer(state = initialState, action) {

    // USER actions
    if(action.type === "SET_LOGGING_IN"){
        // Opens or closes login modal
        return Object.assign({}, state, {
            user: {
                ...state.user,
                isLoggingIn: action.payload
            }
        })
    }
    if(action.type === "LOGOUT"){
        // Logout user and set user state to default
        return Object.assign({}, state, {
            user: {
                USER
            }
        })
    }
    if(action.type === "SET_USER_AUTHENTICATION"){
        // Sets authentication status, token
        return Object.assign({}, state, {
            user: {
                ...state.user,
                isAuthenticated: true,  // user is authenticated if token is received
                authentication: `Token ${action.payload.authentication}`,  // set users authentication token
                user: action.payload.user,  // set user id
            }
        })
    }

    // MENU actions
    if(action.type === "SET_MENU_OPEN"){
        // Open or close main sidebar menu
        return Object.assign({}, state, {
            mainMenu: {
                ...state.mainMenu,
                isOpen: action.payload
            }
        })
    }
    if(action.type === "SET_MENU_ITEMS"){
        // Set main menu items
        return Object.assign({}, state, {
            mainMenu: {
                ...state.mainMenu,
                items: action.payload
            }
        })
    }

    // ADMIN
    // blog
    if(action.type === "SET_POST_VALUE"){
        return Object.assign({}, state, {
            admin: {
                ...state.admin,
                blog: {
                    ...state.admin.blog,
                    editingPostContent: action.payload
                }
            }
        })
    }

    return state
}