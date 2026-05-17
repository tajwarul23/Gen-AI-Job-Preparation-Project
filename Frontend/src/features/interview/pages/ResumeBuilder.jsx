import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

// ── Schema ──────────────────────────────────────────────────────────────────
const schema = z.object({
  // Personal Info
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s\-().]+$/, "Only digits, spaces, +, -, () allowed"),
  location: z
    .string()
    .min(2, "Location is required")
    .max(100, "Location is too long"),
  portfolioUrl: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val === "" ||
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(val),
      "Enter a valid URL"
    ),
  summary: z
    .string()
    .min(30, "Summary should be at least 30 characters")
    .max(500, "Keep your summary under 500 characters"),

  // Work Experience — repeatable
  experiences: z
    .array(
      z.object({
        jobTitle: z.string().min(2, "Job title is required"),
        company: z.string().min(1, "Company name is required"),
        duration: z.string().min(1, "Duration is required"),
        expLocation: z.string().min(1, "Location is required"),
        achievements: z
          .string()
          .min(20, "Add at least one achievement (20+ characters)"),
      })
    )
    .min(1, "Add at least one work experience"),

  // Education & Skills
  degree: z.string().min(2, "Degree & major is required"),
  university: z.string().min(2, "University name is required"),
  techStack: z
    .string()
    .min(3, "List at least one skill")
    .max(300, "Too many characters — split into multiple lines"),
  certifications: z.string().optional(),
  projects: z
    .string()
    .min(10, "Describe at least one project")
    .max(600, "Keep projects section under 600 characters"),
});

// ── Sub-components ───────────────────────────────────────────────────────────
const Field = ({  error, children }) => (
  <div className="flex flex-col gap-[6px]">
    <div
      className={`flex items-center gap-3 bg-[#12121a] border rounded-[10px] px-4 py-[13px] transition-colors duration-200 ${
        error
          ? "border-[rgba(247,130,106,0.5)] bg-[rgba(247,130,106,0.05)]"
          : "border-[#252535] hover:border-[#3a3a55]"
      }`}
    >
      <span
        className={`w-[7px] h-[7px] rounded-full shrink-0 ${
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
  "w-full bg-transparent font-mono text-[13px] text-[#c8c8e0] placeholder:text-[#5a5a78] outline-none select-none";

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
      current > max * 0.9 ? "text-[#f7a090]" : "text-[#3a3a55]"
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
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      portfolioUrl: "",
      summary: "",
      experiences: [
        {
          jobTitle: "",
          company: "",
          duration: "",
          expLocation: "",
          achievements: "",
        },
      ],
      degree: "",
      university: "",
      techStack: "",
      certifications: "",
      projects: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const summaryVal = watch("summary") ?? "";
  const projectsVal = watch("projects") ?? "";
  const techStackVal = watch("techStack") ?? "";

  const onSubmit = async (data) => {
    // Replace with your actual submit logic / API call
    console.log("Form data:", data);
    await new Promise((r) => setTimeout(r, 800)); // simulate request
  };

  return (
    <div className="flex justify-center items-start px-4 py-8">
      <div className="bg-surface border border-line rounded-2xl p-7 w-full max-w-[860px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* ── Personal Info ── */}
          <Section title="Personal Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
              <Field label="Full Name" error={errors.fullName?.message}>
                <input
                  {...register("fullName")}
                  placeholder="Full Name"
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
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
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone"
                  autoComplete="tel"
                  className={inputClass}
                />
              </Field>
              <Field label="Location" error={errors.location?.message}>
                <input
                  {...register("location")}
                  placeholder="Location"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              label="LinkedIn / Portfolio URL"
              error={errors.portfolioUrl?.message}
            >
              <input
                {...register("portfolioUrl")}
                type="url"
                placeholder="LinkedIn / Portfolio URL"
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

          {/* ── Work Experience ── */}
          <Section title="Work Experience">
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
                  {fields.length > 1 && (
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
                    placeholder="• Led migration of payment service, reducing latency by 40%&#10;• Designed API handling 2M+ requests/day"
                    rows={3}
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

          {/* ── Education & Skills ── */}
          <Section title="Education & Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
              <Field label="Degree & Major" error={errors.degree?.message}>
                <input
                  {...register("degree")}
                  placeholder="Degree & Major"
                  className={inputClass}
                />
              </Field>
              <Field label="University" error={errors.university?.message}>
                <input
                  {...register("university")}
                  placeholder="University"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              label="Tech Stack / Skills"
              error={errors.techStack?.message}
            >
              <textarea
                {...register("techStack")}
                placeholder="Go, Python, PostgreSQL, Redis, Kafka, Kubernetes…"
                rows={2}
                className={textareaClass}
              />
              <CharCount current={techStackVal.length} max={300} />
            </Field>

            <Field
              label="Certifications"
              error={errors.certifications?.message}
            >
              <input
                {...register("certifications")}
                placeholder="Certifications (optional)"
                className={inputClass}
              />
            </Field>

            <Field label="Projects" error={errors.projects?.message}>
              <textarea
                {...register("projects")}
                placeholder="Project name · github.com/link · what it does & impact"
                rows={3}
                className={textareaClass}
              />
              <CharCount current={projectsVal.length} max={600} />
            </Field>
          </Section>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-violet hover:bg-[#7c72f7] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[15px] tracking-wide rounded-xl py-4 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating…
              </>
            ) : isSubmitSuccessful ? (
              "✓ Resume ready — Redirecting"
            ) : (
              <Link to="/resume-builder" className="w-full text-center">
                Generate Resume →
              </Link>
            )}
          </button>

          {/* Global form error summary (only on submit) */}
          {Object.keys(errors).length > 0 && (
            <p className="mt-3 text-center font-mono text-[12px] text-[#f7a090]">
              ✗ Fix the errors above before generating your resume
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResumeBuilder;