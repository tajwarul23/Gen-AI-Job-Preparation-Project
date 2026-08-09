import { useDeleteJob } from "../Hooks/useJob";

const DeleteModalBody = ({ deleteDialogRef, jobId }) => {
  const { mutate: deleteJob, isPending } = useDeleteJob();

  const handleDelete = () => {
    deleteJob(jobId, {
      onSuccess: () => {
        deleteDialogRef?.current?.close();
      },
    });
  };

  return (
    <dialog ref={deleteDialogRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-mono">
          Delete Job?
        </h3>

        <p className="py-4 font-mono">
          Are you sure you want to delete this job? This action cannot be
          undone.
        </p>

        <div className="modal-action font-mono">
          <button
            type="button"
            className="btn"
            onClick={() => deleteDialogRef?.current?.close()}
            disabled={isPending}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-error"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModalBody;