sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.demoB61Demo.controller.View3", {
		onDeleteRow:function(oEvent){
			var index = parseInt(oEvent.getSource().getParent().getBindingContext("localModel").getPath().split("/")[2]);
			this.getOwnerComponent().getModel("localModel").getData().aSuppliers.splice(index,1);
			this.getOwnerComponent().getModel("localModel").refresh(true);
		},
		onAddRow: function() {
			var newData = {
				"Supid": "",
				"Prdid": "",
				"Supname": "",
				"Suploc": ""
			};
			this.getOwnerComponent().getModel("localModel").getData().aSuppliers.push(newData);
			this.getOwnerComponent().getModel("localModel").refresh(true);
		},
		onSave: function() {
			var prdId = this.getView().byId("idIpPrdId").getValue();
			var prdName = this.getView().byId("idIpPrdName").getValue();
			var prdDesc = this.getView().byId("idIpPrdDesc").getValue();
			var prdPrice = this.getView().byId("idIpPrdPrice").getValue();
			var currcode = this.getView().byId("idIpCurrcode").getValue();
			var status = this.getView().byId("idIpStatus").getValue();

			var payload = {
				Prdid: prdId,
				Prdname: prdName,
				Prddesc: prdDesc,
				Prdprice: prdPrice,
				Currcode: currcode,
				Status: status,
				toSuppliers: this.getOwnerComponent().getModel("localModel").getData().aSuppliers
			};

			var oModel = this.getOwnerComponent().getModel();
			oModel.create("/ProductSet", payload, {
				success: function(req, res) {
					MessageBox.success(res.data.Prdid + " got created successfully");
					this.clearForm();
				}.bind(this),
				error: function(error) {
					MessageBox.error(JSON.parse(error.responseText).error.message.value);
					this.clearForm();
				}.bind(this)
			});
		},
		clearForm: function() {
			this.getView().byId("idIpPrdId").setValue("");
			this.getView().byId("idIpPrdName").setValue("");
			this.getView().byId("idIpPrdDesc").setValue("");
			this.getView().byId("idIpPrdPrice").setValue("");
			this.getView().byId("idIpCurrcode").setValue("");
			this.getView().byId("idIpStatus").setValue("");
			this.getOwnerComponent().getModel("localModel").getData().aSuppliers=[];
			this.getOwnerComponent().getModel("localModel").refresh(true);
		}

	});

});