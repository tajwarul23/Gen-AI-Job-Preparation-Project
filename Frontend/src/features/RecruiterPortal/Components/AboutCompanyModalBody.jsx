import { useGetAboutCompany } from "../Hooks/useCompany";

const AboutCompanyModalBody = ({ aboutCompanyDialogRef, isOpen, onClose, company }) => {
  const { data, isPending } = useGetAboutCompany(company, isOpen);
  const aboutCompany = data?.company;

  return (
    <dialog ref={aboutCompanyDialogRef} className="modal">
      <div className="modal-box bg-surface">
        <h3 className="text-lg font-mono text-ink">About Company</h3>

        {isPending ? (
          <p className="py-4 font-mono text-sm text-muted">Loading...</p>
        ) : aboutCompany ? (
          <div className="py-4 space-y-3">
            <p className="font-mono text-sm text-ink whitespace-pre-line">
              {aboutCompany.aboutCompany}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
              {aboutCompany.industry && (
                <span>Industry: {aboutCompany.industry}</span>
              )}
              {aboutCompany.country && (
                <span>Country: {aboutCompany.country}</span>
              )}
            </div>
          </div>
        ) : (
          <p className="py-4 font-mono text-sm text-muted">
            No company information available.
          </p>
        )}

        <div className="modal-action font-mono">
          <button
            type="button"
            className="btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AboutCompanyModalBody;