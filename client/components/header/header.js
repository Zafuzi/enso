import {FlowRouter} from "meteor/ostrio:flow-router-extra";

Template.menuNavLink.helpers(
{
	isActive: function(path)
	{
		let router = FlowRouter.current();
		return router.route.name === path ? "active" : "";
	}
})
