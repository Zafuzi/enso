import {FlowRouter} from "meteor/ostrio:flow-router-extra";

export const goToRoute = function (r)
{
	FlowRouter.go(r);
}

// return json as object or null if error
export const j2o = function(j) { try { return JSON.parse(j) } catch(e) { return null } }

// return object as JSON or null if error
export const o2j = function(o) { try { return JSON.stringify(o) } catch(e) { return null } }

// Convert a string from something like "Prof. Fees" to  "prof_fees"
String.prototype.toId = function() {
	var s = this.toLowerCase();
	s = s.replace( /[^a-z0-9]+/g, " " );
	s = s.trim();
	s = s.replace( /\s+/g, "_" );
	return s;
}

export const showErrorIfError = function(error)
{
	if(error)
	{
		if(Meteor.isServer)
		{
			throw new Meteor.Error(error.error);
		}
		else
		{
			import {showAlert} from "../client/components/dialog/dialog";
			let e = error;
			let msg = e.error;
			if(e.reason)
			{
				msg += "\n" + e.reason;
			}
			if(e.details)
			{
				msg += "\n" + e.details;
			}
			console.log(msg);
			showAlert("fail", msg);
		}
		return true;
	}

	return false;
}