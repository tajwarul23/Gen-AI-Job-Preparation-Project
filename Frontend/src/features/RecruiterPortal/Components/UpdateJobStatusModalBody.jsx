import { useState } from "react";

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

  const isInterview = status === "interview";
  const [interviewLink, setInterviewLink] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  const canConfirm =
    !isInterview ||
    (interviewLink.trim() && interviewDate && interviewTime);

  const handleConfirm = () => {
    if (!canConfirm) return;
    updateApplicationStatus(
      {
        applicationId,
        status,
        ...(isInterview && { interviewLink, interviewDate, interviewTime }),
      },
      {
        onSuccess: () => {
          setInterviewLink("");
          setInterviewDate("");
          setInterviewTime("");
          updateStatusRef?.current?.close();
        },
      },
    );
  };

  return (
    <dialog ref={updateStatusRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-mono">{copy.title}</h3>

        <p className="py-4 font-mono">{copy.body}</p>

        {isInterview && (
          <div className="space-y-3 pb-4 font-mono">
            <div>
              <label className="block text-xs mb-1 uppercase">
                Meeting Link
              </label>
              <input
                type="url"
                value={interviewLink}
                onChange={(e) => setInterviewLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                disabled={isPending}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1 uppercase">Date</label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal font-sans"
                />
              </div>

              <div>
                <label className="block text-xs mb-1 uppercase">Time</label>
                <input
                  type="time"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal font-sans"
                />
              </div>
            </div>
          </div>
        )}

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
            disabled={isPending || !canConfirm}
          >
            {isPending ? copy.pendingLabel : copy.confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateJobStatusModalBody;