import { useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";
import { SquarePen, X, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { updateCompanySchema } from "../../../Schema/updateCompanySchema";
import { useUpdateCompanyInfo, useUpdateCompanyLogo } from "../Hooks/useCompany";

const UpdateCompanyModalBody = ({ updateDialogRef, company }) => {
  const countries = useMemo(() => countryList().getData(), []);
  const { mutateAsync: updateCompanyInfo, isPending: isInfoPending } =
    useUpdateCompanyInfo();
  const { mutateAsync: updateCompanyLogo, isPending: isLogoPending } =
    useUpdateCompanyLogo();
  const isPending = isInfoPending || isLogoPending;

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      companyName: company?.companyName || "",
      aboutCompany: company?.aboutCompany || "",
      industry: company?.industry || "",
      country: company?.country || "",
    },
  });

  useEffect(() => {
    if (company) {
      reset({
        companyName: company.companyName || "",
        aboutCompany: company.aboutCompany || "",
        industry: company.industry || "",
        country: company.country || "",
      });
    }
  }, [company, reset]);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  useEffect(() => {
    const dialog = updateDialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      setLogoFile(null);
      setLogoPreview(null);
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [updateDialogRef]);

  const applyLogoFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleFileInputChange = (e) => {
    applyLogoFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    applyLogoFile(e.dataTransfer.files?.[0]);
  };

  const onSubmit = async (data) => {
    try {
      const tasks = [];

      if (isDirty) tasks.push(updateCompanyInfo(data));

      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);
        tasks.push(updateCompanyLogo(formData));
      }

      if (tasks.length === 0) {
        updateDialogRef.current?.close();
        return;
      }

      await Promise.all(tasks);
      toast.success("Company profile updated");
      updateDialogRef.current?.close();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update company"
      );
    }
  };

  return (
    <dialog ref={updateDialogRef} className="modal">
      <div className="modal-box max-w-2xl bg-surface">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-ink">Edit Company Profile</h3>

          <button
            type="button"
            onClick={() => updateDialogRef.current?.close()}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-overlay hover:text-ink cursor-pointer"
            aria-label="Close edit modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="my-5 h-px bg-line" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Logo */}
          <div>
            <label className="block text-xs font-mono mb-1.5 uppercase text-muted font-bold">
              Company Logo
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center gap-4 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors ${
                isDragging
                  ? "border-teal bg-teal/10"
                  : logoFile
                  ? "border-teal/40 bg-teal/5"
                  : "border-line hover:border-linehov bg-overlay"
              }`}
            >
              <img
                src={logoPreview || company?.logoUrl}
                alt="Company logo"
                className="w-14 h-14 rounded-xl object-cover border border-violet-border bg-overlay shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-medium font-sans text-ink flex items-center gap-1.5">
                  <UploadCloud className="w-3.5 h-3.5 text-muted shrink-0" />
                  {isDragging
                    ? "Drop to upload"
                    : logoFile
                    ? "New logo selected"
                    : "Drag and drop or click to change logo"}
                </p>
                {logoFile && (
                  <p className="text-xs text-muted font-sans truncate mt-0.5">
                    {logoFile.name}
                  </p>
                )}
                <p className="text-[11px] text-muted mt-1 font-mono">
                  PNG, JPG up to 2MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono mb-1 uppercase text-muted font-bold">
              Company Name
            </label>
            <input
              type="text"
              {...register("companyName")}
              className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
            />
            {errors.companyName && (
              <p className="mt-1 text-xs text-error">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono mb-1 uppercase text-muted font-bold">
              About Company
            </label>
            <textarea
              rows={4}
              {...register("aboutCompany")}
              className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
            />
            {errors.aboutCompany && (
              <p className="mt-1 text-xs text-error">
                {errors.aboutCompany.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono mb-1 uppercase text-muted font-bold">
                Industry
              </label>
              <select
                {...register("industry")}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal cursor-pointer font-sans"
              >
                <option value="TECHNOLOGY">TECHNOLOGY</option>
                <option value="FINANCE">FINANCE</option>
                <option value="HEALTHCARE">HEALTHCARE</option>
                <option value="EDUCATION">EDUCATION</option>
                <option value="E_COMMERCE">E-COMMERCE</option>
                <option value="MARKETING">MARKETING</option>
                <option value="CONSULTING">CONSULTING</option>
                <option value="REAL_ESTATE">REAL ESTATE</option>
                <option value="MANUFACTURING">MANUFACTURING</option>
                <option value="LOGISTICS">LOGISTICS</option>
                <option value="TELECOMMUNICATION">TELECOMMUNICATION</option>
                <option value="MEDIA">MEDIA</option>
                <option value="GOVERNMENT">GOVERNMENT</option>
                <option value="NON_PROFIT">NON_PROFIT</option>
                <option value="OTHER">OTHER</option>
              </select>
              {errors.industry && (
                <p className="mt-1 text-xs text-error">
                  {errors.industry.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono mb-1 uppercase text-muted font-bold">
                Country
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    options={countries}
                    className="text-black"
                    placeholder="Select a country"
                    value={countries.find((c) => c.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />
              {errors.country && (
                <p className="mt-1 text-xs text-error">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={() => updateDialogRef?.current?.close()}
              className="px-4 py-2 border border-line cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-overlay hover:text-ink"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={(!isDirty && !logoFile) || isPending}
              className={`px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-1 shadow-md transition-all bg-teal hover:bg-teal/90 text-app shadow-teal/10 ${
                (!isDirty && !logoFile) || isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <SquarePen className="w-3.5 h-3.5" />
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateCompanyModalBody;
