export type NotificationArguments = {
  title: string;
  description: string;
  imageUrl: string;
  audiobook_id: string;
  audiobook_title: string;
  gotoActivity: string;
};

export type NotificationData = {
  id: number;
  action_button_color: string | null;
  action_button_color_2: string | null;
  is_gradient_action_button: number; // 0 or 1
  n_title: string;
  n_description: string;
  n_imageUrl: string;
  n_arguments: NotificationArguments;
  is_action_button: number; // 0 or 1
  n_type: "PUSH_NOTIFICATION" | string;
  actionButtonTitle: string;
  goto_page: string;
  created_at: string; // ISO date
  isRead: number; // 0 or 1
};
