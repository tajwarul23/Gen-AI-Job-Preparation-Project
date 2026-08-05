import CreateCompanyForm from "../Components/CreateCompanyForm.jsx"
import JoinCompany from "./JoinCompany.jsx"


const OnBoardCompany = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl relative">
      <CreateCompanyForm/>
      <JoinCompany/>
    </div>
  )
}

export default OnBoardCompany