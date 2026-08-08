import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createJobSchema, currencies } from "../../../Schema/createJobSchema";
import { useState } from "react";
import { Layers, Plus, Sparkles } from "lucide-react";
import ReviewJobPost from "../Components/ReviewJobPost";
import { useCreateJob, useGenerateJobDescription } from "../Hooks/useJob";
import toast from "react-hot-toast";

const JobStudio = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      workMode: "REMOTE",
      employmentType: "INTERNSHIP",

      skills: [],
      experienceLevel: "ENTRY",
      salary: {
        salaryMax: 0,
        salaryMin: 0,
        currency: "USD",
      },
      status: "OPEN",
      vacancy: "",
      deadline: "",
    },
  });
  const [hasGenerated, setHasGenerated] = useState(false);
  const skills = watch("skills");
  const data = watch();
  const description = watch("description");

  const addSkill = (value) => {
    const trimmed = value.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setValue("skills", [...skills, trimmed], { shouldValidate: true });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    addSkill(e.target.value);
    e.target.value = "";
  };

  const handleAddSkillClick = () => {
    const input = document.getElementById("skill-input");
    addSkill(input.value);
    input.value = "";
  };
  const handleFormKeyDown = (e) => {
    if (e.key === "Enter" && step !== 3) {
      e.preventDefault();
    }
  };
  const removeSkill = (index) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };
  const [step, setStep] = useState(1);
  const handleNextStep = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    let isValid = false;

    if (step === 1) {
      isValid = await trigger([
        "title",

        "location",
        "workMode",
        "employmentType",
      ]);
    }

    if (step === 2) {
      isValid = await trigger([
        "skills",
        "experienceLevel",
        "salary.salaryMin",
        "salary.salaryMax",
        "salary.currency",
        "status",
        "vacancy",
        "deadline",
      ]);
    }
    if (step === 3) {
      isValid = await trigger(["description"]);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };
  const { mutate: createJob, isPending } = useCreateJob();
  const {
    mutate: generateJobDescription,
    isPending: isGenerating,
    error: aiError,
  } = useGenerateJobDescription();

  const handleGenerateJobDescription = () => {
    const { title, experienceLevel, workMode, employmentType, skills } = data;

    if (
      !title?.trim() ||
      !workMode?.trim() ||
      !employmentType?.trim() ||
      !experienceLevel?.trim() ||
      !skills?.length
    ) {
      toast.error(
        "Fill in title, work mode, employment type, experience, and at least one skill first",
      );
      return;
    }

    generateJobDescription(
      {
        title,
        experienceLevel,
        workMode,
        employmentType,
        skills,
      },
      {
        onSuccess: (result) => {
          setHasGenerated(true);
          setValue("description", result.data.jobDescription, {
            shouldValidate: true,
            shouldDirty: true,
          });
          toast.success("Description generated");
        },
      },
    );
  };

  const onSubmit = (data) => {
    if (step !== 3) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // console.log(data);
    createJob(data);
  };

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });
  return (
    <div className="bg-app text-ink min-h-screen pt-24 pb-16 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/*  Header */}
        <div className="border-b border-line pb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-ink">
              Job Creation Studio
            </h2>
            <p className="text-xs text-muted font-mono mt-1">
              ALIGN JOB PROFILE TO MACHINE CLASSIFIERS
            </p>
          </div>
        </div>
        {/* Stepper header */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { num: 1, label: "Role Details" },
            { num: 2, label: "Requirements" },
            { num: 3, label: "AI Anchoring" },
          ].map((s) => (
            <div
              key={s.num}
              className={`border-b-2 pb-3 transition-colors ${
                step === s.num
                  ? "border-teal text-ink font-semibold"
                  : step > s.num
                    ? "border-teal/40 text-teal"
                    : "border-line text-muted"
              }`}
            >
              <div className="text-[10px] font-mono uppercase">
                Step 0{s.num}
              </div>
              <div className="text-xs sm:text-sm font-sans">{s.label}</div>
            </div>
          ))}
        </div>

        {/* form */}
        <form
          onSubmit={handleFormSubmit}
          onKeyDown={handleFormKeyDown}
          className="bg-surface border border-line rounded-2xl p-6 mt-6"
        >
          {/* ---------------- STEP 1 ---------------- */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-sm font-mono uppercase text-muted font-bold">
                Role Details
              </h3>

              {/* Title */}
              <div>
                <label className="block text-xs font-mono mb-2 uppercase">
                  Job Title *
                </label>

                <input
                  {...register("title")}
                  placeholder="Senior Backend Engineer"
                  className="w-full bg-overlay border border-line rounded-xl p-3"
                />

                <p className="text-red-400 text-xs mt-1">
                  {errors.title?.message}
                </p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-mono mb-2 uppercase">
                  Location *
                </label>

                <input
                  {...register("location")}
                  placeholder="Sylhet"
                  className="w-full bg-overlay border border-line rounded-xl p-3"
                />
                <p className="text-red-400 text-xs mt-1">
                  {errors.location?.message}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Work Mode */}
                <div>
                  <label className="block text-xs font-mono mb-2 uppercase">
                    Work Mode
                  </label>

                  <select
                    {...register("workMode")}
                    className="w-full bg-overlay border border-line rounded-xl p-3"
                  >
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="ONSITE">Onsite</option>
                  </select>
                </div>

                {/* Employment */}
                <div>
                  <label className="block text-xs font-mono mb-2 uppercase">
                    Employment Type
                  </label>

                  <select
                    {...register("employmentType")}
                    className="w-full bg-overlay border border-line rounded-xl p-3"
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 2 ---------------- */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-sm font-mono uppercase text-muted font-bold">
                Requirements
              </h3>

              {/* Skills */}
              <div>
                <label className="block text-xs font-mono mb-2 uppercase">
                  Skills *<span className="text-xs text-muted"></span>
                </label>

                <div className="flex w-full gap-2">
                  <input
                    id="skill-input"
                    onKeyDown={handleSkillKeyDown}
                    className="flex-1 bg-overlay border border-line rounded-xl p-3 text-sm 
               focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal
               placeholder:text-muted transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkillClick}
                    className="px-4 py-2 bg-teal hover:bg-teal/90 active:scale-95 text-app 
               text-xs font-bold rounded-xl cursor-pointer flex items-center 
               gap-1 shadow-md shadow-teal/10 transition-all whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-teal/10 border border-teal rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}

                      <button type="button" onClick={() => removeSkill(index)}>
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <p className="text-red-400 text-xs mt-1">
                  {errors.skills?.message}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Experience */}
                <div>
                  <label className="block text-xs font-mono mb-2 uppercase">
                    Experience
                  </label>

                  <select
                    {...register("experienceLevel")}
                    className="w-full bg-overlay border border-line rounded-xl p-3"
                  >
                    <option value="ENTRY">Entry</option>
                    <option value="JUNIOR">Junior</option>
                    <option value="MID">Mid</option>
                    <option value="SENIOR">Senior</option>
                    <option value="LEAD">Lead</option>
                  </select>
                </div>

                {/* Vacancy */}
                <div>
                  <label className="block text-xs font-mono mb-2 uppercase">
                    Vacancy *
                  </label>

                  <input
                    type="number"
                    {...register("vacancy")}
                    className="w-full bg-overlay border border-line rounded-xl p-3"
                  />

                  <p className="text-red-400 text-xs mt-1">
                    {errors.vacancy?.message}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono mb-2 uppercase">
                    Min Salary
                  </label>

                  <input
                    type="number"
                    {...register("salary.salaryMin")}
                    className="w-full bg-overlay border border-line rounded-xl p-3"
                  />
                  <p className="text-red-400 text-xs mt-1">
                    {errors.salary?.salaryMin?.message}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono mb-2 uppercase">
                    Max Salary
                  </label>

                  <input
                    type="number"
                    {...register("salary.salaryMax")}
                    className="w-full bg-overlay border border-line rounded-xl p-3"
                  />
                  <p className="text-red-400 text-xs mt-1">
                    {errors.salary?.salaryMax?.message}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono mb-2 uppercase">
                    Currency
                  </label>

                  <select
                    className="w-full bg-overlay border border-line rounded-xl p-3"
                    {...register("salary.currency")}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 uppercase">
                  Status
                </label>

                <select
                  {...register("status")}
                  className="w-full bg-overlay border border-line rounded-xl p-3"
                >
                  <option value="OPEN">Open</option>
                  <option value="DRAFT">Draft</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono mb-2 uppercase">
                  Deadline *
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
            </div>
          )}

          {/* ---------------- STEP 3 ---------------- */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-xs font-mono mb-2 uppercase">
                  Description *
                </label>

                <textarea
                  rows={8}
                  {...register("description")}
                  placeholder="Describe the role..."
                  className="w-full bg-overlay border border-line rounded-xl p-3"
                />
                <p className="text-xs text-gray-500 ml-auto">
                  {description?.length || 0}/5000
                </p>
                <p className="text-red-400 text-xs mt-1">
                  {errors.description?.message}
                </p>
                {aiError && (
                  <p className="text-red-400 text-sm">
                    Failed to generate description
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleGenerateJobDescription}
                disabled={isGenerating || hasGenerated}
                className="uppercase w-full sm:w-auto px-8 py-4 bg-teal/10 hover:bg-overlay border border-line hover:border-linehov text-ink font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal/10"
              >
                {isGenerating
                  ? "Generating..."
                  : hasGenerated
                    ? "Description Generated"
                    : "Generate Job Description with AI"}
                <Sparkles className="w-4 h-4 text-purple" />
              </button>
              <ReviewJobPost data={data} />
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between mt-8 border-t border-line pt-5">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 border border-line rounded-xl"
            >
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={(e) => handleNextStep(e)}
                className="px-4 py-2 bg-overlay hover:bg-surface text-ink border border-line text-xs font-semibold rounded-xl cursor-pointer transition-all"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="px-5 py-2 bg-teal hover:bg-teal/90 text-app text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1 shadow-md shadow-teal/10 transition-all"
              >
                <Layers className="w-3.5 h-3.5" />
                {isPending ? "Posting..." : "Post Job"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobStudio;
