Template.dialog.onRendered(function()
{
	$("#" + this.data.id).hide();
	$(".dialogBackground").hide();
});

Template.dialog.events(
{
	"click .closeDialog": function()
	{
		Dialog.close();
	},
});

export const Dialog = {
	openDialog: undefined,
	open: function(templateName, data)
	{
		Dialog.close(function()
		{
			Dialog.openDialog = Blaze.renderWithData(Template[templateName], data, document.body);
			Meteor.setTimeout(function()
			{
				$(".dialogBackground").show();
			}, 10);
		});
	},
	close: function(cb)
	{
		if(Dialog.openDialog)
		{
			$(".dialogBackground").addClass("fadeOut");
			$(".dialog").addClass("fadeOut");
			Meteor.setTimeout(function()
			{
				$(".dialogBackground").hide();
				$(".dialogBackground").removeClass("fadeOut");
				Blaze.remove(Dialog.openDialog);
				Dialog.openDialog = undefined;
				if(cb)
				{
					cb();
				}
			}, 300);
		} else
		{
			if(cb)
			{
				cb();
			}
		}
	}
}

export const showAlert = function(type, message, title ) {

	if ( !message )
	{
		message = 'No Message to Display.';
	}

	let customClass = "alert";

	switch(type)
	{
		case "info":
			if(!title)
			{
				title = "Just so you know...";
			}
			customClass = "alert-info";
			break;
		case "okay":
			if(!title)
			{
				title = "It was a rousing success..";
			}
			customClass = "alert-okay";
			break;
		case "warn":
			if(!title)
			{
				title = "Take caution...";
			}
			customClass = "alert-warn";
			break;
		case "fail":
			if(!title)
			{
				title = "Something went wrong...";
			}
			customClass = "alert-fail";
			break;
	}

	if ( !title )
	{
		title = 'This is an official alert...';
	}

	Dialog.open("alertDialog", {title,message, class: customClass});
}
