import {Blaze} from "meteor/blaze";

export var showAlert = null;

let aliveAlerts = new ReactiveVar(0);

Template.alerts.onCreated(function()
{
	let instance = this;
	
	instance.maxAlerts = 5;
	
	instance.showAlert = function(type, content, data)
	{
		if(aliveAlerts.get() === instance.maxAlerts)
		{
			return;	
		}
		
		let container = instance.firstNode;

		if(!container)
		{
			console.log("soft", "alerts is not ready yet...");
			return;
		}
		
		let renderData = {...data}; 
			renderData.type = type;
			renderData.content = content;
			
		Blaze.renderWithData(Template.alert, renderData, container);
		aliveAlerts.set(aliveAlerts.get() + 1);
	}
	
	showAlert = instance.showAlert;
});

Template.alert.onCreated(function()
{
	let instance = this;

	instance.isClosing = new ReactiveVar(null);
	
	this.removeSelf = function()
	{
		if(!instance.firstNode)
		{
			return;
		}
		aliveAlerts.set(aliveAlerts.get() - 1);
		instance.isClosing.set(true);
		Meteor.setTimeout(function()
		{
			Blaze.remove(instance.view);
		}, 300);
	}
});

Template.alert.onRendered(function()
{
	let instance = this;
	if(!instance.data.forceResponse)
	{
		Meteor.setTimeout(function()
		{
			instance.removeSelf();
		}, 3000);
	}
});

Template.alert.helpers(
{
	isAlertType: function(type)
	{
		return this.type === type;
	},
	isClosing: function()
	{
		return Template.instance().isClosing.get() ? "isClosing" : "";
	}
});

Template.alert.events(
{
	"click .alert__closeButton": function(event, instance)
	{
		instance.removeSelf();
	}
});