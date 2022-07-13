import "../helpers";

Meteor.call("ping", function(error, result)
{
	console.log(result);
});

const html = document.querySelector('html');
html.dataset.theme = `theme-light`;

function switchTheme(theme) {
	if(theme)
	{
		html.dataset.theme = `theme-${theme}`;
		return;
	}
	
	if(html.dataset.theme === "theme-light")
	{
		html.dataset.theme = `theme-dark`;
		return;
	}
	
	html.dataset.theme = `theme-light`;
}

Template.layout.onCreated(function()
{
	this.theme = new ReactiveVar(html.dataset.theme);	
});

Template.layout.helpers(
{
	isDarkTheme: function()
	{
		return Template.instance().theme.get() === "theme-dark";
	}
});

Template.layout.events(
{
	"click .appHeader__switchTheme": function(event, instance)
	{
		switchTheme();
		instance.theme.set(html.dataset.theme);
	}
});