import toast from "react-hot-toast";
import { useRemoveEmployee } from "../Hooks/useCompany";

const RemoveEmployeeModalBody = ({ removeDialogRef, employeeId, employeeName }) => {
  const { mutate: removeEmployee, isPending } = useRemoveEmployee();

  const handleRemove = () => {
    removeEmployee(employeeId, {
      onSuccess: () => {
        toast.success(`${employeeName || "Employee"} removed from the team`);
        removeDialogRef?.current?.close();
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to remove employee"
        );
      },
    });
  };

  return (
    <dialog ref={removeDialogRef} className="modal">
      <div className="modal-box bg-surface">
        <h3 className="text-lg font-mono text-ink">Remove Team Member?</h3>

        <p className="py-4 font-mono text-sm text-muted">
          Are you sure you want to remove {employeeName || "this employee"}{" "}
          from the company? They will lose access to the company workspace.
        </p>

        <div className="modal-action font-mono">
          <button
            type="button"
            className="btn"
            onClick={() => removeDialogRef?.current?.close()}
            disabled={isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-error"
            onClick={handleRemove}
            disabled={isPending}
          >
            {isPending ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RemoveEmployeeModalBody;
