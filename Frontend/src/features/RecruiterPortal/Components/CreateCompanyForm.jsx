import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { createCompanySchema } from "../../../Schema/createCompanySchema";
import { motion } from "motion/react";
import { Building2Icon, UploadCloud, X } from "lucide-react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useCreateCompany } from "../Hooks/useCompany";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateCompanyForm = () => {

  const {mutate:createCompany, isPending, isError, error} = useCreateCompany();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      companyName: "",
      aboutCompany: "",
      industry: "",
      country: "",
      logo: null,
    },
  });

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const logo = watch("logo");

 const countries = useMemo(() => countryList().getData(), []);

  const applyLogoFile = useCallback(
    (file) => {
      if (!file) return;
      
      if (!file.type.startsWith("image/")) return;
      setValue("logo", file, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

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
    const file = e.dataTransfer.files?.[0];
    applyLogoFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    applyLogoFile(file);
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveLogo = (e) => {
    e.stopPropagation();
    setValue("logo", null, { shouldValidate: true, shouldDirty: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("aboutCompany", data.aboutCompany);
    formData.append("industry", data.industry);
    formData.append("country", data.country);

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    console.log([...formData.entries()]);
    console.log(data.logo);
    createCompany(formData, {
      onSuccess: ()=> navigate("/recruiter/pipeline")
    })
  };

  useEffect(()=>{
    if(isError){
      toast.error(error?.response?.data?.message || "Failed to Initialize Company")
    }
  },[error])
  return (
    /** Create Company */
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
    >
      <form
      
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full space-y-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Building2Icon className="w-5 h-5 text-teal" />
            <h3 className="text-sm font-mono text-muted tracking-wider uppercase font-bold">
              INITIALIZE ORGANIZATION
            </h3>
          </div>

          <p className="text-muted text-sm mb-6 font-sans">
            Establish a new, isolated candidate processing workspace for your
            team. You'll become the primary Organization Administrator.
          </p>

          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-1.5 font-bold">
                Company Name *
              </label>
              <input
                type="text"
                placeholder="e.g. DataCore Systems"
                {...register("companyName")}
                className="w-full bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              />
              {errors.companyName && (
                <p className="text-red-400 text-[11px] mt-1 font-mono">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* About company */}
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-1.5 font-bold">
                About Company
              </label>
              <div className="relative">
                
                <textarea
                  placeholder=""
                  {...register("aboutCompany")}
                  className="w-full bg-overlay text-ink text-sm border border-line rounded-xl  pr-3 p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
                ></textarea>
              </div>
              {errors.aboutCompany && (
                <p className="text-red-400 text-[11px] mt-1 font-mono">
                  {errors.aboutCompany.message}
                </p>
              )}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-1.5 font-bold">
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
                <p className="text-red-400 text-[11px] mt-1 font-mono">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Country */}
       <div>
  <label className="block text-xs font-mono text-muted uppercase mb-1.5 font-bold">
    Country
  </label>

  <Controller
  
    name="country"
    control={control}
    rules={{ required: "Country is required" }}
    render={({ field }) => (
      <Select
      
        options={countries}
        className="text-black"
        placeholder="Select a country"
        value={countries.find(
          (country) => country.value === field.value
        )}
        onChange={(option) => field.onChange(option.value)}
      />
    )}
  />

  {errors.country && (
    <p className="text-red-400 text-[11px] mt-1 font-mono">
      {errors.country.message}
    </p>
  )}
</div>

            {/* Upload logo drag-and-drop */}
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-1.5 font-bold">
                Organization Logo
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
                onClick={handleDropzoneClick}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-teal bg-teal/10 text-teal"
                    : logo
                    ? "border-teal/40 bg-teal/5 text-teal"
                    : "border-line hover:border-linehov bg-overlay text-muted"
                }`}
              >
                <UploadCloud className="w-8 h-8 mx-auto mb-2 text-muted" />

                {logo ? (
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-xs font-medium font-sans truncate max-w-[70%]">
                      {logo.name}
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="text-muted hover:text-red-400"
                      aria-label="Remove logo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs font-medium font-sans">
                    {isDragging
                      ? "Drop to upload"
                      : "Drag and drop or click to upload logo"}
                  </p>
                )}

                <p className="text-sm text-muted mt-1 font-mono">
                  PNG, JPG up to 2MB
                </p>
              </div>

              {errors.logo && (
                <p className="text-red-400 text-[11px] mt-1 font-mono">
                  {errors.logo.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
          disabled={isPending}
            type="submit"
            className="w-full py-3 bg-teal hover:bg-teal/90 text-app font-semibold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-teal/10 font-sans"
          >
            {isPending? "Initializing":"Initialize Organization"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateCompanyForm;