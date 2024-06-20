import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "../common/modal";
import { MileageAddForm } from "./mileage-add-form";
import { MileageService } from "src/services";
import { useIndentifier } from "src/hooks/use-identifier";
import { useQueryClient } from "@tanstack/react-query";

const MileageAddModal = ({ mileage, open, onClose }) => {
  const { showConfirmDlg, hideConfirm } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(true);

  const visitorId = useIndentifier();

  const queryClient = useQueryClient();

  const _handleSubmit = async (values, helpers) => {
    setLoading(true);
    try {
      await MileageService.add(values, visitorId);
      helpers.setTouched({});
      helpers.setSubmitting(false);
      toast.success("Successfully created.");
      onClose();
    } catch (err) {
      const submit = Array.isArray(err.response?.data) ? err.message : err.response?.data;
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit });
      helpers.setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, helpers) => {
    if (mileage) {
      await handleUpdate(mileage.id, values, helpers);
    } else {
      await _handleSubmit(values, helpers);
    }
    queryClient.invalidateQueries({ queryKey: ["getAllMileages"] });
  };

  const handleUpdate = async (id, values, helpers) => {
    setLoading(true);
    try {
      await MileageService.update(id, values);
      helpers.setTouched({});
      helpers.setSubmitting(false);
      toast.success("Successfully updated.");
      onClose();
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
    <>
      <Modal
        title={`${mileage ? "Update Mileage Form" : "Add New Mileage Form"}`}
        open={open}
        onClose={(event, reason) => {
          if (reason && reason === "backdropClick") return;
          if (!isEmpty)
            return showConfirmDlg({
              open: true,
              close: hideConfirm,
              callback: () => {
                onClose();
                hideConfirm();
              },
            });
          onClose();
        }}
        size="md"
      >
        <MileageAddForm
          loading={loading}
          mileage={mileage}
          submitForm={handleSubmit}
          setEmpty={setEmpty}
        />
      </Modal>
    </>
  );
};

export default MileageAddModal;
