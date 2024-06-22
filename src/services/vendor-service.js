import http from "./http";

export class VendorService {
  static add(values) {
    return http.post("/vendors/add", { ...values });
  }

  static addMyVendors(vendor_ids, removed_ids, job_id) {
    return http.post("/vendors/add-my-vendor", { vendor_ids, removed_ids, job_id });
  }

  static all(job_id) {
    return http.post(`/vendors/all`, {
      page: 1,
      take: -1,
      filterModel: [],
      logicOperator: "",
      job_id,
    });
  }

  static allTemplates() {
    return http.get(`/vendors/templates`);
  }

  static allByPage(paginationModel, filterModel, logicOperator, is_active) {
    return http.post(`/vendors/all-by-page`, {
      page: paginationModel.page + 1,
      take: paginationModel.pageSize,
      filterModel,
      logicOperator,
      is_active,
    });
  }

  static generatePDF(data, email) {
    return http.post("/vendors/generate_pdf", {
      data,
      email,
    });
  }

  static generateOnePDF(vendor_id, job_id, invoice_name) {
    return http.post("/vendors/generate_one_pdf", {
      vendor_id,
      job_id,
      invoice_name,
    });
  }

  static generateFormPDF(vendor_id, job_id, template_key, form_title) {
    return http.post("/vendors/generate-form-pdf", {
      vendor_id,
      job_id,
      template_key,
      form_title,
    });
  }

  static readGSheet() {
    return http.get("/vendors/read_g_sheet");
  }

  static readW9(vendor_id, job_id) {
    return http.post("/vendors/generate-w9", {
      vendor_id,
      job_id,
    });
  }

  static sendEmail(vendor_id, key, email, invoice_name) {
    return http.post("/vendors/send-invoice-via-email", {
      vendor_id,
      key,
      email,
      invoice_name,
    });
  }

  static sendEmailForCOI(my_vendor_id, email) {
    return http.post("/vendors/send-vendor-info-via-email", {
      my_vendor_id,
      email,
    });
  }

  static uploadCOI(my_vendor_id, vendor_name, job_id, file, onUploadProgress = undefined) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("my_vendor_id", my_vendor_id);
    formData.append("vendor_name", vendor_name);
    formData.append("job_id", job_id);

    return http.post("/vendors/upload-coi", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  static uploadFormPDF(vendor_name, job_id, file, onUploadProgress = undefined) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("vendor_name", vendor_name);
    formData.append("job_id", job_id);

    return http.post("/vendors/upload-form-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  static deleteFormPdf(key) {
    return http.post(`/vendors/delete-form-pdf`, { key });
  }

  static readPDF(key) {
    return http.post(`/vendors/read-pdf`, key);
  }

  static deleteCOI(my_vendor_id) {
    return http.delete(`/vendors/delete-coi/${my_vendor_id}`);
  }

  static addUpdateInvoice(my_vendor_id, data, id) {
    return http.post("/vendors/add-update-invoice", {
      id,
      my_vendor_id,
      data,
    });
  }

  static replaceInvoice(vendor_name, job_id, invoice_id, my_vendor_id, file) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("vendor_name", vendor_name);
    formData.append("job_id", job_id);
    formData.append("invoice_id", invoice_id);
    formData.append("my_vendor_id", my_vendor_id);

    return http.post("/vendors/replace-invoice", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static readInvoices(my_vendor_id) {
    return http.post(`/vendors/get-invoices`, my_vendor_id);
  }

  static addTotal2Invoice(invoice_id, amount) {
    return http.post("/vendors/add-amount-to-invoice", {
      invoice_id,
      amount,
    });
  }

  static deleteInvoice(invoice_id) {
    return http.delete(`/vendors/delete-invoice/${invoice_id}`);
  }

  static getBusinessPurposes() {
    return http.get("/vendors/get-business-purposes");
  }

  static addBusinessPurpose(purpose) {
    return http.post("/vendors/add-business-purposes", { purpose });
  }

  static removeBusinessPurpose(purpose) {
    return http.delete(`/vendors/delete-purpose/${purpose}`);
  }

  static updateVendor(id, data) {
    return http.put(`/vendors/${id}`, data);
  }

  static removeVendor(id) {
    return http.delete(`/vendors/${id}`);
  }

  static convertVendor(vendor_id) {
    return http.post(`/vendors/convert-vendor`, { vendor_id });
  }

  static updateMyVendor(my_vendor_id, data) {
    return http.post("/vendors/update-my-vendor", {
      my_vendor_id,
      data,
    });
  }

  static updateCOI(coi_id, data) {
    return http.post("/vendors/update-coi", {
      coi_id,
      data,
    });
  }
}
