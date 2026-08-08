import { X } from 'lucide-react';


const DescriptionModalBody = ({dialogRef, title, workMode, employmentType, description}) => {
  return (
    <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-ink">{title}</h3>

              <p className="mt-1 text-xs font-mono uppercase text-muted">
                {workMode?.toLowerCase()} ·{" "}
                {employmentType?.replace("_", " ").toLowerCase()}
              </p>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="
              rounded-lg p-2 text-muted
              transition-colors
              hover:bg-overlay hover:text-ink
              cursor-pointer
            "
              aria-label="Close description"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="my-5 h-px bg-line" />

          <div className="text-sm leading-7 text-ink/90">
            {description?.split("\n").map((line, index) => {
              const trimmedLine = line.trim();
              const isHeading = trimmedLine.includes(":");

              return (
                <p
                  key={index}
                  className={
                    isHeading ? "mt-5 font-bold text-ink first:mt-0" : "mb-2"
                  }
                >
                  {line}
                </p>
              );
            })}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
  )
}

export default DescriptionModalBody