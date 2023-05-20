export const BASE_URL = `https://stken99.pythonanywhere.com`;
//export const BASE_URL = `http://127.0.0.1:8000`;

export const REGISTER_URL = `${BASE_URL}/user/`;
export const GET_USERS_BY_ARTICLE_ID = `${BASE_URL}/get_fav_users/`
export const LOGIN_URL = `${BASE_URL}/api/token/`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/api/token/refresh/`
export const GET_ALL_USER_URL = `${BASE_URL}/auth/api/v1/user/all`;
export const GET_MYSELF_USER_URL = `${BASE_URL}/auth/api/v1/user/me`;
export const UPDATE_MYSELF_USER_URL = `${BASE_URL}/update_user_info`;
export const GET_FAV_ARTICLES = `${BASE_URL}/get_fav`
export const GET_API_KEY_USER = `${BASE_URL}/get_api_key`
export const GET_USER_DATA = `${BASE_URL}/get_user_data`
export const UPDATE_PASSWORD_URL = `${BASE_URL}/change_pass`
export const GET_CATEGORY_URL = `${BASE_URL}/get_categories`
export const KEYWORD_ADD_URL = `${BASE_URL}/add_category/`
export const KEYWORD_DELETE_URL = `${BASE_URL}/delete_category/`
export const CHECK_ADMIN_URL = `${BASE_URL}/check_admin`
export const ADD_KEYWORD_URL = `${BASE_URL}/add_keyword`
export const UPDATE_DATA_URL = `${BASE_URL}/update_data/`
export const DELETE_DATA_URL = `${BASE_URL}/delete_data/`
export const FORGOT_PASSWORD = `${BASE_URL}/forgot-password/`
export const PASSWORD_RESET_TOKEN = `${BASE_URL}/reset-password`
export const RESET_PASSWORD_URL = `${BASE_URL}/reset-password/confirm`

export const GET_MY_PROFILE_URL = `${BASE_URL}/auth/api/v1/profile/me`;
export const UPDATE_PROFILE_URL = `${BASE_URL}/auth/api/v1/user/update/me`;

export const CREATE_ARTICLE_URL = `${BASE_URL}/common/api/v1/article/create`;
export const GET_ALL_ARTICLE_URL = `${BASE_URL}/common/api/v1/article/all`;
export const DATA_SEARCH_URL= `${BASE_URL}/data`;
export const TRANSLATE_ARTICLE_URL = `${BASE_URL}/common/api/v1/article/translate/`;

export const CREATE_TICKET_URL = `${BASE_URL}/common/api/v1/ticket/create`;

export const GET_ALL_BLOG_URL = `${BASE_URL}/common/api/v1/blog/all`;
export const GET_A_BLOG_URL = `${BASE_URL}/common/api/v1/blog/`;

export const GET_ALL_WEBSITES_URL = `${BASE_URL}/common/api/v1/websites/all`;
export const CREATE_WEBSITE_REQUEST_URL = `${BASE_URL}/common/api/v1/website_request/create`;

export const CREATE_UPDATE_CLAP_URL = `${BASE_URL}/clap_post/`;
export const CREATE_UPDATE_FAV_URL = `${BASE_URL}/fav_post/`
export const GET_CLAP_BY_USER_ARTICLE_ID_URL = `${BASE_URL}/auth/api/v1/clap/get_by_user_article_id`;
