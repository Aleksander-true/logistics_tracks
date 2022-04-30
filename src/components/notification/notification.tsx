import { notification } from "antd";

type NotificationProps = { message?: string; description?: string };

export const openNotification = ({
  message = "",
  description = "",
}: NotificationProps) => {
  notification.open({
    message,
    description,
  });
};
