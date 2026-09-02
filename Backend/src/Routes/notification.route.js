import express from "express";
import { verifyToken } from "../Middlewares/Auth.middleware.js";
import {
  clearAllNotification,
  getNotification,
  getUnreadNotificationCount,
  readAllNotifications,
  readNotification,
} from "../Controllers/Notification.controller.js";

const notificationRouter = express.Router();

/**
 * @route GET /api/notification?cursor=<id>&limit=15
 * @description Cursor-paginated list of the logged-in user's notifications, newest first
 * @access Private
 */
notificationRouter.get("/", verifyToken, getNotification);

/**
 * @route GET /api/notification/unread-count
 * @description Unread notification count — polled by the frontend for the bell badge
 * @access Private
 */
notificationRouter.get(
  "/unread-count",
  verifyToken,
  getUnreadNotificationCount,
);

/**
 * @route PATCH /api/notification/read-all
 * @description Mark all of the logged-in user's notifications as read
 * @access Private
 */
notificationRouter.patch("/read-all", verifyToken, readAllNotifications);
/**
 * @route PATCH /api/notification/:notificationId/read
 * @description Mark a single notification as read
 * @access Private
 */

notificationRouter.patch(
  "/:notificationId/read",
  verifyToken,
  readNotification,
);
/**
 * @route DELETE /api/notification
 * @description Clear all notifications for the logged-in user
 * @access Private
 */

notificationRouter.delete("/", verifyToken, clearAllNotification);

export default notificationRouter;
