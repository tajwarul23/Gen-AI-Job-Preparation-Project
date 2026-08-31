import { useEffect, useRef, useState } from "react";
import { useResume } from "../../ResumeBuilder/Hooks/useResume";
import { useApplyToJob } from "../Hooks/useApplication";
import { Check, FileText, Loader2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const ApplyModalBody = ({ applyDialogRef, jobId }) => {
  const [mode, setMode] = useState("existing");
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const {
    getAllResume,

    resumes,
    error,

    loading: resumeLoading,
  } = useResume();

  useEffect(() => {
    getAllResume();
  }, []);

  // useEffect(() => {
  //   toast.error(error?.response?.data?.message || "Something went wrong ");
  //   console.log(error?.response?.data?.message);
  // }, [error]);

  const fileInputRef = useRef(null);

  //get user's saved resume

  //apply mutation
  const { mutate: applyToJob, isPending } = useApplyToJob();

  const closeModal = () => {
    if (isPending || resumeLoading) return;
    applyDialogRef?.current?.close();
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);

    //clear the selection of previous mode
    if (newMode === "existing") {
      setUploadFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    if (newMode === "upload") {
      setSelectedResumeId(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setUploadFile(file);
  };

  const handleRemoveFile = () => {
    setUploadFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const canSubmit =
    (mode === "existing" && !!selectedResumeId) ||
    (mode === "upload" && !!uploadFile);

  const handleSubmit = () => {
    if (isPending || resumeLoading) return;
    if (mode === "existing") {
      if (selectedResumeId === null) return;
      applyToJob(
        {
          jobId,
          resumeId: selectedResumeId,
        },
        {
          onSuccess: () => {
            closeModal();
          },
        },
      );
    }

    if (mode === "upload") {
      if (uploadFile === null) return;
      applyToJob(
        {
          jobId,
          file: uploadFile,
        },
        {
          onSuccess: () => {
            closeModal();
          },
        },
      );
    }
    return;
  };
  return (
    <dialog
      ref={applyDialogRef}
      className=" modal "
      onClick={(e) => {
        if (e.target === applyDialogRef.current) {
          closeModal();
        }
      }}
    >
      <div className="modal-box max-w-2xl bg-surface">
        {" "}
        {/* HEADER */}{" "}
        <div className="flex items-center justify-between border-b border-line p-5">
          {" "}
          <h2 className="text-base font-bold text-ink">
            {" "}
            Apply to this job{" "}
          </h2>{" "}
          <button
            type="button"
            onClick={closeModal}
            disabled={isPending}
            className=" rounded-lg p-1.5 text-muted transition-colors hover:bg-overlay hover:text-ink cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
          >
            {" "}
            <X className="h-4 w-4" />{" "}
          </button>{" "}
        </div>{" "}
        <div className="p-5">
          {" "}
          {/* MODE TABS */}{" "}
          <div className="mb-4 flex gap-2 rounded-lg border border-line bg-overlay p-1">
            {" "}
            <button
              type="button"
              onClick={() => handleModeChange("existing")}
              disabled={isPending}
              className={` flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${mode === "existing" ? "bg-surface text-violet shadow-sm" : "text-muted hover:text-ink"} `}
            >
              {" "}
              Use existing resume{" "}
            </button>{" "}
            <button
              type="button"
              onClick={() => handleModeChange("upload")}
              disabled={isPending}
              className={` flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${mode === "upload" ? "bg-surface text-violet shadow-sm" : "text-muted hover:text-ink"} `}
            >
              {" "}
              Upload new{" "}
            </button>{" "}
          </div>{" "}
          {/* EXISTING RESUMES */}{" "}
          {mode === "existing" && (
            <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
              {" "}
              {resumeLoading && (
                <div className="flex items-center justify-center py-8 text-muted">
                  {" "}
                  <Loader2 className="h-5 w-5 animate-spin" />{" "}
                </div>
              )}{" "}
              {!resumeLoading && resumes.length === 0 && (
                <div className="rounded-xl border border-line bg-overlay p-6 text-center">
                  {" "}
                  <FileText className="mx-auto h-8 w-8 text-muted" />{" "}
                  <p className="mt-2 text-sm text-muted">
                    {" "}
                    You don't have any saved resumes yet.{" "}
                  </p>{" "}
                  <button
                    type="button"
                    onClick={() => handleModeChange("upload")}
                    disabled={isPending}
                    className=" mt-3 text-xs font-semibold text-violet hover:text-violet-dim cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
                  >
                    {" "}
                    Upload one instead →{" "}
                  </button>{" "}
                </div>
              )}{" "}
              {!resumeLoading &&
                resumes.map((resume) => {
                  const isSelected = selectedResumeId === resume._id;
                  return (
                    <button
                      key={resume._id}
                      type="button"
                      onClick={() => setSelectedResumeId(resume._id)}
                      disabled={isPending}
                      className={` flex items-center gap-3 rounded-xl border p-3 text-left transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${isSelected ? "border-violet bg-violet/10" : "border-line bg-surface hover:border-violet/30 hover:bg-overlay"} `}
                    >
                      {" "}
                      <div
                        className={` flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isSelected ? "bg-violet/20 text-violet" : "bg-ink/5 text-muted"} `}
                      >
                        {" "}
                        <FileText className="h-4 w-4" />{" "}
                      </div>{" "}
                      <div className="min-w-0 flex-1">
                        {" "}
                        <p className="truncate text-sm font-semibold text-ink">
                          {" "}
                          {resume.title || "Untitled Resume"}{" "}
                        </p>{" "}
                        {resume.updatedAt && (
                          <p className="text-xs text-muted">
                            {" "}
                            Updated{" "}
                            {new Date(
                              resume.updatedAt,
                            ).toLocaleDateString()}{" "}
                          </p>
                        )}{" "}
                      </div>{" "}
                      {isSelected && (
                        <Check className="h-4 w-4 shrink-0 text-violet" />
                      )}{" "}
                    </button>
                  );
                })}{" "}
            </div>
          )}{" "}
          {/* UPLOAD NEW */}{" "}
          {mode === "upload" && (
            <div>
              {" "}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />{" "}
              {!uploadFile ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                  className=" flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line p-8 text-center transition-colors hover:border-violet/40 hover:bg-overlay cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
                >
                  {" "}
                  <Upload className="h-8 w-8 text-muted" />{" "}
                  <p className="text-sm font-semibold text-ink">
                    {" "}
                    Click to upload your resume{" "}
                  </p>{" "}
                  <p className="text-xs text-muted"> PDF, DOC, or DOCX </p>{" "}
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-violet bg-violet/10 p-3">
                  {" "}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet/20 text-violet">
                    {" "}
                    <FileText className="h-4 w-4" />{" "}
                  </div>{" "}
                  <div className="min-w-0 flex-1">
                    {" "}
                    <p className="truncate text-sm font-semibold text-ink">
                      {" "}
                      {uploadFile.name}{" "}
                    </p>{" "}
                    <p className="text-xs text-muted">
                      {" "}
                      {(uploadFile.size / 1024).toFixed(0)} KB{" "}
                    </p>{" "}
                  </div>{" "}
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={isPending}
                    className=" shrink-0 rounded-lg p-1.5 text-muted hover:bg-overlay hover:text-red-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
                  >
                    {" "}
                    <X className="h-4 w-4" />{" "}
                  </button>{" "}
                </div>
              )}{" "}
            </div>
          )}{" "}
        </div>{" "}
        {/* FOOTER */}{" "}
        <div className="flex items-center justify-end gap-2 border-t border-line p-5">
          {" "}
          <button
            type="button"
            onClick={closeModal}
            disabled={isPending}
            className=" rounded-lg border-2 border-line px-4 py-2 text-xs font-semibold text-muted transition-colors hover:bg-overlay hover:text-ink cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            type="button"
            disabled={!canSubmit || isPending}
            onClick={handleSubmit}
            className=" flex items-center gap-1.5 rounded-lg bg-violet px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-dim disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer "
          >
            {" "}
            {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}{" "}
            {isPending ? "Submitting..." : "Submit Application"}{" "}
          </button>{" "}
        </div>{" "}
      </div>
    </dialog>
  );
};

export default ApplyModalBody;
