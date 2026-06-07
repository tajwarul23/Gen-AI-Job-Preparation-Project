import { useNavigate } from "react-router";
import { useInterview } from "../Hooks/useInterview.js";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resumeAnalyzerSchema } from "../../../Schema/resumeAnalyzerSchema.js";
import { useEffect, useRef } from "react";
import InterviewReportSkeleton from "./InterviewReportSkeleton.jsx";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  const { generateReport, loading, error } = useInterview();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(resumeAnalyzerSchema),
    mode: "onTouched",
  });

useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const file = watch("resume");
  const selfDescription = watch("selfDescription") || "";
  const jobDescription = watch("jobDescription") || "";
  const fileInputRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      const report = await generateReport({
        selfDescription: data.selfDescription,
        jobDescription: data.jobDescription,
        resumeFile: data.resume,
      });

      

      navigate(`/interview/${report._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  if(loading)return <InterviewReportSkeleton/>
  return (
    <main className="min-h-screen flex flex-col justify-center items-center  p-8">
      <div className="bg-surface border border-line rounded-2xl p-10 w-full max-w-xl shadow-2xl">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 bg-violet-dim border border-violet-border text-violet-text text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <span className="w-2.5 h-2.5 bg-violet rounded-full animate-pulse" />
            AI Powered Resume Analyzer
          </span>

          <h1 className="text-3xl font-extrabold text-white leading-tight mb-1">
            Prep smarter{" "}
            <span className="text-violet-text">Land the role.</span>
          </h1>

          <p className="text-sm text-muted">
            Paste your details and get a personalized interview report.
          </p>
        </div>

        <hr className="border-white/25 mb-8" />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* About You */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              About You
            </label>

            <textarea
              rows={4}
              placeholder="Describe your background, skills, strengths..."
              {...register("selfDescription")}
              className="w-full bg-overlay border border-white/[0.07]
              rounded-xl text-gray-100 text-sm placeholder-gray-600
              px-4 py-3 resize-none outline-none
              focus:border-blue-500/50 focus:ring-2
              focus:ring-blue-500/10 transition"
            />

            <div className="flex justify-between mt-1">
              {errors.selfDescription && (
                <p className="text-red-400 text-sm">
                  {errors.selfDescription.message}
                </p>
              )}

              <p className="text-xs text-gray-500 ml-auto">
                {selfDescription.length}/1000
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Job Description
            </label>

            <textarea
              rows={6}
              placeholder="Paste the job description..."
              {...register("jobDescription")}
              className="w-full bg-overlay border border-white/[0.07]
              rounded-xl text-gray-100 text-sm placeholder-gray-600
              px-4 py-3 resize-none outline-none
              focus:border-blue-500/50 focus:ring-2
              focus:ring-blue-500/10 transition"
            />

            <div className="flex justify-between mt-1">
              {errors.jobDescription && (
                <p className="text-red-400 text-sm">
                  {errors.jobDescription.message}
                </p>
              )}

              <p className="text-xs text-gray-500 ml-auto">
                {jobDescription.length}/5000
              </p>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Resume
            </label>

            <label
              htmlFor="resume"
              className="flex flex-col items-center gap-2 bg-overlay
              border border-dashed border-white/10 rounded-xl p-5
              cursor-pointer hover:border-blue-500/40
              hover:bg-blue-600/5 transition"
            >
              <div className="w-9 h-9 bg-blue-600/15 rounded-lg flex items-center justify-center text-blue-400 text-lg">
                📄
              </div>

              <p className="text-sm text-gray-500">
                {file ? (
                  <span className="text-teal font-medium">{file.name}</span>
                ) : (
                  <span className="text-violet font-medium">
                    Click to upload PDF
                  </span>
                )}
              </p>

              <p className="text-xs text-gray-600">PDF only · Max 3MB</p>
              {file && <button className="font-display text-ink bg-red-400 mt-2 border border-line px-3 py-1 rounded-xl cursor-pointer "
                type="button"
                onClick={() => {
                  setValue("resume", null, {
                    shouldValidate: true,
                  });

                  fileInputRef.current.value = "";
                }}
              >
                Remove File
              </button>}
              <input
                type="file"
                id="resume"
                accept=".pdf"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) =>
                  setValue("resume", e.target.files[0], {
                    shouldValidate: true,
                  })
                }
              />
            </label>

            {errors.resume && (
              <p className="text-red-400 text-sm mt-2">
                {errors.resume.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full mt-2 bg-violet/50 hover:bg-violet
            disabled:opacity-50 disabled:cursor-not-allowed
            text-white font-semibold text-sm py-3.5 rounded-xl cursor-pointer
            transition active:scale-95
            flex items-center justify-center gap-2"
          >
            
              Generate Interview Report →
            
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResumeAnalyzer;
