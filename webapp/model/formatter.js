sap.ui.define([], function() {
	"use strict";

	return {
		colorStatus: function(Status) {
			if (Status === "APPROVED") {
				return "Success";
			} else {
				return "Error";
			}
		},
		formatCurrency: function(Prdprice) {
			var oCurrencyFormatter = sap.ui.core.format.NumberFormat.getCurrencyInstance({
				showMeasure: false,
				pattern: "#,##,##0.00"
			}, sap.ui.getCore().getConfiguration().getLocale());
			return oCurrencyFormatter.format(Prdprice);
		}

	};
});