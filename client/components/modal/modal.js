export var openModal = null;
export var closeModal = null;

Template.modal.onCreated(function()
{
	let self = this;
	
	// only one modal is allowed open at once
	self.status = new ReactiveVar("closed");
	self.template = new ReactiveVar(null);
	self.options = new ReactiveVar(null);
	
	self.openModal = function(templateName, options)
	{
		self.template.set(templateName);
		self.options.set(options);
		self.status.set("open");
	}
	
	openModal = self.openModal;
	
	self.closeModal = function()
	{
		console.log("called me");
		self.status.set("closed");
		self.template.set(null);
		self.options.set(null);
	}
	
	closeModal = self.closeModal;
});

Template.modal.helpers(
{
	isModalOpen: function()
	{
		return Template.instance().status.get() === "open";
	},
	template: function()
	{
		return Template.instance().template.get();
	},
	options: function()
	{
		return Template.instance().options.get();
	}
});

Template.modal.events(
{
	"click .modal__closeButton": function(event, instance)
	{
		closeModal();
	}
});