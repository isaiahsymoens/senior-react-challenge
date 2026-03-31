import {User} from "@/app/api/users";
import {useEffect, useRef} from "react";

export type UserDetailsModalProps = {
  open: boolean;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
}

export const UserDetailsModal = ({open, user, isLoading, onClose}: UserDetailsModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    open ? dialog.showModal() : dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="m-auto w-full max-w-135 h-62.5 rounded-xl border border-zinc-200 p-0 shadow-2xl"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
    >
      <div className="flex justify-between border-b p-4">
        <h2 className="font-semibold">User details</h2>
        <button 
          className="outline-none"
          onClick={() => ref.current?.close()}
        >Close</button>
      </div>
      <div className="p-4 text-sm">
        {isLoading && <span>Loading...</span>}
        {!isLoading && user && (
          <div>
            <p>
              <span className="font-semibold">Name:</span> 
              <span className="text-sm ml-2">{user.firstName + " " + user.lastName}</span>
            </p>
            <p>
              <span className="font-semibold">Email:</span> 
              <span className="text-sm ml-2">{user.email}</span>
            </p>
            <p>
              <span className="font-semibold">Phone:</span> 
              <span className="text-sm ml-2">{user.phone}</span>
            </p>
            <p>
              <span className="font-semibold">Company:</span> 
              <span className="text-sm ml-2">{user.company?.name ?? "--"}</span>
            </p>
            <p>
              <span className="font-semibold">Address:</span> 
              <span className="text-sm ml-2">{user.address?.address ?? "--"}</span>
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}