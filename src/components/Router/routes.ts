export enum Route {
    Dashboard = '/',
    Dives = '/dives',
    Buddies = '/buddies',
    BuddyDetail = '/buddies/:buddyId',
    DiveDetail = '/dives/:diveId',
    Login = '/login',
    Register = '/register',
    About = '/about',
    Tags = '/tags',
    TagDetail = '/tags/:tagId',
    Logout = '/logout',
}
export default Route;

export function route(route: Route, params: { [name: string]: string }): string {
    const paramRegExp = /:([^/]+)/g;

    return route.replace(paramRegExp, function (_, paramName: string) {
        return params[paramName];
    });
}
