import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLeaveCompany } from "../Hooks/useCompany";
import { useAuth } from "../../Auth/Hooks/useAuth";

const LeaveCompanyModalBody = ({ leaveDialogRef }) => {
  const { mutate: leaveCompany, isPending } = useLeaveCompany();
  const {user} = useAuth();
  const navigate = useNavigate();

  const handleLeave = () => {
    leaveCompany(undefined, {
      onSuccess: (res) => {
        toast.success(res?.message || "Left the company successfully");
        leaveDialogRef?.current?.close();
        navigate("/");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to leave company"
        );
      },
    });
  };

  return (
    <dialog ref={leaveDialogRef} className="modal">
      <div className="modal-box bg-surface">
        <h3 className="text-lg font-mono text-ink">Leave Company?</h3>

        <p className="py-4 font-mono text-sm text-muted">
          Are you sure you want to leave your current company? You will lose
          access to the company workspace and need a new invite to rejoin.
        </p>
        {
          user?.role === "company_admin" && (<p className="py-4 font-mono text-sm text-muted">
          If you leave the company, the longest-serving employee will be promoted to company admin.
        </p>)
        }

        <div className="modal-action font-mono">
          <button
            type="button"
            className="btn"
            onClick={() => leaveDialogRef?.current?.close()}
            disabled={isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-error"
            onClick={handleLeave}
            disabled={isPending}
          >
            {isPending ? "Leaving..." : "Leave Company"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default LeaveCompanyModalBody;
