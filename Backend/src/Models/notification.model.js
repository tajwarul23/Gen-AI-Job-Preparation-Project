import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "APPLICATION_STATUS_UPDATED",
        "NEW_APPLICATION",
        "COMPANY_MEMBER_JOINED",
        "EMPLOYEE_LEAVED",
        "PROMOTED_TO_COMPANY_ADMIN"
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

notificationSchema.index({ recipient: 1, _id: -1 });

export const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema,
);
