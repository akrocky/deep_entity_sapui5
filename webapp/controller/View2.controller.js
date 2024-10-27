sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.demoB61Demo.controller.View2", {
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("view2route").attachPatternMatched(this.onPatternMatched, this);
		},
		onPatternMatched: function(oEvent) {
			var prdId = oEvent.getParameter("arguments").key;
			this.getView().bindElement("/ProductSet('" + prdId + "')");
		},
		onBack: function() {
			this.getOwnerComponent().getRouter().navTo("view1route");
		}
	});

});