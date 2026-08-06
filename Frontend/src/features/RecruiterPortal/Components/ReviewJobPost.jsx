

const ReviewJobPost = ({data = {}} ) => {
  return (
    <div className="space-y-6">

  {/* Role Details */}
  <div className="rounded-xl border border-line bg-overlay p-5">
    <h3 className="font-semibold text-lg">{data?.title}</h3>

    <div className="flex flex-wrap gap-2 mt-3 text-xs">
      <span className="px-3 py-1 rounded-full bg-teal/10">
        {data.workMode.replace("_", " ")}
      </span>

      <span className="px-3 py-1 rounded-full bg-purple-500/10">
        {data.employmentType.replace("_", " ")}
      </span>

      <span className="px-3 py-1 rounded-full bg-blue-500/10">
        {data.experienceLevel}
      </span>

      <span className="px-3 py-1 rounded-full bg-yellow-500/10">
        {data.status}
      </span>
    </div>

    <div className="mt-5 space-y-2 text-sm">
      <div>
        <span className="font-semibold">Location:</span>{" "}
        {data.location || "Remote / Not specified"}
      </div>

      <div>
        <span className="font-semibold">Vacancy:</span>{" "}
        {data.vacancy}
      </div>

      <div>
        <span className="font-semibold">Salary:</span>{" "}
        {data.salary.currency} {Number(data.salary.salaryMin).toLocaleString()} -
        {Number(data.salary.salaryMax).toLocaleString()}
      </div>
      <div>
        <span className="font-semibold">Deadline:</span>{" "}
        {/* {data.salary.currency} {Number(data.salary.salaryMin).toLocaleString()} -
        {Number(data.salary.salaryMax).toLocaleString()} */}
        {data.deadline}
      </div>
    </div>
  </div>

  {/* Skills */}
  <div className="rounded-xl border border-line bg-overlay p-5">
    <h4 className="font-semibold mb-3">Required Skills</h4>

    <div className="flex flex-wrap gap-2">
      {data.skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 rounded-full bg-teal/10 border border-teal/30 text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  {/* Description */}
  <div className="rounded-xl border border-line bg-overlay p-5">
    <h4 className="font-semibold mb-3">Job Description</h4>

    <p className="whitespace-pre-wrap text-sm leading-7 text-muted">
      {data.description}
    </p>
  </div>

</div>
  )
}

export default ReviewJobPost