export enum Route {
    Home = '/',
    Dives = '/dives',
    DiveDetail = '/dives/:diveId',
    Login = '/login',
    Register = '/register',
    About = '/about',
    Logout = '/logout',
}
export default Route;

export function route(route: Route, params: { [name: string]: string }): string {
    const paramRegExp = /:([^/]+)/g;

    return route.replace(paramRegExp, function (_, paramName: string) {
        return params[paramName];
    });
}
