import { useContext, useRef, useState } from "react";
import {
  Building2,
  Globe2,
  Users,
  Briefcase,
  Mail,
  Copy,
  Check,
  SquarePen,
  Link as LinkIcon,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/auth.context";
import {
  useGetCompany,
  useGenerateInviteLink,
  useInviteByEmail,
} from "../Hooks/useCompany";
import UpdateCompanyModalBody from "../Components/UpdateCompanyModalBody";
import SpinLoader from "../../../Shared/SpinLoader";

const DEFAULT_LOGO =
  "https://lh3.googleusercontent.com/d/1zC9f8t_G0wzX7b5Y9iU_pZ9y-T3D2oOa=w100-h100-cc";

const INDUSTRY_LABELS = {
  E_COMMERCE: "E-Commerce",
  REAL_ESTATE: "Real Estate",
  NON_PROFIT: "Non-Profit",
};

const formatIndustry = (industry) =>
  INDUSTRY_LABELS[industry] ||
  (industry
    ? industry.charAt(0) + industry.slice(1).toLowerCase().replace(/_/g, " ")
    : "");

const CompanyProfile = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "company_admin";
  const updateDialogRef = useRef(null);
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const { data, isLoading } = useGetCompany();
  const { mutate: generateInvite, isPending: isInvitePending } =
    useGenerateInviteLink();
  const { mutate: sendEmailInvite, isPending: isEmailInvitePending } =
    useInviteByEmail();

  const company = data?.data?.company;
  const applicationLength = data?.data?.applicationLength;
  const employeeDetails = data?.data?.employeeDetails?.[0];
  const employees = employeeDetails?.employees || [];
  const employeeCount = employeeDetails?.employeeCount ?? employees.length;

  const handleGenerateInvite = () => {
    generateInvite(undefined, {
      onSuccess: (res) => setInviteLink(res?.data || ""),
      onError: (error) =>
        toast.error(
          error?.response?.data?.message || "Failed to generate invite link"
        ),
    });
  };

  const handleSendEmailInvite = (e) => {
    e.preventDefault();
    const email = inviteEmail.trim();
    if (!email) return;

    sendEmailInvite(email, {
      onSuccess: (res) => {
        toast.success(res?.message || `Invite sent to ${email}`);
        setInviteEmail("");
      },
      onError: (error) =>
       {
         toast.error(
          "Failed to send invite email"
        ),
        console.log(error.message);
        
       }
    });
  };

  const handleCopyInvite = async () => {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <SpinLoader />;
  }

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-surface border border-line rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={company?.logoUrl || DEFAULT_LOGO}
                alt={company?.companyName}
                className="w-16 h-16 rounded-2xl object-cover border border-violet-border bg-overlay shrink-0"
              />

              <div>
                <h1 className="text-xl lg:text-2xl font-bold font-display text-ink">
                  {company?.companyName}
                </h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs font-mono uppercase bg-violet/10 text-violet-text border border-violet-border px-2 py-0.5 rounded-full font-bold">
                    {formatIndustry(company?.industry)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted font-sans">
                    <Globe2 className="w-3.5 h-3.5" />
                    {company?.country}
                  </span>
                </div>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={() => updateDialogRef.current?.showModal()}
                className="px-4 py-2 bg-violet hover:bg-violet/90 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm self-start md:self-auto"
              >
                <SquarePen className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-line font-mono">
            <div className="bg-overlay border border-line rounded-xl p-3">
              <span className="text-muted flex items-center gap-1.5 text-lg uppercase">
                <Briefcase className="w-3.5 h-3.5" />
                Applicants
              </span>
              <span className="text-2xl font-bold text-teal font-display">
                {applicationLength ?? 0}
              </span>
            </div>

            <div className="bg-overlay border border-line rounded-xl p-3">
              <span className="text-muted flex items-center gap-1.5 text-lg uppercase">
                <Users className="w-3.5 h-3.5" />
                Team Size
              </span>
              <span className="text-2xl font-bold text-ink font-display">
                {employeeCount}
              </span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-surface border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-mono text-muted tracking-wider uppercase font-bold mb-3">
            <Building2 className="w-4 h-4 text-teal" />
            About
          </h2>
          <p className="text-sm text-ink font-sans leading-relaxed whitespace-pre-wrap">
            {company?.aboutCompany || "No description added yet."}
          </p>
        </div>

        {/* Invite (admin only) */}
        {isAdmin && (
          <div className="bg-surface border border-line rounded-2xl p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-mono text-muted tracking-wider uppercase font-bold mb-3">
              <LinkIcon className="w-4 h-4 text-teal" />
              Invite Recruiters
            </h2>
            <p className="text-xs text-muted font-sans mb-4">
              Generate a shareable link to invite a recruiter to join{" "}
              {company?.companyName}. The link expires in 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 min-w-0">
              <button
                onClick={handleGenerateInvite}
                disabled={isInvitePending}
                className="px-4 py-2 bg-teal hover:bg-teal/90 text-app font-semibold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-teal/10 shrink-0"
              >
                {isInvitePending ? "Generating..." : "Generate Invite Link"}
              </button>

              {inviteLink && (
                <div className="flex items-center gap-2 bg-overlay border border-line rounded-xl px-3 py-2 min-w-0 sm:flex-1">
                  <span className="flex-1 min-w-0 text-xs text-muted font-mono truncate">
                    {inviteLink}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyInvite}
                    className="text-muted hover:text-teal cursor-pointer shrink-0"
                    aria-label="Copy invite link"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-teal" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-line" />
              <span className="text-[11px] font-mono text-muted uppercase">
                or
              </span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <form
              onSubmit={handleSendEmailInvite}
              className="flex flex-col sm:flex-row gap-2 min-w-0"
            >
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="teammate@company.com"
                className="flex-1 min-w-0 bg-overlay text-ink text-sm border border-line rounded-xl p-3 focus:outline-none focus:border-teal placeholder:text-muted font-sans"
              />
              <button
                type="submit"
                disabled={isEmailInvitePending || !inviteEmail.trim()}
                className="px-4 py-2 bg-violet hover:bg-violet/90 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                {isEmailInvitePending ? "Sending..." : "Send Invite"}
              </button>
            </form>
          </div>
        )}

        {/* Employees */}
        <div className="bg-surface border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-mono text-muted tracking-wider uppercase font-bold mb-4">
            <Users className="w-4 h-4 text-teal" />
            Team ({employeeCount})
          </h2>

          {employees.length > 0 ? (
            <div className="divide-y divide-line">
              {employees.map((employee) => (
                <div
                  key={employee._id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-violet/10 border border-violet-border flex items-center justify-center text-violet-text font-bold text-sm shrink-0">
                      {employee.userName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">
                        {employee.userName || "Unnamed"}
                      </p>
                      <p className="text-xs text-muted flex items-center gap-1 truncate">
                        <Mail className="w-3 h-3 shrink-0" />
                        {employee.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono uppercase px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      employee.role === "company_admin"
                        ? "bg-teal/10 text-teal border border-teal/30"
                        : "bg-overlay text-muted border border-line"
                    }`}
                  >
                    {employee.role === "company_admin" ? "Admin" : "Recruiter"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted font-sans">No team members yet.</p>
          )}
        </div>
      </div>

      {isAdmin && (
        <UpdateCompanyModalBody
          updateDialogRef={updateDialogRef}
          company={company}
        />
      )}
    </div>
  );
};

export default CompanyProfile;
