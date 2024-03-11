import * as Yup from "yup";

export const MileageValidationSchema = Yup.object().shape({
    name: Yup.string().required(`required`),
    week_of: Yup.string().required(`required`),
    data: Yup.array().of(
      Yup.object().shape({
        date: Yup.string().required(`required`),
        from_address: Yup.string().required(`required`),
        to_address: Yup.string().required(`required`),
        business_purpose: Yup.string().required(`required`),
        number_of_miles: Yup.number().required(`required`),
        mileage_reimbursement: Yup.number().required(`required`),
      })
    ),
    employee_signature: Yup.string().required(`required`),
    employee_signature_date: Yup.string().required(`required`),
    // approval_signature: Yup.string().required(`required`),
    // approval_signature_date: Yup.string().required(`required`),
  })