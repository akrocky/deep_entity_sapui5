sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
	"sap/m/Dialog",
	"com/demoB61Demo/model/formatter"
], function(Controller, MessageBox, Filter, Sorter, Dialog, formatter) {
	"use strict";

	return Controller.extend("com.demoB61Demo.controller.View1", {
		f: formatter,
		onPress: function() {
			this.getOwnerComponent().getRouter().navTo("view2route");
		},
		onCancelEdit: function() {
			this.editDialog.close();
		},
		openConfirmDialog:function(){
		  MessageBox.confirm("Are you sure, you want to delete?",{
		  	onClose:function(BTN){
		  		if(BTN==="OK"){
		  			this.onDelete();
		  		}
		  	}.bind(this)
		  });	
		},
		onDelete: function() {
			var prdId = this.getView().byId("idTable").getSelectedItem().getBindingContext().getProperty("Prdid");

			var oModel = this.getOwnerComponent().getModel();
			oModel.remove("/ProductSet('" + prdId + "')", {
				success: function() {
					MessageBox.success("Product got deleted successfully");
				}.bind(this),
				error: function(error) {
					MessageBox.error(JSON.parse(error.responseText).error.message.value);
				}.bind(this)
			});
		},
		onUpdate: function() {
			var prdId = this.getView().byId("idIpPrdIdEdit").getValue();
			var prdName = this.getView().byId("idIpPrdNameEdit").getValue();
			var prdDesc = this.getView().byId("idIpPrdDescEdit").getValue();
			var prdPrice = this.getView().byId("idIpPrdPriceEdit").getValue();
			var currcode = this.getView().byId("idIpCurrcodeEdit").getValue();
			var status = this.getView().byId("idIpStatusEdit").getValue();

			var payload = {
				Prdid: prdId,
				Prdname: prdName,
				Prddesc: prdDesc,
				Prdprice: prdPrice,
				Currcode: currcode,
				Status: status
			};

			var oModel = this.getOwnerComponent().getModel();
			oModel.update("/ProductSet('" + prdId + "')", payload, {
				success: function() {
					MessageBox.success("Product got updated successfully");
					this.editDialog.close();
				}.bind(this),
				error: function(error) {
					MessageBox.error(JSON.parse(error.responseText).error.message.value);
					this.editDialog.close();
				}.bind(this)
			});

		},
		onEdit: function() {
			var sPath = this.getView().byId("idTable").getSelectedItem().getBindingContext().getPath();
			if (!this.editDialog) {
				this.editDialog = sap.ui.xmlfragment(this.getView().getId(), "com.demoB61Demo.view.EditPrd", this);
				this.getView().addDependent(this.editDialog);
			}
			this.editDialog.open();
			this.editDialog.bindElement(sPath);
		},
		onCreate: function() {
			this.getOwnerComponent().getRouter().navTo("view3route");
		},
		onSearch: function(oEvent) {
			var value = oEvent.getParameter("query");
			var aFilters = [];
			if (value !== "") {
				aFilters.push(new Filter("Prdid", "Contains", value));
			}
			this.getView().byId("idF4HelpTable").getBinding("items").filter(aFilters);
		},
		onCloseDialog: function() {
			this.dialog.close();
		},
		onPressRow: function(oEvent) {
			var prdId = oEvent.getSource().getBindingContext().getProperty("Prdid");
			this.getView().byId("idIpPrdId").setValue(prdId);
			this.dialog.close();
		},
		onPressPrd: function(oEvent) {
			var prdId = oEvent.getSource().getBindingContext().getProperty("Prdid");
			this.getOwnerComponent().getRouter().navTo("view2route", {
				key: prdId
			});
		},
		onPressValueHelp: function() {
			if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment(this.getView().getId(), "com.demoB61Demo.view.PrdIdF4Help", this);
				this.getView().addDependent(this.dialog);
			}
			this.dialog.open();

		},
		onToggleSort: function(oEvent) {
			var btnId = oEvent.getSource().getId();
			var bDescending;
			if (btnId === "idBtnAsc") {
				bDescending = false;
			} else {
				bDescending = true;
			}
			var sortByItem = this.getView().byId("idCbSort").getSelectedItem();
			if (sortByItem) {
				var oSorter = new Sorter(sortByItem.getText(), bDescending);
				this.getView().byId("idTable").getBinding("items").sort(oSorter);
			}
		},

		onGo: function() {
			var prdId = this.getView().byId("idIpPrdId").getValue();
			var prdPrice = this.getView().byId("idIpPrdPrice").getValue();
			var status = "",
				opr = "";

			if (this.getView().byId("idCbStatus").getSelectedItem()) {
				status = this.getView().byId("idCbStatus").getSelectedItem().getText();
			}
			if (this.getView().byId("idCbOpr").getSelectedItem()) {
				opr = this.getView().byId("idCbOpr").getSelectedItem().getText();
			}

			var aFilters = [];
			if (prdId !== "") {
				aFilters.push(new Filter("Prdid", "EQ", prdId));
			}
			if (prdPrice !== "" && opr !== "") {
				aFilters.push(new Filter("Prdprice", opr, prdPrice));
			}
			if (status !== "") {
				aFilters.push(new Filter("Status", "EQ", status));
			}
			this.getView().byId("idTable").getBinding("items").filter(aFilters);

		}

	});
});