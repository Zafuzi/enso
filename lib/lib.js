import {FlowRouter} from "meteor/ostrio:flow-router-extra";

export const goToRoute = function (r)
{
	FlowRouter.go(r);
}

// return json as object or null if error
export const j2o = function(j) { try { return JSON.parse(j) } catch(e) { return null } }

// return object as JSON or null if error
export const o2j = function(o) { try { return JSON.stringify(o) } catch(e) { return null } }
