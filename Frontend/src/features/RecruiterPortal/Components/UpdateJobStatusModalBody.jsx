const STATUS_COPY = {
  interview: {
    title: "Call for Interview?",
    body: "This will move the candidate to the interview stage. We will notify the candidate through email.",
    confirmLabel: "Call for Interview",
    pendingLabel: "Updating...",
    confirmClassName: "btn-warning",
  },
  shortlisted: {
    title: "Shortlist Candidate?",
    body: "This will mark the candidate as shortlisted for this job. We will notify the candidate through email.",
    confirmLabel: "Shortlist",
    pendingLabel: "Updating...",
    confirmClassName: "btn-info",
  },
  hired: {
    title: "Hire Candidate?",
    body: "This will mark the candidate as hired for this job. We will notify the candidate through email.",
    confirmLabel: "Hire",
    pendingLabel: "Updating...",
    confirmClassName: "btn-success",
  },
  rejected: {
    title: "Reject Candidate?",
    body: "This will mark the candidate as rejected for this job. We will notify the candidate through email.",
    confirmLabel: "Reject",
    pendingLabel: "Updating...",
    confirmClassName: "btn-error",
  },
};

const UpdateJobStatusModalBody = ({
  updateStatusRef,
  applicationId,
  status,
  updateApplicationStatus,
  isPending,
}) => {
  const copy = STATUS_COPY[status] ?? {
    title: "Update Status?",
    body: "This will update the candidate's application status.",
    confirmLabel: "Confirm",
    pendingLabel: "Updating...",
    confirmClassName: "btn-primary",
  };

  const handleConfirm = () => {
    updateApplicationStatus(
      { applicationId, status },
      { onSuccess: () => updateStatusRef?.current?.close() },
    );
  };

  return (
    <dialog ref={updateStatusRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-mono">{copy.title}</h3>

        <p className="py-4 font-mono">{copy.body}</p>

        <div className="modal-action font-mono">
          <button
            type="button"
            className="btn"
            onClick={() => updateStatusRef?.current?.close()}
            disabled={isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            className={`btn ${copy.confirmClassName}`}
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? copy.pendingLabel : copy.confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateJobStatusModalBody;