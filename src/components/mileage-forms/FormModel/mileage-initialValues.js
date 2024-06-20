export const MileageInitialValues = (props, fullName) => {
  const initialValues = {
    name: props?.name || fullName || "",
    week_of: props?.week_of || "",
    price_per_mile: props?.price_per_mile || 0.56,

    data: [],
    // employee_signature: props?.employee_signature || "",
    // employee_signature_date: props?.employee_signature_date || "",
    // approval_signature: props?.approval_signature || "",
    // approval_signature_date: props?.approval_signature_date || "",
  };

  if (props?.data) {
    for (const data of props?.data) {
      initialValues.data.push({
        date: data.date || "",
        from_address: data.from_address || "",
        from_address_place_id: data.from_address_place_id || "",
        to_address: data.to_address || "",
        to_address_place_id: data.to_address_place_id || "",
        business_purpose: data.business_purpose || "",
        number_of_miles: data.number_of_miles || 0,
        mileage_reimbursement: data.mileage_reimbursement || 0,
      });
    }
  } else {
    initialValues.data.push({
      date: "",
      from_address: "",
      from_address_place_id: "",
      to_address: "",
      to_address_place_id: "",
      business_purpose: "",
      number_of_miles: 0,
      mileage_reimbursement: 0,
    });
  }

  return initialValues;
};
