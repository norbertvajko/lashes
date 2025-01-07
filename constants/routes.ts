export const APP_ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    ACCOUNT: "/account",
    ORDERS: "/orders",
    FAVORITES: "/favorites",
    OFFERS: "/offers",
    PRODUCT: "/product",
    PRODUCT_DETAILS: "/product/[slug]"
};

export const APP_ROUTES_AUTH = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    RESET: "/auth/reset",
    ERROR: "/auth/error",
    NEW_PASSWORD: "/auth/new-password",
}

export const APP_ROUTES_USER = {
    USER: "/user",
    ACCOUNT: "/user/my-account",
    SETTINGS: "/user/my-account/settings",
    SETTINGS_PROFILE: "/user/my-account/settings/profile",
    SETTINGS_MANAGE_ACCOUNT: "/user/my-account/settings/manage-account",
}

export const APP_ROUTES_ADMIN = {
    ADMIN: "/admin",
    SCRAPE: "/admin/scrape",
}