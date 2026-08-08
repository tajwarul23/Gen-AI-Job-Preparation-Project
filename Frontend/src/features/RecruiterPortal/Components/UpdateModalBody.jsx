import { SquarePen, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateJob } from "../Hooks/useJob";
import toast from "react-hot-toast";

const UpdateModalBody = ({ updateDialogRef, job }) => {

    const convertDate = (date) =>{
        if(!date)return "";
        return new Date(date).toISOString().split("T")[0];
    }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      title: job?.title || "",
      location: job?.location || "",
      workMode: job?.workMode || "",
      employmentType: job?.employmentType || "",
      experienceLevel: job?.experienceLevel || "",
      vacancy: job?.vacancy || 1,
      description: job?.description || "",
      status: job?.status || "",
      deadline: convertDate(job?.deadline),
    },
  });
  const { mutate: updateJob, isError, isPending, error } = useUpdateJob();
  useEffect(() => {
    if (job) {
      reset({
        title: job.title || "",
        location: job.location || "",
        workMode: job.workMode || "",
        employmentType: job.employmentType || "",
        experienceLevel: job.experienceLevel || "",
        vacancy: job.vacancy || 1,
        description: job.description || "",
         status: job?.status || "",
         deadline: convertDate(job?.deadline),
      });
    }
  }, [job, reset]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "Failed to Update job");
    }
  }, [error]);

  const onSubmit = (data) => {
    updateJob({
      jobId: job._id,
      data,
    });
    updateDialogRef.current?.close();
  };

  return (
    <dialog ref={updateDialogRef} className="modal">
      <div className="modal-box max-w-2xl bg-surface">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Update Job</h3>

            <p className="mt-1 text-xs font-mono uppercase text-muted">
              Posted By: {job?.postedBy?.userName}
            </p>
          </div>

          <button
            type="button"
            onClick={() => updateDialogRef.current?.close()}
            className="rounded-lg p-2 text-muted transition-colors
                     hover:bg-overlay hover:text-ink cursor-pointer"
            aria-label="Close update modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="my-5 h-px bg-line" />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-xs font-mono mb-1 uppercase">
              Job Title
            </label>

            <input
              type="text"
              {...register("title", {
                required: "Job title is required",
              })}
              className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
            />

            {errors.title && (
              <p className="mt-1 text-xs text-error">{errors.title.message}</p>
            )}
          </div>

          {/* Location */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
            <label className="block text-xs font-mono mb-1 uppercase">
              Location
            </label>

            <input
              type="text"
              {...register("location", {
                required: "Location is required",
              })}
              className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
            />

            {errors.location && (
              <p className="mt-1 text-xs text-error">
                {errors.location.message}
              </p>
            )}
            
          </div>
          <div>
              <label className="block text-xs font-mono mb-1 uppercase">
                Status
              </label>

              <select
                {...register("status", {
                  required: "Work mode is required",
                })}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              >
                <option value="">Select</option>
                <option value="DRAFT">DRAFT</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>

              {errors.status && (
                <p className="mt-1 text-xs text-error">
                  {errors.status.message}
                </p>
              )}
            </div>
         </div>

          {/* Work Mode + Employment Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono mb-1 uppercase">
                Work Mode
              </label>

              <select
                {...register("workMode", {
                  required: "Work mode is required",
                })}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              >
                <option value="">Select</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ONSITE">Onsite</option>
              </select>

              {errors.workMode && (
                <p className="mt-1 text-xs text-error">
                  {errors.workMode.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono mb-1 uppercase">
                Employment Type
              </label>

              <select
                {...register("employmentType", {
                  required: "Employment type is required",
                })}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              >
                <option value="">Select</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>

              {errors.employmentType && (
                <p className="mt-1 text-xs text-error">
                  {errors.employmentType.message}
                </p>
              )}
            </div>
          </div>

          {/* Experience + Vacancy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono mb-1 uppercase">
                Experience Level
              </label>

              <select
                {...register("experienceLevel", {
                  required: "Experience level is required",
                })}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              >
                <option value="">Select</option>
                <option value="ENTRY">Entry</option>
                <option value="JUNIOR">Junior</option>
                <option value="MID">Mid</option>
                <option value="SENIOR">Senior</option>
                <option value="LEAD">Lead</option>
              </select>

              {errors.experienceLevel && (
                <p className="mt-1 text-xs text-error">
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono mb-1 uppercase">
                Openings
              </label>

              <input
                type="number"
                {...register("vacancy", {
                  required: "Number of openings is required",
                  min: {
                    value: 1,
                    message: "At least 1 opening is required",
                  },
                  valueAsNumber: true,
                })}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              />

              {errors.vacancy && (
                <p className="mt-1 text-xs text-error">
                  {errors.vacancy.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono mb-1 uppercase">
              Job Description
            </label>

            <textarea
              {...register("description", {
                required: "Job description is required",
              })}
              rows={8}
              className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
            />

            {errors.description && (
              <p className="mt-1 text-xs text-error">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Deadline */}
            <div>
                <label className="block text-xs font-mono mb-2 uppercase">
                  Deadline 
                </label>

                <input
                  type="date"
                  {...register("deadline")}
                  className="w-full bg-overlay border border-line rounded-xl p-3"
                />
                {errors.deadline && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.deadline.message}
                  </p>
                )}
              </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              onClick={() => updateDialogRef?.current?.close()}
              className="px-4 py-2 border border-line cursor-pointer rounded-lg p-2 text-muted
               transition-colors
               hover:bg-overlay hover:text-ink"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !isDirty || isPending}
              className={`px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-1 shadow-md transition-all
    ${
      (isDirty && !isSubmitting) || isPending
        ? "bg-teal hover:bg-teal/90 text-app cursor-pointer shadow-teal/10"
        : "bg-teal hover:bg-teal/90 text-app cursor-not-allowed shadow-teal/10 "
    }`}
            >
              <SquarePen className="w-3.5 h-3.5" />
              {isSubmitting || isPending ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateModalBody;
