import { ChannelType } from "./channelType.enum";
import { StatusNotification } from "./statusNotification.enum";

export interface NotificationEntity {
  id?: string;
  title?: string;
  message?: string;
  infoUser?: string;
  status?: StatusNotification;
  type?: ChannelType;
}
