// Copyright (c) 2024, abiansyahn and contributors
// For license information, please see license.txt

frappe.ui.form.on("Attachment Validation Settings", {
	onload(frm) {
        frm.set_query("select_doctype", function (doc) {
            return {
                query: "attachment_mandatory_validation.attachment_mandatory_validation.doctype.attachment_validation_settings.attachment_validation_settings.get_doctype"
            };
        });

        if (frm.doc.select_doctype) {
            frm.set_query("workflow_state", function (doc) {
                let filters;
                filters = { doctype: frm.doc.select_doctype }
                return {
                    query: "attachment_mandatory_validation.attachment_mandatory_validation.doctype.attachment_validation_settings.attachment_validation_settings.get_workflow_state",
                    filters: filters
                };
            });
        }
	},
    select_doctype(frm) {
        frm.set_query("workflow_state", function (doc) {
            let filters;
            filters = { doctype: frm.doc.select_doctype }
            return {
                query: "attachment_mandatory_validation.attachment_mandatory_validation.doctype.attachment_validation_settings.attachment_validation_settings.get_workflow_state",
                filters: filters
            };
        });
    }
});
