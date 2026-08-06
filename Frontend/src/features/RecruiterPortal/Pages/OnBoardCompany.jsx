import CreateCompanyForm from "../Components/CreateCompanyForm.jsx";
import JoinCompany from "./JoinCompany.jsx";

const OnBoardCompany = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-5">
         <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink font-display mb-2">
          WELCOME TO THE RECRUITER CONSOLE
        </h2>
        <p className="text-muted text-sm font-mono tracking-widest uppercase font-bold">
          Select your organizational node to register your pipeline
        </p>
      </div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <CreateCompanyForm />
          <JoinCompany />
        </div>
      </div>
    </>
  );
};

export default OnBoardCompany;
