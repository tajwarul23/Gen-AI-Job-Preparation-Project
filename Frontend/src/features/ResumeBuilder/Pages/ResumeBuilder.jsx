import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeBuilderSchema } from "../../../Schema/resumeBuilderSchema.js";
import { useResume } from "../../interview/Hooks/useResume.js";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ── Sub-components ───────────────────────────────────────────────────────────
const Field = ({ error, children }) => (
  <div className="flex flex-col gap-[6px]">
    <div
      className={`flex items-start gap-3 bg-[#12121a] border rounded-[10px] px-4 py-[13px] transition-colors duration-200 ${
        error
          ? "border-[rgba(247,130,106,0.5)] bg-[rgba(247,130,106,0.05)]"
          : "border-[#252535] hover:border-[#3a3a55]"
      }`}
    >
      <span
        className={`w-[7px] h-[7px] rounded-full shrink-0 mt-1.5 ${
          error ? "bg-[#f7826a]" : "bg-violet"
        }`}
      />
      {children}
    </div>
    {error && (
      <span className="font-mono text-[11px] text-[#f7a090] pl-1 flex items-center gap-1">
        <span>✗</span> {error}
      </span>
    )}
  </div>
);

const inputClass =
  "w-full bg-transparent font-mono text-[13px] text-[#c8c8e0] placeholder:text-[#5a5a78] outline-none ";

const textareaClass =
  "w-full bg-transparent font-mono text-[13px] text-[#c8c8e0] placeholder:text-[#5a5a78] outline-none resize-none leading-relaxed";

const Section = ({ title, children }) => (
  <div className="mb-7">
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display text-[11px] tracking-[0.18em] text-violet uppercase whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-[#2a2a38]" />
    </div>
    <div className="flex flex-col gap-[10px]">{children}</div>
  </div>
);

const CharCount = ({ current, max }) => (
  <span
    className={`font-mono text-[10px] ml-auto flex-shrink-0 ${
      current > max ? "text-[#f7a090]" : "text-[#3a3a55]"
    }`}
  >
    {current}/{max}
  </span>
);

// ── Main Component ───────────────────────────────────────────────────────────
const ResumeBuilder = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(resumeBuilderSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      portfolioUrl: "",
      summary: "",
      experiences: [],
      education: [{ degree: "", institution: "", result: "" }],
      skills: [{ name: "", description: "" }],
      certifications: [],
      projects: [{ name: "", githubLink: "", liveLink: "", description: "" }],
    },
  });

  //experiences fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });
  //education fields
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  //projects fields
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: "projects" });

  //skills fields
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });

  //certification fields
  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({ control, name: "certifications" });

  const summaryVal = watch("summary") ?? "";

  const { createResume, error } = useResume();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const resume = await createResume(data);
    if (resume) {
      const resumeId = resume._id;
      console.log(resume);

      navigate(`/resume/${resumeId}`);
    }
  };

  let buttonContent;
  if (isSubmitting) {
    buttonContent = (
      <>
        <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
        Generating…
      </>
    );
  } else if (isSubmitSuccessful && !error)
    buttonContent = "✅Resume ready — Redirecting";
  else if (error)
    buttonContent = "⚠️Failed to Generate resume. Please try again Later";
  else buttonContent = "Generate Resume";
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-10">
        <p className="text-violet uppercase font-mono tracking-wider text-sm">
          // Resume Builder
        </p>
        <h1 className=" text-4xl sm:text-5xl lg:text-7xl font-black leading-none  text-ink font-display scale-y-75  wrap-break-word">
          Build a resume that actually gets read
        </h1>
        <p className="text-muted font-display">
          Fill in your details and PrepLab generates a clean, ATS-optimized
          resume. No templates that look like everyone else's.
        </p>
      </div>
      <div className="flex  justify-center items-start px-4 py-8">
        <div className="bg-surface border border-line rounded-2xl p-7 w-full max-w-[860px]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/*   */}
            
            {/* ── Personal Info ── */}
            <Section title="Personal Info">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input
                    maxLength={300}
                    {...register("fullName")}
                    placeholder="Full Name"
                    autoComplete="name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    maxLength={300}
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                <Field label="Phone" error={errors.phone?.message}>
                  <input
                    maxLength={300}
                    {...register("phone")}
                    type="tel"
                    placeholder="Phone"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </Field>
                <Field label="Location" error={errors.location?.message}>
                  <input
                    maxLength={300}
                    {...register("location")}
                    placeholder="Location"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="LinkedIn URL" error={errors.linkedinUrl?.message}>
                <input
                  maxLength={300}
                  {...register("linkedinUrl")}
                  type="url"
                  placeholder="LinkedIn URL(optional)"
                  autoComplete="url"
                  className={inputClass}
                />
              </Field>
              <Field label="Portfolio URL" error={errors.portfolioUrl?.message}>
                <input
                  maxLength={300}
                  {...register("portfolioUrl")}
                  type="url"
                  placeholder="Portfolio URL(optional)"
                  autoComplete="url"
                  className={inputClass}
                />
              </Field>
              <Field
                label="GitHub Profile Link"
                error={errors.githubProfileLink?.message}
              >
                <input
                  maxLength={300}
                  {...register("githubProfileLink")}
                  type="url"
                  placeholder="GitHub URL(optional)"
                  autoComplete="url"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Professional Summary"
                error={errors.summary?.message}
              >
                <textarea
                  {...register("summary")}
                  placeholder="Professional Summary (2–3 lines)"
                  rows={3}
                  className={textareaClass}
                />
                <CharCount current={summaryVal.length} max={500} />
              </Field>
            </Section>

            {/* Skills */}
            <Section title="Skills">
              {skillFields.length === 0 && (
                <p className="font-mono text-[12px] text-[#5a5a78] text-center py-2">
                  No Skills added — click below to add one
                </p>
              )}

              {skillFields.map((field, index) => {
                const descriptionValue =
                  watch(`skills.${index}.description`) || "";
                return (
                  <div
                    key={field.id}
                    className="bg-[#0f0f17] border border-[#252535] rounded-xl p-4 flex flex-col gap-[10px]"
                  >
                    {/* header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] text-[#3a3a55] uppercase tracking-widest">
                        Skill #{index + 1}
                      </span>

                      {skillFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="font-mono text-[11px] text-[#5a5a78] hover:text-[#f7a090] transition-colors duration-150 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <Field
                      label="Skill Name"
                      error={errors.skills?.[index]?.name?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`skills.${index}.name`)}
                        placeholder="Skill Name"
                        className={inputClass}
                      />
                    </Field>

                    <Field
                      label="Skill Description"
                      error={errors.skills?.[index]?.description?.message}
                    >
                      <textarea
                        {...register(`skills.${index}.description`)}
                        placeholder="Skill Description"
                        rows={4}
                        className={textareaClass}
                      />
                      <CharCount current={descriptionValue.length} max={300} />
                    </Field>
                  </div>
                );
              })}

              {/* Add project */}
              <button
                type="button"
                onClick={() =>
                  appendSkill({
                    name: "",
                    description: "",
                  })
                }
                className="w-full border border-dashed border-[#2a2a38] hover:border-[rgba(124,106,247,0.4)] text-[#5a5a78] hover:text-[#a99af7] font-mono text-[12px] rounded-[10px] py-3 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-[16px] leading-none">+</span>
                Add another Skill
              </button>
            </Section>

            {/* ── Work Experience ── */}
            <Section title="Work Experience (Optional)">
              {fields.length === 0 && (
                <p className="font-mono text-[12px] text-[#5a5a78] text-center py-2">
                  No experience added — click below to add a position
                </p>
              )}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-[#0f0f17] border border-[#252535] rounded-xl p-4 flex flex-col gap-[10px]"
                >
                  {/* block header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] text-[#3a3a55] uppercase tracking-widest">
                      Position #{index + 1}
                    </span>
                    {fields.length > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="font-mono text-[11px] text-[#5a5a78] hover:text-[#f7a090] transition-colors duration-150 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                    <Field
                      label="Job Title"
                      error={errors.experiences?.[index]?.jobTitle?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`experiences.${index}.jobTitle`)}
                        placeholder="Job Title"
                        className={inputClass}
                      />
                    </Field>
                    <Field
                      label="Company"
                      error={errors.experiences?.[index]?.company?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`experiences.${index}.company`)}
                        placeholder="Company"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                    <Field
                      label="Duration"
                      error={errors.experiences?.[index]?.duration?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`experiences.${index}.duration`)}
                        placeholder="e.g. Jan 2022 – Present"
                        className={inputClass}
                      />
                    </Field>
                    <Field
                      label="Location"
                      error={errors.experiences?.[index]?.expLocation?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`experiences.${index}.expLocation`)}
                        placeholder="City or Remote"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Key Achievements"
                    error={errors.experiences?.[index]?.achievements?.message}
                  >
                    <textarea
                      {...register(`experiences.${index}.achievements`)}
                      placeholder="Key Achievements"
                      className={textareaClass}
                    />
                  </Field>
                </div>
              ))}

              {/* Add position */}
              <button
                type="button"
                onClick={() =>
                  append({
                    jobTitle: "",
                    company: "",
                    duration: "",
                    expLocation: "",
                    achievements: "",
                  })
                }
                className="w-full border border-dashed border-[#2a2a38] hover:border-[rgba(124,106,247,0.4)] text-[#5a5a78] hover:text-[#a99af7] font-mono text-[12px] rounded-[10px] py-3 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-[16px] leading-none">+</span> Add another
                position
              </button>
            </Section>

            {/* ── Education ── */}
            <Section title="Education">
              {educationFields.length === 0 && (
                <p className="font-mono text-[12px] text-[#5a5a78] text-center py-2">
                  No Education added — click below to add one
                </p>
              )}
              {educationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-[#0f0f17] border border-[#252535] rounded-xl p-4 flex flex-col gap-[10px]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] text-[#3a3a55] uppercase tracking-widest">
                      Education #{index + 1}
                    </span>

                    {educationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="font-mono text-[11px] text-[#5a5a78] hover:text-[#f7a090] cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                    <Field
                      label="Degree & Major"
                      error={errors.education?.[index]?.degree?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`education.${index}.degree`)}
                        placeholder="Degree & Major"
                        className={inputClass}
                      />
                    </Field>

                    <Field
                      label="Institution"
                      error={errors.education?.[index]?.institution?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`education.${index}.institution`)}
                        placeholder="Institution"
                        className={inputClass}
                      />
                    </Field>

                    <Field
                      label="Result"
                      error={errors.education?.[index]?.result?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`education.${index}.result`)}
                        placeholder="Result Optional (e.g. GPA, Honors)"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              ))}

              {/* Add button */}
              <button
                type="button"
                onClick={() =>
                  appendEducation({
                    degree: "",
                    institution: "",
                    result: "",
                  })
                }
                className="cursor-pointer w-full border border-dashed border-[#2a2a38] hover:border-[rgba(124,106,247,0.4)] text-[#5a5a78] hover:text-[#a99af7] font-mono text-[12px] rounded-[10px] py-3 transition-all duration-200"
              >
                + Add Education
              </button>
            </Section>

            {/* Certificates */}

            <Section title="Certificates (optional)">
              {certificationFields.length === 0 && (
                <p className="font-mono text-[12px] text-[#5a5a78] text-center py-2">
                  No Certifications added — click below to add one
                </p>
              )}

              {certificationFields.map((field, index) => {
                const nameValue = watch(`certifications.${index}.name`) || "";
                const issuerValue =
                  watch(`certifications.${index}.issuer`) || "";

                return (
                  <div
                    key={field.id}
                    className="bg-[#0f0f17] border border-[#252535] rounded-xl p-4 flex flex-col gap-[10px]"
                  >
                    {/* header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] text-[#3a3a55] uppercase tracking-widest">
                        Certification #{index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="font-mono text-[11px] text-[#5a5a78] hover:text-[#f7a090] transition-colors duration-150 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <Field
                      label="Certification Name"
                      error={errors.certifications?.[index]?.name?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`certifications.${index}.name`)}
                        placeholder="Certification Name"
                        className={inputClass}
                      />
                      <CharCount current={nameValue.length} max={30} />
                    </Field>

                    <Field
                      label="Certification Issuer"
                      error={errors.certifications?.[index]?.issuer?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`certifications.${index}.issuer`)}
                        placeholder="Certification Issuer"
                        className={inputClass}
                      />
                      <CharCount current={issuerValue.length} max={30} />
                    </Field>
                    <Field
                      label="Issue Date"
                      error={errors.certifications?.[index]?.issueDate?.message}
                    >
                      <input
                        maxLength={300}
                        type="date"
                        {...register(`certifications.${index}.issueDate`)}
                        placeholder="Certification issue Date"
                        className={inputClass}
                      />
                    </Field>
                    <Field
                      label="Credential URL"
                      error={
                        errors.certifications?.[index]?.credentialUrl?.message
                      }
                    >
                      <input
                        maxLength={300}
                        {...register(`certifications.${index}.credentialUrl`)}
                        placeholder="Certification Credential URL"
                        type="url"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                );
              })}

              {/* Add Certifications */}
              <button
                type="button"
                onClick={() =>
                  appendCertification({
                    name: "",
                    issuer: "",
                    issueDate: "",
                    credentialUrl: "",
                  })
                }
                className="w-full border border-dashed border-[#2a2a38] hover:border-[rgba(124,106,247,0.4)] text-[#5a5a78] hover:text-[#a99af7] font-mono text-[12px] rounded-[10px] py-3 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-[16px] leading-none">+</span>
                Add another Certificate
              </button>
            </Section>
            {/* ── Projects ── */}
            <Section title="Projects">
              {projectFields.length === 0 && (
                <p className="font-mono text-[12px] text-[#5a5a78] text-center py-2">
                  No projects added — click below to add one
                </p>
              )}

              {projectFields.map((field, index) => {
                const descriptionValue =
                  watch(`projects.${index}.description`) || "";
                return (
                  <div
                    key={field.id}
                    className="bg-[#0f0f17] border border-[#252535] rounded-xl p-4 flex flex-col gap-[10px]"
                  >
                    {/* header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] text-[#3a3a55] uppercase tracking-widest">
                        Project #{index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="font-mono text-[11px] text-[#5a5a78] hover:text-[#f7a090] transition-colors duration-150 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <Field
                      label="Project Name"
                      error={errors.projects?.[index]?.name?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`projects.${index}.name`)}
                        placeholder="Project Name"
                        className={inputClass}
                      />
                    </Field>

                    <Field
                      label="GitHub Link"
                      error={errors.projects?.[index]?.githubLink?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`projects.${index}.githubLink`)}
                        placeholder="Project live link: https://yourProject.com/..."
                        className={inputClass}
                      />
                    </Field>
                    <Field
                      label="Live Link"
                      error={errors.projects?.[index]?.liveLink?.message}
                    >
                      <input
                        maxLength={300}
                        {...register(`projects.${index}.liveLink`)}
                        placeholder="Project Repository: https://github.com/..."
                        className={inputClass}
                      />
                    </Field>

                    <Field
                      label="Description"
                      error={errors.projects?.[index]?.description?.message}
                    >
                      <textarea
                        {...register(`projects.${index}.description`)}
                        placeholder="Project Description"
                        rows={4}
                        className={textareaClass}
                      />
                      <CharCount current={descriptionValue.length} max={300} />
                    </Field>
                  </div>
                );
              })}

              {/* Add project */}
              <button
                type="button"
                onClick={() =>
                  appendProject({
                    name: "",
                    githubLink: "",
                    liveLink: "",
                    description: "",
                  })
                }
                className="w-full border border-dashed border-[#2a2a38] hover:border-[rgba(124,106,247,0.4)] text-[#5a5a78] hover:text-[#a99af7] font-mono text-[12px] rounded-[10px] py-3 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-[16px] leading-none">+</span>
                Add another project
              </button>
            </Section>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-violet hover:bg-[#7c72f7] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[15px] tracking-wide rounded-xl py-4 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {buttonContent}
            </button>

            {/* Global form error summary (only on submit) */}
            {Object.keys(errors).length > 0 && (
              <p className="mt-3 text-center font-mono text-[12px] text-[#f7a090]">
                ✗ Fix the errors above before generating your resume
                {errors.name}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
