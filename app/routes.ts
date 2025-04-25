import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    //HOME
    index("routes/home.tsx"),

    //AUTH
    ...prefix("auth", [
        layout("layouts/auth-layout.tsx", [
            route("login", "routes/auth/login-page.tsx"),
            route("register", "routes/auth/register-page.tsx"),
        ])
    ]),

    ...prefix("chat", [
        layout("layouts/chat-layout.tsx", [
            index("routes/chat/no-chat-selected-page.tsx"),
            route("ABC", "routes/chat/client-chat-page.tsx"),
        ])
    ])

] satisfies RouteConfig;
