/**
 * This may have errors.  This was mostly deduced my looking at the code
 */
declare class Router
{
	static go(route: string, data?: any, options?: RouterGoOptions): void;
	static route(route: string, options?: RouteOptions): Route;
	static current(): any;
	static onAfterAction(action: Function);
	static configure(options:RouteOptions);
}

interface RouteCallback
{
	(request: any, response: any): void;
}

interface Route
{
	getName(): string;
	path(params?: any, options?: any): string;
	get(callback: RouteCallback): Route;
	post(callback: RouteCallback): Route;
	delete(callback: RouteCallback): Route;
	update(callback: RouteCallback): Route;
}

interface RouteHooks
{
	(data: any): void;
}

interface RouteOptions
{
	yieldRegions?: any;
	data?: () => any;
	name?: string;
	title?: string;
	path?: string | RegExp;
	where?: string;
	action?: () => void;
	onRun?: RouteHooks;
	onRerun?: RouteHooks;
	onBeforeAction?: RouteHooks;
	onAfterAction?: RouteHooks;
	onStop?: RouteHooks;
	template?: string;
	waitOn?: () => any;
	layoutTemplate?: string;
	loadingTemplate?: string;
	notFoundTemplate?: String;
}

interface RouterGoOptions
{
	replaceState?: boolean;
	query?: string | { [key: string]: string | number | boolean };
}