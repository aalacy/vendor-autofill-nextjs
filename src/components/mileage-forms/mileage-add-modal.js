import { useState } from "react";
import toast from "react-hot-toast"

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "../common/modal";
import { MileageAddForm } from "./mileage-add-form";
import { MileageService } from "src/services";

export const MileageAddModal = ({ mileage, open, setOpen }) => {
  const { refresh } = useAuth();
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values, helpers) => {
    setLoading(true);
    try {
      await MileageService.add(values);
      helpers.setTouched({});
      helpers.setSubmitting(false);
      toast.success("Successfully created.");
    } catch (err) {
      const submit = Array.isArray(err.response?.data) ? err.message : err.response?.data;
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit });
      helpers.setSubmitting(false);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (values, helpers) => {
    if (mileage) {
      await handleUpdate(mileage.id, values, helpers)
    } else {
      await _handleSubmit(values, helpers)
    }
    refresh();
  };

  const handleUpdate = async (id, values, helpers) => {
    setLoading(true);
    try {
      await MileageService.update(id, values);
      helpers.setTouched({});
      helpers.setSubmitting(false);
      toast.success("Successfully updated.");
    } catch (err) {
      const submit = Array.isArray(err.response?.data) ? err.message : err.response?.data;
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit });
      helpers.setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`${mileage ? "Update Mileage Form" : "Add New Mileage Form"}`}
      open={open}
      onClose={() => setOpen(false)}
      size="md"
    >
      <MileageAddForm
        loading={loading}
        mileage={mileage}
        submitForm={handleSubmit}
      />
    </Modal>
  );
};