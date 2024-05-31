import http from "./http";

export class VendorService {
  static add(values) {
    return http.post("/vendors/add", { ...values });
  }

  static addMyVendors(vendor_ids, removed_ids) {
    return http.post("/vendors/add-my-vendor", { vendor_ids, removed_ids});
  }

  static all() {
    return http.post(`/vendors/all`, {
      page: 1,
      take: -1,
      filterModel: [],
      logicOperator: "",
    });
  }

  static allTemplates() {
    return http.get(`/vendors/templates`);
  }

  static allByPage(paginationModel, filterModel, logicOperator) {
    return http.post(`/vendors/all-by-page`, {
      page: paginationModel.page + 1,
      take: paginationModel.pageSize,
      filterModel,
      logicOperator,
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

  static readGSheet() {
    return http.get("/vendors/read_g_sheet");
  }

  static readW9(vendor_id) {
    return http.post("/vendors/generate_w9", vendor_id);
  }

  static sendEmail(vendor_id, key, email, invoice_name) {
    return http.post("/vendors/send-invoice-via-email", {
      vendor_id,
      key,
      email,
      invoice_name,
    });
  }

  static uploadCOI(vendor_id, vendor_name, job_id, file, onUploadProgress = undefined) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("vendor_id", vendor_id);
    formData.append("vendor_name", vendor_name);
    formData.append("job_id", job_id)

    return http.post("/vendors/upload-coi", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  static readCOI(key) {
    return http.post(`/vendors/get-coi`, key);
  }

  static deleteCOI(vendor_id) {
    return http.delete(`/vendors/delete-coi/${vendor_id}`);
  }

  static uploadInvoices(vendor_id, vendor_name, job_id, files, onUploadProgress = undefined) {
    let formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("vendor_id", vendor_id);
    formData.append("vendor_name", vendor_name);
    formData.append("job_id", job_id)

    return http.post("/vendors/upload-invoices", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  static readInvoices(vendor_id) {
    return http.post(`/vendors/get-invoices`, vendor_id);
  }

  static addTotal2Invoice(invoice_id, total) {
    return http.post("/vendors/add-total-to-invoice", {
      invoice_id,
      total,
    });
  }

  static deleteInvoice(invoice_id) {
    return http.delete(`/vendors/delete-invoice/${invoice_id}`);
  }

  static updateVendor(id, data) {
    return http.put(`/vendors/${id}`, data);
  }

  static removeVendor(id) {
    return http.delete(`/vendors/${id}`);
  }
}
