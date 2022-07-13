import "../helpers";

Meteor.call("ping", function(error, result)
{
	console.log(result);
});

const html = document.querySelector('html');
html.dataset.theme = `light`;

function switchTheme(theme) {
	if(theme)
	{
		html.dataset.theme = `${theme}`;
		Session.set("theme", theme);
		Session.save("theme");
		return;
	}
	
	if(html.dataset.theme === "light")
	{
		html.dataset.theme = `dark`;
		Session.set("theme", "dark");
		Session.save("theme");
		return;
	}

	html.dataset.theme = `light`;
	Session.set("theme", "light");
	Session.save("theme");
}

Template.layout.onCreated(function()
{
	Session.load("theme");
	this.theme = Session.get("theme");
	switchTheme(this.theme);
});

Template.layout.helpers(
{
	isDarkTheme: function()
	{
		return Session.get("theme") === "dark"; 
	}
});

Template.layout.events(
{
	"click .appHeader__switchTheme": function(event, instance)
	{
		switchTheme();
	}
});