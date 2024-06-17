import { useState } from "react";

import { JobDataItem } from "./job-data-item";
import { JobDataKeys } from "./job-data-keys";

export const JobDataAccordions = ({
  myJob,
  inputRef,
  handleChange,
  handleBlur,
  editingItemId,
  setEditingItemId,
}) => {
  const [expanded, setExpanded] = useState(JobDataKeys.companyInfo.name);

  const handleExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (!myJob) return null;

  return (
    <>
      <JobDataItem
        item={JobDataKeys.companyInfo}
        myJob={myJob}
        inputRef={inputRef}
        handleChange={handleChange}
        handleBlur={handleBlur}
        editingItemId={editingItemId}
        setEditingItemId={setEditingItemId}
        expanded={expanded}
        handleExpand={handleExpand}
      />
      <JobDataItem
        item={JobDataKeys.authorizedSignatoryInfo}
        myJob={myJob}
        inputRef={inputRef}
        handleChange={handleChange}
        handleBlur={handleBlur}
        editingItemId={editingItemId}
        setEditingItemId={setEditingItemId}
        expanded={expanded}
        handleExpand={handleExpand}
      />
      <JobDataItem
        item={JobDataKeys.cardHolderInfo}
        myJob={myJob}
        inputRef={inputRef}
        handleChange={handleChange}
        handleBlur={handleBlur}
        editingItemId={editingItemId}
        setEditingItemId={setEditingItemId}
        expanded={expanded}
        handleExpand={handleExpand}
      />
      <JobDataItem
        item={JobDataKeys.paymentInfo}
        myJob={myJob}
        inputRef={inputRef}
        handleChange={handleChange}
        handleBlur={handleBlur}
        editingItemId={editingItemId}
        setEditingItemId={setEditingItemId}
        expanded={expanded}
        handleExpand={handleExpand}
      />
    </>
  );
};
