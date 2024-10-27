sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/demoB61Demo/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.demoB61Demo.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();

			var oModel = this.getModel();
			var oPrdModel = this.getModel("prdModel");

			oModel.read("/ProductSet", {
				success: function(data) {
					data.results.splice(0, 0, {
						Prdname: "Select All"
					});
					oPrdModel.setData(data);
				}
			});

		}
	});
});