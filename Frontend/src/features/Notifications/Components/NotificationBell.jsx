import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import {
  useNotifications,
  useUnreadNotificationCount,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useClearAllNotifications,
} from "../Hooks/useNotification.js";
import ConfirmModal from "../../interview/Components/ConfirmModal.jsx";

const formatTimeAgo = (isoDate) => {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const panelRef = useRef(null);
  const loadMoreRef = useRef(null);

  const { data: unreadData } = useUnreadNotificationCount();
  const unreadCount = unreadData?.count ?? 0;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications({ enabled: isOpen });

  const { mutate: markAllRead } = useMarkAllNotificationsRead();
  const { mutate: markOneRead } = useMarkNotificationRead();
  const { mutate: clearAll, isPending: isClearing } = useClearAllNotifications();

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage, notifications.length]);

  const handleItemClick = (notification) => {
    if (!notification.read) markOneRead(notification._id);
  };

  const handleMarkAllRead = () => {
    markAllRead(undefined, { onSuccess: () => setIsOpen(false) });
  };

  const handleClearAllConfirmed = () => {
    clearAll(undefined, { onSuccess: () => setIsClearConfirmOpen(false) });
  };

  return (
    <>
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative rounded-xl border border-line p-2.5 text-muted hover:text-ink transition-colors duration-200 cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl border border-line bg-surface shadow-lg z-20">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line sticky top-0 bg-surface">
            <span className="font-display font-semibold text-ink">Notifications</span>
            <div className="flex gap-2">
              <button onClick={handleMarkAllRead} className="cursor-pointer text-muted hover:text-violet transition-colors" title="Mark all as read">
                <CheckCheck className="w-4 h-4" />
              </button>
              <button onClick={() => setIsClearConfirmOpen(true)} className="cursor-pointer text-muted hover:text-red-500 transition-colors" title="Clear all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="p-4 text-sm text-muted">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted">No notifications yet</div>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  onClick={() => handleItemClick(notification)}
                  className={`px-4 py-3 border-b border-line cursor-pointer transition-colors hover:bg-violet/10 ${
                    notification.read ? "bg-surface" : "bg-teal/25 text"
                  }`}
                >
                  <p className="text-sm font-medium text-ink">{notification.title}</p>
                  <p className="text-sm text-muted mt-0.5">{notification.message}</p>
                  <p className="text-xs text-muted mt-1">{formatTimeAgo(notification.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}

          <div ref={loadMoreRef} className="h-2" />
          {isFetchingNextPage && <div className="p-3 text-center text-xs text-muted">Loading more...</div>}
        </div>
      )}
    </div>

    <ConfirmModal
      open={isClearConfirmOpen}
      onClose={() => setIsClearConfirmOpen(false)}
      onConfirm={handleClearAllConfirmed}
      title="Clear all notifications?"
      description="This will permanently delete all of your notifications. This action cannot be undone."
      loading={isClearing}
    />
    </>
  );
};

export default NotificationBell;
