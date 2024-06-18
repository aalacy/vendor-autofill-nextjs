import { useCallback, useMemo, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useKey } from "react-use";

import validationSchema from "src/components/job-form/FormModel/validationSchema";
import { useAuth } from "src/hooks/use-auth";
import { JobService } from "src/services";
import { JobDataItem } from "./job-data-item";
import { JobDataKeys } from "./job-data-keys";
import checkoutFormModel from "src/components/job-form/FormModel/checkoutFormModel";

export const JobDataAccordions = ({ job }) => {
  const formikRef = useRef(null);
  const inputRef = useRef();
  const [editingItemId, setEditingItemId] = useState(null);

  const [expanded, setExpanded] = useState(JobDataKeys.companyInfo.name);

  const { showConfirmDlg, hideConfirm, setProjects } = useAuth();
  const queryClient = useQueryClient();

  // if (!job?.data) return null;

  const currentValidationSchema = validationSchema[0]
    .concat(validationSchema[1])
    .concat(validationSchema[2])
    .concat(validationSchema[3]);

  const handleExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const formInitialValues = useMemo(() => {
    const initialValues = {};
    Object.keys(checkoutFormModel.formField).map((name) => {
      if (checkoutFormModel.formField[name].type === "DateField") {
        initialValues[name] = job.data[name];
      } else {
        initialValues[name] = job.data[name];
      }
    });
    return initialValues;
  }, [job]);

  const handleSubmit = useCallback(async () => {
    if (document.activeElement !== inputRef.current) {
      setEditingItemId(null);
      const errors = await formikRef.current.validateForm();
      if (Object.keys(errors).length > 0) {
        formikRef.current.setStatus({ success: false });
        formikRef.current.setSubmitting(false);
        formikRef.current.resetForm();
        return formikRef.current.setErrors(errors);
      }
      showConfirmDlg({
        open: true,
        close: () => {
          hideConfirm();
          formikRef.current.resetForm();
        },
        callback: async () => {
          try {
            const {
              data: { result },
            } = await JobService.update(job.id, formikRef.current?.values);
            setProjects(result.projects);
            toast.success("Job information Updated");
            queryClient.invalidateQueries({ queryKey: ["getAllJobs", job.id] });
          } catch (err) {
            toast.error(err.response?.data || err.message);
          }
          hideConfirm();
        },
      });
    }
  }, [job, hideConfirm, showConfirmDlg, setProjects, queryClient, formikRef]);

  useKey("Enter", handleSubmit, {
    target: formikRef.current,
  });

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={formInitialValues}
        validationSchema={currentValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        {({ values }) => (
          <Form>
            <JobDataItem
              item={JobDataKeys.companyInfo}
              myJob={values}
              expanded={expanded}
              handleExpand={handleExpand}
              handleBlur={handleSubmit}
              inputRef={inputRef}
              setEditingItemId={setEditingItemId}
              editingItemId={editingItemId}
              formikRef={formikRef}
            />
            <JobDataItem
              item={JobDataKeys.authorizedSignatoryInfo}
              myJob={values}
              expanded={expanded}
              handleExpand={handleExpand}
              handleBlur={handleSubmit}
              inputRef={inputRef}
              setEditingItemId={setEditingItemId}
              editingItemId={editingItemId}
              formikRef={formikRef}
            />
            <JobDataItem
              item={JobDataKeys.cardHolderInfo}
              myJob={values}
              expanded={expanded}
              handleExpand={handleExpand}
              handleBlur={handleSubmit}
              inputRef={inputRef}
              setEditingItemId={setEditingItemId}
              editingItemId={editingItemId}
              formikRef={formikRef}
            />
            <JobDataItem
              item={JobDataKeys.paymentInfo}
              myJob={values}
              expanded={expanded}
              handleExpand={handleExpand}
              handleBlur={handleSubmit}
              inputRef={inputRef}
              setEditingItemId={setEditingItemId}
              editingItemId={editingItemId}
              formikRef={formikRef}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
