import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCompanySchema } from "../../../Schema/createCompanySchema";

const CreateCompanyForm = () => {
  const {
    register,
    handleSubmit,
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
    
  };
  return (
    <form className="bg-blue-800" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
      <input {...register("companyName")} placeholder="Company Name" />
      <textarea {...register("aboutCompany")} placeholder="About Company" />
      <input {...register("industry")} placeholder="Industry" />
      <input {...register("country")} placeholder="Country" />
      <label>Upload File</label>

      <input type="file" {...register("logo")} />
      <button type="submit">Create Company</button>
    </form>
  );
};

export default CreateCompanyForm;
