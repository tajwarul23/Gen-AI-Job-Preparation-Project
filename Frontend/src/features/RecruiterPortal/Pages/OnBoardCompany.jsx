import CreateCompanyForm from "../Components/CreateCompanyForm.jsx"
import JoinCompany from "./JoinCompany.jsx"


const OnBoardCompany = () => {
  return (
       <div className="min-h-screen flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <CreateCompanyForm />
        <JoinCompany />
      </div>
    </div>
  )
}

export default OnBoardCompany