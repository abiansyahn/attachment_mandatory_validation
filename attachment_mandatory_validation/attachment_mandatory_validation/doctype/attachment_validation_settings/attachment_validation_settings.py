# Copyright (c) 2024, abiansyahn and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class AttachmentValidationSettings(Document):
	pass

@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def get_workflow_state(doctype, txt, searchfield, start, page_len, filters):
	workflow_state_list = frappe.db.sql(
		f"""select ws.state 
			from `tabWorkflow Document State` ws
			left join `tabWorkflow` wf on ws.parent = wf.name
			where wf.document_type = "{filters.get("doctype")}"
			and wf.is_active = 1
		"""
	, as_dict=True)
	workflow_state = tuple(wf.state for wf in workflow_state_list)
	if len(workflow_state) > 0:
		cond = f"AND name in {workflow_state}"
	else:
		return ()

	return frappe.db.sql(
		f"""select name from `tabWorkflow State`
			where `{searchfield}` LIKE %(txt)s {cond}
			order by name limit %(page_len)s offset %(start)s""",
		{"txt": "%" + txt + "%", "start": start, "page_len": page_len},
	)

@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def get_doctype(doctype, txt, searchfield, start, page_len, filters):
	cond = f"AND name in ('Purchase Order', 'Purchase Receipt', 'Purchase Invoice')"

	return frappe.db.sql(
		f"""select name from `tabDocType`
			where `{searchfield}` LIKE %(txt)s {cond}
			order by name limit %(page_len)s offset %(start)s""",
		{"txt": "%" + txt + "%", "start": start, "page_len": page_len},
	)
