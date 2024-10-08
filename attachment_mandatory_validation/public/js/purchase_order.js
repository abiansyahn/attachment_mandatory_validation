frappe.ui.form.on("Purchase Order", {
    before_workflow_action: async (frm) => {
        let promise = new Promise((resolve, reject) => {
            frappe.dom.unfreeze()
            if (frm.selected_workflow_action == "Confirm PO") {
                frappe.call({
                    method: "attachment_mandatory_validation.attachment_mandatory.validate_attachment",
                    args: {
                        workflow_state: frm.doc.workflow_state,
                        doctype: frm.doc.doctype,
                        name: frm.doc.name
                    },
                    callback: function(r) {
                        if (r.message == true) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                });
            } else {
                resolve();
            }
    	});
    	await promise.catch(() => {frappe.throw(__("Attahment(s) is mandatory to proceed to next state"));});
    }
})